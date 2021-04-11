import React, { useContext, useState } from "react";

import firebase from "firebase/app";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router";
import { Button } from "react-bootstrap";


const Signup = () => {
    const context = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
            console.log(result);
            context.setUser({
                email: result.user.email,
                uid: result.user.uid,
            })
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
                <Button onClick={handleSignUp}>
                    Signup
                </Button>
            </div>
        </div>
    );
}

export default Signup;