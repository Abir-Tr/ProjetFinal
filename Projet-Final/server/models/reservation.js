const mongoose = require ("mongoose")

const reservationSchema = new mongoose.Schema({
    customerName : {type:String,required:true},
    checkIn :{type: String , required:true}, 
    checkOut: {type: String , required :true}, 
    status : { type: String , required: true} ,  // 'pending', 'confirmed', 'cancelled'
    roomId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Room' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const Reservation =  mongoose.model("Reservation",reservationSchema);
module.exports =Reservation; 