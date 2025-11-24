# 🐞 Bug Tracking System  

[![TypeScript](https://img.shields.io/badge/Built%20With-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Express](https://img.shields.io/badge/Backend-Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)  
[![Database](https://img.shields.io/badge/Database-MSSQL-CC2927?logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/sql-server)  
[![Testing](https://img.shields.io/badge/Testing-Jest%20%26%20Postman-FF6C37?logo=jest&logoColor=white)](https://jestjs.io/)  
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20Layered-blueviolet)]()  
[![Program](https://img.shields.io/badge/Teach2Give-QA%26QE%20Program-orange)]()  

---

A **collaborative full-stack project** developed under the **Teach2Give QA&QE Training Program** at **Dedan Kimathi University of Technology (DeKUT)**.  
The system helps software teams efficiently **log, assign, track, and resolve bugs** throughout the development lifecycle.  

---

<details>
<summary>📘 <strong>Overview</strong></summary>

The **Bug Tracking System** provides a central platform where development teams can:  
- Record and categorize bugs or feature requests  
- Assign issues to developers or QA engineers  
- Track progress and status updates in real-time  
- Manage users and roles with authentication and authorization  

This project applies core principles of **Software Quality Assurance (QA)** and **Quality Engineering (QE)**, focusing on both functionality and maintainability.  
</details>

---

<details>
<summary>🎯 <strong>Objectives</strong></summary>

- Demonstrate **backend architecture design** using TypeScript and Express.  
- Practice **database integration** and **SQL querying** with Microsoft SQL Server (MSSQL).  
- Implement **authentication and authorization** with defined user roles.  
- Build a **RESTful API** tested via Postman.  
- Apply **modular layered architecture** for scalability and reusability.  
- Integrate a **simple HTML/CSS frontend** for interaction and testing.  
- Conduct **unit and integration testing** to ensure reliability and maintain high-quality code coverage.  
</details>

---

<details>
<summary>🧩 <strong>Tech Stack</strong></summary>

| Layer | Technology |
|:------|:------------|
| **Backend** | Node.js · Express.js · TypeScript |
| **Database** | Microsoft SQL Server (MSSQL) |
| **Frontend** | HTML · CSS |
| **Testing** | Jest (Unit & Integration) · Postman (API) |
| **Architecture** | Modular Layered Architecture |
</details>

---

<details>
<summary>⚙️ <strong>System Modules (Planned Features)</strong></summary>

### 1. **User Management**
- Register, login, and logout users  
- Manage roles (`Admin`, `User`, `Both`)  
- Authorization for protected routes  

### 2. **Project Management**
- Create and manage projects  
- Assign users or teams  
- Track overall progress  

### 3. **Bug Management**
- Create, edit, and delete bug reports  
- Assign bugs to devs or QA engineers  
- Set severity, status, and priority  
- Track bug resolution lifecycle  

### 4. **Comments & Discussion**
- Threaded comments under bugs  
- Collaboration between devs & QA  

### 5. **Activity Logging & History**
- Record all user actions  

### 6. **Reporting & Analytics**
- Metrics on open/closed bugs, resolution time, and user activity  
</details>

---

<details>
<summary>🏗️ <strong>Architecture Overview</strong></summary>

| Folder | Description |
|:--------|:-------------|
| **`src/config/`** | Contains database connection setup and environment configuration. |
| **`src/controllers/`** | Handles incoming requests and coordinates responses. |
| **`src/services/`** | Contains core business logic and validation processes. |
| **`src/repositories/`** | Interacts directly with the database using SQL queries. |
| **`src/routes/`** | Defines API endpoints and connects them to controllers. |
| **`src/middleware/`** | Contains authentication, authorization, and validation logic. |
| **`src/utils/`** | Utility and helper functions used across the project. |
| **`src/tests/`** | Includes both unit and integration test suites. |

> This structure promotes **modularity**, **scalability**, and **testability**, ensuring every layer has a clear responsibility.

</details>

---

<details>
<summary>🧪 <strong>Testing Approach</strong></summary>

### **1. Unit Testing**
- Tests isolated functions and modules.  
- Ensures each component works independently.  

### **2. Integration Testing**
- Validates interactions between routes, services, and database.  
- Confirms data consistency and workflow logic.  

### **3. API Testing**
- Conducted with Postman for endpoint validation and error handling.  

**Test Coverage Focus:**
- Route access and authorization  
- CRUD operations across modules  
- Validation and error responses  
- Token-based authentication (JWT)  
</details>

---

<details>
<summary>🤝 <strong>Collaboration</strong></summary>

Developed by a team of four QA&QE trainees using **Git workflows**, **branching**, and **code reviews**.  
Each member owns specific modules while maintaining shared standards and documentation.  
</details>

---

<details>
<summary>📚 <strong>Learning Outcomes</strong></summary>

- Apply QA principles to real-world systems.  
- Strengthen debugging and problem-solving skills.  
- Improve collaboration in a software team environment.  
- Develop production-grade backend logic with TypeScript and Express.  
- Implement unit & integration testing within the QA pipeline.  
</details>

---

<details>
<summary>💭 <strong>Challenges & Reflections</strong></summary>

Designing modular and reusable code across multiple developers while preserving database integrity and role-based access proved complex.  
These challenges deepened our understanding of **collaborative engineering**, **testing**, and **quality assurance** in practice.  
</details>

---

<details>
<summary>🙏 <strong>Acknowledgment</strong></summary>

Special thanks to **Teach2Give** and **Dedan Kimathi University of Technology (DeKUT)** for providing mentorship and resources throughout the QA&QE Training Program.  
Guided by **Brian Kemboi**, our trainer, whose support has been instrumental in bridging theory and practice.  
</details>

---

<details>
<summary>👥 <strong>Authors</strong></summary>

**Teach2Give QA&QE Team**    
- Steve Kinuthia
- Agnes Kitua
- Kelly  
- Dave Karanja
</details>

---

✨ *"Teamwork in tech isn't just about writing code together — it's about learning to debug, design, and deliver as one."*  

