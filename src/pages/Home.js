import React, { useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../context/UserContext";

const Home = () => {
    const context = useContext(UserContext);

    if (!context.user?.uid) {
        return <Redirect to="/signin" />;
    }

    return (
        <div>
            <h1>{context.user.uid}</h1>
            <h1>{context.user.email}</h1>
        </div>
    );
}

export default Home;