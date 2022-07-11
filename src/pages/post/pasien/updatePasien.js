import React,{useState,useEffect} from 'react';
import {useHistory,useParams,Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "../../../App.css";
//boostrap react
import 'bootstrap/dist/css/bootstrap.min.css';

//import component react-bootstrap
import {Card} from "react-bootstrap";
import {ListGroup} from "react-bootstrap"; 
import {Form} from "react-bootstrap"

function U_pasien() {
    const [nama,setNama] = useState('');
    const [alamat,setAlamat] = useState('');
    const [no_telp,setNo_telp] = useState();
    const [jenis_kelamin,setJenis_kelamin] = useState('');
    const [tanggal_daftar,setTanggal_daftar] = useState('');
    const [golongan_darah,setGolongan_darah] = useState('');
    const [kode_penyakit,setKode_penyakit] = useState('');
    const [kode_kamar,setKode_kamar] = useState('');
    const [kode_biaya,setKode_biaya] = useState('');
    const [role ,setRole] = useState('');
    const [penyakit,setPenyakit] = useState([]);
    const [kamar,setKamar] = useState([]);
    const [biaya,setBiaya] = useState([]);
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
      
        axios.put(process.env.REACT_APP_API_LINK + `edit/${Id}`,{
            nama,
            alamat,
            no_telp,
            jenis_kelamin,
            tanggal_daftar,
            golongan_darah,
            kode_penyakit,
            kode_kamar,
            kode_biaya
        })
        .then(res => {
            console.log(res.data);
            history.push('/pasien?page=1&limit=10');
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getpenyakit = () => {
        axios.get(process.env.REACT_APP_API_LINK + 'penyakit')
        .then(res => {
            console.log(res);
            setPenyakit(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getkamar = () => {
        axios.get(process.env.REACT_APP_API_LINK + 'kamar')
        .then(res => {
            console.log(res);
            setKamar(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    

    const getbiaya = () => {
        axios.get(process.env.REACT_APP_API_LINK + 'biaya')
        .then(res => {
            console.log(res);
            setBiaya(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(()=>{
        getpenyakit();
        getkamar();
        getbiaya();
        getPasien();
        autorization();
        getRoles();
    },[])

    const getPasien = () => {
        axios.get(process.env.REACT_APP_API_LINK + `pasien/${Id}`)
        .then(res => {
            setNama(res.data.nama);
            setAlamat(res.data.alamat);
            setNo_telp(res.data.no_telp);
            setJenis_kelamin(res.data.jenis_kelamin);
            setTanggal_daftar(res.data.tanggal_daftar);
            setGolongan_darah(res.data.Golongan_darah);
            setKode_penyakit(res.data.kode_penyakit);
            setKode_kamar(res.data.kode_kamar);
            setKode_biaya(res.data.kode_biaya);

        })
        .catch(err => {
            console.log(err);
        })
    }

    if(localStorage.getItem('token') === null){
        history.push('/');
    }

    if(role === 'pasien'){
        return <Redirect to='/home'/>
    }
     // form edit data pasien admin
    return(
        <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="row"  style={{"padding-top":"2rem"}}>
                        <div className="box">
                            <h1>Pasien</h1>
                                <Form onSubmit={handleSubmit}>
                                        <div className="d-flex flex-column">
                                            {/* nama */}
                                            <label>Nama Pasien: </label>
                                            <Form.Control style={{"padding":"0.25rem"}} id="form-input"type="text" value={nama} onChange={(e)=> setNama(e.target.value)} placeholder="Nama pasien" /><br/>
                                            {/* no telepon */}
                                            <label>No Telepon:</label>
                                            <Form.Control style={{"padding":"0.25rem"}} id="form-input" type="text" value={no_telp} onChange={(e)=> setNo_telp(e.target.value)} placeholder="no telepon" /><br/>
                                            {/* tanggal daftar */}
                                            <label>Tanggal Daftar</label>
                                            <Form.Control style={{"padding":"0.25rem"}} id="form-input" type="date" value={tanggal_daftar} onChange={(e)=> setTanggal_daftar(e.target.value)} placeholder="name@example.com" /> <br/>
                                            {/* pilih jenis_kelamin */}
                                            <label>Jenis Kelamin:</label>
                                                        <Form.Select style={{"padding":"0.25rem"}} id="form-input" size="sm" value={jenis_kelamin} onChange={(e)=> setJenis_kelamin(e.target.value)}>
                                                            <option value="">Pilih Jenis Kelamin</option>
                                                            <option value="L">Laki-Laki</option>
                                                            <option value="P">Perempuan</option>
                                                        </Form.Select>
                                                <br/>
                                            {/* pilih biaya */}
                                            <div className="d-flex flex-row justify-content-between">
                                                    <div className='item-flex'>
                                                        <label>Biaya:</label>
                                                        <Form.Select style={{"padding":"0.25rem"}} id="form-input" size="sm" value={kode_biaya} onChange={(e)=> setKode_biaya(e.target.value)}>
                                                            <option value="">Pilih Biaya</option>
                                                            {biaya.map(item => {
                                                                return(
                                                                    <option key={item.kode_biaya} id="form-input" value={item._id}>{item.nama_biaya}</option>
                                                                )
                                                            })}
                                                        </Form.Select>
                                                    </div>
                                                    {/* pilih Kamar */}
                                                    <div className='item-flex'>
                                                        <label>Kamar:</label>
                                                        <Form.Select style={{"padding":"0.25rem"}} id="form-input" size="sm" value={kode_kamar} onChange={(e)=> setKode_kamar(e.target.value)}>
                                                            <option value="">Pilih Kamar</option>
                                                            {kamar.map(item => {
                                                                return(
                                                                    <option key={item.kode_kamar} id="form-input" value={item._id}>{item.nama_kamar}</option>
                                                                )
                                                            })}
                                                        </Form.Select>
                                                    </div>
                                            </div><br/>
                                                <div className="d-flex flex-row justify-content-between">
                                                    <div className='item-flex'>
                                                        {/* pilih penyakit */}
                                                            <label>Penyakit:</label>
                                                            <Form.Select style={{"padding":"0.25rem"}} id="form-input" size="sm" value={kode_penyakit} onChange={(e)=> setKode_penyakit(e.target.value)}>
                                                                <option value="-">Pilih Penyakit</option>
                                                                {penyakit.map(item => {
                                                                    return(
                                                                        <option key={item._id} value={item._id}>{item.nama_penyakit}</option>
                                                                    )
                                                                })}
                                                            </Form.Select>
                                                    </div>
                                                    <div className='item-flex'>
                                                        {/* pilih golongan_darah */}
                                                            <label>Golongan Darah:</label>
                                                            <Form.Select style={{"padding":"0.25rem"}} id="form-input" size="sm" value={golongan_darah} onChange={(e)=> setGolongan_darah(e.target.value)}>
                                                                <option Value="">Pilih G_darah</option>
                                                                <option Value="A">A</option>
                                                                <option Value="B">B</option>
                                                                <option Value="AB">AB</option>
                                                                <option Value="O">O</option>
                                                            </Form.Select>
                                                    </div>
                                                </div><br/>

                                            {/* alamat */}
                                            <label>Alamat:</label> 
                                            <Form.Control style={{"padding":"0.25rem"}} id="form-input" type="text" value={alamat} onChange={(e)=> setAlamat(e.target.value)} placeholder="alamat" /><br/>

                                            <div className="d-flex flex-row-reverse">
                                                <div className="p-2"><button type="submit" className="btn btn-primary" size="sm">Tambah</button></div>
                                                <div className="p-2"><Link to={`/pasien`} className="btn btn-primary" >Batal</Link>{' '}</div>
                                            </div>
                                        </div>
                                    </Form>
                        </div>
                    </div>
                </div>
            </div>
    );

}
export default U_pasien;
