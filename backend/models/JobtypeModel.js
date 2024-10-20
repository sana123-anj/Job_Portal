const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
const Jobtypeschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model, if not, you can remove this
        required: true, // Adjust based on your requirements
    },
    JobTypeName: {
        type: String,
        required: true, // This should match exactly with your validation
    },
}, { timestamps: true }); // Optional: to add createdAt and updatedAt fields


const Jobtype=mongoose.model('Jobtype',Jobtypeschema);
module.exports=Jobtype;