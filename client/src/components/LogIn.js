
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import HomeNavbar from "./HomeNavbar"
// import useLocalStorage from './useLocalStorage';
import { useSessionStorage } from './useSessionStorage';

export default function HomePage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [id, setID] = useLocalStorage("ID", "");
    const [id, setID] = useSessionStorage("ID", "");
    const [name, setName] = useSessionStorage("NAME", "");

    const onChangeEmail = e => {
        setEmail(e.target.value);
    }
    const onChangePassword = e => {
        setPassword(e.target.value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let id = null;
        try {
            const res = await axios.get('http://localhost:5000/users/getuser', {
                params: {
                    "email": email,
                    "password": password,
                }
            });
            id = res.data[0]._id;
            const username = res.data[0].username;
            if (id != null) {
                setID(id);
                setName(username);
                console.log(id,name);
                window.location = `/user`;
            }
        } catch (error) {
            alert(`wrong details!`);
        }
    }
    return (
        id ? (window.location = `/user`) :
            (<div className="container">
                <HomeNavbar />
                <h1 style={{ padding: "3% 10%" }}>
                    Log In!
                </h1>
                <div>
                    <Form onSubmit={onSubmit} className="container" style={{ padding: "1% 10%" }}>
                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} required />
                        </Form.Group>

                        <Button variant="primary" type="submit" value="Create User">
                            Log In
                        </Button>
                    </Form>
                </div>
            </div>
            )
    )
}