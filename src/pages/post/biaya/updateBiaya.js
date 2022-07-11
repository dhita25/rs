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

function U_biaya() {
    const [nama_biaya,setNama_biaya] = useState('');
    const [harga,setHarga] = useState('');
    const [role,setRole] = useState('');
    const [deskripsi,setDeskripsi] = useState('');
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

    const getRoles = () => {
        axios.get(process.env.REACT_APP_API_LINK+`/user/${id}`)
        .then(res => {
            setRole(res.data.role);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(process.env.REACT_APP_API_LINK+`editbiaya/${Id}`,{
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

    const getBiaya = () => {
        axios.get(process.env.REACT_APP_API_LINK+`biaya/${Id}`)
        .then(res => {
            console.log(res.data);
            setNama_biaya(res.data.nama_biaya);
            setHarga(res.data.harga);
            setDeskripsi(res.data.deskripsi);
        })
    }

    useEffect(() => {
        getBiaya();
        autorization();
        getRoles();
    },[]);


    if(localStorage.getItem('token') === null){
        history.push('/');
    }
    
    if (role === 'pasien') {
        return <Redirect to='/home'/>
    }
    else {
         // form edit data biaya
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
export default U_biaya;