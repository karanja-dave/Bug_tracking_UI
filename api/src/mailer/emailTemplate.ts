export const emailTemplate = {
  // Combined Welcome + Verification Email
    verify: (firstName: string, code: string) => `
        <div style="font-family: 'Arial', sans-serif; background-color: #f6f7f9; padding: 22px;">
        <div style="max-width: 620px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden;
                    box-shadow: 0 4px 14px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: #4F46E5; padding: 30px 25px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 26px; font-weight: 700;">Welcome to Hive</h1>
            <p style="margin: 8px 0 0; font-size: 15px; opacity: 0.95;">
                Your Central Hub for Projects, Teams & Bug Tracking
            </p>
            </div>

            <!-- Body -->
            <div style="padding: 30px 25px; color: #333333; line-height: 1.7;">
            <h2 style="font-size: 20px; margin-bottom: 12px;">Hello ${firstName},</h2>

             <p>
                Thank you for creating an account with <strong>Hive</strong>. We're excited to have you onboard!
            </p>

            <p>
            Hive helps your team manage tasks, track bugs, collaborate and deliver faster than ever.
            </p>

            <p style="margin-top: 18px;">
                To complete your registration and secure your account, please verify your email address using the
                verification code below:
            </p>

            <!-- Verification Code Card -->
            <div style="background: #f4f4ff; padding: 18px; border-left: 4px solid #4F46E5; 
                        margin: 25px 0; text-align: center; border-radius: 6px;">
                <p style="margin: 0; font-size: 16px;">Your Verification Code:</p>
                <p style="margin: 8px 0 0; font-size: 32px; font-weight: 700; letter-spacing: 3px; color: #4F46E5;">
                ${code}
                </p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="#" 
                    style="background: #4F46E5; padding: 14px 32px; color: #ffffff; 
                        text-decoration: none; border-radius: 8px; font-size: 17px;
                        display: inline-block; font-weight: 600;">
                Verify My Account
                </a>
            </div>

            <p>
                If you didn’t create an account with Hive, you can safely ignore this email.
            </p>

            <p style="margin-top: 32px;">
                Best regards,<br/>
                <strong>The Hive Team</strong>
            </p>
            </div>

            <!-- Footer -->
            <div style="background: #f0f0f0; padding: 18px 20px; text-align: center; 
                        font-size: 13px; color: #777;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Hive App. All rights reserved.</p>
            </div>

        </div>
        </div>
    `,

    //verification successful 
    verifiedSuccess: (firstName: string) => `
        <div style="font-family: 'Arial', sans-serif; background-color: #f6f7f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

        <!-- heeader -->
        <div style="background: #10B981; padding: 25px 20px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Email Verified</h1>
        <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">You're all set!</p>
        </div>

        <!-- body -->
        <div style="padding: 25px 20px; color: #333333; line-height: 1.6;">
        <h2 style="font-size: 20px; margin-bottom: 10px;">Hello ${firstName},</h2>

        <p>Your Hive account has been successfully verified!</p>

        <p>You can now log in and start managing your projects, tracking bugs, and collaborating with your team.</p>

        <div style="text-align: center; margin: 25px 0;">
            <a href="#" 
                style="background: #4F46E5; padding: 12px 25px; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
            Log in to Hive
            </a>
        </div>

        <p style="margin-top: 30px;">
            Best regards,<br/>
            <strong>The Hive Team</strong>
        </p>
        </div>

        <!-- footer -->
        <div style="background: #f0f0f0; padding: 15px 20px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Hive App. All rights reserved.</p>
        </div>
        </div>
        </div>
  `

};
