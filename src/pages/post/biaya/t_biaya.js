import React,{useState,useEffect} from 'react';
import { useHistory,Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

//boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function T_biaya() {
    const [nama_biaya,setNama_biaya] = useState('');
    const [harga,setHarga] = useState('');
    const [role,setRole] = useState('');
    const [deskripsi,setDeskripsi] = useState('');
    const history = useHistory();
    const Id = localStorage.getItem('id')

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

    const getRoles = () => {
        axios.get(process.env.REACT_APP_API_LINK+`user/${Id}`)
        .then(res => {
            setRole(res.data.role);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        autorization();
        getRoles();
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_LINK+'addbiaya',{
            nama_biaya,
            harga,
            deskripsi
        })
        .then(res => {
            console.log(res.data);
            history.push('/biaya?page=1&limit=10');
        })
        .catch(err => {
            console.log(err);
        })
    }

    if(localStorage.getItem('token') === null){
        history.push('/');
    }

    if (role === 'pasien') {
        return <Redirect to='/home'/>
    }
    else {
        //tambah biaya
        return(
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="row" >
                        <div className="box">
                            <h1>Biaya</h1>
                                <Form onSubmit={handleSubmit}>
                                        <div className="d-flex flex-column">
                                            {/* nama */}
                                            <label>Nama Biaya: </label>
                                            <Form.Control type="text" value={nama_biaya} id="form-input" onChange={(e) => setNama_biaya(e.target.value)} placeholder="nama biaya" /><br/>
                                            {/* no telepon */}
                                            <label>Harga</label>
                                            <Form.Control type="text" id="form-input"   value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="harga" /><br/>
                                            {/* deskripsi */}
                                            <label>Deskripsi</label>
                                            <Form.Control type="text" id="form-input"   value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="deskripsi" /><br/>
                                            <div className="d-flex flex-row-reverse">
                                                <div className="p-2"><button type="submit" className="btn btn-primary" size="sm">Tambah</button></div>
                                                <div className="p-2"><Link to={`/biaya`} className="btn btn-primary" >Batal</Link>{' '}</div>
                                            </div>
                                        </div>
                                </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}
export default T_biaya;