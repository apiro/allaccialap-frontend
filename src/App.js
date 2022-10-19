import './App.scss';

import { Component } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listTrips } from './graphql/queries';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import {Line} from 'react-chartjs-2';

Chart.register(CategoryScale);

Amplify.configure(awsExports);

class LiveDataVisualizer extends Component {

  state = {
    trips: [],
    plot1Data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        datasets: []
    }
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.fetch(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  async fetch() {
      const results = await API.graphql(graphqlOperation(listTrips));

      const fetchedTrips = results.data.listTrips.items;

      var hours_datasets = {};
      var day_datasets = {};
      for (let i=0; i < fetchedTrips.length; i++){
        const trip = fetchedTrips[i];
        const date = new Date(trip["startTimestamp"]);
        const username = trip["username"];
        const hour = date.getHours();
        const day = date.getDay();

        if (hours_datasets[username] === undefined){
            hours_datasets[username] = {};
        }
        if (day_datasets[username] === undefined){
            day_datasets[username] = {};
        }
        if (hours_datasets[username][hour] === undefined){
            hours_datasets[username][hour] = [];
        }
        if (day_datasets[username][day] === undefined){
            day_datasets[username][day] = [];
        }

        hours_datasets[username][hour].push(parseInt(trip["numberOfUnlocks"]));
        day_datasets[username][day].push(parseInt(trip["numberOfUnlocks"]));
      }

      const hours_datasets_parsed = [];
      for (const [key11, value11] of Object.entries(hours_datasets)) {
          const sub_dataset1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (const [key12, value12] of Object.entries(value11)) {
              var sum = 0;
              for (let j = 0; j < value12.length; j += 1) {
                sum+=value12[j];
              }
              sub_dataset1[key12] = sum/value12.length;
          }
          const full_dataset1 = {
            label: key11,
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: sub_dataset1
          }
          hours_datasets_parsed.push(full_dataset1);
      }
      console.log(hours_datasets_parsed);

      const plot1LabelsPointer = this.state.plot1Data.labels;
      plot1LabelsPointer[0] = 0;

      this.setState({
        plot1Data: Object.assign({}, this.state.plot1Data, {
             labels: plot1LabelsPointer,
             datasets: hours_datasets_parsed
        })
      });

      this.setState({ trips: fetchedTrips });
  }

  render(){
    return(
        <div>
            <h1>Dashboard</h1>
            <h3>By Hour of day</h3>
            <div>
                <Line data={this.state.plot1Data}/>
            </div>
            <h1>Latest Trips</h1>
            <div>
                <TripsList trips={this.state.trips} />
            </div>
        </div>
    )
  }
}

class TripsList extends Component {
  render() {
    return (
      <div className="mdc-data-table" style={styles.trip}>
        <div className="mdc-data-table__table-container">
          <table className="mdc-data-table__table" aria-label="Trip">
            <thead>
              <tr className="mdc-data-table__header-row">
                <th className="mdc-data-table__header-cell" role="columnheader" scope="col">TripId</th>
                <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Username</th>
                <th className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Number of Unlocks</th>
                <th className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Max Kms Hour (g)</th>
                <th className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Sum Kms</th>
              </tr>
            </thead>
            <tbody className="mdc-data-table__content">
            {this.props.trips.map(trip =>
              <tr key={trip.id} className="mdc-data-table__row">
                <th className="mdc-data-table__cell" scope="row">{trip.id}</th>
                <th className="mdc-data-table__cell" scope="row">{trip.username}</th>
                <td className="mdc-data-table__cell mdc-data-table__cell--numeric">{trip.numberOfUnlocks}</td>
                <td className="mdc-data-table__cell mdc-data-table__cell--numeric">{trip.maxKmsHour}</td>
                <td className="mdc-data-table__cell mdc-data-table__cell--numeric">{trip.sumKms}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class App extends Component {

  render() {
    return (
      <div style={styles.container}>
        <LiveDataVisualizer />
        <AmplifySignOut />
      </div>
    );
  }
}

export default withAuthenticator(App);

const styles = {
  container: {  width: 1000, margin: '0 auto', padding: 20 },
  trip: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, marginBottom: 15 },
}