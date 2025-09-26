const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.connect('MONGO_URI=mongodb+srv://himanshu01:Iammongodb%407@cluster0.jz9puwy.mongodb.net/CollegeERP?retryWrites=true&w=majority&appName=Cluster0')
        console.log('MongoDB Connected Successfully..')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB