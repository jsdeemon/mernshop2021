import mongoose from 'mongoose'; 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
          //  useCreateIndex: true // not supported 
        })

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline );
    } catch (e) {
        console.log(`Connection error: ${e.message}`.red.underline.bold );
        process.exit(1);
    }
}

export default connectDB; 