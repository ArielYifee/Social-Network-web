import React, { useEffect, useState, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { MessengerContext } from './MessengerContext';

export default function MessengerSidebar() {
    const [friends, setFriends] = useState([]);
    const { setRecipients } = useContext(MessengerContext);
    
    useEffect(() => {
        const id = JSON.parse(sessionStorage.getItem('ID'));
        if (id) {
            let Data;
            const set_data = async () => {
                await axios.get('http://localhost:5000/users/getuserbyid', {
                    params: {
                        "_id": id,
                    }
                }).then(res => {
                    Data = res.data[0].friends;
                });
                let i;
                for (i = 0; i < Data.length; i++) {
                    await axios.get('http://localhost:5000/users/getuserbyid', {
                        params: {
                            "_id": Data[i].id,
                        }
                    }).then(res => {
                        const name = res.data[0].username;
                        const userid = res.data[0]._id;
                        setFriends(oldArray => [...oldArray, {name, userid}]);
                    });
                }
            }
            set_data();
        } else {
            window.location = "/";
        }
    }, []);

    return (
        <div className="container" >
            <div style={{ width: '250px' }} className="d-flex flex-column">
                <ListGroup variant="flush">
                    {friends.map((user, index) => {
                        return (<div key={index}>
                            <ListGroup.Item
                                key={index}
                                action
                                onClick={() => setRecipients(user.userid)}
                                active="">
                                {user.name}
                            </ListGroup.Item>
                        </div>)
                    })}
                </ListGroup>
            </div>
        </div>
    )
}
