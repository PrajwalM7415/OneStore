import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Head from "../../headerComponents/Homepage";
import { Table } from "react-bootstrap";
import style from "./userOrders.module.css"


const UserOrders = () => {
    const [orderList, setorderList] = useState([])
    // const params = useParams()
    
    useEffect(() => {

        getOrders()
    },[])

    async function handleProductId (id){
        const idArray = id.split(",")
        console.log(idArray);
        let names = []
        for (const id of idArray) {
            const response = await axios.get(`http://localhost:3001/product/getSelectedProduct/${id}`)
            names.push(response.data[0].productName)

        }
        return names.toString()

    }
    function getOrders(){
        const userId = localStorage.getItem("userId")
        axios.get(`http://localhost:3001/orders/order/${userId}`)
        .then(async response => {
            const data = response.data
            console.log(data);
            const arr = []
            for (const item of data) {
                const {orderId,productId,mode,totalAmount,status}= item
                let obj ={orderId,productName : await handleProductId(productId),mode,totalAmount,status}
                arr.push(obj)
            }
            setorderList(arr)

        })
        .catch(err => {
            console.log(err);
        })
    }
    const handleCancel = (id)=> {
        axios.put(`http://localhost:3001/orders/updateStatus/Cancelled/${id}`)
        .then (response => {
            getOrders()
        })   
    }
    return(
        <>
            <Head/>
            <Table cellSpacing = "10" border="2" className={style.table}>
                <thead>
                    <tr>
                        <th>ORDER ID</th>
                        <th>PRODUCT NAME</th>
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
                                <td><h1>{item.orderId}</h1></td>
                                <td><h1>{item.productName}</h1></td>
                                <td><h1>{item.mode}</h1></td>
                                <td><h1>{item.totalAmount}</h1></td>
                                <td>
                                    {
                                        item.status === "Pending"?
                                        <div>
                                            <button onClick={()=>{handleCancel(item.orderId)}}>CANCEL</button>
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

export default UserOrders