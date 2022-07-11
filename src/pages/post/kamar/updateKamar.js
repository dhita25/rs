import React,{useState,useEffect} from 'react';
import { useHistory,useParams,Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';


//boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function U_kamar() {
    const [nama_kamar,setNama_kamar] = useState('');    
    const [lantai,setLantai] = useState('');
    const [harga,setHarga] = useState('');
    const [status,setStatus] = useState('');
    const [deskripsi,setDeskripsi] = useState('');
    const [role,setRole] = useState('');
    const history = useHistory();
    const {Id} = useParams();
    const id = localStorage.getItem('id');

    const autorization = () => {
        axios.get(process.env.REACT_APP_API_LINK + `authenticated`,{
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
        axios.get(process.env.REACT_APP_API_LINK + `user/${id}`)
        .then(res => {
            setRole(res.data.role);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(process.env.REACT_APP_API_LINK + `editkamar/${Id}`,{
            nama_kamar,
            lantai,
            harga,
            status,
            deskripsi
        })
        .then(res => {
            console.log(res.data);
            history.push('/kamar?page=1&limit=10');
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getKamar = () => {
        axios.get(process.env.REACT_APP_API_LINK + `kamar/${Id}`)
        .then(res => {
            console.log(res.data);
            setNama_kamar(res.data.nama_kamar);
            setLantai(res.data.lantai);
            setHarga(res.data.harga);
            setStatus(res.data.status);
            setDeskripsi(res.data.deskripsi);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getKamar();
        autorization();
        getRoles();
    },[]);

    if(localStorage.getItem('token') === null){
        history.push('/');
    }
    
    if(role === 'pasien'){
        return <Redirect to='/home'/>
    }
    else{
        //Edit Data kamar
        return(
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="row" >
                        <div className="box">
                            <h1>Kamar</h1>
                                <Form onSubmit={handleSubmit}>
                                        <div className="d-flex flex-column">
                                            {/* nama */}
                                            <label>Nama Biaya: </label>
                                            <Form.Control type="text" value={nama_kamar} id="form-input" onChange={(e) => setNama_kamar(e.target.value)} placeholder="nama Kamar" /><br/>
                                            {/* no telepon */}
                                            <label>Lantai</label>
                                            <Form.Control type="text" id="form-input" value={lantai} onChange={(e) => setLantai(e.target.value)} placeholder="Lantai" /><br/>
                                            {/* Lantai */}
                                            <Form.Control type="text" id="form-input" value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="Harga" /><br/>
                                            {/* Deskripsi */}
                                            <label>Deskripsi</label>
                                            <Form.Control type="text" id="form-input"   value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="harga" /><br/>
                                            {/* Pilih Status */}
                                            <Form.Select id="form-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                <option value="">Pilih Status</option>
                                                <option value="tersedia">Tersedia</option>
                                                <option value="terisi">Terisi</option>
                                            </Form.Select>
                                            <div className="d-flex flex-row-reverse">
                                                <div className="p-2"><button type="submit" className="btn btn-primary" size="sm">Tambah</button></div>
                                                <div className="p-2"><Link to={`/kamar`} className="btn btn-primary" >Batal</Link>{' '}</div>
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
export default U_kamar;