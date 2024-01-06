import React from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import style from "./userView.module.css"
import Head from "../../headerComponents/Homepage";
const UserView = () =>{
    const [productList, setProductList] = useState([])
    const [valid,setvalid] =useState(false)

    const params = useParams()
    useEffect(() => {
        const {slno} = params
        axios.get(`http://localhost:3001/product/viewProduct/${slno}`)
        .then(response => {
            const data = response.data
            console.log(data);
            setProductList(data)
        })
        .catch(err => {
            console.log(err);
        })
    },[params])

    const handleAddToCart = (id) => {
        if (localStorage.getItem("cartids")) {
            const updateIds = localStorage.getItem("cartids").split(",")
            if(updateIds.includes(id.toString())){
                return alert("ITEM ALREADY ADDED TO CART")
            }else{
                updateIds.push(id)
                localStorage.setItem("cartids", updateIds.toString()) 
                alert ("ITEM ADDED TO CART")
                
            }          
        }else{
            localStorage.setItem("cartids", id.toString())           
        }

    }
    const handleAddTobuy = (id) => {
        if (localStorage.getItem("cartids")) {
            const updateIds = localStorage.getItem("cartids").split(",")
            if(updateIds.includes(id.toString())){
                setvalid(true)
            }else{
                updateIds.push(id)
                localStorage.setItem("cartids", updateIds.toString()) 
                setvalid(true)
            }          
        }else{
            localStorage.setItem("cartids", id.toString())           
        }

    }

    if(valid){
        return <Navigate to="/cart"/>;
    }

    return(
        <>
            <Head/> 
            <div className={style.bg}>
            {
            
            productList.map(item => {
                return(
                    <>  
                        <div className={style.div1}>
                            <label className={style.pname}>{item.productName}</label>
                        </div><br></br><br></br>  <br></br><br></br>  
                        <div className={style.flex}>
                            <div className={style.img}>
                                <img alt="" src={item.productImagePath} />
                            </div>
                            <div className={style.div2} >
                                <label className={style.head}>{item.productHeading}</label><br></br><br></br>
                                <label className={style.amt}>{item.productAmt+'RS'}</label><br></br><br></br>   
                                <button onClick={() => handleAddTobuy(item.slno)} className={style.but} >BUY NOW</button>&emsp;
                                <button onClick={() => handleAddToCart(item.slno)} className={style.but}>ADD TO CART</button>
                            </div>
                        </div>
                        <div>
                            <h1 className={style.des1}><mark>DESCRIPTION</mark></h1><p className={style.des}>{item.productDes}</p>
                        </div>
                    </>
                )
                
            })
        }
        </div>
            
        </>
    )
}

export default UserView