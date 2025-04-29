// import { error } from "console";
import {
  ADDING_USER,
  ADDING_ROOM,
  AFFICH_ROOMS,
  AUTHORIZED,
  LOG_OUT,
  LOGGING_USER,
  RESERVING,
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

} from "./actionTypes";

const initialState = {
  users: [],
  token: localStorage.getItem("token"),
  reservation: null,
  loading:false,
  error:null,
  rooms: [], // Liste des chambres
  image: null,
  availableDates: [],
 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_USER:
      // localStorage.setItem("token", action.payload.token);
      return { ...state, users: action.payload.newUser };

case RESERVATION_REQUEST:
  return {...state,loading:true}; 
  case RESERVATION_SUCCESS:
    return{ loading:false, reservation:action.payload,error:null}

      
    // case RESERVING:
    //   return { ...state, reservation: [...state.reservation,action.payload]};
    case LOGGING_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        users: action.payload.user,
        token: action.payload.token,
      };
    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...state, users: null, token: null };

    case AFFICH_ROOMS:
      return { ...state, rooms: action.payload }; // Mettez à jour la liste des chambres

    case ADDING_ROOM:
      return { ...state, rooms: action.payload.newRoom };
      
    case AUTHORIZED:
      return { ...state, users: action.payload.user };

    case SET_IMAGE:
      return { ...state, image: action.payload };
      case AFFICH_USERS:
        return { ...state, users: action.payload };

        case GETTING_ONE_USER:
          return { ...state, users: action.payload };
          case DELETING_USER:
            return { ...state, users: action.payload };
            case DELETING_ROOM:
            return { ...state, rooms: action.payload };
            case UPDATING_ROOM:
              return { ...state, rooms: action.payload };

              case SET_AVAILABLE_DATES:
                return {
                  ...state,availableDates: action.payload,};
                  case GET_ALL_RESERVATIONS:
                    return{...state,reservations:action.payload}
    default:
      return state;
  }
};

export default reducer;
