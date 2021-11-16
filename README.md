# CNPMM
Project Công nghệ phần mềm mới

# Install: 
Install include running Front End project and Back End project. Please Install following the manual.
## BackEnd:
    - create database name: **foodandcook** in your mysql
    - cd be
    - yarn 
    - cd be/app
    - yarn start  - with yarn/ npm start   - with npm
 ## Run Seeder:
    - cd be/app
    - npx sequelize-cli db:seed:all
 ## Front - End
    - cd FE/FoodApp
    - run cmd with Adminnistrator
    - expo start
    - Scan QR 
 ## API List:
 ### Auth API:
    - SignIn API:
        + Method: Post
        + Link: http://localhost:8080/api/auth/signin
        + Require: 
            . username
            . password

    - SignUp API:
        + Method: Post
        + Link: http://localhost:8080/api/auth/signup
        + Require: 
            . username
            . email
            . password
            . role: "user"
### User API:
    - Get User Information API:
        + Method: get
        + Link: http://localhost:8080/api/user/information/:id
        +  Require: 
            . x-access-token            
            . userId in URL params

    - Update User Information:
        + Method: put
        + Link: http://localhost:8080/api/user/updateinfor/:id
        + Require: 
            . x-access-token
            . userId in URL params
            . firstname
            . lastname
            . phone
            . email
            . birthday
            . address
    - Change Password:
        + Method: put
        + Link: http://localhost:8080/api/user/changepassword/:id
        + Require:
            . x-access-token
            . userId in URL params
            . oldpassword
            . password (new password)
    - Add User favorite Category Food: (coming soon)
    - Delete User favorite Category Food: (coming soon)
### Food Category API:
    - Get all Food Categories:
        + Method: get
        + Link: http://localhost:8080/api/foodcategory/
        + Require: x-access-token
### Food API:
    - Get all Foods:
        + Method: get
        + Link: http://localhost:8080/api/foods/
        + Require: 
            . x-access-token
    - Get Food Detail:
        + Method: get
        + Link: http://localhost:8080/api/foods/detail/:id
        + Require:
            . x-access-token
            . foodId in URL params
    - Get all Food of a Food Category: (<b>need to fix into post method and add request body an array of food category</b>)
        + Method: get
        + Link: http://localhost:8080/api/foods/category/:id
        + Require:
            . x-access-token
            . foodCategoryId in URL params
### Product Category API:
    - Get all Product Categories:
        + Method: get
        + Link: http://localhost:8080/api/productcategory/
        + Require: x-access-token
### Product API:
    - Get all Product:
        + Method: get
        + Link: http://localhost:8080/api/products/
        + Require: x-access-token
    - Get Product Detail:
        + Method: get
        + Link: htpp://localhost:8080/api/products/detail/:id
        + Require:
            . x-access-token
            . productId in URL params
    - Get all Product of an Product Category:
        + Method: get
        + Link: http://localhost:8080/api/products/category/:id
        + Require: 
            . x-access-token
            . productCategoryId in URL params
### Cart API
    - Get all Cart Detail of a User:
        + Method: get
        + Link: http://localhost:8080/api/cart/:userId
        + Require:
            . x-access-token
            . userId in URL params
    - Add Products to User's Cart:
        + Method: post
        + Link: http://localhost:8080/api/cart/:userId/addCartItem
        + Require:
            . x-access-token
            . userId in URL params
            . listCartItems: array. An element is:
                . quantity
                . productId
    - Edit User's Cart:
        + Method: put
        + Link: http://localhost:8080/api/cart/:userId/editCartItem/:cartItemId
        + Require:
            . x-access-token
            . userId in URL params
            . cartItemId in URL params of cartItem you want to update
            . quantity (quantity of cartItem)
    - Delete User's Cart Item:
        + Method: put
        + Link: http://localhost:8080/api/cart/:userId/deleteCartItem/:cartItemId
        + Require: 
            . x-access-token
            . userId in URL params
            . cartItemId in URL params
### Order API
