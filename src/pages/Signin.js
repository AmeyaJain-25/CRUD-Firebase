import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import { Redirect } from "react-router";
import { UserContext } from "../context/UserContext";
import { Button } from "react-bootstrap";

const Signin = () => {
    const context = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
            const userRefData = await firebase.database().ref('users/');
            userRefData.on('value', snapshot => {
                const userArr = Object.entries(snapshot.val());
                const user = userArr.filter(u=>{
                    return u[1].uid === result.user.uid;
                })
                context.setUser({
                    uuid: user[0][0],
                    name: user[0][1].name,
                    email: user[0][1].email,
                    uid: user[0][1].uid,
                })
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
            <h1>Signin</h1>
            <div>
                <input type="email" name="email" id="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <input type="password" name="password" id="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
                <Button onClick={handleSignIn}>
                    Signin
                </Button>
            </div>
        </div>
    );
}

export default Signin;