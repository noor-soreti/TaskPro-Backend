const mongoose = require('mongoose');
require('dotenv').config();


mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});
