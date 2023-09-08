
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
    const [loginUser, setLoginUser] = useState({
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
            const userInfo = {...loginUser};
            userInfo[event.target.name] = event.target.value
            setLoginUser(userInfo);
        }
    }
    const handleEmailChange = (event) => {
        handleBlurChange(event);
    }
    const handleChange = (event) => {
        const userInfo = {...loginUser};
        userInfo[event.target.name] = event.target.value
        setLoginUser(userInfo);
    };
    const history = useNavigate();
    const handleFormSubmit = async(e) => {
        const {password, email} = loginUser;
        e.preventDefault();
        try {
            if(password === ''){
                setLoginUser({
                    error: "Please Fill All Inforrmation with Valid Info"
                })
            }else{
                console.log(loginUser);
                await axios.post("https://taskmanagement.liberalsoft.net/api/login", {
                    email, 
                    password
                },{
                    headers: {
                        'Content-Type': 'application/json',
                    }
                },{withCredentials: true}).then(res => {
                    if(res){
                        localStorage.clear()
                        localStorage.setItem("access-token", JSON.stringify(res.data.access))
                        localStorage.setItem("refresh-token", JSON.stringify(res.data.refresh));
                        localStorage.setItem("user", JSON.stringify(email));
                        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data['access']}`;
                        loginUser.success = true;
                        history('/');
                        window.location.reload()
                        console.log('Logged In')
                    }
                }
                ).catch(err => console.log(err))
            }
          } catch (error) {
            console.error('Error logging in:', error);
            setLoginUser({error: 'Login failed. Please try again.'});
          }
        
    }
  const {error, email} = loginUser;
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-3'>
                <h2 className='text-center mb-3'>Login</h2>
                {
                    loginUser.success && <div className='alert alert-success'>{email} Successfully</div>
                }
                {
                    error && <div className='alert alert-danger'>{error}</div>
                }
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input onBlur={handleBlurChange} onChange={handleEmailChange} required type="email" name='email' className="form-control" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} required type="password" name='password' className="form-control" placeholder="Your Password" />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <div className='d-flex align-items-center'>
                            <p className='mr-2 mb-0'>Dont Have an account?</p>
                            <a href='/' className="btn btn-success">Sign Up</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Auth;

{/* <div>
    {isLoggedIn ? (
    <div>
        <p>Welcome, {user.email}!</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
    ) : (
    <form>
        <input className='form-control'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input className='form-control'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn btn-success' onClick={handleLogin}>Login</button>
        {/* <button className='btn btn-primary' onClick={handleRegister}>Register</button> */}
//     </form>
//     )}
// </div> */}
