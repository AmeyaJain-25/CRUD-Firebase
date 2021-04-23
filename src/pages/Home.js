import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../context/UserContext";
//firebase
import firebase from "firebase/app";
import Post from "./Post";

const Home = () => {
    const context = useContext(UserContext);

    const [userData, setUserData] = useState(null)
    const [postData, setPostData] = useState([])

    const getUserData = async () => {
        const userRefData = await firebase.database().ref('users/');
        userRefData.on('value', snapshot => {
            setUserData(Object.entries(snapshot.val()));
        })
    }

    const getPostData = async () => {
        await firebase.firestore().collection('posts').get().then((snapshot) => {
            snapshot.forEach((coll) => {
                console.log(coll.id, " => ", coll.data());
                setPostData(prev=>[...prev, coll.data()]);
            });
        }).catch((error) => {
            console.log("Error getting collection:", error);
        });
    }

    useEffect(() => {
        getUserData();
        getPostData();
    }, [])

    if (!context.user?.uid) {
        return <Redirect to="/signin" />;
    }

    return (
        <div>
            <Post />
            <h1>User Signed In</h1>
            <div>
            <h4>{context.user.name}</h4>
            <h4>{context.user.email}</h4>
            </div>
            <h1>Database</h1>
            {userData && userData.map((uObj, index) => {
                return (
                <div key={index}>
                    <h1>{uObj[1].name}</h1>
                    <h1>{uObj[1].email}</h1>
                </div>
                )
            })}
            {postData && postData.map((pObj, index) => {
                return (
                <div key={index}>
                    <h1>{pObj.title}</h1>
                    <h2>{pObj.body}</h2>
                    <h3>{pObj.postedBy.name}</h3>
                </div>
                )
            })}
        </div>
    );
}

export default Home;