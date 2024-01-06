import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import style from "../routeComponents/getStarted.module.css"

const GetStarted = () => {
    useEffect(()=>{
        localStorage.setItem("userId","")
        localStorage.setItem("cartids",[])
        localStorage.setItem("TotalAmount",0)
        
    },[])
    return(
        <div className={style.body}>
            <h1 className={style.info}>ONESTORE&nbsp;<svg className={style.V3C5bO} xmlns="http://www.w3.org/2000/svg" width="35" height="30" fill="currentColor" class="bi bi-handbag" viewBox="0 0 16 16"> <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/> </svg></h1>
            <label className={style.label}>Whoever said money can't buy happiness simply didn't know where to go shopping.</label>
            <NavLink className={style.nav} to="/login"><h1 className={style.get}>Start Shopping <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="grey" class="bi bi-arrow-right" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/> </svg></h1></NavLink>
        </div>
    )
}

export default GetStarted