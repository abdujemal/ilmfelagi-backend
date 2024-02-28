const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://abdu1994jemal:11Tah1994@ilmfelagi.56u9rki.mongodb.net/ilmfelagiDB?retryWrites=true&w=majority&appName=ilmfelagi'

const connectToMongo = async () => {
  
try {
    mongoose.set('strictQuery', false);
    mongoose.connect(mongoURI);
    
   

    console.log('Mongo connected')
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;