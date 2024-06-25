import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import classes from "../Signin/Signin.module.css";

const Admin = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const dobInputRef = useRef();
  const maritalInputRef = useRef();
  const genderInputRef = useRef();
  const mobileInputRef = useRef();
  const cityInputref = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const name = nameInputRef.current.value;
    const birthDate = dobInputRef.current.value;
    const maritalStatus = maritalInputRef.current.value;
    const gender = genderInputRef.current.value;
    const mobile = mobileInputRef.current.value;
    const city = cityInputref.current.value;

    const updatedEmail = enteredEmail.replace('@', '').replace('.','')
    localStorage.setItem('updatedEmail', updatedEmail)

    //here we used firebase authentication for signing in

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtnbBSi_SpaEYzZ9zzuDoPRDGEiaFmLwQ",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application-json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
        alert("Employee Added!");
        passwordInputRef.current.value = "";
      })
      .catch((err) => {
        alert(err.message);
      });

    fetch(
      `https://kiraj-project-default-rtdb.firebaseio.com/${updatedEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          mail: enteredEmail,
          dob: birthDate,
          maritalStatus: maritalStatus,
          gender: gender,
          mobile: mobile,
          city: city,
        }),
        headers: {
          "Content-Type": "application.json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(() => {
            throw new Error("data.error.message");
          });
        }
      })
      .then((data) => {
        console.log(data);
        emailInputRef.current.value = "";
        nameInputRef.current.value = "";
        dobInputRef.current.value = "";
        maritalInputRef.current.value = "";
        genderInputRef.current.value = "";
        mobileInputRef.current.value = "";
        cityInputref.current.value = "";
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <h3 className={classes.header}>Admin Page</h3>
      <Form className={classes.form} onSubmit={formSubmitHandler}>
        <Form.Group className="m-3">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" ref={emailInputRef} required />
        </Form.Group>
        <Form.Group className="m-3">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" ref={passwordInputRef} required />
        </Form.Group>
        <Row>
          <Col lg={6}>
            <Form.Group className="m-3">
              <Form.Label>Full Name: </Form.Label>
              <Form.Control type="text" ref={nameInputRef} required />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="m-3">
              <Form.Label>Date of Birth: </Form.Label>
              <Form.Control type="date" ref={dobInputRef} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="m-3">
              <Form.Label>Martial Status: </Form.Label>
              <Form.Control type="text" ref={maritalInputRef} required />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="m-3">
              <Form.Label>Gender: </Form.Label>
              <Form.Select ref={genderInputRef}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Trans">Male</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="m-3">
              <Form.Label>Mobile Number: </Form.Label>
              <Form.Control type="tel" ref={mobileInputRef} required />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="m-3">
              <Form.Label>City: </Form.Label>
              <Form.Control type="text" ref={cityInputref} required />
            </Form.Group>
          </Col>
        </Row>
        <Button className={classes.btn} type="submit">
          Add Employee
        </Button>
      </Form>
    </div>
  );
};

export default Admin;
