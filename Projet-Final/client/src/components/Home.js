import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { adding_user, log_out, authorized } from "../redux/actions";
import { FaHome, FaDoorOpen, FaPhoneAlt, FaUserCircle, FaSignOutAlt, FaTree, FaImages,FaSignInAlt } from "react-icons/fa";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
// Modal.setAppElement(document.getElementById('#root'));
const Home = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentNumCin, setCurrentNumCin] = useState(0);
  const [currentNumTel, setCurrentNumTel] = useState(0);
  const currentUser = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(authorized());
  }, [dispatch]);
  // const [showLogin,setShowLogin]=useState(false);
  // useEffect(()=>{
  //   if (currentUser&& currentUser.role ==='admin'){
  //     setShowLogin(true)

  //   } else{
  //     setShowLogin(false);
  //   }
  // },[currentUser])

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
   
  }

  function closeModal() {
    setIsOpen(false);
  }
  function adding(e) {
    e.preventDefault();

    const newUser = {
      userName: currentUserName,
      email: currentEmail,
      password: currentPassword,

      NumCin: currentNumCin,
      NumTel: currentNumTel,
    };

    dispatch(adding_user(newUser));
    closeModal();


    setCurrentUserName("");
    setCurrentEmail("");
    setCurrentPassword("");
    setCurrentNumCin(0);
 setCurrentNumTel(0);

  }

  function loggingOut() {
    dispatch(log_out());
  }

  return (
    <>
    
      {/* <Navbar> </Navbar> */}

      <nav className="custom-navbar">
        <div  className="flex items-center gap-3 text-2xl text-green-900 font-bold">

          <FaTree className="brand-logo"/>
          <span>Maison d'Hôte</span>
        </div>
        <div className="flex gap-6 text-lg text-gray-800 font-semibold">
          <Link to={`/`} className="flex items-center gap-2 hover:text-green-700">
            <FaHome /> Accueil
          </Link>
            {currentUser && (
              <span style={{ color: "white" }}>{currentUser.name}</span>
            )}
            <button onClick={openModal} className="flex items-center gap-2 hover:text-green-700"><FaUserCircle />Sign in</button>
            {currentUser ? (
              <button onClick={loggingOut}className="flex items-center gap-2 hover:text-green-700">
              <FaSignOutAlt />Logout</button>
            ) : (
              <button onClick={() => navigate(`/LoginUser`)}
              className="flex items-center gap-2 hover:text-green-700">
              <FaSignInAlt/>
              Login </button>
            )}
            {/* <Link to={`/Reservation`}>Reservation</Link> */}
            
            <Link to={`/ListRooms`} className="flex items-center gap-2 hover:text-green-700">
            <FaDoorOpen /> Chambres
          </Link>
            </div>
            </nav>
        
        
        {/* {currentUser &&(<span style={{color:"white"}} >{currentUser.name}</span>) } 
        {currentUser?(<button onClick={loggingOut}>log_out</button>): ( <button> Login</button>)} */}
    
    
      
      <Outlet />
    
      <div>
        <Modal
       
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={customStyles}
          // contentLabel="Sign In Modal"
           className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeIn"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-800">Sign In</h2>
          
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="name"
               className="p-2 border rounded-md"
              value={currentUserName}
              onChange={(e) => setCurrentUserName(e.target.value)}
            />{" "}
            <br />
            <input
              type="email"
              placeholder="email"
                className="p-2 border rounded-md"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
            />{" "}
            <br />
            <input
              type="number"
              placeholder="CIN"
               className="p-2 border rounded-md"
              value={currentNumCin}
              onChange={(e) => setCurrentNumCin(e.target.value)}
            />
            <br />
            <input
              type="number"
               className="p-2 border rounded-md"
              placeholder="PHONE"
              value={currentNumTel}
              onChange={(e) => setCurrentNumTel(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              className="p-2 border rounded-md"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <br />
            <div className="flex justify-between mt-4">
            <button   
            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md" 
            onClick={closeModal}>cancel</button>
            <button 
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
           onClick={adding}>S'inscrire</button>
           </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Home;
