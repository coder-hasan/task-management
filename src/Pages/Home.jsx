// import React from 'react';

import Auth from "../Components/Auth/Auth";
import LoggedInProfile from "../Components/Profile/LoggedInProfile";
import AllTask from "../Components/Tasks/AllTask";
// import Register from "../Components/Register/Register";

const Home = () => {
    var token = localStorage.getItem('access-token');
    // const nToken = token.replace(/"/g, "");
    return (
        <div className="container">
            {token ? (
            <>
                <h2 className="text-center">Your Profile</h2>
                <LoggedInProfile></LoggedInProfile>
                <AllTask></AllTask>
            </>    
            ) : (<Auth></Auth>)}
            {/* <Register></Register> */}
        </div>
    );
};

export default Home;