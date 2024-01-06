import React from "react";
import style from "./admin.module.css"
import CardList from "../adminComponents/card/cardlist"
import Head2 from "./head";


const Admin = () => {
    return(
        <>
            <Head2/>
            <div className={style.heading}>
                <CardList/>
            </div>
        </>
    )
}

export default Admin