import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    
    const [updateProfile, setUpdateProfile] = useState({
        "profile_picture": "",
        "bio": "",
        "success": false,
        "error": ""
    });

    const onChangePicture = (event) => {
        const newUserInfo = {...updateProfile};
        newUserInfo.profile_picture = event.target.files[0]
        console.log(newUserInfo)
        setUpdateProfile(newUserInfo);
    }
    const handleBlurChange =(event) => {
        let isFieldValid = true;
        if(isFieldValid){
            const newUserInfo = {...updateProfile};
            newUserInfo[event.target.name] = event.target.value
            setUpdateProfile(newUserInfo);
        }
    }
    const handleChange = (event) => {
        const newUserInfo = {...updateProfile};
        newUserInfo[event.target.name] = event.target.value
        setUpdateProfile(newUserInfo);
    };
    const history = useNavigate();

    const handleFormSubmit = async(e) => {

        const formData = new FormData()
        formData.append("bio", updateProfile.bio);
        formData.append("profile_picture", updateProfile.profile_picture);
        console.log(formData)

        // console.log(updateProfile)
        const {bio, profile_picture} = updateProfile;
        var token = localStorage.getItem('access-token');
        const nToken = token.replace(/"/g, "");
        console.log(nToken)
        if (!token) {
            console.log("Token is not available")
            history('/profile');
            return;
          }
        e.preventDefault();
        if(bio === ''){
            setUpdateProfile({
                error: "Please Fill All Inforrmation with Valid Info"
            })
        }else{

            await axios.post("https://taskmanagement.liberalsoft.net/profiles", formData,{
                headers: {
                    'Authorization' : `Bearer ${nToken}`,
                    // 'content-type': profile_picture.type,
                    // 'content-length': `${profile_picture.size}`,
                }
            }).then(data => {
                    console.log(updateProfile)
                    history('/profile')
                    updateProfile.success = true;
                    console.log('Profile Updated')
            }).catch(err => console.log(err))
        }
        
    }
    const {bio} = updateProfile
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-3">
                    <h3>Update Profile</h3>
                    {updateProfile.error && <div className="alert alert-danger">{updateProfile.error}</div>}
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="bio">Your Bio</label>
                            <input onChange={handleChange} onBlur={handleBlurChange} value={bio} required type="text" name='bio' className="form-control" placeholder="Enter Your Bio" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile_picture">Your Profile Picture</label>
                            <br />
                            <input onChange={onChangePicture} type="file" name='profile_picture' accept="image/*"/>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <img src={profilePicture} alt="" />
            <p>{bio}</p> */}
        </div>
    );
};

export default Profile;