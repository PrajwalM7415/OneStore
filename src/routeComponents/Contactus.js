import { NavLink } from "react-router-dom"
import style from "../routeComponents/ContactUs.module.css"
import Head from "../headerComponents/Homepage"
const ContactUs = () =>{
    return(
        <> 
            <Head/>
            <div className={style.bg}>
            <div className={style.border}>
                
                <div className={style.box1}>
                
                <h1>Name : Prajwal M</h1>
                <h3>PhNo : 7676627415</h3>
                <h3>email : prajwalprajju7415@gmail.com</h3>                
                    
                </div>               
              
            <NavLink to="/home"><button className={style.but}>Back</button></NavLink>


            </div>  
            </div>      
        </>


    )
    
}
export default ContactUs