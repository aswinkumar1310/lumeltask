# lumeltask

# configuration setup
create a new named as .env in parent folder placed this below data
    APP_NAME="lumelTask"
    DBURL="mongo db connection string"
    PORT=3000
    VERSION=1

# Application Running Process
1. Use node version 20
2. Moving to home directory
3. Use these command npm i to install dependencies
4. Use these command npm run start to run a application

baseURL=http://localhost:3000/api/v1/

sales data import url
# API Request Information
1. url = baseurl/products/uploads,
    method =post 
    to upload file csv file. pass csv file in formdata as request key is file

2. revenue reports API
    url : baseURL/products/revenue
    method : post
    params :
    startDate=2024-05-18 required
    endDate=2024-05-18 required
    region=Asia (optional)
    productId=123(optional)
    category="electronics"(optional)

    response : {
    "status": true,
    "statusCode": 200,
    "message": "Sales Revenue Datas",
    "data": [
        {
            "_id": null,
            "totalRevenue": 2598
        }
    ]
}

# Refreshing snippets

present under services directory ,file named as cronservices.js

# Schema Designs

i writtened mongoose schema for below mentioned in model folder under products service module

# user Schema
firstName (String) [Required]
lastName (String)
password (String)
email (String) [Required]
isActive (Boolean) [Default: true]
countryCode (String)
phoneNumber (String)
address (String)
city (String)
region (String)
createdAt Date
updateAt Date

# products schema

name: String
category: String
quantity: Number
price: Number
discount: Number (Default: 0)
barcode: String
expiryDate: Date
isActive: Boolean (Default: false)
createdAt Date
updateAt Date

# Order Schema
userId: ObjectId (Reference to USER collection, Required)
quantity: Number
priceAtSale: Number
orderType: String (Enum: ['online', 'in_store'], Default: in_store)
status: String (Enum: ['pending', 'completed', 'cancelled'], Default: pending)
items:
productId: ObjectId (Reference to PRODUCTS collection, Required)Order Schema



