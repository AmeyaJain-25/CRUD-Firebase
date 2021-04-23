import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from "react-router";
import { UserContext } from "../context/UserContext";
import { Button } from "react-bootstrap";

const Post = () => {
    const context = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSignIn = () => {
        try {
            firebase
            .database()
            .ref('posts/' + uuidv4())
            .set({
                postedBy: {
                    uuid: context.user.uuid,
                    name: context.user.name,
                    email: context.user.email,
                    uid: context.user.uid,
                },
                title,
                body
            })
            firebase.firestore().collection('posts').doc(uuidv4()).set({
                postedBy: {
                    uuid: context.user.uuid,
                    name: context.user.name,
                    email: context.user.email,
                    uid: context.user.uid,
                },
                title,
                body
            })
            } catch (error) {
                console.log(error);
            }
    }

    return (
        <div>
            <h1>Post</h1>
            <div>
                <input type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder="body" value={body} onChange={e => setBody(e.target.value)} />
            </div>
            <div>
                <Button onClick={handleSignIn}>
                    Post
                </Button>
            </div>
        </div>
    );
}

export default Post;