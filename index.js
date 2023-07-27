const userRouter = require('./route/UserRoute.js')
const mongoose = require('mongoose');
const server = require('./schema/index.js')
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

// app.use(userRouter);

// app.listen(3000, () => {
//     console.log('listening on *:3000');
// });


