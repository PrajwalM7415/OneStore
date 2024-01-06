import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { Table } from "react-bootstrap";
import style from "./userDetails.module.css"
import Head2 from "../head";
const UserDetails = () => {
    const [userList, setUserList] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/user/userdetails")
        .then(res => {
            setUserList(res.data)
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return( 
        <>  
        <Head2/>
            <h1 className={style.h1}>USER DETAILS</h1>
                <div className={style.table}>
            <Table cellSpacing="5" border="3" >
                <thead>
                    <tr className={style.head}>
                        <th>SLNO</th>
                        <th>FIRSTNAME</th>
                        <th>LASTNAME</th>
                        <th>DOB</th>
                        <th>ADDRESS</th>
                        <th>COUNTRY</th>
                        <th>EMAIL</th>
                        <th>PHNO</th>
                        <th>PASSWORD</th>
                    </tr>
                </thead>
                <tbody>
                {
                userList.map(item => {
                    return(
                        <>
                            <tr>
                            <td><h1>{item.USER_SLNO}</h1></td>
                            <td><h1>{item.USER_FIRSTNAME}</h1></td>
                            <td><h1>{item.USER_LASTNAME}</h1></td>
                            <td><h1>{item.USER_DOB}</h1></td>
                            <td><h1>{item.USER_ADDRESS}</h1></td>
                            <td><h1>{item.USER_COUNTRY}</h1></td>
                            <td><h1>{item.USER_EMAIL}</h1></td>
                            <td><h1>{item.USER_PHNO}</h1></td>
                            <td><h1>{item.USER_PASSWORD}</h1></td>
                            </tr>
                        </>
                    )
                })
            }
                </tbody>
            </Table>
            </div>
            

        </>
    )
}
export default UserDetails