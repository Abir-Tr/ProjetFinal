import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { authorized, logging_user } from "../redux/actions";
import { useNavigate } from "react-router";
// import { Link } from "react-router";

const LoginUser = () => {
  const currentUser = useSelector((state) => state.users);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
const navigate= useNavigate();
  useEffect(() => {
    dispatch(authorized());
  }, [dispatch]);
  console.log((currentUser))

  function login(e) {
    e.preventDefault();
    const user = {
      email: newEmail,
      password: newPassword,
    };

    dispatch(logging_user(user));
    navigate(`/ListRooms`)
      window.location.reload()
  }
  // function loggingOut (){
  //   dispatch(log_out())
  //  }

  return (
    <>
     <div className="login-container">
     <h2 className="login-title">Connexion à votre espace</h2>
      <Form className="login-form" onSubmit={login}>
      <div className="login-group">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
             className="login-input"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          </div>

          <div className="login-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
             className="login-input"
          />
        </div>
        <div className="login-actions">
         
      
        {/* {currentUser?(  <Button onClick={loggingOut} > logout </Button>): */}
        <Button onClick={login}  type="submit" className="login-button">
          Submit
        </Button>
        </div>
        {/* <div className="login-footer">
      <p>
        Pas encore de compte ? <Link to={`/`} className="login-link">Créer un compte</Link>
      </p>
    </div> */}
      </Form>
      </div>
      {/* <h3>Forget Paswword</h3>
    <Link to ={`/`}>Create New Account</Link> */}
    </>
  );
};
export default LoginUser;
