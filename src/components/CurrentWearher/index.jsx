import { Component } from "react";
import styles from "./CurrentWeather.module.css";

export default class CurrentWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: null,
      windSpeed: null,
      unitTemperature: "celsius",
      unitWind: "ms",
    };
  }

  componentDidMount() {
    this.fetchTemperature();
    this.fetchWindSpeed();
  }

  fetchTemperature = () => {
    const { unitTemperature } = this.state;

    const apiCelsius = `https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true&temperature_unit=celsius`;
    const apiFahrenheit = `https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true&temperature_unit=fahrenheit`;

    const apiUrl = unitTemperature === "celsius" ? apiCelsius : apiFahrenheit;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          temperature: data.current_weather.temperature,
        })
      )
      .catch((error) => console.log(error));
  };

  fetchWindSpeed = () => {
    const { unitWind } = this.state;

    const apiMs = `https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true&wind_speed_unit=ms`;
    const apiKmh = `https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true&wind_speed_unit=kmh`;

    const apiUrl = unitWind === "ms" ? apiMs : apiKmh;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          windSpeed: data.current_weather.windspeed,
        })
      )
      .catch((error) => console.log(error));
  };

  handleTempUnitChange = (event) => {
    this.setState(
      { unitTemperature: event.target.value },
      this.fetchTemperature
    );
  };

  handleWindUnitChange = (event) => {
    this.setState({ unitWind: event.target.value }, this.fetchWindSpeed);
  };

  render() {
    const { temperature, windSpeed, unitTemperature, unitWind } = this.state;
    return (
      <article className={styles.container}>
        <div className={styles.measurementSelection}>
          <label>Wind speed unit:</label>
          <select value={unitWind} onChange={this.handleWindUnitChange}>
            <option value="ms">M/s</option>
            <option value="kmh">Km/h</option>
          </select>

          <label>Temperature unit: </label>
          <select value={unitTemperature} onChange={this.handleTempUnitChange}>
            <option value="celsius">°C</option>
            <option value="fahrenheit">°F</option>
          </select>
        </div>
        <div className={styles.currentWeather}>
          <h2 className={styles.title}>Current Weather</h2>
          <span>
            <i className="fa-solid fa-wind"></i>
            {windSpeed !== null
              ? `${windSpeed.toFixed(1)} ${unitWind === "ms" ? "M/s" : "Km/h"}`
              : "Loading..."}
          </span>
          <span>
            <i className="fa-solid fa-temperature-low"></i>
            {temperature !== null
              ? `${temperature.toFixed(1)} °${
                  unitTemperature === "celsius" ? "C" : "F"
                }`
              : "Loading..."}
          </span>
        </div>
      </article>
    );
  }
}
