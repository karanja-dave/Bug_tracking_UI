import * as userRepositories from '../../src/Repositories/users.repository';
import * as userServices from '../../src/services/user.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../src/mailer/mailer';
import { emailTemplate } from '../../src/mailer/emailTemplate';

// mocking all external dependacies
jest.mock('../../src/Repositories/users.repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../src/mailer/mailer');
jest.mock('../../src/mailer/emailTemplate');


describe("User Service Test Suite (Bug Tracking System)", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // fetching all users 
    it("should return a list of users", async () => {
        const mockUsers = [
            { 
                userid: 1,
                first_name: "Dan",
                last_name:"Njoro",
                email: "dan@gmail.com",
                role_user: "user",
                password_hash: "password123"
            },
            { 
                userid: 1,
                first_name: "Abi",
                last_name:"Chebet",
                email: "abi@gmail.com",
                role_user: "user",
                password_hash: "password123"
            },
        ];

        (userRepositories.getUsers as jest.Mock).mockResolvedValue(mockUsers);

        const users = await userServices.listUsers();
        expect(users).toEqual(mockUsers);
        expect(userRepositories.getUsers).toHaveBeenCalledTimes(1);
    });

    // create 
    it("should hash password, save user, and send verification email", async () => {
        const mockUser = {
            first_name: "Dave",
            last_name: "Karanja",
            email: "test@gmail.com",
            role_user:"admin",
            password_hash: "rawpassword"
        };

        (userRepositories.emailExists as jest.Mock).mockResolvedValue(false);
        (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPass123");
        (userRepositories.createUser as jest.Mock).mockResolvedValue({});
        (userRepositories.setVerificationCode as jest.Mock).mockResolvedValue({});
        (sendEmail as jest.Mock).mockResolvedValue(true);
        (emailTemplate.verify as jest.Mock).mockReturnValue("<template>");

        const result = await userServices.createUser(mockUser as any);

        expect(userRepositories.emailExists).toHaveBeenCalledWith("test@gmail.com");
        expect(bcrypt.hash).toHaveBeenCalledWith("rawpassword", 10);
        expect(userRepositories.createUser).toHaveBeenCalled();
        expect(sendEmail).toHaveBeenCalled();
        expect(result).toEqual({
            message: "User Created Successfully. Verification code sent to Email"
        });
    });
    
    // negative test for create:existing email provided during creation 
    it("should throw error if email already exists", async () => {
        (userRepositories.emailExists as jest.Mock).mockResolvedValue(true);

        await expect(
            userServices.createUser({ email: "duplicate@gmail.com" } as any)
        ).rejects.toThrow("Email already exists");
    });


    // verify users 
    it("should verify user with correct code", async () => {
        const mockUser = {
            email: "test@gmail.com",
            first_name: "Dave",
            verification_code: "123456"
        };

        (userRepositories.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
        (userRepositories.verifyUser as jest.Mock).mockResolvedValue({});
        (sendEmail as jest.Mock).mockResolvedValue(true);
        (emailTemplate.verifiedSuccess as jest.Mock).mockReturnValue("<verified template>");

        const result = await userServices.verifyUser("test@gmail.com", "123456");

        expect(userRepositories.getUserByEmail).toHaveBeenCalledWith("test@gmail.com");
        expect(userRepositories.verifyUser).toHaveBeenCalledWith("test@gmail.com");
        expect(result).toEqual({ message: "User Verified Successfully" });
    });
    // negative test for verify: inccorrect verification code provide 
    it("should throw error for incorrect verification code", async () => {
        const mockUser = {
            email: "test@gmail.com",
            verification_code: "123456"
        };

        (userRepositories.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

        await expect(
            userServices.verifyUser("test@gmail.com", "654321")
        ).rejects.toThrow("Invalid verification code");
    });

    // login user 
    it("should return token & user info on successful login", async () => {
        const mockUser = {
            userid: 1,
            first_name: "Dave",
            last_name: "Karanja",
            email: "test@gmail.com",
            password_hash: "hashedPw",
            role_user: "admin",
            is_verified:true
        };

        (userRepositories.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue("mockjwtToken");

        const result = await userServices.loginUser("test@gmail.com", "rawPw");

        expect(result.token).toBe("mockjwtToken");
        expect(result.user.email).toBe("test@gmail.com");
        expect(jwt.sign).toHaveBeenCalled();
    });

    //negative test for login: wrong password 
    it("should throw invalid credentials when password is wrong", async () => {
        const mockUser = {
            email: "test@gmail.com",
            password_hash: "hashedPw"
        };

        (userRepositories.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(
            userServices.loginUser("test@gmail.com", "wrong")
        ).rejects.toThrow("Invalid Credentials");
    });

    // update users 
    it("should update user after hashing password", async () => {
        (userRepositories.getUserById as jest.Mock).mockResolvedValue({ userid: 1 });
        (bcrypt.hash as jest.Mock).mockResolvedValue("hashed123");
        (userRepositories.updateUser as jest.Mock).mockResolvedValue({ message: 'User updated successfully' });

        const result = await userServices.updateUser(1, { password_hash: "newpass" } as any);

        expect(bcrypt.hash).toHaveBeenCalledWith("newpass", 10);
        expect(result).toEqual({ message: 'User updated successfully' });
    });

    // delete user 
    it("should delete user when exists", async () => {
        (userRepositories.getUserById as jest.Mock).mockResolvedValue({ userid: 1 });
        (userRepositories.deleteUser as jest.Mock).mockResolvedValue({ message: 'User deleted successfully' });

        const result = await userServices.deleteUser(1);

        expect(userRepositories.deleteUser).toHaveBeenCalledWith(1);
        expect(result).toEqual( { message: 'User deleted successfully' });
    });

});
