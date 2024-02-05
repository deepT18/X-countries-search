import React, { useState, useEffect } from "react";
import styles from "../src/card.css"; // Assuming you have a CSS module

export default function Card() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all/")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "20px",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const searchBoxStyle = {
    width: "100%",
    maxWidth: "80vw",
    margin: "10px",
    position: "relative",
  };

  const searchIconStyle = {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    backgroundImage: `url("data:image/svg+xml,<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M12.9 14.3l1.4 1.4 2.6-2.6c.4-.4.4-1 0-1.4l-2.6-2.6-1.4 1.4c-.2.2-.5.2-.7 0L8.3 9.3 5.9 6.9c-.2-.2-.5-.2-.7 0L4 8.7c-.4.4-.4 1 0 1.4L6.1 11.3l-2.6 2.6c-.2.2-.2 1 .1 1.4l1.4 1.4 3.1-3.1c.3-.3.3-1 0-1.4z' fill='%239CA3AF'/></svg>")`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  const countryCardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <div style={searchBoxStyle}>
        <input
          type="text"
          placeholder="Search countries"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "100%",
            paddingLeft: "40px",
            boxSizing: "border-box",
          }}
        />
        <div style={searchIconStyle} />
      </div>
      {filteredCountries.map((country) => (
        <div key={country.cca3} style={countryCardStyle} className={styles.countryCard}>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            style={imageStyle}
          />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
  );
}
