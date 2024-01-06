import appsInfo from "./apps.json";
import Card from "../card/card";
import style from "../card/Card.module.css";

const CardList = () => {
  return (
    <div className={style.cardContainer}>
      {appsInfo.map((item) => {
        return <Card data={item} />;
      })}
    </div>
  );
};

export default CardList;
