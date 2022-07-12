import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Form} from 'react-bootstrap';


function ForgotPassword () {
    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const [loading,setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_LINK + 'forgotPassword',{
            email
        })
        .then(res => {
            setLoading(false);
            setSuccess(res.data.message);
        })
        .catch(err => {
            setLoading(false);
            setError(err.response.data.message);
        })
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div className="test">
                            <div className="image" >
                                <img src="https://images.unsplash.com/photo-1511640608432-d8809531af11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"/>
                            </div>
                            <div className="content">
                                <h1>Welcome to <span>Rumah Sakit</span></h1>
                                <p>Welcome back! please input your email to reset Password:</p>
                                {success}
                                {error}
                                <div className="input">
                                    <Form onSubmit={handleSubmit}>
                                        <input type="text" id="form-input" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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

export default ForgotPassword;

                                

