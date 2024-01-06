import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import Head from '../headerComponents/Homepage'
import style from "./cart.module.css"

const CartItems = () => {
    const [selectedProducts, setSelectedProducts] = useState([])
    const [totalAmount,setTotalAmount] = useState(0)
    const [paymode,setpaymode] = useState(false)
    const [userMode,setUserMode] = useState(false)



    useEffect(() => {
       getData()
    }, [])

    const handleBuyNow =() =>{
        if (localStorage.getItem("userId")) {
        setpaymode(true)
            
        }else{
            setUserMode(true)
        }
        
    }
    const handleRemove = (id) => {
        const updateIds = localStorage.getItem("cartids").split(",")
        const removeId = updateIds.filter(item => item !== id.toString())
        console.log(removeId.length);

        if (removeId.length > 0) {
            localStorage.setItem("cartids",removeId)
            getData()
        }else{
            localStorage.setItem("cartids",[])
            setSelectedProducts([])
            localStorage.setItem("TotalAmount",0)
        }

        
    }

    const getData = async () => {
        const updateIds = localStorage.getItem("cartids").split(",")
        console.log(updateIds.length); 
        let UpdatedArray = []
        for (const id of updateIds) {
            const response = await axios.get(`http://localhost:3001/product/getSelectedProduct/${id}`)
            UpdatedArray.push(response.data[0]) 
        }
        let sum = 0;
        for (const item of UpdatedArray) {
            sum += item.productAmt 
            
        }
        setSelectedProducts(UpdatedArray)
        setTotalAmount(sum)
        localStorage.setItem("TotalAmount",sum)
    }
    if(paymode){
        return <Navigate to="/payment"/>
    }else if(userMode){
        return <Navigate to="/login"/>
    }
    return (
        <>  
            <Head/>
            
            <div className={style.box2}>
                <h1 className={style.headd}>My Cart</h1>
                <div className={style.bg}>
                    <div className={style.div1}>
                    {
                        selectedProducts.map(item => {
                            return(
                                <>  
                                    <div className={style.box}>
                                        <div className={style.flex} >
                                            <div className={style.fleximg}>
                                                <img src={item.productImagePath} className={style.img}/>
                                            </div>
                                            <div className={style.flexbody}>
                                                <h1 className={style.h123}>{item.productName}</h1>
                                                <h1 className={style.price}>Rs {item.productAmt}</h1>
                                            <NavLink onClick={ () => handleRemove(item.slno)} className={style.but}>REMOVE</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    </div><br></br><br></br><br></br><br></br><br></br>
                    <div className={style.box1}>
                        <h1 className={style.pd}>PRICE DETAILS</h1>
                        <div className={style.div5}>
                            <h2 className={style.priceDetails}>Price &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {totalAmount} </h2>
                            <h2 className={style.Dc}>Delivery Charges&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<mark > Free</mark></h2>
                        </div>
                        <div className={style.boxing}>
                            <h1 className={style.tp}>TOTAL AMOUNT &emsp;&emsp;&emsp;&emsp; {totalAmount} </h1>
                            <button onClick={handleBuyNow} className={style.buy}>PLACE ORDER</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CartItems