const express =require("express")
const route= express.Router()
const Reservation=require("../models/reservation")
const {Room}=require('../models/roomSchema')
const isAuth =require ('../middleware/isAuth')



route.post("/addReservation", async (req, res) => {
  try {
      const {checkIn, checkOut, status, roomId, userId} = req.body;
      
if(!mongoose.Type.objectId.isValid(roomId)){
  return res.status(400).json({message:"idde chambre invalide"})
}
      const room = await Room.findById(roomId);

      if (!room) {
          return res.status(404).json({ message: 'room not found' });
      }

      if (room.available == false) {
          return res.status(400).json({ message: 'room not available' });
      }
      room.available = false;
      await room.save();
     
      const reservation = new Reservation({
          
          checkIn: checkIn,
          checkOut: checkOut,
          status: status,
          roomId: roomId,
          userId: userId,
      });
console.log("abir")
      await reservation.save();
    
      
console.log("roomid is :" ,roomId)
      return res.status(200).json({ message: 'reservation done with success', reservation });

  } catch (error) {
      return res.status(500).json({ message: 'erreur serveur', error });
  }
});



// Créer une réservation
// route.post("/reserve", async(req,res)=>{

//     try {
//         const reservation= new Reservation({
//             customerName : req.body.customerName,
//             checkIn : req.body.checkIn, 
//             checkOut: req.body.checkOut, 
//             status : req.body.status, 
//              roomId: req.body.roomId,
//                 userId: req.body.userId, 


//         });
//  await reservation.save();
//  return  res.status(200).json({message:'reservation done with sucess',reservation})
        
//     } catch (error) {
//         return res.status(500).json({message:'erreur serveur', error})
//     }
// });

// Obtenir toutes les réservations
//  route.get("/all", async(req,res)=>{
//     try {
//         const reservations= await Reservation.find()
//         .populate('userId')   // pour récupérer les données du user
//         .populate('roomId');  // pour récupérer les données de la chambre
//         res.status(200).json({reservations})
//     } catch (error) {
//         res.status(400).json({error})
        
//     }
//  })


route.get('/userReservation', isAuth, async (req, res) => {
    try {
      const userId = req.user._id;
  
      const userReservation = await Reservation.find({ userId })
        .populate('roomId', 'type price description available image'); // pas besoin de mettre 'available' si pas dans ton modèle
  
      if (!userReservation.length) {
        return res.status(404).json({ msg: 'Aucune réservation trouvée pour cet utilisateur' });
      }
  
      res.status(200).json({ userReservation });
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations :', error.message);
      res.status(500).json({ error: error.message });
    }
  });
module.exports = route