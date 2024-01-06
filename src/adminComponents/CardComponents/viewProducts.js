import { Table } from "react-bootstrap";
import style from "./viewProducts.module.css"
import axios from "axios";
import { useState, useEffect,React } from "react";
import { NavLink } from "react-router-dom";
import Head2 from "../head";

const ViewProducts = () => {
    const [productList, setProductList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/product/getAllProducts")
        .then(res => {
            setProductList(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const handleDelete = (slno) => {      
        axios.delete(`http://localhost:3001/product/deleteUser/${slno}`)
        .then(response => {
            console.log(response);
            window.location.reload();

        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        <>
            <Head2/>
            <div className={style.table}>
            <Table cellspacing="5" border="5" >
                
                <thead>
                    <tr>
                        <th>slno</th>
                        <th>productImagePath</th>
                        <th>productName</th>
                        <th>productId</th>
                        <th>productQty</th>
                        <th>productAmt</th>
                        <th>productHeading</th>
                        <th>productDes</th>
                        <th>productCategory</th>
                        <th>UPDATE OR DELETE</th>
                    </tr>
                </thead>
                <tbody>
                        {productList.map(item => {
                            const {slno, productImagePath, productName, productId, productQty, productAmt, productHeading, productDes, productCategory} = item
                                return(
                                    <>
                                        <tr>
                                        <td><label className={style.label}>{slno}</label></td>
                                        <td><img className={style.img} src={productImagePath} /></td>
                                        <td><label className={style.label}>{productName}</label></td>
                                        <td><label className={style.label}>{productId}</label></td>
                                        <td><label className={style.label}>{productQty}</label></td>
                                        <td><label className={style.label}>{productAmt}</label></td>
                                        <td><label className={style.label}>{productHeading}</label></td>
                                        <td  ><label className={style.des}>{productDes}</label></td>
                                        <td><label >{productCategory}</label></td>
                                        <div className={style.button}>
                                        <td ><NavLink to={`/admin/updateProducts/${slno}`}>UPDATE</NavLink>&nbsp;<button onClick={()=> handleDelete(slno)}>DELETE</button></td>
                                        </div>
                                        </tr>
                                    </>
                                )}
                            )
                        }
                                    
                   

                </tbody>
                
            </Table>
            </div>
        </>
    )
}

export default ViewProducts