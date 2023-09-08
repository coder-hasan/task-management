// import React from 'react';

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SingleTask = (props) => {
    // console.log(props.task)
    const {uid,title, description, due_date, priority, status, created_by, assignee_email} = props.task
    const history = useNavigate()
    const handleDelete = () =>{
        var token = localStorage.getItem('access-token');
        const nToken = token.replace(/"/g, "");
        axios.delete(`https://taskmanagement.liberalsoft.net/task/${uid}`,{
            headers: {
                'Authorization' : `Bearer ${nToken}`,
            }
        }).then(data => {
                // console.log(data)
                window.location.reload()
                history('/');
            }).catch(err => console.log(err))
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-2">
                    <div className="card mb-3">
                        <div className="card-header">
                            {title}
                        </div>
                        <div className="card-body">
                            {/* <h5 className="card-title"></h5> */}
                            <div className="d-flex justify-content-between py-2 border-bottom">
                                <h6>Created by: {created_by}</h6>
                                <h6>Assigned To: {assignee_email}</h6>
                            </div>
                            <p className="card-text py-4">{description}</p>
                            <div className="row border-top border-bottom py-2">
                                <div className="col-md-4 border-right">
                                    <p className="card-text">Due Date: {due_date}</p>
                                </div>
                                <div className="col-md-4 border-right">
                                    <p className="card-text">Priority: {priority}</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="card-text">Status: {status}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row px-4 pb-3">
                            <div className="col-md-6">
                                <Link to={"task/"+uid} className="btn btn-info d-block">Edit Task</Link>
                            </div>
                            <div className="col-md-6">
                                <button onClick={handleDelete} className="btn btn-danger col-12">Delete Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleTask;