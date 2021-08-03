import React, {useEffect, useState} from 'react';
import firebase from '../../config/firebase-config';
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";


const ChatArea = (props) => {
    const sender = props.sender;
    const reciever = props.reciever;
    const [messages, updateMessages] = useState([]);
    const [messageValue, updateValue] = useState("");

    const getRecieverMessages = (messageArray) => {
        
        firebase.database().ref(`users/${reciever}/${sender}`).on('value', (data) => {
            const messageData = data.val();
            if (messageData) {
                console.log('second', messageData)
                // updateMessages(messageData)
                
                for (let key in messageData) {
                    messageArray.push({message: messageData[key].value, createdAt: messageData[key].created, sender: messageData[key].sender })
                }
                updateMessages(messageArray)
            }
        })
    }

    useEffect(async () => {
        await firebase.database().ref(`users/${sender}/${reciever}`).on('value', (data) => {
            const messageData = data.val();
            const senderArray = [];
            if (messageData) {
                console.log('message data here')
                for (let key in messageData) {
                    senderArray.push({message: messageData[key].value, createdAt: messageData[key].created, sender: messageData[key].sender })
                }
            }
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
            <ul>
                {
                    messages.sort(({createdAt:a}, {createdAt:b}) => a-b).map(message => {
                        return <li key={message.createdAt}>{message.message}</li>
                    })
                }
            </ul>
            <div>
                <Input value={messageValue} onChange={(e) => handleValueChange(e)} placeholder="Write a Message" />
                <Button disabled={messageValue.length === 0} onClick={handleSubmit}>Send</Button>
            </div>
        </div>
    )
}

export default ChatArea;