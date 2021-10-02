import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';


export default function UsersList() {
    const [filterdata, setFilterdata] = useState([]);
    const user_id = JSON.parse(sessionStorage.getItem('ID'));

    useEffect(() => {
        const id = JSON.parse(sessionStorage.getItem('ID'));
        axios.get('http://localhost:5000/users')
            .then(res => {
                const Data = res.data;
                setFilterdata(Data.filter(user => user._id !== id && !JSON.stringify(user.friends).includes(id)));
            });
    }, []);

    const onClick = (e) => {
        e.preventDefault();
        const newConnection = {
            id1: user_id,
            id2: e.target.value,
        }
        axios.post('http://localhost:5000/users/addFriend', newConnection)
            .then(res => console.log(res.data));
        window.location = `/user`;
    }

    return (

        <div className="container">
            <div style={{ padding: "5% 20%" }}>
                <h1>Users:</h1>
                <ul>
                    {filterdata.map(user => (<div style={{ display: 'block', padding: '0.5% 5%' }} key={user._id}>
                        <div><h2>{user.username}
                            {<Button style={{ marginLeft: 10 }} onClick={onClick} value={user._id} variant="primary" size="sm" >addFriend</Button>}
                        </h2></div>
                    </div>))}
                </ul>
            </div>
        </div>
    )
}