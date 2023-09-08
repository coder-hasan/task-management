import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const [user, setUser] = useState('')
    useEffect(() => {
        const fetchUser = async() => {
            var token = localStorage.getItem('access-token');
            // console.log(token)
            const nToken = token.replace(/"/g, "");
            // console.log(nToken)
            try{
                const userData = await axios.get('https://taskmanagement.liberalsoft.net/users',{
                    headers: {
                        'Authorization' : `Bearer ${nToken}`,
                    }
                }).then((data) => {
                    setUser(data.data)
                    
                })
                // setUser(userData)
            }catch(error){
                console.log(error)
            }
        }
        fetchUser()
    },[]);

    const emails = user ? (user.map((data) => {
        return <option value={data.email} >{data.email}</option>
    })) : (<p>test@mail.com</p>);

    const [addTask, setAddTask] = useState({
        "assignee_email": "",
        "title": "",
        "description": "",
        "due_date":"",
        "priority":"",
        "status":"",       
        "success": false,
        "error": ""
    });

    const handleBlurChange =(event) => {
        let isFieldValid = true;
        if(isFieldValid){
            const newUserInfo = {...addTask};
            newUserInfo[event.target.name] = event.target.value
            setAddTask(newUserInfo);
        }
    }
    // const handleEmailChange = (event) => {
    //     handleBlurChange(event);
    // }
    const handleChange = (event) => {
        const newUserInfo = {...addTask};
        newUserInfo[event.target.name] = event.target.value
        setAddTask(newUserInfo);
        console.log(addTask)
    };
    const history = useNavigate();

    const handleFormSubmit = async(e) => {
        // const formData = new FormData()
        // console.log(formData)

        console.log(addTask)
        const {assignee_email, title, description, due_date, priority, status} = addTask;
        var token = localStorage.getItem('access-token');
        // console.log(token)
        const nToken = token.replace(/"/g, "");
        // console.log(nToken)
        if (!token) {
            console.log("Token is not available")
            history('/profile');
            return;
          }
        e.preventDefault();
        if(assignee_email === '' || title === '' || description === '' || due_date === '' || priority === '' || status === ''){
            setAddTask({
                error: "Please Fill All Inforrmation with Valid Info"
            })
        }else{
            // console.log(loginUser);
            console.log(addTask)
            await axios.post("https://taskmanagement.liberalsoft.net/create-task", {
                assignee_email,
                title,
                description,
                due_date,
                priority,
                status
            },{
                headers: {
                    'Authorization' : `Bearer ${nToken}`,
                }
            }).then(data => {
                    console.log(addTask)
                    history('/')
                    addTask.success = true;
                    console.log('Task Created')
            }).catch(err => console.log(err))
        }
        
    }
    const {title, description, due_date} = addTask
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-3">
                    <h3 className='text-center'>Create a New Task</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor='assignee_email'>Assigned Email</label> <br />
                            <select onChange={handleChange} onBlur={handleBlurChange} name='assignee_email' className="form-select" aria-label="Default select example" selected>
                                <option selected>Select Email</option>
                                {emails}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Task Title</label>
                            <input onChange={handleChange} onBlur={handleBlurChange} value={title} required type="text" name='title' className="form-control" placeholder="Task Title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Task Description</label>
                            <input onChange={handleChange} onBlur={handleBlurChange} value={description} required type="text" name='description' className="form-control" placeholder="Task Description" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="due_date">Date</label>
                            <input onChange={handleChange} onBlur={handleBlurChange} value={due_date} required type="date" name='due_date' className="form-control" placeholder="Due Date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor='priority'>Priority</label> <br />
                            <select onChange={handleChange} onBlur={handleBlurChange} name='priority' className="form-select" aria-label="Default select example" selected>
                                <option selected>Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor='status'>Status</label> <br />
                            <select onChange={handleChange} onBlur={handleBlurChange} name='status' className="form-select" aria-label="Default select example" selected>
                                <option selected>Select Status</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <button type="submit" className="btn btn-primary">Create Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;