import mongoose from 'mongoose';
import 'dotenv/config'

export const connectToMongo = async () => {
    const mongoURI = process.env.mongoURI
  
    try {
        // mongoose.set('strictQuery', false);
        await mongoose.connect(mongoURI, {
           
            socketTimeoutMS: 40000, // 30 seconds timeout for queries
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
        });
        
        console.log('Mongo connected')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}

