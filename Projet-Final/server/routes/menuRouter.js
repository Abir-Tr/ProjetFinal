const express= require("express")
const route= express.Router()
const Menu= require("../models/menu")

// Ajouter un plat au menu
route.post("/addMenu", async(req,res)=>{
    try {
        const menuItem= new Menu({
  name: req.body.name,
  description:req.body.description,
  price: req.body.price,
  category:req.body.category  
        })
await menuItem.save();
        res.status(200).json({ menuItem})
    } catch (error) {
        res.status(400).json({error})
        
    }
})
// // Obtenir tous les plats du menu
//  route.get("/affichageMenu", async(req,res)=>{
//     try {
//         const  menuItems= await Menu.find()
//         res.status(200).json({ menuItems})
        
//     } catch (error) {
//         res.status(400).json({error})
        
//     }
//  })
module.exports = route