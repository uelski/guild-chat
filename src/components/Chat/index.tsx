import React, {useEffect, useState} from 'react';
import firebase from '../../config/firebase-config';
import { useParams, useLocation } from 'react-router-dom';
import ChatArea from './ChatArea';
import styles from './Chat.module.css';

interface ParamTypes {
    id: string
}

const Chat = () => {
    const { id } = useParams<ParamTypes>();
    const [users, updateUsers] = useState({});
    const [reciever, updateReciever] = useState("");
    const [chat, setChat] = useState(false);
    
    useEffect((): (() => void)=> {
        let mounted = true;
        firebase.database().ref('users').on('value', (data) => {
            const userData = data.val();
            if(mounted) {
                updateUsers(userData);
            }
        })
        return () => mounted = false;
    }, [])

    const handleReciever = (name: string) => {
        updateReciever(name)
        setChat(true)
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
        <div className={styles.ChatWrapper}>
            <h2>Chat</h2>
            {
                chat && <ChatArea sender={id} reciever={reciever} />
            }
            <div className="chat-area">
                {
                    userData.map(user => {
                        return <button className={styles.UserButton} onClick={() => handleReciever(user.name)} key={user.name}>{user.name}</button>
                    })
                }
            </div>
        </div>
    )
}

export default Chat;