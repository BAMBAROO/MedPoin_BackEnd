# Medpoin's Backend

## System Requirements

Ensure your system meets the following requirements before running the application:

- **Node.js:** Version 14.x or newer. [Node.js Installation](https://nodejs.org/)
- **MySQL Server:** Version 8.x or newer. [MySQL Installation Guide](https://dev.mysql.com/doc/)

## Technologies Used

This application is developed using several key technologies:

- **NestJS:** A Node.js based backend framework. [NestJS Documentation](https://docs.nestjs.com/)
- **Prisma ORM:** An ORM for Node.js and TypeScript. [Prisma Documentation](https://www.prisma.io/docs/)
- **CASL JavaScript:** A library for managing authorization in JavaScript/TypeScript. [CASL Documentation](https://casl.js.org/)
- **Dotenv:** A library for managing environment variables. [Dotenv Documentation](https://www.npmjs.com/package/dotenv)
- **TypeScript:** A typed superset of JavaScript. [TypeScript Documentation](https://www.typescriptlang.org/)

## Programming Language

This application is written in **TypeScript**.

# Project Setup Guide

## Setup:

1. Install dependencies:

    ```bash
    npm install
    ```

2. Create a database named `<nama_database>` on your local MySQL server.

3. Update the `.env` file with your database connection information:

    ```plaintext
    SECRET_KEY_ACCESS='secret'
    SECRET_KEY_REFRESH='secret'
    DATABASE_URL="mysql://<user>:<password>@localhost:3306/<nama_database>"
    ```

4. Run Prisma migration to create database tables:

    ```bash
    npx prisma migrate dev
    ```

5. Inject SQL to table user for superadmin:
    ```
   id: superadmin, password: nimdarepus, role: admin
   ```

6. Generate Prisma client:

    ```bash
    npx prisma generate
    ```

7. Start the development server:

    ```bash
    npm run start:dev
    ```

**Note:** Make sure to replace `<nama_database>`, `<user>`, and `<password>` with your actual database name, user, and password.


# API Endpoints

## User Registration:

1. **Doctor Registration:**
    - **Endpoint**: `/signup/dokter`
    - **Method**: `POST`
    - **Body**:
      ```json
      {
        "id": "string",
        "nama": "string",
        "spesialis": "string"
      }
      ```

2. **Nurse Registration:**
    - **Endpoint**: `/signup/perawat`
    - **Method**: `POST`
    - **Body**:
      ```json
      {
        "id": "string",
        "nama": "string"
      }
      ```

3. **Staff Registration:**
    - **Endpoint**: `/signup/staf`
    - **Method**: `POST`
    - **Body**:
      ```json
      {
        "id": "string",
        "nama": "string"
      }
      ```

4. **Create Account for Registered Eployee:**
    - **Endpoint**: `/signup`
    - **Method**: `POST`
    - **Body**:
      ```json
      {
        "id": "string",
        "password": "string",
        "role": "string"
      }
      ```

## User Authentication:

5. **User Login:**
    - **Endpoint**: `/signin`
    - **Method**: `POST`
    - **Body**:
      ```json
      {
        "id": "string",
        "password": "string"
      }
      ```
    - **Returns**: `accessToken` to be used in the Authorization header for subsequent requests (`Bearer ${token}`).

6. **User Logout:**
    - **Endpoint**: `/signout`
    - **Method**: `DELETE`

7. **Refresh Token:**
    - **Endpoint**: `/token`
    - **Method**: `GET`
    - **Returns**: A new `accessToken`.

## Dashboard:

8. **Patient Dashboard:**
    - **Endpoint**: `/dashboard`
    - **Method**: `GET`
    - **Authorization**: Requires token

9. **Doctor List:**
    - **Endpoint**: `/dashboard/dokter`
    - **Method**: `GET`
    - **Authorization**: Requires token

10. **Nurse List:**
    - **Endpoint**: `/dashboard/perawat`
    - **Method**: `GET`
    - **Authorization**: Requires token

11. **Staff/Admin List:**
    - **Endpoint**: `/dashboard/staf`
    - **Method**: `GET`
    - **Authorization**: Requires token

## Patient Operations:

12. **Patient Registration:**
    - **Endpoint**: `/pasien/registrasi`
    - **Method**: `POST`
    - **Authorization**: Requires token
    - **Body**:
      ```json
      {
        "no_rm": "string",
        "name": "string",
        "no_ktp": "string",
        "no_bpjs": "string",
        "tempat_lahir": "string",
        "tanggal_lahir": "string",
        "jenis_kelamin": "string",
        "gol_darah": "string",
        "no_hp": "string",
        "nama_keluarga": "string",
        "no_hp_keluarga": "string",
        "alamat_lengkap": "string",
        "status_perkawinan": "string"
      }
      ```

13. **Get All Patients:**
    - **Endpoint**: `/pasien`
    - **Method**: `GET`
    - **Authorization**: Requires token

14. **Get Latest Medical Record Number:**
    - **Endpoint**: `/pasien/rm`
    - **Method**: `GET`
    - **Authorization**: Requires token

15. **Register Patient for Treatment Queue:**
    - **Endpoint**: `/rawat`
    - **Method**: `POST`
    - **Authorization**: Requires token
    - **Body**:
      ```json
      {
        "no_rm": "string",
        "dokter_id": "string"
      }
      ```

16. **Register Anamnesis for Treated Patient:**
    - **Endpoint**: `/anamnesis`
    - **Method**: `POST`
    - **Authorization**: Requires token
    - **Body**:
      ```json
      {
        "nama": "string",
        "no_rm": "string",
        "no_rawat": "string",
        "dokter_id": "string",
        "perawat_id": "string",
        "berat": "string",
        "suhu": "string",
        "tinggi": "string",
        "saturasi": "string",
        "tensi": "string"
      }
      ```

17. **Get Anamnesis Details for Treated Patient:**
    - **Endpoint**: `/anamnesis?no_rawat=${no_rawat}`
    - **Method**: `GET`
    - **Authorization**: Requires token

18. **Add Diagnosis and Treatment for Treated Patient:**
    - **Endpoint**: `/pemeriksaan`
    - **Method**: `POST`
    - **Authorization**: Requires token
    - **Body**:
      ```json
      {
        "no_rm": "string",
        "no_rawat": "string",
        "dokter_id": "string",
        "keluhan": "string",
        "tindakan": "string",
        "diagnosis": "string",
        "resep_obat": "string"
      }
      ```

19. **Get Medical Records for Patient:**
    - **Endpoint**: `/rekammedis`
    - **Method**: `GET`
    - **Authorization**: Requires token

20. **Get Detailed Medical Record for Patient:**
    - **Endpoint**: `/rekammedis/detail?no_rm=RM-00001`
    - **Method**: `GET`
    - **Authorization**: Requires token

## Icd9 and Icd10:

21. **icd10 List:**
    - **Endpoint**: `/icd9`
    - **Method**: `GET`
    - **Authorization**: Requires token

22. **Icd10 List:**
    - **Endpoint**: `/icd10`
    - **Method**: `GET`
    - **Authorization**: Requires token

## Credits

Special thanks to the developers and communities behind the technologies used in this project:

- [NestJS](https://nestjs.com/) by the NestJS Team
- [Prisma](https://www.prisma.io/) by the Prisma Team
- [CASL](https://casl.js.org/) by the CASL Team
- [Dotenv](https://www.npmjs.com/package/dotenv) by the Dotenv Contributors
- [TypeScript](https://www.typescriptlang.org/) by the TypeScript Team

Thank you for creating and maintaining these fantastic tools!