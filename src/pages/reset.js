//import react
import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useHistory,useParams } from 'react-router-dom';


//import boostrap
import  'bootstrap/dist/css/bootstrap.min.css';

//import css
import '../App.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap";

function Reset() {
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState('');
    const history = useHistory();
    const {token} = useParams();

    const handelSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword){
            axios.put(process.env.REACT_APP_API_LINK+`reset/${token}`,{
                password,
                confirmPassword
            })
            .then(res => {
                console.log(res.data);
                history.push('/');
            })
            .catch(err => {
                console.log(err.response.message);
            })
        }
        else{
            setError('Password tidak sama');
        }
    }


    return(
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div className="test">
                            <div className="image" >
                                <img src="https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"/>
                            </div>
                            <div className="content">
                                <h1>Welcome to <span>SOCA</span></h1>
                                <p>Welcome back! Log in to your account to view today's clients:</p>
                                {error ? <p className="error">{error}</p> : null}
                                <div className="input">
                                    <Form onSubmit={handelSubmit}>
                                        <input id="form-input" type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        <input  style={{"margin-top":"1rem"}} type="password" id="form-input" className="form-control" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                        <button style={{"margin-top":"1rem"}} type="submit" className="btn btn-primary">Reset</button>
                                    </Form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Reset;