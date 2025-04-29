const express = require("express")
const roomRouter =express.Router()
 const {Room} = require('../models/roomSchema')

 const multer = require('multer')
const fs = require('fs')
const path = require("path");


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


roomRouter.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`/uploads/${req.file.filename}`)
});


// Ajouter une chambre (réservée à l'admin)
roomRouter.post("/addRoom" ,upload.single("image"), async(req,res)=>{
 try {
    const newRoom = new Room ({
      type:req.body.type,
       price:req.body.price, 
        description : req.body.description,
      available :req.body.available, 
      // image:req.file?`/uploads/${req.file.filename}`:null
      image: req.body.image
    })

     await newRoom.save();
     console.log("after save",newRoom)
    res.status(200).json({newRoom})
    
 } catch (error) {
    res.status(400).json({error})
 }
  })

//Obtenir toutes les chambres

roomRouter.get("/afficherRooms", async(req,res) => {
try {
  const allRooms=  await Room.find();
       res.status(200).json({allRooms})
   } 
  catch (error) {
    res.status(400).json({error})
}
});


roomRouter.get("/images/:roomId", async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({error:"room not found"});
    }

    if (!room.image) {
      return res.status(404).json({error:"room does not have an image"});
    }

    const filePath = path.join(__dirname,"..",room.image);

    console.log("Resolved File Path:", filePath);
    console.log("File Exists:", fs.existsSync(filePath));

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({error:"Image not found"});
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});



roomRouter.get("/getOneRoom/:id", async (req, res) => {
  try {
    const theRoom = await Room.findById(req.params.id);
    res.status(200).json({ theRoom });
  } catch (error) {
    res.status(400).json({ error });
  }
});


roomRouter.delete("/deleteRoom/:id", async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ deletedRoom });
  } catch (error) {
    res.status(400).json({ error });
  }
});



roomRouter.put('/updateRoom/:id', upload.single('image'), async (req, res) => {
  try {
    // Prepare fields for the update
    const theNewUpdate = {
      type: req.body.type,
      price: req.body.price,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image, 
      available :req.body.available, 
    };

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, theNewUpdate, { new: true });

    if (!updatedRoom) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    res.status(200).json({ updatedRoom });
  } catch (error) {
    res.status(400).json({ error });
  }
});

  module.exports= roomRouter; 