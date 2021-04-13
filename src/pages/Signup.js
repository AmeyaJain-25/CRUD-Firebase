import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from "react-router";
import { Button } from "react-bootstrap";
//firebase
import firebase from "firebase/app";


const Signup = () => {
    const context = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
            context.setUser({
                name,
                email: result.user.email,
                uid: result.user.uid,
            })
            try {
            firebase
            .database()
            .ref('users/' + uuidv4())
            .set({
                uid: result.user.uid,
                name,
                email
            })
            } catch (error) {
                console.log(error);
            }
        })
        .catch(error=> {
            console.log(error);
        })
    }

    if (context.user?.uid) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h1>Signup</h1>
            <div>
                <input type="email" name="email" id="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <input type="password" name="password" id="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
                <input type="text" name="name" id="name" placeholder="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <Button onClick={handleSignUp}>
                    Signup
                </Button>
            </div>
        </div>
    );
}

export default Signup;