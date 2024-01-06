import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import style from "./orderS.module.css"
import Head2 from "../head";

const Orders = () => {
    const [orderList, setorderList] = useState([])
    // const params = useParams()
    
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        console.log(userId);
        getOrders()
    },[])
    const handleApprove = (id)=> {
        axios.put(`http://localhost:3001/orders/updateStatus/Approved/${id}`)
        .then (response => {
            getOrders()
        })
    }
    const handleReject = (id)=> {
        axios.put(`http://localhost:3001/orders/updateStatus/Rejected/${id}`)
        .then (response => {
            getOrders()
        })   
    }

    function getOrders (){
        axios.get("http://localhost:3001/orders/orderList")
        .then(response => {
            const data = response.data
            console.log(data);
            setorderList(data)

        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        <>    
            <Head2/>        
            <Table cellSpacing = "5" border="1" className={style.table}>
            <thead>
                <tr>
                    <th>USER ID</th>
                    <th>ORDER ID</th>
                    <th>PRODUCT ID</th>
                    <th>MODE</th>
                    <th>TOTAL AMOUNT</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
            {
                orderList.map(item => {
                    return(
                        <>  
                            <tr>
                                <td><h1>{item.userId}</h1></td>
                                <td><h1>{item.orderId}</h1></td>
                                <td><h1>{item.productId}</h1></td>
                                <td> <h1>{item.mode}</h1></td>
                                <td><h1>{item.totalAmount}</h1></td>
                                <td>
                                    {
                                        item.status === "Pending" ?
                                        <div>
                                            <button onClick={()=>handleApprove(item.orderId)}>APPROVE</button>
                                            <button onClick={()=>handleReject(item.orderId)}>REJECT</button>
                                        </div>:
                                        <h1>{item.status}</h1>
                                    }
                                </td>
                            </tr>                                              
                        </>
                    )
                })
            }

            </tbody>
        </Table>
            


        </>
    )
}

export default Orders