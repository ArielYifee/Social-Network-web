import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { MessengerContext } from './MessengerContext';
import io from "socket.io-client";

export default function Conversations() {
  const [text, setText] = useState([]);
  const [id] = useState(JSON.parse(sessionStorage.getItem('ID')));
  const [name] = useState(JSON.parse(sessionStorage.getItem('NAME')));
  const { recipients } = useContext(MessengerContext);
  const [socket, setSocket] = useState();
  const [conversation, setConversation] = useState([]);

  const addMessageToConversation = useCallback((data) => {
    if (data.sender === recipients || data.sender === id) {
      const newMessage = { sender: data.sender, name: data.name, text: data.text };
      setConversation(conversation => [...conversation, newMessage]);
    }
  }, [recipients, id]);

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on('previous-messages', messages => {
      if (messages.length) {
        messages.forEach(message => {
          addMessageToConversation(message);
        });
      }
    });
    return () => socket.off('previous-messages');
  }, [socket, addMessageToConversation]);

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit('send-message', { recipients, text });
    const data = { sender: id, name: name, text: text };
    addMessageToConversation(data);
    setText("");
  }

  useEffect(() => {
    if (socket == null) return;
    socket.on('receive-message', addMessageToConversation);
    return () => socket.off('receive-message');
  }, [socket, addMessageToConversation]);

  useEffect(() => {
    const newSocket = io(
      'http://localhost:3002',
      { query: { id, name, recipients } }
    );
    setSocket(newSocket);
    return () => newSocket.close();
  }, [id, name, recipients]);

  useEffect(() => {
    setConversation([]);
  }, [recipients]);

  return (
    <div className="d-flex flex-column flex-grow-1" >
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {conversation.map((message, index) => {
            const lastMessage = conversation.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.sender === id ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                <div
                  className={`rounded px-2 py-1 ${message.sender === id ? 'bg-primary text-white' : 'border'}`}>
                  {message.text}
                </div>
                <div className={`text-muted small ${message.sender === id ? 'text-right' : ''}`}>
                  {message.sender === id ? 'You' : message.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', width: '500px', resize: 'none' }}
            />
            <InputGroup.Append className="m-1">
              <Button type="submit" >Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
