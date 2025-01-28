import mongoose from 'mongoose';
const mongoURI = process.env.mongoURI

export const connectToMongo = async () => {
  
    try {
        // mongoose.set('strictQuery', false);
        await mongoose.connect(mongoURI, {
           
            socketTimeoutMS: 30000, // 30 seconds timeout for queries
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
        });
        
        console.log('Mongo connected')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}

