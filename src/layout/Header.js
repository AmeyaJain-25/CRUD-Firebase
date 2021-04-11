import { Button } from "react-bootstrap";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
    const context  = useContext(UserContext);

    return (
        <div style={{padding: "10px", backgroundColor: "blanchedalmond", display: "flex", justifyContent: "space-between"}}>
            <div>
                <h1>CRUD-Firebase</h1>
            </div>
            <div>
                {context.user ? (
                        <Button 
                            style={{margin: "5px 10px"}}
                            onClick={() => context.setUser(null)}
                        >Logout</Button>
                    ) : (
                    <>
                        <Link to="/signin">
                        <Button style={{margin: "5px 10px"}}>Signin</Button>
                        </Link>
                        <Link to="/signup">
                            <Button style={{margin: "5px 10px"}}>Signup</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;