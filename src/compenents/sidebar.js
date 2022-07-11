

//import react-icons
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';



export const SidebarData = [
    //home
    {
        title: 'Home',
        path:  `/home`, 
        icon: <AiIcons.AiFillHome  size={25}/>,
        cName: 'nav-text'
    },


    //pasien
    {
        title: 'Pasien',
        path:  `/pasien?page=1&limit=10`, 
        icon: <FaIcons.FaUserAlt size={20}/>,
        cName: 'nav-text'
    },

    //profile
    {
        title: 'Profile',
        path:  `/U_profile`,
        icon: <BsIcons.BsFillPersonLinesFill size={25} />,
        cName: 'nav-text'
    },

 

   
]


//sidebar admin
export const SidebarAdmin = [
     //penyakit
     {
        title: 'Penyakit',
        path: '/penyakit?page=1&limit=10',
        icon: <FaIcons.FaDisease size={25}/>,
        cName: 'nav-text'
    },

    //kamar
    {
        title: 'Kamar',
        path:  `/kamar?page=1&limit=10`, 
        icon: <IoIcons.IoIosBed size={25} />,
        cName: 'nav-text'
    },

    //biaya
    {
        title: 'biaya',
        path:  `/biaya?page=1&limit=10`, 
        icon: <FaIcons.FaMoneyBill size={25} />,
        cName: 'nav-text'
    },
]

    //pasien
    export const logout = [

    //logout
    {
        title: 'Logout',
        path:  `/`,
        icon: <IoIcons.IoIosLogOut size={29}/>,
        cName: 'nav-text'
    }
    ]