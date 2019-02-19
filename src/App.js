import React from "react";
//import React object from react package that lives in package.json
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "3f07ccb96a9319a9a11e06bc4db3d810";

//create instance of app and extends react component
class App extends React.Component {
  //build-in render method with jsx
  //babble compiles jsx to js
  //state is an object that lives within a component, changing data within a component, interaction with the application that causes the data to change
  state = {
    temperature: undefined,
    city: undefined,
    country:  undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    //arrow function
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city && country) {
      //console.log(data);
      this.setState( {
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState( {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      });
    }
  }
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles />
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                <Weather
                  temperature = {this.state.temperature}
                  city = {this.state.city}
                  country = {this.state.country}
                  humidity = {this.state.humidity}
                  description = {this.state.description}
                  error = {this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default App;
//make this component available for other files to import
