import React, { useState } from 'react';
import { Nav, Tab, TabContainer } from 'react-bootstrap'
import UsersList from './users-list';
import Messenger from './Messenger';
import Posts from './Posts';

export default function UserNavbar() {
    const [activeKey, setActiveKey] = useState("home");

    return (
        // <Navbar bg="light" variant="light">
        //     <Container>
        //         <Navbar.Brand href="/user">SocialNet</Navbar.Brand>
        //         <Nav className="me-auto">
        //             <Nav.Link href="/users">Users</Nav.Link>
        //         </Nav>
        //         <Nav className="justify-content-end">
        //             <Nav.Link href="/" onClick={() => sessionStorage.clear()}>Logout</Nav.Link>
        //         </Nav>
        //     </Container>
        // </Navbar>
        <div className="container">
            <TabContainer activeKey={activeKey} onSelect={setActiveKey}>
                <Nav justify variant="tabs" defaultActiveKey="/user">
                    <Nav.Item>
                        <Nav.Link eventKey="home">SocialNet</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="messenger">Messenger</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="users">Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/" onClick={() => sessionStorage.clear()}>
                            Logout
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey="messenger">
                        <div className="d-flex" style={{ height: '90vh' }}>
                            <Messenger />
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="users">
                        <UsersList />
                    </Tab.Pane>
                    <Tab.Pane eventKey="home">
                        <Posts />
                    </Tab.Pane>
                </Tab.Content>
            </TabContainer>
        </div>
    );

}