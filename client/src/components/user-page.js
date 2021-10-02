// import React, { useEffect, useState } from 'react';
// import { Button, Nav, Col, Tab, Row, ListGroup } from 'react-bootstrap';
// import axios from 'axios';
// import UserNavbar from "./UserNavbar"
// import io from "socket.io-client";


// export default function UsersPage() {
//     const [friends, setFriends] = useState([]);
//     let socket;

//     useEffect(() => {
//         // socket = io("localhost:3002/");
//         const id = JSON.parse(sessionStorage.getItem('ID'));
//         if (id) {
//             let Data;
//             const set_data = async () => {
//                 await axios.get('http://localhost:5000/users/getuserbyid', {
//                     params: {
//                         "_id": id,
//                     }
//                 }).then(res => {
//                     Data = res.data[0].friends;
//                 });
//                 let i;
//                 // Data.array.forEach((element) => {
//                 //     await axios.get('http://localhost:5000/users/getuserbyid', {
//                 //         params: {
//                 //             "_id": element.id,
//                 //         }
//                 //     }).then(res => {
//                 //         const name = res.data[0].username;
//                 //         setFriends(oldArray => [...oldArray, name]);
//                 //     });
//                 // });
//                 for (i = 0; i < Data.length; i++) {
//                     await axios.get('http://localhost:5000/users/getuserbyid', {
//                         params: {
//                             "_id": Data[i].id,
//                         }
//                     }).then(res => {
//                         const name = res.data[0].username;
//                         setFriends(oldArray => [...oldArray, name]);
//                     });
//                 }
//             }
//             set_data();
//         } else {
//             window.location = "/";
//         }
//     }, []);


//     // let socket;
//     // const CONNECTION_PORT = "localhost:3002/";

//     // Before Login
//     //   const [loggedIn, setLoggedIn] = useState(false);
//     //   const [room, setRoom] = useState("");
//     //   const [userName, setUserName] = useState("");

//     // After Login
//     //   const [message, setMessage] = useState("");
//     //   const [messageList, setMessageList] = useState([]);

//     //   useEffect(() => {
//     //     socket = io(CONNECTION_PORT);
//     //   }, [CONNECTION_PORT]);

//     //   useEffect(() => {
//     //     socket.on("receive_message", (data) => {
//     //       setMessageList([...messageList, data]);
//     //     });
//     //   });
//     const connectToRoom = (e) => {
//         console.log(e.target.name);
//         // setLoggedIn(true);
//         // socket.emit("join_room", e.target.name);
//     };

//     return (
//         <div className= "container">
//             <UserNavbar />
//             <div style={{ width: '250px' }} className="d-flex flex-column">
//                 <ListGroup variant="flush">
//                     {friends.map((user, index) => {
//                         return (<>
//                             <ListGroup.Item
//                                 key={index}
//                                 action
//                                 onClick=""
//                                 active="">
//                                 {user}
//                             </ListGroup.Item>
//                         </>)
//                     })}
//                 </ListGroup>
//             </div>
//         </div>



//         // <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//         //     <UserNavbar />
//         //     <h1>Friends</h1>
//         //     <Row>
//         //         {friends.map((user, index) => {
//         //             return (<>
//         //                 <Col sm={3}>
//         //                     <Nav variant="pills" className="flex-column">
//         //                         <Nav.Item>
//         //                             <Nav.Link eventKey={index}>{user}</Nav.Link>
//         //                         </Nav.Item>
//         //                     </Nav>
//         //                 </Col>
//         //                 <Col sm={9}>
//         //                     <Tab.Content>
//         //                         <Tab.Pane eventKey={index}>
//         //                             <h1>aaaaaaa {index}   {user}</h1>
//         //                         </Tab.Pane>
//         //                     </Tab.Content>
//         //                 </Col>
//         //             </>)
//         //         })}

//         //     </Row>
//         // </Tab.Container>
//     )
// }