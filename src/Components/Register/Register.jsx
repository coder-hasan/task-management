import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [addUser, setAddUser] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "success": false,
        "error": ""
    });
    const handleBlurChange =(event) => {
        let isFieldValid = true;
        if(event.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if(isFieldValid){
            const newUserInfo = {...addUser};
            newUserInfo[event.target.name] = event.target.value
            setAddUser(newUserInfo);
        }
    }
    const handleEmailChange = (event) => {
        handleBlurChange(event);
    }
    const handleChange = (event) => {
        const newUserInfo = {...addUser};
        newUserInfo[event.target.name] = event.target.value

        setAddUser(newUserInfo);
    };
    const history = useNavigate();
    const handleRegister = async(e) => {
        const {first_name, last_name, password} = addUser;
        e.preventDefault();
        if(first_name === '' || last_name === '' || password === ''){
            setAddUser({
                error: "Please Fill All Inforrmation with Valid Info"
            })
        }else{
            try {
                // history('/home');
                console.log(addUser);
                addUser.success = true;
                axios.post("https://taskmanagement.liberalsoft.net/api/register", {
                    first_name, 
                    last_name,
                    email, 
                    password
                }).then(data => {
                    console.log(data)
                    history('/profile');
                }).catch(err => console.log(err))
                // alert('Registration failed. Please try again.');
              }catch(err){console.log(err)}
            // 
            // }).catch(err => console.log(err))
        }
      };
    const {first_name, last_name, email, password, error} = addUser;
    return (
        <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-3'>
                        <h2 className='text-center mb-3'>Add Contact</h2>
                        {
                            addUser.success && <div className='alert alert-success'>{first_name} {last_name} Successfully</div>
                        }
                        {
                            error && <div className='alert alert-danger'>{error}</div>
                        }
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input onChange={handleChange} value={first_name} required type="text" name='first_name' className="form-control" placeholder="Enter first name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input onChange={handleChange} value={last_name} required type="text" name='last_name' className="form-control" placeholder="Enter last name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input onBlur={handleBlurChange} onChange={handleEmailChange} defaultValue={email} required type="email" name='email' className="form-control" placeholder="Enter your email" />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="bio">Your Bio</label>
                                <input onChange={handleChange} value={bio} required type="text" name='bio' className="form-control" placeholder="Enter Your Bio" />
                            </div> */}
                            {/* <div className="form-group">
                                <label htmlFor="profilePicture">Your Profile Picture</label>
                                <br />
                                <input onChange={handleChange} value={profilePicture} required type="file" name='profilePicture' className="" placeholder="Upload your Profile Picture" />
                            </div> */}
                            {/* <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                </div>
                                <div className="custom-file">
                                    <input onChange={handleChange} value={profilePicture} type="file" className="custom-file-input" name="inputGroupFile01" />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                </div>
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input onChange={handleChange} value={password} required type="password" name='password' className="form-control" placeholder="Your Password" />
                            </div>
                            <div className='d-flex justify-content-between'>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <div className='d-flex align-items-center'>
                                    <p className='mr-2 mb-0'>Already Have an account?</p>
                                    <a href='/' className="btn btn-success">Login</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Register;