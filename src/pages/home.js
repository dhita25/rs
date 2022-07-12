import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory} from 'react-router-dom';
import Navbar from "../compenents/navbar";
import axios from 'axios';

//import boostrap
import {Card, ListGroup} from 'react-bootstrap';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';

//import css
import"../App.css";


function Home(){
    const [name,setName] = useState('');
    const history = useHistory();  

    const autorization = () => {
        axios.get(process.env.REACT_APP_API_LINK + `authenticated`,{
            headers: {
                "x-access-token": localStorage.getItem('token')
            }})
        .then(res => {
            if(res.data.auth === false){
                history.push('/');
            }
        })
        .catch(err => {
            console.log(err.response.message);
        })
    }


    const getName = () => {
        const Id = localStorage.getItem('id');
        axios.get(process.env.REACT_APP_API_LINK + `user/${Id}`)
        .then(res => {
            setName(res.data.nama_awal);
        })
        .catch(err => {
            console.log(err);
        }
        )

    
    }

    useEffect(() => {
        getName();
        autorization();
    });

    const showDate = () => {
        var today = new Date();
        var getMonth = today.getMonth() + 1;
        var date = today.getDate() + "/" + getMonth + "/" + today.getFullYear() + "," + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date;
    }

      if(localStorage.getItem('token') === null){
        history.push('/');
    }

    return(
        <div className="home">
            <Navbar /> 
            <div className="container-fluid">
                {/* header welcome */}
                <div className="header">
                    <h1>Welcome {name}</h1>
                    <h3 id="date">{showDate()}</h3>
                <br/>
                <div className="d-flex justify-content-between">
                    <div className="flex-div">
                        <div className="p-2 col-example text-left">
                            {/* Card header jumlah pasien */}
                            <Card.Header style={{'border-radius':'1rem'}}  >
                                <h4 style={{color:'#48D1CC	',textAlign:'center'}}>Jumlah Pasien</h4>
                                <div className="d-flex justify-content-center">
                                    <div className="p-1 col-example text-left" ><IoIcons.IoIosPerson style={{color:'#48D1CC'}} className="iconsDs" /></div>
                                    <div className="p-2 col-example text-left"> <p className="p"> 20 Orang</p></div>
                                </div>
                            </Card.Header>
                        </div>
                    </div>
                    <div className="flex-div">
                        <div className="p-2 col-example text-left">
                            {/* Card header total kamar */}
                            <Card.Header style={{'border-radius':'1rem'}} >
                                <h4 style={{color:'#663399',textAlign:'center'}}>Total Kamar</h4>
                                <div className="d-flex justify-content-center">
                                    <div className="p-1 col-example text-left"><MdIcons.MdMeetingRoom style={{color:'#663399'}} className="iconsDs" /></div>
                                    <div className="p-2 col-example text-left"> <p className="p">120 Kamar</p></div>
                                </div>
                            </Card.Header>
                        </div>
                    </div>
                    <div className="flex-div">
                        <div className="p-2 col-example text-left">
                            {/* Card header kamar terisi */}
                            <Card.Header style={{'border-radius':'1rem','text-align':'center','background-color':'#33333'}}  >
                                <h4 style={{color:'#008080'}}>Kamar Terisi</h4>
                                <div className="d-flex justify-content-center">
                                    <div className="p-1 col-example text-left"><IoIcons.IoIosBed style={{color:'#008080'}} className="iconsDs" /></div>
                                    <div className="p-2 col-example text-left"> <p  className="p"> 20 Ruangan</p></div>
                                </div>
                            </Card.Header>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="d-flex justify-content-between">
                    <div className="flex-div">
                        <div className="d-flex flex-column">
                            <div className="p-2 col-example text-left">
                                {/* Card  Kamar Terisi*/}
                                <p className='p' style={{textAlign:'center'}} >Kamar Terisi</p>
                                <Card.Header className="cardh" style={{'border-radius':'1rem'}}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-1 col-example text-left" style={{fontSize: '18px'}}>Rawat Inap 1</div>
                                                <div className="p-1 col-example text-left" style={{color:'#EE82EE	'}}><h5>10</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-1 col-example text-left" style={{fontSize: '18px'}}>Rawat Inap 2</div>
                                                <div className="p-1 col-example text-left" style={{color:'#87CEEB	'}}><h5>15</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-1 col-example text-left" style={{fontSize: '18px'}}>  VVIP 1</div>
                                                <div className="p-1 col-example text-left" style={{color:'#6A5ACD	'}}><h5>10</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Header>
                            </div><br/>
                            <div className="p-2 col-example text-left">
                            {/* Card  Jumlah Pasien*/}
                            <p className='p' style={{textAlign:'center'}}>Jumlah Pasien</p>
                                <Card.Header className="cardh" style={{'border-radius':'1rem'}}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-1 col-example text-left" style={{fontSize: '18px'}}>Rawat Inap</div>
                                                <div className="p-1 col-example text-left" style={{color:'#40E0D0	'}}><h5>30</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                               <div className="p-1 col-example text-left" style={{fontSize: '18px'}}>Rawat Jalan</div>
                                                <div className="p-1 col-example text-left" style={{color:'#6A5ACD	'}}><h5>50</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Header>
                            </div>
                        </div>
                    </div>
                    <div className="flex-div">
                    <div className="d-flex flex-column">
                            <div className="p-2 col-example text-left">
                                {/* Card  Urutan Penyakit Terbanyak*/}
                                <p className='p' style={{textAlign:'center'}}>Urutan Penyakit Terbanyak</p>
                                <Card.Header  className="cardh" style={{'border-radius':'1rem'}}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-1 col-example text-left" style={{fontSize: '18px'}}>Demam Berdarah</div>
                                                <div className="p-1 col-example text-left" style={{color:'#FFD700	'}}><h5>1</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-1 col-example text-left" style={{fontSize: '18px'}}>Radang</div>
                                                <div className="p-1 col-example text-left" style={{color:'#C0C0C0	'}}><h5>2</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-1 col-example text-left" style={{fontSize: '18px'}}>Lambung</div>
                                                <div className="p-1 col-example text-left" style={{color:'#D2B48C'}}><h5>3</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Header>
                            </div><br/>
                            <div className="p-2 col-example text-left">
                            {/* Card Nama Dokter*/}
                            <p className='p' style={{textAlign:'center'}}>Nama Dokter</p>
                                <Card.Header  className="cardh" style={{'border-radius':'1rem'}}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-start">
                                                <div className="p-2 col-example text-left"><BsIcons.BsPersonSquare className='dokter'/></div>
                                                <div className="p-2 col-example text-left">Dr Mark</div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-start">
                                                <div className="p-2 col-example text-left"><BsIcons.BsPersonSquare className='dokter'/></div>
                                                <div className="p-2 col-example text-left">Dr Mahen</div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-start">
                                                <div className="p-2 col-example text-left"><BsIcons.BsPersonSquare className='dokter'/></div>
                                                <div className="p-2 col-example text-left">Dr Haikal</div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Header>
                            </div>
                        </div>
                    </div>
                    <div className="flex-div">
                        <div className="d-flex flex-column">
                            <div className="p-2 col-example text-left">
                                {/* Card Jumlah kamar*/}
                                <p className='p' style={{textAlign:'center'}}>Jumlah Kamar</p>
                                <Card.Header  className="cardh" style={{'border-radius':'1rem'}}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-2 col-example text-left" style={{fontSize: '18px'}}>Ruang Inap 1</div>
                                                <div className="p-2 col-example text-left" style={{color:'#40E0D0	'}}><h5>50</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-2 col-example text-left" style={{fontSize: '18px'}}>  Ruang Inap 2</div>
                                                <div className="p-2 col-example text-left" style={{color:'#6A5ACD	'}}><h5>40</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-2 col-example text-left" style={{fontSize: '18px'}}>VVIP 1</div>
                                                <div className="p-2 col-example text-left" style={{color:'#EE82EE	'}}><h5>30</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-2 col-example text-left" style={{fontSize: '18px'}}>VVIP 2</div>
                                                <div className="p-2 col-example text-left" style={{color:'#EE82EE	'}}><h5>20</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div className="p-2 col-example text-left" style={{fontSize: '18px'}}>VVIP 3</div>
                                                <div className="p-2 col-example text-left" style={{color:'#EE82EE	'}}><h5>10</h5></div>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Header>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Home;