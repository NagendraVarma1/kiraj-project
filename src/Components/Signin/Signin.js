import { Button, Form } from "react-bootstrap";
import classes from './Signin.module.css'
import { useRef } from "react";

const Signin = (props) => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const updatedEmail = enteredEmail.replace('@', '').replace('.','')
        //here we used firebase authentication for signing in

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtnbBSi_SpaEYzZ9zzuDoPRDGEiaFmLwQ', {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application-json'
            }
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            }
            else{
                return res.json().then((data) => {
                    throw new Error(data.error.message)
                })
            }
        })
        .then((data) => {

            console.log(data)

            if(enteredEmail === 'admin@admin.com'){
                props.onSignIn('admin')
            }
            else{
                localStorage.setItem('updatedEmail', updatedEmail)
                props.onSignIn('employee')
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    return (
        <div>
           <h3 className={classes.header}>Sign In</h3>
           <Form className={classes.form} onSubmit={formSubmitHandler}>
                <Form.Group className="m-3">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="email" ref={emailInputRef} required/>
                </Form.Group>
                <Form.Group className="m-3">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" ref={passwordInputRef} required/>
                </Form.Group>
                <Button className={classes.btn} type="submit">Sign In</Button>
           </Form>
        </div>
        
    )
}

export default Signin;