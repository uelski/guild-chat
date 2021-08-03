import React, {useEffect, useState} from 'react';
import firebase from '../../config/firebase-config';
import { useParams, useLocation } from 'react-router-dom';

interface ParamTypes {
    id: string
}

const Chat = () => {
    const { id } = useParams<ParamTypes>();
    const [users, updateUsers] = useState({});
    const [setReciever, updateReciever] = useState(null);
    const [showChat, setChat] = useState(false);
    
    useEffect(()=> {
        firebase.database().ref('users').on('value', (data) => {
            const userData = data.val();
            updateUsers(userData);
        })
    }, [])

    const handleReciever = (name: string) => {
        
    }
    const userData = [];

    for (let key in users) {
        if (key !== id) {
            userData.push({
                name: key
            })
        }
    }

    return (
        <div>
            <div>Chat</div>
            <div className="chat-area">
                {
                    userData.map(user => {
                        return <button onClick={() => handleReciever(user.name)} key={user.name}>{user.name}</button>
                    })
                }
            </div>
        </div>
    )
}

export default Chat;