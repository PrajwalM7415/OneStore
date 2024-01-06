import React, { useState } from "react";
import style from "../headerComponents/homepage.module.css"
import { NavLink } from "react-router-dom";


const Head = () => {
    return (
        <>
            <div className={style.Appname}>
            
                <div>   
                    <NavLink className={style.name} to="/home">
                    <h1 className={style.info}>ONESTORE<svg className={style.V3C5bO} xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-handbag" viewBox="0 0 16 16"> <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/> </svg></h1>
                    </NavLink>
                </div>
                <div className={style.float}>
                    <NavLink className={style.name} to="/userOrders"> <h3 className={style.conus}>My Orders</h3></NavLink>
                    <NavLink className={style.name} to="/contactus" ><h3 className={style.conus}>Contact us</h3></NavLink>
                    <NavLink className={style.cart} to="/cart"> 
                    <div className={style.border}>
                        <a ><h3 className={style.kart}>Cart<svg className={style.V3C5bO} width="25" height="25" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path className="_1bS9ic" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path></svg></h3></a>
                    </div>
                    </NavLink>
                    <NavLink className={style.name} to="/"><h3 className={style.conus}>LOGOUT</h3></NavLink>
                </div>
                
            </div>
        </>
    )
}

export default Head