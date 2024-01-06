 import style from "../App.module.css"
 import myImage from "../../src/Photos/12.jpg"
 import Head from "./Homepage";
 import { useEffect, useState } from "react";
import axios from "axios";
import css from "./pDetails.module.css"
import { NavLink} from "react-router-dom";
 
 const Cart = () => {
    const [visible, setVisible] = useState(false)
    const [productList, setProductList] = useState([])
    const [priceFilter,setPriceFilter] = useState("Select Price")
    const [priceCat,sethandleCatagory] = useState("Select Category")
    


    useEffect(() => {
        axios.get("http://localhost:3001/product/getAllProducts")
        .then(res => {
            setProductList(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const handlePriceFilter =(e) => {
        if(e.target.value === "Select Price"){
            return (
                window.location.reload()
            )
        }
    
        setPriceFilter(e.target.value)

        axios.get(`http://localhost:3001/product/filterPrice/${e.target.value}`)
        .then(res => {
            setProductList(res.data)
            console.log(e.target.value);
        })
        .catch(err => {
            console.log(err);
        })


    }    
    
    const handleCategory = (e) => {
        if(e.target.value === "Select Category"){
        return (
            window.location.reload()
        )
    }

        sethandleCatagory(e.target.value)
        console.log(e.target.value);

        axios.get(`http://localhost:3001/product/filterCategory/${e.target.value}`)
        .then(res => {
            setProductList(res.data)
            console.log(e.target.value);
        })
        .catch(err => {
            console.log(err);
        })


    }

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
        setVisible(true)
        } 
        else if (scrolled <= 300){
        setVisible(false)
        }
    };
    
    const scrollToTop = () =>{
        window.scrollTo({
        top: 730, 
        behavior: 'smooth'
        });
    };
    
    window.addEventListener('scroll', toggleVisible);

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
    
    return(
        <>
            <Head/>
            
            <div className={css.bg}>
                <img className={style.expimg} src={myImage} alt=""></img>
                <button className={style.explore} onClick={scrollToTop} value={visible} >EXPLORE</button><br></br><br></br>
                <div className={css.flexbox}>
                    <div className={css.box}>
                    <h1 className={css.filter}>Filters</h1>
                    <h2 className={css.h100}>CATEGORIES</h2>
                    <select onChange={handleCategory} value={priceCat} className={css.SLE}>
                        <option value="Select Category"> Select Category</option>
                        <option value="LAPTOP">LAPTOP</option>
                        <option value="MOBILE">MOBILE</option>
                        <option value="COMPUTER ACCESSORIES">COMPUTER ACCESSORIES</option>
                        <option value="HOME APPLIANCES">HOME APPLIANCES</option>
                        <option value="HEADPHONES">HEADPHONES</option>
                        <option value="WATCHES">WATCHES</option>
                    </select>
                    <h3 className={css.price}>PRICE</h3>
                    <select onChange={handlePriceFilter} value={priceFilter} className={css.SLE}>
                        <option value="Select Price"> Select Price</option>
                        <option value="10000">LESS THAN 10000</option>
                        <option value="15000">15000</option>
                        <option value="20000">20000</option>
                        <option value="25000">25000</option>
                        <option value="50000">50000</option>
                        <option value="90000">90000</option>
                    </select>
                   
                    </div>
                    <div className={css.flexbody}>
                        {
                            productList.map(item => {
                                return(
                                    <>                   
                                        <div className={css.pName}>
                                            <img src={item.productImagePath} className={css.img} alt="" />
                                            <h1 className={css.h1} >{item.productName}</h1>
                                            <h1 className={css.heading} >{item.productHeading}</h1>
                                            <h2 className={css.h2}>{'Rs '+item.productAmt}</h2>
                                            <div className={css.butbot}>
                                                <NavLink className={css.but} to={`/userview/${item.slno}`}>VIEW PRODUCT</NavLink>&nbsp;
                                                <button className={css.but} onClick={() => handleAddToCart(item.slno)}>Add to cart</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

            </div>  
             
        </>     
        
    )
 }
 
 export default Cart
 
 