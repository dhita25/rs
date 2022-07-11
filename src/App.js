import React,{useState,useEffect} from "react";

//import react-router-dom
import { Switch, Route } from "react-router-dom";

//import Auth
import Login from "./pages/login";
import Reset from "./pages/reset";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotpassword";
import Verifikasi from "./pages/verifikasi";

//import pages
import Home from "./pages/home";
import Pasien from "./pages/pasien";
import Penyakit from "./pages/penyakit";
import Kamar from "./pages/kamar";
import Biaya from "./pages/biaya";
import T_pasien from "./pages/post/pasien/t_pasien";
import T_penyakit from "./pages/post/penyakit/t_penyakit";
import T_kamar from "./pages/post/kamar/t_kamar";
import T_biaya from "./pages/post/biaya/t_biaya";
import U_pasien from "./pages/post/pasien/updatePasien";
import U_pasienbyname from "./pages/post/pasien/updatepasienbyname";
import U_penyakit from "./pages/post/penyakit/updatePenyakit";
import U_kamar from "./pages/post/kamar/updateKamar";
import U_biaya from "./pages/post/biaya/updateBiaya";
import U_profile from "./pages/UpdateProfile";



function App() {
  const [isDC, setIsDC] = useState(false);
  const connectionCheck = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      setInterval(() => {
        fetch('//google.com',{
          mode: 'no-cors'
        }).then(()=> setIsDC(false)).catch(()=> setIsDC(true));
      }, 5000);
      return;
    } 
      setIsDC(false);
  }

  useEffect(() => {
    connectionCheck();
    window.addEventListener("online", connectionCheck);
    window.addEventListener("offline", connectionCheck);
  }, []);

  return isDC ? <h1 style={{"text-align":"center"}}>Koneksi kamu terputus</h1> : (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/reset/:token" component={Reset} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/pasien" component={Pasien} />
        <Route exact path="/penyakit" component={Penyakit} />
        <Route exact path="/kamar" component={Kamar} />
        <Route exact path="/biaya" component={Biaya} />
        <Route exact path="/t_pasien" component={T_pasien} />
        <Route exact path="/t_penyakit" component={T_penyakit} />
        <Route exact path="/t_kamar" component={T_kamar} />
        <Route exact path="/t_biaya" component={T_biaya} />
        <Route exact path="/pasien/edit/:Id" component={U_pasien} />
        <Route exact path="/pasien/Editdata/:name" component={U_pasienbyname} />
        <Route exact path="/penyakit/edit/:Id" component={U_penyakit} />
        <Route exact path="/kamar/edit/:Id" component={U_kamar} />
        <Route exact path="/biaya/edit/:Id" component={U_biaya} />
        <Route exact path="/u_profile" component={U_profile} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/verifikasi/:token" component={Verifikasi} />

      </Switch>
    </div>
  );
}

export default App;
