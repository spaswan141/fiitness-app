import React, { useState } from "react";
import styles from "./home.module.css";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [optionCity, setOptionCity] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://devapi.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231&city=${city}`
      )
      .then((res) => {
        setData(res.data.data);
      });
  },[city]);
  useEffect(() => {
    axios.get(`https://devapi.wtfup.me/gym/places`).then((res) => {
      setOptionCity(res.data.data);
    });
  }, []);
  console.log(city)
  return (
    <div className={styles.homepage}>
      <div className={styles.filterBox}>
        <div className={styles.filter}>
          <h1 className={styles.filterh1}>Filters</h1>
          <div>
            <h2 className={styles.filterh2}>Location</h2>
            <input
              style={{ marginTop: "10%" }}
              type="text"
              placeholder="Enter location"
            />
            <h2 className={styles.filterh2} style={{ marginTop: "10%" }}>
              Price
            </h2>
            <div className={styles.price}>
              <input type="text" placeholder="Min" />
              <input type="text" placeholder="Max" />
            </div>
            <h2 className={styles.filterh2} style={{ marginTop: "10%" }}>
              Cities
            </h2>
            <select
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              <option value="">Select City</option>
              {optionCity.map((item) => (
                <option key={item.length + 1} value={item.city}>
                  {item.city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.box}>
        {data === undefined ? (
          <h1>No Data Found</h1>
        ) : (
          data.map((item) => (
            <div key={item.user_id} className={styles.boxcontainer}>
              <Link to={`/${item.user_id}`}>
                {" "}
                <div className={styles.main}>
                  <div></div>
                  <div>
                    <h1 style={{ fontSize: "25px" }}>{item.gym_name}</h1>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <h1 style={{ fontSize: "25px" }}>{item.address1}</h1>
                      <h1 style={{ fontSize: "25px", marginBottom: "30%" }}>
                        ,{item.city}
                      </h1>
                    </div>
                    <br />
                  </div>
                  <div></div>
                </div>
                <div className={styles.main}>
                  <div></div>
                  <div>
                    {" "}
                    {item.plan_price === null ? null : (
                      <h1 style={{ color: "yellow", fontSize: "25px" }}>
                        {item.plan_price} for 3 Months
                      </h1>
                    )}
                  </div>
                  <div>
                    <button className={styles.btn1}>Book Now</button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
