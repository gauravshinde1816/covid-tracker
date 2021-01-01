import React, { useState, useEffect } from "react";
import { FetchCountries } from "../../api";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./Country.module.css";
const CountryPicker = ({ handleCountry }) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setCountries(await FetchCountries());
    };

    fetchData();
    console.log(countries);
  }, [setCountries]);
  return (
    <div>
      <FormControl className={styles.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={(e) => {
            handleCountry(e.target.value);
          }}
        >
          <option value="">Global</option>
          {countries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
