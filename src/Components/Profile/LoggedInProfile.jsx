// import React from 'react';

import axios from "axios";
import { useEffect, useState } from "react";

const LoggedInProfile = () => {
    const [userInfo, setUserInfo] = useState('')
    const [userProfiles, setUserProfiles] = useState('')
    const [userProfile, setUserProfile] = useState('')

    useEffect(() => {
        const fetchUser = async() => {
            // const userLocalEmail = localStorage.getItem('user');
            // const userEmail = userLocalEmail.replace(/"/g, "");
            var token = await localStorage.getItem('access-token');
            // console.log(token)
            const nToken = token.replace(/"/g, "");
            // console.log(nToken)
            try{
                const userProfile = await axios.get(`https://taskmanagement.liberalsoft.net/profiles`,{
                    headers: {
                        'Authorization' : `Bearer ${nToken}`,
                    }
                }).then((data) => {
                    setUserProfiles(data.data)
                    // if(userProfile){
                    //     userProfiles.map((data) => console.log(data))
                    // }
                    
                    // console.log(tasks)
                    
                })
                // setUser(userData)
            }catch(error){
                console.log(error)
            }
        }
        fetchUser()
    },[]);

    
    useEffect(() => {
        const fetchUser = async() => {
            const userLocalEmail = localStorage.getItem('user');
            const userEmail = userLocalEmail.replace(/"/g, "");
            var token = await localStorage.getItem('access-token');
            // console.log(token)
            const nToken = token.replace(/"/g, "");
            // console.log(nToken)
            try{
                const userTask = await axios.get(`https://taskmanagement.liberalsoft.net/user/${userEmail}`,{
                    headers: {
                        'Authorization' : `Bearer ${nToken}`,
                    }
                }).then((data) => {
                    setUserInfo(data.data)
                    // console.log(tasks)
                    
                })
                // setUser(userData)
            }catch(error){
                console.log(error)
            }
        }
        fetchUser()
    },[]);
    // console.log(userInfo.email)
    const {first_name, last_name, email} = userInfo
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6">
                    <h4>Name: {first_name} {last_name}</h4>
                    <h5>Email: {email}</h5>
                </div>
                <div className="col-md-6">
                {userProfiles ? (userProfiles.map((profile, index) => (
                    <div key={index} className="">
                    {/* Render each user profile here */}
                    <h4>{profile.bio}</h4>
                    <img style={{"width":"30%"}} src={profile.profile_picture}/>
                    {/* Add other profile data rendering as needed */}
                    </div>
                ))): (<p>Loading...</p>)}
                </div>
            </div>
        </div>
    );
};

export default LoggedInProfile;