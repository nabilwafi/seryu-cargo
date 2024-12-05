# Salary Driver Seryu API

This application is built using **Express.js**, a web framework for Node.js that allows for quick and easy API and application development.

## Prerequisites
Before using this application, make sure you have the following dependencies installed:

- **Node.js**: Versi 20.x atau lebih baru
- **Yarn** (package manager)
- **PostgreSQL** (or any database you are using)

You can verify the installation of Node.js and Yarn by running the following commands:
```bash
node -v
yarn -v
```

If you haven't installed Node.js, you can download it from [nodejs.org](https://nodejs.org/).

## Installation

Follow these steps to set up and run the application locally.

#### 1. Clone the repository

```bash
git clone https://github.com/username/repository-name.git
cd repository-name
```
#### 2. Install dependencies

Make sure you are inside the application directory, then run the following command to install all required dependencies:

```bash
yarn install
```

#### 3. Create the .env configuration File

Copy the `.env.example` file to `.env` and adjust the settings as needed:

```bash
cp .env.example .env
```

#### 4. Setup Environment

Set up your environment variables. Create a .env file in the root of the project and configure the necessary database settings and other variables:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

#### 4. Run the application (locally)

To start the application, run:

```bash
yarn dev
```
## Directory Structure

```bash
/app
 /.husky            # Husky git hooks configuration
 /src    
    /controllers      # Contains for handling HTTP requests
    /middlewares      # Middleware functions like authentication, logging, etc.
    /databases        # Database models and schema definitions
        /data            # Contains data migrations
        /queries         # Contains queries DB using pgtyped
    /errors           # Error handlings
    /interface        # All interfaces
    /repositories     # Contains integration to DB
    /routes           # API route definitions
    /services         # Contains for handling logic bussiness
    /utils            # Utility functions and helpers
    /config
        connectDB.js       # Database connection setup postgres
 /.env               # Environment variables configuration file
```
## Usage/Examples

This application exposes several API endpoints. Below is the list of available endpoints:

#### 1. GET /v1/salary/driver/list?month=3&year=2024
Check the health status of the application.

Example request:

```bash
curl http://localhost:3000/v1/salary/driver/list?month=3&year=2024
```

Response:

```bash
{
	data : [
		{
			driver_code : "DRIVER001",
			name : "Agus"
			total_pending : 5000000,
			total_confirmed : 100000,
			total_paid : 200000,
			total_attendance_salary : 1500000,
			total_salary : 6800000,
			count_shipment : 15
		}
		...(another 9 row)
	],
	total_row : 35,
	current : 1,
	page_size : 10
}
```

## Error Handling

The application uses custom error handling to return meaningful error messages and proper status codes for different types of errors:

- **404** Not Found: When a resource is not found.
- **400** Bad Request: When the request body or query parameters are invalid.
- **500** Internal Server Error: When something goes wrong on the server.
