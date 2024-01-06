import React, { useState } from "react";
import Head2 from "../head";
import style from "./addProducts.module.css"
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = (props) => {
    const [addImage,setImage] = useState()
    const [prodName,setProdName] = useState("")
    const [prodId,setProdId] = useState("")
    const [prodQty,setprodQty] = useState("")
    const [prodAmt,setprodAmt] = useState("")
    const [prodHead,setprodHead] = useState("")
    const [prodDes,setprodDes] = useState("")
    const [prodCat,setprodCat] = useState("")
    const [updated,setUpdated] = useState(false)
    const params = useParams()

    useEffect(() => {
        const {slno} = params
        axios.get(`http://localhost:3001/product/getSelectedProduct/${slno}`)
        .then(response => {
            console.log(response);
            const data = response.data[0]
            // console.log(data);
            const {productImagePath, productName, productId, productQty, productAmt, productHeading, productDes, productCategory  } = data
            setImage(productImagePath)
            setProdName(productName)
            setProdId(productId)
            setprodQty(productQty)
            setprodAmt(productAmt)
            setprodHead( productHeading)
            setprodDes(productDes)
            setprodCat(productCategory)
        })
        .catch(err => {
            console.log(err);
        })
    },[])
    
    
    function handleImage(e){
        const readImage  = file => {
            const reader = new FileReader();
            reader.addEventListener('load', (res) => {
                setImage(res.target.result)
            })
            reader.readAsDataURL(file);
        }

        const files = e.target.files;
        if (!files || !files[0]) return alert('File upload not supported');
        [...files].forEach( readImage )
    }
    function handleProductName(e){
        setProdName(e.target.value);
    }
    function handleProductId(e){
        setProdId(e.target.value);
    }
    function handleProductQty(e){
        setprodQty(e.target.value);
    }
    function handleProductAmt(e){
        setprodAmt(e.target.value);
    }
    function handleProductDes(e){
        setprodDes(e.target.value);
    }
    function handleProductHead(e){
        setprodHead(e.target.value);
    }
    function handleProductCat(e){
        setprodCat(e.target.value);
    }
    const handleUpdate = () => {
        if(addImage === "" ) return alert ("please enter Product Image")
        if(prodName === "" ) return alert ("please enter Product Name")
        if(prodId === "" ) return alert ("please enter Product ID")
        if(prodQty === "" ) return alert ("please enter Product Quantity")
        if(prodAmt === "" ) return alert ("please enter Product Amount")
        if(prodHead === "" ) return alert ("please enter Product Heading")
        if(prodDes === "" ) return alert ("please enter Product Description")
        if(prodCat === "" ) return alert ("please Select Product Category")
        const {slno} = params
        
        console.log(addImage, prodName, prodId, prodQty, prodAmt, prodHead, prodDes, prodCat, slno);
        let addProducts = { 
            imagePath : addImage,
            productName : prodName,
            productId : prodId,
            productQty : prodQty,
            productAmount : prodAmt,
            productHeading : prodHead,
            productDescription : prodDes,
            productCategory : prodCat,
            slno:slno
        }
        axios.put("http://localhost:3001/product/updateProduct",addProducts)
        .then(response => {
            alert ("ITEM UPDATED SUCCESSFULLY")
            console.log(response)
            setUpdated(true)


        })
    }   

    if(updated) {
        return <Navigate to="/admin/viewProducts"  /> 
    }

    return(
        <>
            <Head2/>
            <div>
                <h1 className={style.h1}>UPDATE ITEMS</h1><br></br><br></br>
                <div className={style.box}>
                    <label className={style.label}>ADD IMAGE &emsp;<input type="file" placeholder="ADD IMAGE" onChange={handleImage}></input></label>
                    <img src={addImage} className={style.UpImg}/><br></br><br></br>
                    <label className={style.label}>PRODUCT NAME &emsp;<input type="text" placeholder="ENTER PRODUCT NAME" onChange={handleProductName} value={prodName} ></input></label>&emsp;&emsp;
                    <label className={style.label}>PRODUCT ID &emsp;<input type="text" placeholder="ENTER PRODUCT ID " onChange={handleProductId} value={prodId}></input></label><br></br><br></br>
                    <label className={style.label}>PRODUCT QTY &emsp;<input type="text" placeholder="ENTER PRODUCT QTY" onChange={handleProductQty} value={prodQty}></input></label>&emsp;&emsp;
                    <label className={style.label}>AMOUNT &emsp;<input type="text" placeholder="ENTER AMOUNT" onChange={handleProductAmt} value={prodAmt}></input></label><br></br><br></br>
                    <label className={style.label}>HEADING &emsp;<textarea rows = "5" cols = "60" placeholder="ENTER HEADING" className={style.bigBox}onChange={handleProductHead} value={prodHead}></textarea></label>&emsp;&emsp;
                    <label className={style.label}>DESCRIPTION &emsp;<textarea rows = "5" cols = "60" placeholder="ENTER DESCRIPTION" className={style.bigBox}onChange={handleProductDes} value={prodDes}></textarea></label><br></br> <br></br><br></br>
                  
                    
                    <select onChange={handleProductCat} value={prodCat}>
                        <option>SELECT CATEGORY</option>
                        <option>LAPTOP</option>
                        <option>MOBILE</option>
                        <option>COMPUTER ACCESSORIES</option>
                        <option>HOME APPLIANCES</option>
                        <option>HEADPHONES</option>
                        <option>WATCHES</option>
                    </select><br></br><br></br>
                    <button onClick={handleUpdate} className={style.but}>UPDATE ITEM</button>
                </div>
            </div>
        </>

    )
}

export default UpdateUser