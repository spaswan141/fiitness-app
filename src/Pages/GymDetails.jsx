import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import datas from "../data";

import styles from "./gym.module.css";
const GymDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [currProduct, setcurrProduct] = useState("");
  const [terms, setTerms] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://devapi.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231"
      )
      .then((res) => {
        setTerms(res.data.terms);
        setData(res.data.data);
      });
  }, []);

  function getColorCode() {
    var makeColorCode = "0123456789ABCDEF";
    var code = "#";
    for (var count = 0; count < 6; count++) {
      code = code + makeColorCode[Math.floor(Math.random() * 16)];
    }
    return code;
  }

  console.log(terms);
  useEffect(() => {
    if (id) {
      const temp = data.find((element) => element.user_id === id);
      temp && setcurrProduct(temp);
    }
  }, [data, id]);

  console.log(currProduct.benefits, "benifits");

  return (
    <div className={styles.detailPage}>
      <div className={styles.detail}>
        <h1>{currProduct.gym_name}</h1>
        <h2>Description</h2>
        <p>{currProduct.description}</p>
        <div style={{ display: "flex", gap: "10px" }}>
          {currProduct.benefits !== undefined &&
            currProduct.benefits.map((item) => (
              <div
                style={{
                  border: "1px solid white",
                  marginLeft: "10px",
                  padding: "5px",
                  backgroundColor: "#920909",
                  color: "yellow",
                }}
                key={item.id}
              >
                <h3>{item.name}</h3>
              </div>
            ))}
        </div>
        <h1 style={{ color: "yellow" }}>Why To Choose WTF?</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          {terms.map((item) =>
            item.name === null ? (
              ""
            ) : (
              <div
                style={{
                  border: "1px solid white",
                  marginLeft: "10px",
                  padding: "5px",
                  backgroundColor: "#920909",
                  color: "yellow",
                }}
                key={item.id}
              >
                <h5>{item.name}</h5>
              </div>
            )
          )}
        </div>
      </div>

      <div className={styles.plan}>
        <h1 style={{ textAlign: "center", color: "teal" }}>
          Choose Membership
        </h1>
        {datas.map((element) => {
          return (
            <div
              style={{ backgroundColor: getColorCode() }}
              className={styles.list}
              key={element.id}
            >
              <div>
                <h3>{element.plan}</h3>
                <h4>{element.plan_name}</h4>
              </div>
              <div>
                <h4>{element.price}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GymDetail;
