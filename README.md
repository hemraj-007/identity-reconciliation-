# 🛠 Identity Reconciliation Service

This project is a backend service designed to handle identity reconciliation using email and phone numbers to unify customer data. It is built using **Node.js**, **TypeScript**, and **Prisma ORM**.

## 📜 Project Overview

### Problem Statement
Imagine a scenario where a customer uses different contact details (email and/or phone numbers) for multiple purchases on an e-commerce platform. This service is designed to consolidate those different contact details and link them to a single customer identity, ensuring a consistent and unified view of customer data.

### Solution
This project exposes an endpoint `/identify` that receives email and/or phone number as input and returns a unified contact identity if it exists, or creates a new one if it doesn't. It manages a primary contact and secondary contacts for the same user in a SQL database using Prisma ORM.

### Stack Used
- **Node.js** - Backend server.
- **TypeScript** - Type-safe JavaScript for the server.
- **Prisma ORM** - For interacting with the SQL database.
- **Express.js** - For creating the server and handling HTTP requests.
- **PostgreSQL / SQLite** - SQL database to store contact information.


## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)
- A local or cloud-based SQL database (PostgreSQL is recommended, but SQLite will also work)

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/hemraj-007/identity-reconciliation.git
   cd identity-reconciliation
2. **Install Dependencies:**

   ```bash
   npm install

## 🧪 Testing the API with Postman

To test the `/identify` API endpoint using Postman, follow these steps:

### Step 1: Setup Postman
1. Open [Postman](https://www.postman.com/downloads/) or use the [Postman Web](https://web.postman.co/) interface.
2. Create a new `POST` request.

### Step 2: Define the Request URL
1. Set the request URL to: http://localhost:3000/identify

Replace `localhost` and `3000` if your server is hosted on a different environment or port.

### Step 3: Set Up Request Headers
1. Click on the **Headers** tab.
2. Add a header to specify that the request body is in JSON format:


### Step 4: Define the Request Body
1. Click on the **Body** tab.
2. Select **raw** and then select **JSON** from the dropdown menu.
3. Add the JSON request body. Here are some example scenarios:

#### Example 1: New User Request
If a new contact with no existing data is being created:

```json
{
"email": "newuser@example.com",
"phoneNumber": "1234567890"
}

