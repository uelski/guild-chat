import React, {useEffect, useState} from 'react';
import firebase from '../../config/firebase-config';
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import {Link} from "react-router-dom";
import styles from './Home.module.css';


const Home = () => {
    const [users, updateUsers] = useState({});
    const [userValue, updateValue] = useState("");

    useEffect(()=> {
        firebase.database().ref('users').on('value', (data) => {
            const userData = data.val();
            updateUsers(userData);
        })
    }, [])

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        updateValue(e.target.value)
    }

    const handleSubmit = () => {
        firebase.database().ref(`users/${userValue}`).set({
            name: userValue,
            conversations: []
        })
        updateValue("")
    }


    const listUsers: {name: string}[] = []

    for (let key in users) {
        listUsers.push({
            name: key
        })
    }
    return (

        <div className={styles.HomeWrapper}>
            <div className={styles.UserForm}>
                <Input value={userValue} onChange={(e) => handleValueChange(e)} placeholder="Add User" />
                <Button disabled={userValue.length === 0} onClick={handleSubmit}>Submit</Button>
            </div>
            <div className="home__user-area">
                {
                    users && listUsers.map(user => {
                        return (
                            <Link className={styles.UserLink} to={`/users/${user.name}`} key={user.name}>{user.name}</Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;