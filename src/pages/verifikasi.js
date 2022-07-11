import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory,useParams, Link} from 'react-router-dom';

function Verifikasi() {
    const verifikasi = true;
    const [status,setStatus] = useState(false);
    const {token} = useParams();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(process.env.REACT_APP_API_LINK+`verifikasi/${token}`)
        .then(res => {
            setStatus(true);
        })
        .catch(err => {
            console.log(err.response.message);
        })
    }



    const notification = () => {
        if(status === true){
            return(
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Berhasil</h4>
                    <p>Silahkan login</p>
                    <hr />
                    <p className="mb-0">
                        <Link to="/" className="btn btn-primary">Login</Link>
                    </p>
                </div>
            )
        }
    }



    return (
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
                                {notification()}
                                <div className="input">
                                    <button style={{"margin-top":"1rem"}} type="submit" onClick={handleSubmit} className="btn btn-primary">Verifikasi</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Verifikasi;