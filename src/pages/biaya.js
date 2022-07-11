import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory,useParams, Link,Redirect,useLocation} from 'react-router-dom';
import Navbar from "../compenents/navbar";
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert';
import currencyFormatter  from 'currency-formatter';

//import react boostrap
import {Card} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';

//import react-icons
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';

function Biaya(){
    const [biaya,setBiaya] = useState([]);
    const [search,setSearch] = useState('');
    const [role,setRole] = useState('');
    const [sort,setSort] = useState('');
    const [currentPage,setCurrentPage] = useState(parseInt("")|| sessionStorage.getItem('page'));
    const [postsPerPage,setPostsPerPage] = useState(parseInt("")|| sessionStorage.getItem('limit'));
    const history = useHistory();
    const Id = localStorage.getItem('id')
    const location = useLocation();
    const pagination = "?page="+new URLSearchParams(location.search).get('page')+"&limit="+new URLSearchParams(location.search).get('limit');
    const Nama = "&search="+new URLSearchParams(location.search).get('search');
    const reqSearch = new URLSearchParams(location.search).get('search');
    sessionStorage.setItem('page',new URLSearchParams(location.search).get('page'));
    sessionStorage.setItem('limit',new URLSearchParams(location.search).get('limit'));

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
        setRole(CryptoJS.AES.decrypt(localStorage.getItem('role'),'secret key 123').toString(CryptoJS.enc.Utf8));
    }

    const next = () => {
        history.push(reqSearch?'/biaya?page='+(parseInt(currentPage)+1)+'&limit='+sessionStorage.getItem('limit')+ Nama:'/biaya?page='+(parseInt(currentPage)+1)+'&limit='+sessionStorage.getItem('limit'));
        window.location.reload();
    }

    const current = () => {
        history.push(reqSearch?'/biaya?page='+(parseInt(currentPage))+'&limit='+sessionStorage.getItem('limit')+ Nama:'/biaya?page='+(parseInt(currentPage))+'&limit='+sessionStorage.getItem('limit'));
        window.location.reload();
    }

    const prev = () => {
        history.push(reqSearch?'/biaya?page='+(parseInt(currentPage)-1)+'&limit='+sessionStorage.getItem('limit')+ Nama:'/biaya?page='+(parseInt(currentPage)-1)+'&limit='+sessionStorage.getItem('limit'));
        window.location.reload();
    }

    const getbiayaPagination = () => {
        if (search === ''){
            history.push(`/penyakit?page=${currentPage}&limit=${postsPerPage}`)
        }
        else{
             history.push(`/penyakit?page=${currentPage}&limit=${postsPerPage}&search=${search}`)
        }
        window.location.reload();
    }

    useEffect(()=>{
        getBiaya();
        autorization();
        getRoles();
    },[])

    const getBiaya = () => {
        if (new URLSearchParams(location.search).get('search') === null){
            axios.get(process.env.REACT_APP_API_LINK+`biaya${pagination}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }})
            .then(res => {
                setBiaya(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
        else{
            axios.get(process.env.REACT_APP_API_LINK+`biaya${pagination}${Nama}`,{
                    headers: {
                        "x-access-token": localStorage.getItem('token')
                    }})
                .then(res => {
                    setBiaya(res.data);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const deleteBiaya = (id) => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(process.env.REACT_APP_API_LINK+`/biaya/delete/${id}`)
                        .then(res => {
                            console.log(res.data);
                            getBiaya();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }      
                },
                {
                    label: 'No'
                }
            ]});
    }

    if(localStorage.getItem('token') === null){
        history.push('/');
    }
    
    if (role === 'pasien') {
        return <Redirect to='/pasien' />
    }
    else {
        return(
            <div>
                <Navbar />
                <div className="container-fluid">

                    {/* header pasien */}
                        <div className="d-flex justify-content-between">
                            <div className="p-2 col-example text-left">
                                <div className="header">
                                    <h1>Biaya</h1>
                                </div>
                            </div>

                            {/* fitur tambah data */}
                            {role === 'admin' || role === 'perawat' ?
                            <div className="p-2 col-example text-left">
                                <Link to={`/t_biaya`} className="btn btn-primary" size="sm">Tambah Data</Link>{' '}
                            </div>
                            : null}
                        </div>
                        <br />
                    
                        {/* fitur filter */}
                        <div className="d-flex justify-content-between">
                            <div className="p-2 col-example text-left">
                                <div className="d-flex flex-row">
                                    <div className="p-2">Filter:</div>
                                    <div className="p-2">
                                        <Form.Select value={sort} onChange={(e) => setSort(e.target.value)} size="sm">
                                            <option>select</option>
                                            <option value="nama_biaya">Nama</option>
                                            <option value="harga">Harga</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            </div>

                        {/* fitur cari */}
                        <div className="p-2 col-example text-left">
                                <div className="d-flex flex-row-reverse">
                                    <div className="p">
                                        <Button variant="btn btn-primary" onClick={getbiayaPagination} size="sm"><BsIcons.BsSearch /></Button>{' '}
                                    </div>
                                    <div className="p-3">
                                        <Form.Control size="sm" value={search} onChange={(e)=> setSearch(e.target.value)} type="text" placeholder="Cari" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* tabel data biaya */}
                            <div class="table-responsive">
                            <Table class="table align-middle mb-0 bg-white">
                                <thead class="bg-light">
                                        <tr className="header-tabel">
                                            <th>No</th>
                                            <th>Nama Biaya</th>
                                            <th>Harga</th>
                                            <th>Deskripsi</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {biaya
                                        .sort((a,b) => {
                                            if(sort === 'nama_biaya'){
                                                return a.nama_biaya > b.nama_biaya ? 1 : -1
                                            }
                                            else if(sort === 'harga'){
                                                return a.harga > b.harga ? 1 : -1
                                            }
                                        })
                                        .map((item,index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{item.nama_biaya}</td>
                                                    <td>{currencyFormatter.format(item.harga,{code: 'IDR'})}</td>
                                                    <td className='deskripsi'>{item.deskripsi}</td>
                                                    {role === 'admin' &&
                                                    <td>
                                                        <Link to={`biaya/edit/${item._id}`} className="btn btn-outline-primary"><MdIcons.MdEdit /></Link>
                                                        <button type="submit" className="btn btn-outline-danger" onClick={() => deleteBiaya(item._id)}><MdIcons.MdDelete /></button>
                                                    </td>
                                                    }
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="d-flex justify-content-center p-3">
                                <div className="btn-group">
                                    <button className="btn" onClick={prev}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                    </svg>
                                    </button>
                                    <button className="btn" onClick={current}>{currentPage}</button>
                                    <button className="btn" onClick={next}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
        )
    }

}

export default Biaya;