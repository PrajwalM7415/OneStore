import { NavLink } from "react-router-dom";
import StyleSheet from "../card/Card.module.css";
const Card = (props) => {
  console.log(props);
  return (
    <div className={StyleSheet.card}>
      <h1>{props.data.appName}</h1>
      <p>{props.data.appDescription}</p>
      <NavLink to={props.data.path}>CLICK HERE</NavLink>
    </div>
  );
};

export default Card;
