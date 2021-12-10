## MERN fullstack Shop 

### To install:
cd frontend

npm install

cd ..

npm install

In the root folder create a .env file 

in .env file write follow: 

NODE_ENV = development 

PORT = 5000 

MONGO_URI = mongodb://localhost/yourdbname 

JWT_SECRET = yourJWTSecret

PAYPAL_CLIENT_ID = YourPayPalClientId

### Seeders: 
to import data to database:

npm run data:import 

to delete data:

npm run data:destroy 

to run app in dev mode: 

npm run dev 


