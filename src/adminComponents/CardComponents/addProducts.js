import React, { useState } from "react";
import Head2 from "../head";
import style from "./addProducts.module.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AddProducts = () => {
  const [addImage, setImage] = useState("");
  const [prodName, setProdName] = useState("");
  const [prodId, setProdId] = useState("");
  const [prodQty, setprodQty] = useState("");
  const [prodAmt, setprodAmt] = useState("");
  const [prodHead, setprodHead] = useState("");
  const [prodDes, setprodDes] = useState("");
  const [prodCat, setprodCat] = useState("");

  function handleImage(e) {
    const readImage = (file) => {
      const reader = new FileReader();
      reader.addEventListener("load", (res) => {
        setImage(res.target.result);
      });
      reader.readAsDataURL(file);
    };

    const files = e.target.files;
    if (!files || !files[0]) return alert("File upload not supported");
    [...files].forEach(readImage);
  }
  function handleProductName(e) {
    setProdName(e.target.value);
  }
  function handleProductId(e) {
    setProdId(e.target.value);
  }
  function handleProductQty(e) {
    setprodQty(e.target.value);
  }
  function handleProductAmt(e) {
    setprodAmt(e.target.value);
  }
  function handleProductDes(e) {
    setprodDes(e.target.value);
  }
  function handleProductHead(e) {
    setprodHead(e.target.value);
  }
  function handleProductCat(e) {
    setprodCat(e.target.value);
  }
  const handleAddItem = () => {
    console.log(addImage, prodName, prodId, prodQty,prodAmt,prodHead,prodDes, prodCat);
    if(addImage === "" ) return alert ("please enter Product Image")
    if(prodName === "" ) return alert ("please enter Product Name")
    if(prodId === "" ) return alert ("please enter Product ID")
    if(prodQty === "" ) return alert ("please enter Product Quantity")
    if(prodAmt === "" ) return alert ("please enter Product Amount")
    if(prodHead === "" ) return alert ("please enter Product Heading")
    if(prodDes === "" ) return alert ("please enter Product Description")
    if(prodCat === "" ) return alert ("please Select Product Category")

    let addProducts = {
      imagePath: addImage,
      productName: prodName,
      productId: prodId,
      productQty: prodQty,
      productAmount: prodAmt,
      productHeading: prodHead,
      productDescription: prodDes,
      productCategory: prodCat,
    };
    axios.post("http://localhost:3001/product/addProducts", addProducts)
      .then((response) => {
        alert("ITEM ADDED SUCCESSFULLY");
        console.log(response);
        window.location.reload();
      });
  };

  return (
    <>
      <Head2 />
      <div className={style.bg}>
        <h1 className={style.h1}>ADD ITEMS</h1><br></br><br></br>
        <div className={style.box}>
          <label className={style.label}>ADD IMAGE : &emsp;
            <input type="file" placeholder="ADD IMAGE"onChange={handleImage}></input>
          </label><br></br><br></br><br></br>
          <label className={style.label}>
            PRODUCT NAME : &emsp;
            <input
              type="text"
              placeholder="ENTER PRODUCT NAME"
              onChange={handleProductName}
              value={prodName}
            ></input>
          </label>
          &emsp;&emsp;
          <label className={style.label}>
            PRODUCT ID : &emsp;
            <input
              type="text"
              placeholder="ENTER PRODUCT ID "
              onChange={handleProductId}
              value={prodId}
            ></input>
          </label>
          <br></br>
          <br></br>
          <br></br>
          <label className={style.label}>
            PRODUCT QTY : &emsp;
            <input
              type="text"
              placeholder="ENTER PRODUCT QTY"
              onChange={handleProductQty}
              value={prodQty}
            ></input>
          </label>
          &emsp;&emsp;
          <label className={style.label}>
            AMOUNT : &emsp;
            <input
              type="text"
              placeholder="ENTER AMOUNT"
              onChange={handleProductAmt}
              value={prodAmt}
            ></input>
          </label>
          <br></br>
          <br></br>
          <br></br>
          <label className={style.label1}>
            HEADING : &emsp;
            <textarea
              rows="5"
              cols="60"
              placeholder="ENTER HEADING"
              onChange={handleProductHead}
              value={prodHead}
              className={style.bigBox}
            ></textarea>
          </label>
          &emsp;&emsp;
          <label className={style.label1}>
            DESCRIPTION : &emsp;
            <textarea
              rows="5"
              cols="60"
              placeholder="ENTER DESCRIPTION"
              onChange={handleProductDes}
              value={prodDes}
              className={style.bigBox}
            ></textarea>
          </label>
          <br></br>
          <br></br>
          <br></br>
          <select
            onChange={handleProductCat}
            value={prodCat}
            className={style.label}
          >
            <option>SELECT CATEGORY</option>
            <option>LAPTOP</option>
            <option>MOBILE</option>
            <option>COMPUTER ACCESSORIES</option>
            <option>HOME APPLIANCES</option>
            <option>HEADPHONES</option>
            <option>WATCHES</option>
          </select>
          <br></br>
          <button onClick={handleAddItem} className={style.but}>
            ADD ITEM
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
