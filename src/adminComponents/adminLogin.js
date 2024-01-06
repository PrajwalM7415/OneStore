import style from './adminLogin.module.css'
import myImage from "./5.jpg";
import axios from 'axios';
import {  useState } from "react";
import { Navigate, NavLink } from 'react-router-dom';




const AdminLogin = () => {
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [validUser,setValidUser] = useState(false)
    

    function handleChangeUSer(e){
        setUserName(e.target.value);

    }
    function handleChangePass(e){
        setPassword(e.target.value);

    }
    
    const handleClickBtn =()=>{
        if(userName === "" ) return alert ("please enter your email")

        if(password === "" ) return alert ("password is empty")
        
        console.log(userName,password);
        let adminInputObj = { 
            adminLoginDetails : "ADMIN LOGGED IN",
            name : userName,
            password : password,
        }
        axios.post("http://localhost:3001/user/adminLogin",adminInputObj)
        .then(response => {
            alert ("LOGIN SUCCESSFULL")
            const user = response.data[0]
            localStorage.setItem("name", user.username)
            localStorage.setItem("slno", user.adminid)
            // localStorage.removeItem("name")
            // localStorage.getItem("name")
            setValidUser(true)
        })
        .catch(err => {
            alert("ADMIN NOT FOUND or WRONG PASSWORD")
        })
    }

    if(validUser ) {
        return <Navigate to="/admin/home"  /> 
    }

    return(
        <div>
        <div className={style.bg} >
            <div>
            <h1 className={style.h1}>ONESTORE<svg className={style.V3C5bO} xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-handbag" viewBox="0 0 16 16"> <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/> </svg></h1>
                
            </div>
        <div className={style.border}>
            <div>
                <img src={myImage} className={style.img}></img>
            </div>
            
                <div className={style.page}>
                    
                    <h1 className={style.content}>LOG-IN</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                    <label className={style.usd} >Enter Email &emsp;&emsp;&emsp;<input className={style.pus} type="text" placeholder="enter email" onChange={handleChangeUSer} value={userName} /></label><br/><br/>
                    <label className={style.usd} >Enter Password &emsp; &emsp;<input  className={style.pus} type="password" placeholder="enter password" onChange={handleChangePass} value={password} /></label><br/><br/><br/>
                    
         
                    &emsp;&emsp;&emsp;&emsp; <button  className={style.button} onClick={handleClickBtn}>Login</button>&emsp;
                    
                    <NavLink to="/login"  className={style.button4} >User Login</NavLink>
                            
                </div>

            
            
        </div>
        <div >
            <h1 className={style.des}>designed by &#10084;</h1>
            
        </div>
     </div> 
     </div> 
    
    )
}


export default AdminLogin