import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import {  authorized, deleting_room, reserving, updating_room, uploadImage } from "../redux/actions";
import { useNavigate} from "react-router-dom";




const OneRoom = ({ _id,price ,type, description ,image,available }) => {
  const [newAvailable, setNewAvailable ]=useState(available)
const dispatch=useDispatch()
const navigate= useNavigate()
console.log(image)


const[newType, setNewType]= useState(type)
const[newprice, setNewPrice]= useState(price)
const[newDescription, setNewDescription]= useState(description)

const currentUser = useSelector(state=>state.users)
 const [showLogin, setShowLogin]= useState(false)

 useEffect(()=>{
     dispatch(authorized());
 }, [dispatch]);


useEffect(() => {
  if (currentUser && currentUser.role === 'admin') {
    setShowLogin(true);
  } else {
    setShowLogin(false);
  }
}, [currentUser]);

const deletingRoom = ()=>{
  dispatch(deleting_room(_id))
  navigate(`/ListRooms`)
  window.location.reload()
}

const reduxImage = useSelector(state=>state.image)
    const uploadingImage = (e) => {
       const file = e.target.files[0];
       const formData = new FormData();
       formData.append("image", file);
       dispatch(uploadImage(formData));
     };
    

const updatingRoom = (e)=>{
  e.preventDefault()
const theNewRoom= {
  type:newType,
  price:newprice,
  description:newDescription,
  image: reduxImage,
  available: newAvailable,
}
  dispatch(updating_room(_id, theNewRoom ))
  window.location.reload()
}
const reservingRoom = () => {
  
 
  navigate(`/reservation/${_id}`)
};

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="room-type">{type}</Card.Title>
          <img src={image} alt="the RoomTof"className="room-image"/>
          <h4 className="room-price">price: {price} dt</h4>
          <p className="room-description">description:{description}</p>
          <h3>{available === true ? <span>Room Available</span> : <span>Room Reserved</span>}
</h3>
<button onClick={reservingRoom} className="btn-reserve"> Réserver cette chambre</button>
          {/* <button onClick={reservation} className="reserve-button">
                 Réserver
               </button> */}
          {showLogin&& <div className="admin-actions">
            
                  <button onClick={deletingRoom}>delete room</button>
                  <section className="update-form">
  <h5>updating room</h5>
  <label>type</label>
      <input type="text" value={newType} onChange={(e)=> setNewType(e.target.value)}/><br></br>
      <label>price</label>
      <input type="number" value={newprice} onChange={(e)=> setNewPrice(e.target.value)}/> <spam>dt</spam><br></br>
      <label> description</label>
      <input type="text" value={newDescription} onChange={(e)=> setNewDescription(e.target.value)}/>
      <input type="file" onChange={uploadingImage}/>
      <br></br><label>available</label>
      <input type="checkbox" value={newAvailable} onChange={(e)=> setNewAvailable(e.target.value)}/><br></br>
      <button onClick={updatingRoom} className="btn-update">update room</button>

    
</section>
                </div>
                }

        </Card.Body>
      </Card>
    </>
  );
};

export default OneRoom;