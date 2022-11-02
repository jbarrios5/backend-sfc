const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://jbarrios:4PSs7ZV1ky20ppFl@cluster0.o3fsep3.mongodb.net/'

const dbConnection = async() => {

    try {

        await mongoose.connect( MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}



module.exports = {
    dbConnection
}
