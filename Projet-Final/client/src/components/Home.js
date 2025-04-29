import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { adding_user, log_out, authorized } from "../redux/actions";
import { FaHome, FaDoorOpen, FaPhoneAlt, FaUserCircle, FaSignOutAlt, FaTree, FaImages,FaSignInAlt } from "react-icons/fa";
import BackgroundSlider from "./BackgroundSlider";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
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
  const [showLogin,setShowLogin]=useState(false);
  useEffect(()=>{
    if (currentUser&& currentUser.role ==='admin'){
      setShowLogin(true)

    } else{
      setShowLogin(false);
    }
  },[currentUser])

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
    if (showLogin==false){
      navigate(`/ListRooms`)
    
    }
      window.location.reload()
   


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
    
      <nav className="custom-navbar" >
      <div className="container-navbar">
      <div  lassName="navbar-left">

          <FaTree className="brand-logo"/>
          <span className="site-title">Maison d'Hôte</span>
      </div>
        <div className="navbar-center nav-links">
          <Link to={`/`}><FaHome /> Accueil
          </Link>
          <Link to={`/ListRooms`} className="flex items-center gap-2 hover:text-green-700">
            <FaDoorOpen /> Chambres
          </Link>
          </div>
          <div className="navbar-right auth-buttons">
            {currentUser && (
              <span className="username">{currentUser.name}</span>
            )}
            <button onClick={openModal} className="custom-btn"><FaUserCircle />Sign in</button>
            {currentUser ? (
              <button onClick={loggingOut}className="custom-btn">
              <FaSignOutAlt />Logout</button>
            ) : (
              <button onClick={() => navigate(`/LoginUser`)}
              className="custom-btn">
              <FaSignInAlt/>
              Login </button>
            )}
            {/* <Link to={`/Reservation`}>Reservation</Link> */}
            </div>
            
            
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
           className="signin-modal"
    overlayClassName="signin-overlay">
           
          <h2 className="signin-title">Sign In</h2>
          
          <form className="signin-form">
            <label>Name</label>
            <input
              type="text"
              placeholder="name"
             className="signin-input"
              value={currentUserName}
              onChange={(e) => setCurrentUserName(e.target.value)}
            />{" "}
            {/* <br /> */}
            <label>Email</label>
            <input
              type="email"
              placeholder="email"
                  className="signin-input"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
            />{" "}
            {/* <br /> */}
            <label>CIN</label>
            <input
              type="number"
              placeholder="CIN"
               className="signin-input"
              value={currentNumCin}
              onChange={(e) => setCurrentNumCin(e.target.value)}
            />
            {/* <br /> */}
            <label>Phone</label>
            <input
              type="number"
               className="signin-input"
              placeholder="PHONE"
              value={currentNumTel}
              onChange={(e) => setCurrentNumTel(e.target.value)}
            />
            {/* <br /> */}
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
               className="signin-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {/* <br /> */}
            <div className="signin-buttons">
            <button   
           className="signin-cancel"
            onClick={closeModal}>cancel</button>
            <button 
            className="signin-submit"
           onClick={adding}>S'inscrire</button>
           </div>
          </form>
        </Modal>
      </div>
      <BackgroundSlider/>
    </>
  );
};

export default Home;
