# Recipe Management API

This is a simple Recipes management API.

### Live: https://recipe-management-vg17.onrender.com

## How to Run ?

To run this api:
Step-1
```
npm install
```
Step-2
```
npm run dev
```

## API Documentation

The project provides the following API endpoints:

### `POST /api/v1/users/signup`

create a new user.

**Request:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
    "status": true, 
    "message": "Successfully created account!"
}
```

### `POST /api/v1/users/login`

login a user.

**Request:**

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczODI2ZjI2OGM3NjQ0OTBmMjBiNjIiLCJpYXQiOjE2ODUyOTkxNTksImV4cCI6MTY4NTM4NTU1OX0.qs_RkR_anz-oqyJApfi4OmD4TI-Wfl6HzzngwpL8uX4",
  "message": "Log in succussfully!"
}
```

### `POST /api/v1/recipe/createRecipe`

for creating recipe by the user.

**Request:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczODI2ZjI2OGM3NjQ0OTBmMjBiNjIiLCJpYXQiOjE2ODUyOTkxNTksImV4cCI6MTY4NTM4NTU1OX0.qs_RkR_anz-oqyJApfi4OmD4TI-Wfl6HzzngwpL8uX4",
  "title": "Testing 2",
  "description": "description for testing",
  "ingredients": [],
  "instructions": []
}
```

**Response:**
```json
{
  "status": true,
  "recipeId": "6473a11a0627cea08a5d92d2",
  "message": "Recipe has been created successfully!"
}
```

### `GET /api/v1/recipe/getAllRecipes/:token`

get all recipes that were created by a user.

**Request:**

`GET /api/v1/recipe/getAllRecipes/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczODI2ZjI2OGM3NjQ0OTBmMjBiNjIiLCJpYXQiOjE2ODUyOTkxNTksImV4cCI6MTY4NTM4NTU1OX0.qs_RkR_anz-oqyJApfi4OmD4TI-Wfl6HzzngwpL8uX4`

**Response:**
```json
{
  "status": true,
  "data": [
    {
      "_id": "6473a0970627cea08a5d92cf",
      "userId": "6473826f268c764490f20b62",
      "title": "Testing 1",
      "description": "description for testing",
      "ingredients": [
        "First Ingredient",
        "Second Ingredient"
      ],
      "instructions": [
        "First Instruction",
        "Second Instruction"
      ],
      "createdAt": "2023-05-28T18:38:52.387Z",
      "__v": 0,
      "updatedAt": "2023-05-28T18:50:22.516Z"
    },
        {
      "_id": "6473a0970627cea08a3frcd",
      "userId": "6473826f268c764490f20b62",
      "title": "Testing 2",
      "description": "description for testing",
      "ingredients": [],
      "instructions": [],
      "createdAt": "2023-05-28T18:40:52.387Z",
      "__v": 0
    }
  ]
}
```

### `GET /api/v1/recipe/getRecipe/:token/:recipeId`

get a particular recipe that was created by a user.

**Request:**

`GET /api/v1/recipe/getRecipe/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczODI2ZjI2OGM3NjQ0OTBmMjBiNjIiLCJpYXQiOjE2ODUyOTkxNTksImV4cCI6MTY4NTM4NTU1OX0.qs_RkR_anz-oqyJApfi4OmD4TI-Wfl6HzzngwpL8uX4/6473a11a0627cea08a5d92d2`

**Response:**
```json
{
  "status": true,
  "data": [
    {
      "_id": "6473a11a0627cea08a5d92d2",
      "userId": "6473826f268c764490f20b62",
      "title": "Testing 2",
      "description": "description for testing",
      "ingredients": [],
      "instructions": [],
      "createdAt": "2023-05-28T18:38:52.387Z",
      "__v": 0
    }
  ]
}
```

### `PUT /api/v1/recipe/updateRecipe`

update a particular recipe that was created by a user.

**Request:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczODI2ZjI2OGM3NjQ0OTBmMjBiNjIiLCJpYXQiOjE2ODUyOTkxNTksImV4cCI6MTY4NTM4NTU1OX0.qs_RkR_anz-oqyJApfi4OmD4TI-Wfl6HzzngwpL8uX4",
  "recipeId": "6473a0970627cea08a5d92cf",
  "title": "Testing 1",
  "description": "description for testing",
  "ingredients": [],
  "instructions": []
}
```

**Response:**
```json
{
  "status": true,
  "message": "Recipe has been updated successfully!"
}
```

### `PUT /api/v1/recipe/addIngredient`

for adding ingredient in recipe by user.

**Request:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczODI2ZjI2OGM3NjQ0OTBmMjBiNjIiLCJpYXQiOjE2ODUyOTkxNTksImV4cCI6MTY4NTM4NTU1OX0.qs_RkR_anz-oqyJApfi4OmD4TI-Wfl6HzzngwpL8uX4",
  "recipeId": "6473a0970627cea08a5d92cf",
  "ingredient": "First Ingredient"
}
```

**Response:**
```json
{
  "status": true,
  "message": "New Ingredient has been added successfully!"
}
```

### `PUT /api/v1/recipe/addInstruction`

for adding ingredient in recipe by user.

**Request:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczODI2ZjI2OGM3NjQ0OTBmMjBiNjIiLCJpYXQiOjE2ODUyOTkxNTksImV4cCI6MTY4NTM4NTU1OX0.qs_RkR_anz-oqyJApfi4OmD4TI-Wfl6HzzngwpL8uX4",
  "recipeId": "6473a0970627cea08a5d92cf",
  "instruction": "Second Instruction"
}
```

**Response:**
```json
{
  "status": true,
  "message": "New Instruction has been added successfully!"
}
```

### `DELETE /api/v1/recipe/deleteRecipe/:token/:recipeId`

for deletion of recipe that was created by user.

**Request:**

`DELETE /api/v1/recipe/deleteRecipe/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczODI2ZjI2OGM3NjQ0OTBmMjBiNjIiLCJpYXQiOjE2ODUyOTkxNTksImV4cCI6MTY4NTM4NTU1OX0.qs_RkR_anz-oqyJApfi4OmD4TI-Wfl6HzzngwpL8uX4/6473a11a0627cea08a5d92d2`

**Response:**
```json
{
    "status": true,
    "message": "recipe has been deleted successfully!",
    "info": {
        "acknowledgement": true,
        "deletedCount": 1
    }
}
```

## Environment Variables

The following environment variables can be set to configure the project:

```json
{
    "PORT": 3000,
    "SERVER_URL": "http://localhost:3000",
    "MONGO_URI": "Your MONGODB_URI",
    "JWT_SECRET": "Your JWT_SECRET Key",
    "AES_SECRET": "Your AES_SECRET key"
}
```

## Contact Information

Name: Abhisekh Upadhaya
Email: Abhisek0721@gmail.com