import React,{useState,useEffect} from 'react';
import { useHistory,useParams,Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

//boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';

//import component react-bootstrap
import {Form} from "react-bootstrap"

function U_penyakit() {
    const [nama_penyakit, setNama_penyakit] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [obat, setobat] = useState('');
    const [harga_obat, setHarga_obat] = useState('');
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
        axios.get(process.env.REACT_APP_API_LINK + `user/${Id}`)
        .then(res => {
            setRole(res.data.role);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(process.env.REACT_APP_API_LINK + `editpenyakit/${Id}`, {
            nama_penyakit,
            deskripsi,
            obat,
            harga_obat
        })
        // receive response
        .then(res=>{
            console.log(res.data);
            history.push('/penyakit?page=1&limit=10');
        })
        // catch error
        .catch(err=>{
            console.log(err.response.data.message);
        })
    }
    const getPenyakit = () => {
        axios.get(process.env.REACT_APP_API_LINK + `penyakit/${Id}`)
        .then(res => {
            setNama_penyakit(res.data.nama_penyakit);
            setDeskripsi(res.data.deskripsi);
            setobat(res.data.obat);
            setHarga_obat(res.data.harga_obat);

        })
        .catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        getPenyakit();
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
         // form edit data penyakit
        return(
            <div className="container">
                <div className="row"  style={{"padding-top":"5rem"}}>
                    <div className="box">
                        <h1>Penyakit</h1>
                             <Form onSubmit={handleSubmit}>
                                    <div className="d-flex flex-column">
                                        {/* nama */}
                                        <label>Nama Penyakit: </label>
                                        <Form.Control style={{"padding":"0.25rem"}} id="form-input"type="text" value={nama_penyakit} onChange={(e) => setNama_penyakit(e.target.value)} placeholder="Nama Penyakit" /><br/>
                                        {/* no telepon */}
                                        <label>Deskripsi:</label>
                                        <Form.Control style={{"padding":"0.25rem"}} id="form-input" type="text" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="no telepon" /><br/>
                                        {/* tanggal daftar */}
                                        <label>Obat</label>
                                        <Form.Control style={{"padding":"0.25rem"}} id="form-input" type="text" value={obat} onChange={(e)=> setobat(e.target.value)} placeholder="name@example.com" /> <br/>
                                       
                                        {/* alamat */}
                                        <label>Harga Obat:</label> 
                                        <Form.Control style={{"padding":"0.25rem"}} id="form-input" type="text" value={harga_obat} onChange={(e)=> setHarga_obat(e.target.value)} placeholder="alamat" /><br/>

                                        <div className="d-flex flex-row-reverse">
                                            <div className="p-2"><button type="submit" className="btn btn-primary" size="sm">Tambah</button></div>
                                            <div className="p-2"><Link to={`/penyakit`} className="btn btn-primary" >Batal</Link>{' '}</div>
                                        </div>
                                    </div>
                                </Form>
                    </div>
                </div>
            </div>
        );
    }
 
}
export default U_penyakit;