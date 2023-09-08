import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleTask from './SingleTask';

const AllTask = () => {
    const [tasks, setTasks] = useState('')
    useEffect(() => {
        const fetchUser = async() => {
            var token = await localStorage.getItem('access-token');
            // console.log(token)
            const nToken = await token.replace(/"/g, "");
            // console.log(nToken)
            try{
                const userTask = await axios.get('https://taskmanagement.liberalsoft.net/tasks',{
                    headers: {
                        'Authorization' : `Bearer ${nToken}`,
                    }
                }).then((data) => {
                    setTasks(data.data)
                    // console.log(tasks)
                    
                })
                // setUser(userData)
            }catch(error){
                console.log(error)
            }
        }
        fetchUser()
    },[]);
    return (
        <div className='container'>
            <h3 className='text-center mt-5'>All Tasks</h3>
            {tasks ? (tasks.map(task => <SingleTask task={task} key={task.uid}></SingleTask>)) : (<p></p>)}
        </div>
    );
};

export default AllTask;