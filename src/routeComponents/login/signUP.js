import { NavLink ,Navigate } from "react-router-dom";
import style from "../login/signUp.module.css";
import { useState } from "react";
import axios from "axios";
const SignUp = () => {

    const [ first ,setFirstName] = useState("")
    const [ last ,setLastName] = useState("")
    const [ Address ,setAddress] = useState("")
    const [ email ,setEmail] = useState("")
    const [ phno ,setPhNo] = useState("")
    const [ password ,setPassword] = useState("")
    const [ repassword ,setRePassword] = useState("")
    const [validUser,setValidUser] = useState(false)

    
    function handleChangeFirst(e){
        setFirstName(e.target.value);
    }
    function handleChangeLast(e){
        setLastName(e.target.value);
    }
    function handleChangeEmail(e){
        setEmail(e.target.value);
    }
    function handleChangeAddress(e){
        setAddress(e.target.value);
    }
    function handleChangePhNo(e){
        setPhNo(e.target.value);
    }
    function handleChangePass(e){
        setPassword(e.target.value);
    }
    function handleChangeRePass(e){
        setRePassword(e.target.value);
    }
    const handlesubmit = () =>{
        if(first === "" ) return alert ("please enter your first name")
        if(last === "" ) return alert ("please enter your last name")
        if(Address === "" ) return alert ("please enter your Address")
        if(email === "" ) return alert ("please enter your email")
        if( phno === "" ) return alert ("please enter your Phone Number")
        if(password === "" ) return alert ("create your password")
        if(repassword === "" ) return alert ("re-enter your password")
        if(password !== repassword) return alert ("password didnt match")
        if(phno.length < 10 || phno.length > 10 ) return alert ("phone number incorrect")
        if(password.length < 6 || password.length > 20 ) return alert ("password too small ")
        if(!validateEmail(email)) return alert("Invalid Email")
        if(!validatePass(password)) return alert("Password must contain UpperCase, LowerCase, SpecialCharacter")

        


        console.log(first,last,Address,email,phno,password,repassword);
        
        let SignUpObj = {
            SignUpDetails : "SIGNED-IN",
            FirstName : first,
            LastName : last,
            Address : Address,
            Email : email,
            PhoneNumber : phno,
            Password : password,
            RePassword : repassword

        }
         axios.post("http://localhost:3001/user/signup",SignUpObj)
        .then(response => {
            alert ("REGISTER SUCCESSFULL")
            setValidUser(true)
        })
        .catch(err => {
            alert("REGISTRATION FAILED")
        })
    
          
    }
    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const validatePass =(password) =>{
        return String(password)
        .match(passw);
    }
    if(validUser ) {
        return <Navigate to="/login"  /> 
    }
    


    return(
            <div className={style.body}>
                
                <br/>
                <h1 className={style.h1}>ONESTORE<svg className={style.V3C5bO} xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-handbag" viewBox="0 0 16 16"> <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/> </svg></h1>
                <div className={style.border} >
                    <h2 className={style.h2}><center>REGISTER</center></h2><br/>
                    <div className={style.info}>
                        <label>First name &nbsp; <input type="text" placeholder="enter first name" name="first"onChange={handleChangeFirst} value={first}/></label>&emsp;<br/><br/>
                        <label>Last name &nbsp; <input type="text" placeholder="enter last name" name="last"onChange={handleChangeLast} value={last}/></label>&nbsp;&emsp;<br/><br/>
                        <label>Enter Address&nbsp;<input type="text" placeholder="Enter Address" name="Address"onChange={handleChangeAddress} value={Address}/></label><br/><br/>                    
                        
                        <label>Email &nbsp; <input type="email" placeholder="enter email "name="email"onChange={handleChangeEmail} value={email}/></label>&nbsp;&emsp;<br/><br/>
                        
                        <label>Phone no &nbsp;<input type="number" placeholder="PH NO" name="phno"onChange={handleChangePhNo} value={phno}/> </label><br/><br/>
                        
                        <label>Create password &nbsp;<input type="password" placeholder="Enter password" onChange={handleChangePass} value={password}/> </label><br/><br/>
                        
                        <label>Re-enter password &nbsp;<input type="text" placeholder="Enter password" onChange={handleChangeRePass} value={repassword}/> </label><br/><br/>
                       

                    
                    
                       
                                <button onClick={handlesubmit} className={style.button} >Create Account&nbsp;</button >&emsp;&emsp;

                        <NavLink to="/"><button className={style.button}>Cancel</button></NavLink>
                        </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>             
            </div>
    )
}

export default SignUp