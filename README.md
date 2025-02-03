# Railway Management System 

A simple Railway Management System where users can check seat availability, book seats, and manage trains with role-based access (Admin/User).

## **Tech Stack:**
- **Web Server**: Express.js
- **Database**: PostgreSQL (Hosted on Render)

## **Prerequisites:**
Ensure you have the following installed:
- Node.js (Recommended version: v16.x or higher)
- npm (Node Package Manager)
- Git (for version control)

## **Setup Instructions:**

### 1. Clone the repository:

Clone the repository
```bash
git clone https://github.com/Ayushi8989/WI.git
```
### 2. Install dependencies:
Ensure you're in the project directory, then run:

```bash
cd WI
npm install
```

### 3. Create the .env file:

```bash
PORT=5001
DB_USER=user-name
DB_PASSWORD=password
DB_HOST=host-name
DB_PORT=5432
DB_NAME=database-name
DB_SSL=true  
JWT_SECRET=jwt-secret
ADMIN_API_KEY=admin-api-key
```

### 4. Setup PostgreSQL Database:
For a hosted PostgreSQL service (e.g., Render), set up the tables manually via a database client:
```bash
sudo apt install postgresql-client-common
```
Check available versions and install the PostgreSQL client
```bash
apt-cache search postgresql-client
```
for example, postgresql-client-16:
```bash
sudo apt install postgresql-client-16
```
```bash
psql -h <HOST> -p 5432 -U <USER> -d <DB_NAME>
```
### 5. Create Database Tables:
Here is an example SQL script to set up the necessary tables:
```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(10) CHECK (role IN ('admin', 'user')) NOT NULL
);

CREATE TABLE trains (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    source VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    total_seats INT NOT NULL
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    train_id INT REFERENCES trains(id) ON DELETE CASCADE,
    seat_number INT NOT NULL,
    booking_time TIMESTAMP DEFAULT NOW(),
);  UNIQUE(train_id, seat_number)

```

### 6. Run the Server:
To start the server locally, run the following command:
```bash
npm start
```
This will start the server on http://localhost:5001.

### To test the API endpoints:

#### 1. User Registration:
POST /user/register
<br>
Request Body:
```bash
{
  "username": "user123",
  "password": "password123",
  "role" : "admin"
}
```
Response:
```bash
{
    "message": "User registered successfully ",
    "user": {
        "id": 1,
        "username": "user123",
        "password_hash": hashed-password,
        "role": "admin"
    }
}
```
#### 2. User Login:
POST /user/login
<br>
Request Body:
```bash
{
  "username": "user123",
  "password": "password123"
}
```
Response:
```bash
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```
#### 3. Add a Train (Admin Only):
POST /admin/add-train
<br>
Headers:
```bash
{
  "x-api-key": "your_admin_api_key"
}
```
Request Body:
```bash
{
    "name" : "Rajdhani Express",
    "source" : "Dimapur",
    "destination" : "Delhi",
    "total_seats" : 4
}
```
Response:
```bash
{
    "message": "Train added",
    "train": {
        "id": 3,
        "name": "Rajdhani Express",
        "source": "Dimapur",
        "destination": "Delhi",
        "total_seats": 4
    }
}
```
#### 4. Get Train Availability:
POST /train/
<br>
Request Body:
```bash
{
    "source" : "Dimapur",
    "destination" : "Sealdah"
}
```
Response:
```bash
{
    "trains": [
        {
            "id": 1,
            "name": "Kamroop",
            "source": "Dimapur",
            "destination": "Sealdah",
            "total_seats": 2
        }
    ]
}
```
#### 5. Book a Seat:
POST /train/book-seats
<br>
Headers:
```bash
{
  "Authorization": "jwt_token_here"
}
```
Request Body:
```bash
{
  "trainId": 1
}
```
Response:
```bash
{
    "message": "Seat booked successfully",
    "seatNumber": 4,
    "bookingId": 1
}
```
#### 6. Get Booking Details:
GET /train/booking/:id
<br>
Headers:
```bash
{
  "Authorization": "jwt_token_here"
}
```
Response:
```bash
{
  "booking": {
    "train_id": 1,
    "seat_number": 1,
    "user_id": 1
  }
}
```



