import React, { Component } from "react";
import { Cards, Charts, CountryPicker } from "./components";
import { fetchData } from "./api";
import style from "./App.module.css";
import coronaImage from "./images/covid.png";
export class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountry = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={style.container}>
        <img className={style.image} src={coronaImage} />
        <Cards data={data} />
        <CountryPicker handleCountry={this.handleCountry} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}

export default App;
