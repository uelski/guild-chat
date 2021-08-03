import React, {useEffect, useState} from 'react';
import firebase from '../../config/firebase-config';
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import styles from './Chat.module.css';


const ChatArea = (props) => {
    const sender = props.sender;
    const reciever = props.reciever;
    const [messages, updateMessages] = useState([]);
    const [messageValue, updateValue] = useState("");

    const getRecieverMessages = (messageArray) => {
        firebase.database().ref(`users/${reciever}/${sender}`).on('value', (data) => {
            const messageData = data.val();
            if (messageData) {
                console.log('uphere:', messageArray)
                for (let key in messageData) {
                    messageArray.push({message: messageData[key].value, createdAt: messageData[key].created, sender: messageData[key].sender })
                }
                console.log(messageArray)
                updateMessages(messageArray)
            } else {
                updateMessages(messageArray)
            }
        })
    }
    

    useEffect( () => {
        firebase.database().ref(`users/${sender}/${reciever}`).on('value', (data) => {
            const messageData = data.val();
            const senderArray = [];
            if (messageData) {
                for (let key in messageData) {
                    senderArray.push({message: messageData[key].value, createdAt: messageData[key].created, sender: messageData[key].sender })
                }
            }
            console.log('sender', senderArray)
            getRecieverMessages(senderArray)
        })
    }, [])

    const handleValueChange = (e) => {
        updateValue(e.target.value)
    }

    const handleSubmit = () => {
        const messageToSend = {
            value: messageValue,
            created: firebase.database.ServerValue.TIMESTAMP,
            sender: sender
        }
        firebase.database().ref(`users/${sender}/${reciever}`).push(messageToSend)
    }

    return (
        <div>
            <ul className={styles.ChatArea}>
                {
                    messages.sort(({createdAt:a}, {createdAt:b}) => a-b).map(message => {
                        const isSender = message.sender === sender ? styles.Sender : '';
                        return <li className={`${styles.Message} ${isSender}`} key={message.createdAt}>{message.sender}: {message.message}</li>
                    })
                }
            </ul>
            <div className={styles.FormArea}>
                <Input value={messageValue} onChange={(e) => handleValueChange(e)} placeholder="Write a Message" />
                <Button disabled={messageValue.length === 0} onClick={handleSubmit}>Send</Button>
            </div>
        </div>
    )
}

export default ChatArea;