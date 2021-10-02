import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import HomeNavbar from "./HomeNavbar"

export default function SingUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = e => {
        setUsername(e.target.value);
    }
    const onChangeEmail = e => {
        setEmail(e.target.value);
    }
    const onChangePassword = e => {
        setPassword(e.target.value);
    }
    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            "username": username,
            "email": email,
            "password": password,
        }
        console.log(newUser);
        axios.post('http://localhost:5000/users/singup', newUser)
            .then(res => console.log(res.data));
        window.location = '/';
    }

    return (
        <div className="container">
            <HomeNavbar />
            <h1 style={{ padding: "3% 10%" }}>
                Sing Up!
            </h1>
            <Form onSubmit={onSubmit} className="container" style={{ padding: "1% 10%" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="txt" placeholder="Enter user name" value={username} onChange={onChangeUsername} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                </Form.Group>

                <Button variant="primary" type="submit" value="Create User">
                    Submit
                </Button>
            </Form>
        </div>
    )
}