import axios from "axios";
const URL = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeAbleURL = URL;
  if (country) {
    changeAbleURL = `https://covid19.mathdro.id/api/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, deaths, recovered, lastUpdate },
    } = await axios.get(changeAbleURL);

    return { confirmed, deaths, recovered, lastUpdate };
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get("https://covid19.mathdro.id/api/daily");

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.totalConfirmed,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const FetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get("https://covid19.mathdro.id/api/countries");

    return countries.map((country) => country.name);
  } catch (error) {}
};
