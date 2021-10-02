import React, { useContext } from 'react';
import MessengerSidebar from './MessengerSidebar';
import Conversation from './Conversation';
import { MessengerContext } from './MessengerContext';

export default function Messenger() {
    const { recipients } = useContext(MessengerContext);
    return (
        <div className="d-flex" style={{ height: '100%' }}>
            <MessengerSidebar />
            {recipients && <Conversation />}
        </div>
    )
}