//import react
import {useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import cryptojs from 'crypto-js';
import axios from 'axios';

//import boostrap
import  'bootstrap/dist/css/bootstrap.min.css';

//import css
import '../App.css';

//import component react-bootstrap
import {Form} from "react-bootstrap"

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const history = useHistory();

    const autorization = () => {
        axios.get(process.env.REACT_APP_API_LINK+`authenticated`,{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res.data.auth);
            if(res.data.auth === true){
                history.push('/home');
            }
        })
        .catch(err => {
            console.log(err.response.message);
        })
    }

    useEffect(() => {
        autorization();
    },[]);

    const handelSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_LINK+'login',{
            email,
            password
        })
        .then(res => {
            console.log(res.data);
            localStorage.setItem('token',res.data.accessToken);
            localStorage.setItem('id',res.data.user.id?res.data.user.id:'');
            localStorage.setItem('role',cryptojs.AES.encrypt(res.data.user.role, 'secret key 123'));
            history.push('/home');

        })
        .catch(err => {
            console.log(err);
            setError('Email atau Password Salah');
        })
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
                                <h1>Welcome to <span>Rumah Sakit</span></h1>
                                <p>Welcome back! Log in to your account to view today's clients:</p>
                                <div className="input">
                                    <Form onSubmit={handelSubmit}>
                                        <input type="text" id="form-input" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        <input style={{"margin-top":"1rem"}} id="form-input" type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        <button style={{"margin-top":"1rem"}} type="submit" className="btn btn-primary">Login</button>
                                    </Form>
                                        <Link to={'/register'} style={{"margin-top":"1rem"}} type="submit" className="btn btn-primary">Register</Link>
                                        <Link to={'/forgotPassword'} style={{"margin-top":"1rem"}} type="submit" className="btn btn-primary">Forgot Password</Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}
export default Login;
