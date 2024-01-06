import axios from "axios"
import React, { useEffect, useState } from "react"
import { Navigate, NavLink } from "react-router-dom"
import style from "./payment.module.css"

const Payment = () => {
    const [totalAmount, setTotalAmount] = useState(0)
    const [method, setMethod] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [holderName, setHolderName] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [valid,setvalid] = useState(false)



    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [bank, setBank] = useState("Select Bank")

    const [upiId, setUpidId] = useState("")

    useEffect(() => {
        const amount = localStorage.getItem("TotalAmount")
        setTotalAmount(amount)
    },[])


    const handleMethod = (method) => {
        setCardNumber("")
        setHolderName("")
        setExpiryDate("")
        setCvv("")
        setUsername("")
        setPassword("")
        setBank("Select Bank")
        setUpidId("")
        setMethod(method)
        if(method === "cash") 
            document.getElementById("paymentbtn").textContent = "Complete Order"
        else document.getElementById("paymentbtn").textContent = "Pay Now"
    }

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    const handlecardNumber = (e) => {
        if(!isNumeric(e.target.value)) return
        setCardNumber(e.target.value)
    }

    const handleCvv = (e) => {
        if(!isNumeric(e.target.value)) return
        setCvv(e.target.value)
    }

    const handlePayNow = () => {
        if(method === "") return alert("Please choose any one payment method")

        if(method === "credit_debit"){
            if(cardNumber === "") return alert("Please enter Card Number")
            if(cardNumber.length > 16 || cardNumber.length < 16)
                return alert("Invalid Card Number")
            if(holderName === "") return alert("Please Enter Account Holder Name")
            if(expiryDate === "") return alert("Please Select Card Expiry Date")
            if(cvv === "") return alert("Plese Enter CVV")
            if(cvv.length < 3 || cvv.length > 3) return alert("Invalid CVV Number")
            saveToDb({cardNumber, holderName, mode: "Card"})
        }else if(method === "netBanking"){
            if(holderName === "") return alert("Please Enter Account Holder Name")
            if(bank === "Select Bank") return alert("Please Select Bank")
            if(username === "") return alert("Please Enter Username")
            if(password === "") return alert("Please Enter Password")
            saveToDb({holderName, bank, username, mode: "Net Banking"})
        }else if(method === "upi"){
            if(username === "") return alert("Please Enter Username")
            if(upiId === "") return alert("Please Enter UPI Id")
            saveToDb({username, upiId, mode: "UPI"})
        }else if(method === "cash"){
            saveToDb({mode: "cash"})
        }
        // orders()
        const updateIds = localStorage.getItem("cartids").split(",")
        const TotalAmount = localStorage.getItem("TotalAmount")
        const userId = localStorage.getItem("userId")
        let orderDetails = 
        {
            ProductId : updateIds,
            Mode : method,
            TotalAmount : TotalAmount,
            userId : userId
        };
        console.log(orderDetails);
        axios.post("http://localhost:3001/orders/order",orderDetails)
        .then((response) => {
            alert ("ORDER PLACED SUCCESSFULLY");
            console.log(response);
            setvalid(true)

          });


    }
    
    

    const saveToDb = (obj) => {
        console.log(obj.mode);

        // Save the obj to payment or orders table(table name is up to you)
        // you can send other params too, which you require to store
    }
    if(valid){
        return <Navigate to="/home" />
    }


    return(
        <div className={style.wrapper}>
            <h2 className={style.title}>Payment Page</h2>
            <div className={style.sideBySide}>
                <div className={style.paymentMethod}>
                    <div className={style.methods}>
                        <label onClick={() => handleMethod("credit_debit")}>Credit / Debit Card</label>
                        <label onClick={() => handleMethod("netBanking")}>Net Banking</label>
                        <label onClick={() => handleMethod("upi")}>UPI</label>
                        <label onClick={() => handleMethod("cash")}>Cash On Delivary</label>
                    </div>
                    <div>
                        <h3 className={style.title}>Total Amount: {totalAmount}</h3>
                    </div>
                </div>
                <div className={style.displayContent}>
                    <div>
                        {method === "" && <h3 className={style.title}>Select Any Payment Method</h3>}
                        {method === "credit_debit" && 
                            <div className={style.columnView}>
                                <div className={style.columnView}>
                                    <label><span className={style.red}>* </span>Enter 16 Digit Card Number</label>
                                    <input type="text" placeholder="Enter 16 Digit Card Number" className={style.input} value={cardNumber} onChange={handlecardNumber}/>
                                </div>
                                <div className={style.rowView}>
                                    <div className={style.columnView}>
                                        <label><span className={style.red}>* </span>Enter Name of the Card</label>
                                        <input type="text" placeholder="Enter Name of the Card" className={style.input} value={holderName} onChange={e => setHolderName(e.target.value)}/>
                                    </div>
                                    <div className={style.columnView}>
                                        <label><span className={style.red}>* </span>Select Expiry Of Card</label>
                                        <input type="month" min="2019-01" className={style.input} value={expiryDate} onChange={e => setExpiryDate(e.target.value)}/>
                                    </div>
                                </div>
                                <div className={style.columnView}>
                                    <label><span className={style.red}>* </span>Enter CVV</label>
                                    <input type="text" placeholder="Enter CVV" minLength={0} maxLength={3} className={`${style.input} ${style.cvv}`} value={cvv} onChange={handleCvv}/>
                                </div>
                            </div>
                        }
                        {method === "netBanking" && 
                            <div className={style.columnView}>
                                <div className={style.rowView1}>
                                    <div className={style.columnView}>
                                        <label><span className={style.red}>* </span>Account holder name</label>
                                        <input type="text" placeholder="Account holder name" className={style.input} value={holderName} onChange={e => setHolderName(e.target.value)}/>
                                    </div>
                                    <div className={style.columnView}>
                                        <label><span className={style.red}>* </span>Select Bank</label>
                                        <select className={style.input} value={bank} onChange={e => setBank(e.target.value)}>
                                            <option value="Select Bank">Select Bank</option>
                                            <option value="SBI">SBI</option>
                                            <option value="AXIS">AXIS</option>
                                            <option value="Bank Of Baroda">Bank Of Baroda</option>
                                            <option value="HDFC">HDFC</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={style.rowView1}>
                                    <div className={style.columnView}>
                                        <label><span className={style.red}>* </span>Username</label>
                                        <input type="text" placeholder="Username" className={style.input} value={username} onChange={e => setUsername(e.target.value)}/>
                                    </div>
                                    <div className={style.columnView}>
                                        <label><span className={style.red}>* </span>Password</label>
                                        <input type="password" placeholder="Password" className={style.input} value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        }
                        {method === "upi" && 
                            <div className={style.columnView}>
                                <div className={style.columnView1}>
                                    <label><span className={style.red}>* </span>Username</label>
                                    <input type="text" placeholder="Enter Username" className={style.input} value={username} onChange={e => setUsername(e.target.value)}/>
                                </div>
                                <div className={style.columnView1}>
                                    <label><span className={style.red}>* </span>UPI Id</label>
                                    <input type="text" placeholder="Enter UPI Id" className={style.input} value={upiId} onChange={e => setUpidId(e.target.value)}/>
                                </div>
                            </div>
                        }
                        {method === "cash" && 
                            <div className={style.columnView}>
                                <h3 className={style.title}>You Choose Cash On Delivery</h3>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <button className={style.btn} id="paymentbtn" onClick={handlePayNow}>Pay Now</button>
        </div>
    )
}

export default Payment