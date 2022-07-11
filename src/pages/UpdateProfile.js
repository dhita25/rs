import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link } from 'react-router-dom';
import Navbar from "../compenents/navbar";
import axios from 'axios';
import "../App.css";

//import react boostrap
import {Card} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import {Form} from 'react-bootstrap';

//import react router dom

function UpdateProfile(){
    const [nama_awal,setNama_awal] = useState('');
    const [nama_akhir,setNama_akhir] = useState('');   
    const [alamat,setAlamat] = useState('');
    const [email,setEmail] = useState('');
    const [pekerjaan,setPekerjaan] = useState('');
    const [profile,setProfile] = useState('');
    const [no_telp,setNo_telp] = useState('');
    const [verfikasi,setVerifikasi] = useState('');
    const [msg,setMsg] = useState('');
    const [role,setRole] = useState('');
    const history = useHistory();
    const {Id} = useParams();
    const id = localStorage.getItem('id');

    const autorization = () => {
        axios.get(process.env.REACT_APP_API_LINK+`authenticated`,{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            console.log(res.data.auth);
            if(res.data.auth === false){
                history.push('/');
            }
        })
        .catch(err => {
            console.log(err.response.message);
        })
    }

    const getData = () => {
        axios.get(process.env.REACT_APP_API_LINK+`user/${id}`)
        .then(res => {
            setNama_awal(res.data.nama_awal);
            setNama_akhir(res.data.nama_akhir);
            setPekerjaan(res.data.pekerjaan);
            setAlamat(res.data.alamat);
            setEmail(res.data.email);
            setNo_telp(res.data.no_telp);
            setRole(res.data.role);
            setVerifikasi(res.data.verifikasi);
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    const CheckVerifikasi = () => {
        if(verfikasi === true){
            const check = 'Sudah Verifikasi';
            return check;
        }else{
            const check = ' Belum Verifikasi';
            return check;
        }
        
     
    }

    const verifyemail = (e) => {
        if(verfikasi === false){
            e.preventDefault();
            axios.post(process.env.REACT_APP_API_LINK+'verifyemail',{
                email
            })
            .then(res => {
                // setLoading(false);
                // setSuccess(res.data.message);
            })
            .catch(err => {
                // setLoading(false);
                // setError(err.response.data.message);
            })
            setMsg('Verifikasi Email Berhasil,Silahkan Cek Email Anda');
        }
        else{
            setMsg('Email Sudah Terverifikasi');
            
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(process.env.REACT_APP_API_LINK+`user/update/${id}`,{
            nama_awal,
            nama_akhir,
            pekerjaan,
            alamat,
            email,
            no_telp
        })
        .then(res => {
            console.log(res.data);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getData();
        autorization();
    },[])

    if(localStorage.getItem('token') === null){
        history.push('/');
    }

    //profile
    return(
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="d-flex justify-content-center">
                    <div className="row-profile">
                        <div className="box-profile">
                        <div className="image" >
                                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
                            </div>
                            <div className="content">
                                <h1> <span>Profile</span></h1>
                                <p>Please check and update your account details:</p>
                                {msg}
                                <div className="input">
                                    <Form onSubmit={handleSubmit}>
                                        <div className="d-flex flex-row justify-content-between">
                                            <div className="item-flex">
                                                <input type="text" id="form-input" className="form-control" placeholder="Nama Awal" value={nama_awal} onChange={(e) => setNama_awal(e.target.value)}/>
                                            </div>
                                            <div className="item-flex">
                                                <input type="text" id="form-input" className="form-control" placeholder="Nama Akhir" value={nama_akhir} onChange={(e) => setNama_akhir(e.target.value)}/>
                                            </div>
                                        </div>
                                        <input type="text" style={{"margin-top":"1rem"}} id="form-input" className="form-control" placeholder="Pekerjaan" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)}/>
                                        <input type="text" style={{"margin-top":"1rem"}} id="form-input" className="form-control" placeholder="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)}/>
                                        <input type="text" style={{"margin-top":"1rem"}} id="form-input" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
                                        <input type="text" style={{"margin-top":"1rem"}} id="form-input" className="form-control" placeholder="Email" value={CheckVerifikasi()} disabled/>
                                        <input type="text" style={{"margin-top":"1rem"}} id="form-input" className="form-control" placeholder="No telepon" value={no_telp} onChange={(e) => setNo_telp(e.target.value)}/>
                                        <button style={{"margin-top":"1rem"}} type="submit" className="btn btn-primary">Update</button>
                                        <button style={{"margin-top":"1rem"}} onClick={verifyemail} className="btn btn-primary">verifyemail</button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;