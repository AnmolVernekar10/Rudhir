const mongoose=require('mongoose');

const AdminSchema=({
    Name:String,
    BB_id:String,
    Contact:Number,
    emailid:String,
    password:String,
    cpassword:String
})
const UserSchema=({
    Name:String,
    DOB:String,
    Contact:Number,
    emailid:String,
    password:String,
    cpassword:String,
    gender:String
})

module.exports=mongoose.model('Admin',AdminSchema);
module.exports=mongoose.model('User',UserSchema);