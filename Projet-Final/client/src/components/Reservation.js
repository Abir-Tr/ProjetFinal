import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { affich_Rooms, getAllReservations, reserveChambre, reserving, setAvailableDates } from '../redux/actions';
import { useNavigate, useParams } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { authorized } from '../redux/actions';


const Reservation=()=>{

  // const dispatch = useDispatch();
  // const users = useSelector((state) => state.users); // récupère le user connecté

  // const [reservation, setReservation] = useState({
  //   customerName: users?.userName || "",
  //   chekIn: "",
  //   chekOut: "",
  //   roomId: "",
  //   status: "pending",
  //   userId: users?._id || "",
  // });

  // // met à jour dynamiquement les champs
  // const handleChange = (e) => {
  //   setReservation({ ...reservation, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newReservation = {
  //     ...formData,
  //     userId: users?._id, // Récupéré automatiquement
  //   };

  //   dispatch(reserving(newReservation));
  // };















    const dispatch= useDispatch()
    const currentUser=useSelector((state)=> state.users)
    console.log("Utilisateur connecté :", currentUser);
    const room = useSelector((state) => state.rooms);
    console.log("roomdispo :", room);
    const reservations = useSelector((state) => state.reservations);
    const [newCustomerName,setNewCustomerName]=useState("")
    const [newChekIn,setNewChekIn]=useState("")
    const [newChekOut,setNewChekOut]=useState("")
    const [status,setStatus]=useState("")
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState("");
    // const [totalPrice, setTotalPrice] = useState(0);
    const availableDates = useSelector((state)=> state.availableDates);

    const isDateAvailable = (date) => {
      return availableDates.some(
        (d) => d.toDateString() === date.toDateString()
      );
    };

    const getDisabledDatesForRoom = () => {
      if (!selectedRoom) return [];
  
      const roomReservations = reservations.filter(
        (r) => r.roomId._id === selectedRoom._id
      );
  
      let dates = [];
      roomReservations.forEach((res) => {
        let current = new Date(res.checkIn);
        const end = new Date(res.checkOut);
        while (current <= end) {
          dates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
      });
  
      return dates;
    };
useEffect(()=>{
  dispatch(affich_Rooms());
},[dispatch]);
    useEffect(()=>{
      dispatch(authorized());
  }, [dispatch]);

    useEffect(() => {
      dispatch(getAllReservations());
    }, [dispatch]);
    // useEffect(() => {
    //   if   (user && user.userName)  {
    //     setNewCustomerName(user.userName);
    //   }
    // }, [user]);

    useEffect(() => {
      // Exemple de données simulées : tu peux remplacer ça par un fetch vers ton backend
      const datesDispo = [
        '2025-04-20',
        '2025-04-21',
        '2025-04-22',
        '2025-04-25',
        '2025-04-26',
      ];
    
      // Convertir en objets Date
      const parsedDates = datesDispo.map(dateStr => new Date(dateStr));
      dispatch(setAvailableDates(parsedDates));
    }, [dispatch]);
  //   useEffect(() => {
  //     if (selectedRoom && newChekIn && newChekOut) {
  //         const numberOfNights = (newChekOut - newChekIn) / (1000 * 3600 * 24);
  //         setTotalPrice(selectedRoom.price * numberOfNights);
  //     }
  // }, [selectedRoom, newChekIn, newChekOut]);
  const {roomId}= useParams()
  // useEffect(() => {

  //     if (!selectedRoomId) {
    
  //       console.error("ID de la chambre manquant !");
    
  //       return;
    
  //     }
    
  //     console.log("Chambre ID:", selectedRoomId);
    
  //   }, [selectedRoomId]);
    function reserve (e){
      e.preventDefault()
      if (!currentUser || !currentUser._id) {
        alert("You must be logged in to make a reservation.");
        return;
      }

      // useEffect(() => {

      //   if (!selectedRoomId) {
      
      //     console.error("ID de la chambre manquant !");
      
      //     return;
      
      //   }
      
      //   console.log("Chambre ID:", selectedRoomId);
      
      // }, [selectedRoomId]);
      // // if (!selectedRoom) {
      // //   alert("Veuillez sélectionner une chambre.");
      // //   return;
      // }
        const reservationData={
          customerName: newCustomerName,
            checkIn:newChekIn,
            checkOut:newChekOut,
            status:status,
          roomId:roomId ,
          userId: currentUser._id 
        }
        console.log('newReservation envoyé :',reservationData);
        console.log('userenvoyé :',currentUser._id);
        dispatch(reserveChambre(reservationData))
        // navigate('/Facture');
        console.log("Room ID reçu :",room._id);
        console.log('aaaaa',reservationData)
      }
   
    return(<>

<div style={styles.container}>
      <h2 style={styles.title}>Faire une réservation</h2>
      <form onSubmit={reserve} style={styles.form}>
      <label style={styles.label}>Nom du client</label>
        <input
          type="text"
          name="customerName"
          value={newCustomerName}
          onChange={(e)=>setNewCustomerName(e.target.value)}
            style={styles.input}
        />
          <label style={styles.label}>Date d'arrivée</label>
        <input
          type="date"
          name="chekIn"
          value={newChekIn}
          onChange={(e)=>setNewChekIn(e.target.value)}
          style={styles.input}
        />
          <label style={styles.label}>Date de départ</label>
        <input
          type="date"
          name="chekOut"
          value={newChekOut}
          onChange={(e)=>setNewChekOut(e.target.value)}
          style={styles.input}
        />

{/* <label style={styles.label}>Choisir une chambre</label>
<select 
  value={selectedRoom} 
  onChange={(e) => setSelectedRoom(e.target.value)} 
  style={styles.input}
>
  <option value="">-- Sélectionner une chambre --</option>
  {room.map((room) => (
    <option key={room._id} value={room._id}>
      {room.name} - {room.type}
    </option>
  ))}
</select> */}



        {/* Sélecteur de chambre ici, par exemple */}
         <button type="submit"style={styles.button}>Réserver</button>
      </form>
    </div> 



{/* <Form>
      
        <Form.Group className="mb-3">
           <Form.Label >Cutomer Name</Form.Label> 
         <Form.Control  placeholder="Customer Name" value={newCustomerName} disabled onChange={(e)=>setNewCustomerName(e.target.value)} /> 
        </Form.Group>
        <Form.Group className="mb-3">
                    <Form.Label>Chambre</Form.Label>
                    <Form.Select
                        value={selectedRoom ? selectedRoom._id : ''}
                        onChange={(e) => setSelectedRoom(rooms.find((room) => room._id === e.target.value))}
                    >
                        <option value="">Sélectionnez une chambre</option>
                        {rooms.map((room) => (
                            <option key={room._id} value={room._id}>
                                {room.type} - {room.price} TND
                            </option>  ))}
                            </Form.Select>
                            </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Check-in</Form.Label>
          <DatePicker
    selected={newChekIn}
    onChange={(date) => setNewChekIn(date)}
    selectsStart
    startDate={newChekIn}
    endDate={newChekOut}
    minDate={new Date()}
    excludeDates={getDisabledDatesForRoom()}
    placeholderText="Sélectionnez une date d'arrivée"
    className="form-control"
   />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label >Check-out</Form.Label>
          <DatePicker
    selected={newChekOut}
    onChange={(date) => setNewChekOut(date)}
    selectsEnd
    startDate={newChekIn}
    endDate={newChekOut}
    minDate={newChekIn || new Date()}
    excludeDates={getDisabledDatesForRoom()}
    placeholderText="Sélectionnez une date de départ"
    className="form-control" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label >statue</Form.Label>
          <Form.Control  placeholder="Disabled input" value={statue} onChange={(e)=>setStatue(e.target.value)} />
        </Form.Group>
        
     
        <Button onClick={reserve}type="submit">Submit</Button>
        
    </Form>    */}
    
    </>

    )
}
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}

export default Reservation