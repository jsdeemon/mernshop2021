import mongoose from 'mongoose'; 
import dotenv from 'dotenv'; 
import color from 'colors';
import users from './data/users.js'; 
import products from './data/products.js'; 
// models
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
// connection
import connectDB from './config/db.js'; 

dotenv.config()

connectDB() 

const importData = async () => {
    try {
        // clear all data
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()

       // import users
       const createUsers = await User.insertMany(users)

       const adminUser = createUsers[0]._id

       // add adminUser to each product 
       const sampleProducts = products.map(product => {
           return {...product, user: adminUser}
       })

       // inseryting products 
       await Product.insertMany(sampleProducts)

       console.log('Data imported!'.green.inverse)
       process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}



const destroyData = async () => {
    try {
        // clear all data
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()

       console.log('Data destroyed!'.red.inverse)
       process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}


// checking, if there is additional commands like -d 
if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}




