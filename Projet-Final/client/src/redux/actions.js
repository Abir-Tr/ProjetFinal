import axios from "axios";
import {
  ADDING_USER,
  ADDING_ROOM,
  AFFICH_ROOMS,
  AUTHORIZED,
  LOG_OUT,
  LOGGING_USER,
  // RESERVING,
  SET_IMAGE,
  UPDATING_ROOM,
  DELETING_ROOM,
  DELETING_USER,
  GETTING_ONE_USER,
  AFFICH_USERS,
  SET_AVAILABLE_DATES,
  GET_ALL_RESERVATIONS,
  RESERVATION_REQUEST,
  RESERVATION_SUCCESS,
  RESERVATION_FAIL
} from "./actionTypes";

export const adding_user = (newUser) => async (dispatch) => {
  try {
    const res = await axios.post(`/users/addUser`, newUser);

    dispatch({ type: ADDING_USER, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};


export const reserveChambre=(reservationData)=>async(dispatch)=>{
  try{
    dispatch({type:RESERVATION_REQUEST})
    
    const res=await fetch(`/reservation/addReservation`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(reservationData),
    });
    const data=await res.json()
    dispatch({type:RESERVATION_SUCCESS,payload:data})
  } catch(error){
    dispatch({type:RESERVATION_FAIL,payload:error.message})
  }
}



// export const reserving = (id,newReservation) => async (dispatch) => {
//   try {
//     const res = await axios.post(`/reservation/addReservation${id}`, newReservation);
//     console.log("abir")
//     console.log("Réservation réussie :", res.data);
//     dispatch({ type: RESERVING, payload: res.data.reservation });
//   } catch (error) {
//     console.error(error);
//   }
// };




export const logging_user = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`/users/login`, user);
    dispatch({ type: LOGGING_USER, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};



export const log_out = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};



export const affich_Rooms = () => async (dispatch) => {
  try {
    const res = await axios.get(`/rooms/afficherRooms`);
    dispatch({ type: AFFICH_ROOMS, payload: res.data.allRooms });
    console.log("abir")
  } catch (error) {
    console.error(error);
  }
};

export const adding_room = (newRoom) => async (dispatch) => {
  try {
    const res = await axios.post(`/rooms/addRoom`, newRoom);
    dispatch({ type: ADDING_ROOM, payload: res.data });
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};

export const authorized = () => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: localStorage.getItem("token")},
    };

    const res = await axios.get(`/users/isAuth`, config);
    dispatch({ type: AUTHORIZED, payload: res.data });
  } catch (error) {}
};




export const uploadImage = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("rooms/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({ type: SET_IMAGE, payload: res.data });
  } catch (error) {
    console.error("error in uploading image", error);
  }
};

export const affich_users = () => async (dispatch) => {
  try {
    const res = await axios.get(`/users/afficherUser`);
    dispatch({ type: AFFICH_USERS, payload: res.data.allUsers });
  } catch (error) {
    console.error(error);
  }
};

export const getting_one_user = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/users/getOneUser/${id}`);
    dispatch({ type: GETTING_ONE_USER, payload: res.data.oneUser });
  } catch (error) {
    console.error(error);
  }
};

export const deleting_user = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/users/deleteOneUser/${id}`);
    dispatch({ type: DELETING_USER, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};



export const deleting_room =(id)=>async(dispatch)=> {
  try {
      const res = await axios.delete(`/rooms/deleteRoom/${id}`) 
      dispatch({type: DELETING_ROOM, payload: res.data})
  } catch (error) {
      console.error(error);
  }
}


export const updating_room =(id, theNewRoom)=>async(dispatch)=> {

  try {
      const res = await axios.put(`/rooms/updateRoom/${id}`, theNewRoom)
      dispatch({type: UPDATING_ROOM, payload : res.data.theNewRoom})
  } catch (error) {
      console.error(error);
  }
}

export const setAvailableDates = (dates) => ({
  type: SET_AVAILABLE_DATES,
  payload: dates,
});

export const getAllReservations=()=>async(dispatch)=>{
  try {
    const res = await axios.get(`/reservation/userReservation`);
    dispatch({ type: GET_ALL_RESERVATIONS, payload: res.data });
  } catch (error) {
    console.error("Erreur lors du chargement des réservations", error);
  }

}