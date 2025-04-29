import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { authorized, logging_user } from "../redux/actions";
// import { Link } from "react-router";

const LoginUser = () => {
  const currentUser = useSelector((state) => state.users);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authorized());
  }, [dispatch]);
  // console.log((currentUser))

  function login(e) {
    e.preventDefault();
    const user = {
      email: newEmail,
      password: newPassword,
    };

    dispatch(logging_user(user));
  }
  // function loggingOut (){
  //   dispatch(log_out())
  //  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        {/* {currentUser?(  <Button onClick={loggingOut} > logout </Button>): */}
        <Button onClick={login} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {/* <h3>Forget Paswword</h3>
    <Link to ={`/`}>Create New Account</Link> */}
    </>
  );
};
export default LoginUser;
