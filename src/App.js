import React, { Component } from 'react';
import './App.css';
import {
  PageHeader,
  Table
} from 'react-bootstrap';
import sampleNeo from './sample-neo'

class App extends Component {
  constructor(props){
    super(props)
    let today = new Date()
    this.state = {
      apiKey: "rEewQGPGlp2Dyvx5zXXsHHsbAkftphAoH93AUtyB",
      startDate:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
      rawData: sampleNeo,
      asteroids: []
    }
}

componentWillMount(){
fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.state.startDate}&api_key=${this.state.apiKey}`).then((rawResponse) => {
  // rawResponse.json() returns a promise that we pass along
  return rawResponse.json()
}).then((parsedResponse) => {
  // when this promise resolves, we can work with our data
  let neoData = parsedResponse.near_earth_objects
  let newAsteroids = []

  console.log(neoData);
  debugger
  Object.keys(neoData).forEach((date)=>{
    neoData[date].forEach((asteroid) =>{
      newAsteroids.push({
        id: asteroid.neo_reference_id,
        name: asteroid.name,
        date: asteroid.close_approach_data[0].close_approach_date,
        diameterMin: asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0),
        diameterMax: asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0),
        closestApproach: asteroid.close_approach_data[0].miss_distance.miles,
        velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(0),
        distance: asteroid.close_approach_data[0].miss_distance.miles
      })
    })
  })
  // Finally, now that we have collected all the asteroids, we can assign them to state
  // so that we can use them later on in the render function
  // state is updated when promises are resolved
  this.setState({asteroids: newAsteroids})
})
}


  render() {
    return (
      <div className="App">
        <div className="container">
          <PageHeader>
            <img alt="astroid" id="ass-pic" src="./images/asteroid_graphic.jpg"/>
            Duck, Duck, Meteor!
          </PageHeader>
        </div>
  <h4> Hello Cosmonaut on the Spaceship Earth! </h4>


  <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Estimated Diameter (ft)</th>
        <th>Date of Closest Approach</th>
        <th>Distance (miles)</th>
        <th>Velocity (mi/hr)</th>
      </tr>
    </thead>
    <tbody>{this.state.asteroids.map((asteroid) =>{
      return(
        <tr key={asteroid.id}>
          <td>{asteroid.name}</td>
          <td>{asteroid.diameterMin} - {asteroid.diameterMax}</td>
          <td>{asteroid.date}</td>
          <td>{asteroid.distance}</td>
          <td>{asteroid.velocity}</td>
        </tr>
      )
    })}</tbody>
  </Table>
      </div>
    );
  }
}

export default App;
