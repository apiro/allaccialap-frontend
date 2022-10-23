import './App.scss';

import { Component } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listTrips } from './graphql/queries';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import {Line, Bubble} from 'react-chartjs-2';

Chart.register(CategoryScale);

Amplify.configure(awsExports);

class LiveDataVisualizer extends Component {

  state = {
    trips: [],
    plot1Data: {
        labels: ["0am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "13pm", "14pm", "15pm", "16pm", "17pm", "18pm", "19pm", "20pm", "21pm", "22pm", "23pm"],
        datasets: []
    },
    plot2Data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: []
    },
    plot3Data: {
        datasets: []
    },
    plot1Options: {
        responsive: true,
        scales : {
            x: {
              title: {
                display: true,
                text: 'Hour of day'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Average number of screen unlocks'
              }
            }
        },
        plugins: {
            legend: {
              position: 'top',
            },
          },
    },
    plot2Options: {
        responsive: true,
        scales : {
            x: {
              title: {
                display: true,
                text: 'Day of week'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Average number of screen unlocks'
              }
            }
        },
        plugins: {
            legend: {
              position: 'top',
            },
          },
    },
    plot3Options: {
        responsive: true,
        scales : {
            x: {
              title: {
                display: true,
                text: 'Number of unlocks'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Speed (Kms/Hour)'
              }
            }
        },
        plugins: {
            legend: {
              position: 'top',
            },
          },
    },
    rgbs : {
    }
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.fetch(),
      5000
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
      var dimensions_datasets = {};
      for (let i=0; i < fetchedTrips.length; i++){
        const trip = fetchedTrips[i];
        const date = new Date(trip["startTimestamp"]);
        const username = trip["username"];
        const hour = date.getHours();
        const day = date.getDay();

        if (this.state.rgbs[username] === undefined) {
            this.state.rgbs[username] = random_rgba();
        }

        if (hours_datasets[username] === undefined){
            hours_datasets[username] = {};
        }
        if (day_datasets[username] === undefined){
            day_datasets[username] = {};
        }
        if (dimensions_datasets[username] === undefined){
            dimensions_datasets[username] = {numberOfUnlocks: [], avgKmsHour: [], sumKms: []};
        }

        if (hours_datasets[username][hour] === undefined){
            hours_datasets[username][hour] = [];
        }
        if (day_datasets[username][day] === undefined){
            day_datasets[username][day] = [];
        }

        hours_datasets[username][hour].push(parseInt(trip["numberOfUnlocks"]));
        day_datasets[username][day].push(parseInt(trip["numberOfUnlocks"]));
        dimensions_datasets[username]["numberOfUnlocks"].push(parseFloat(trip["numberOfUnlocks"]));
        dimensions_datasets[username]["avgKmsHour"].push(parseFloat(trip["avgKmsHour"]));
        dimensions_datasets[username]["sumKms"].push(parseFloat(trip["sumKms"]));
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
            backgroundColor: 'rgba(' + this.state.rgbs[key11] + ', ' + '0.2)',
            borderColor: 'rgb(' + this.state.rgbs[key11] + ')',
            borderWidth: 2,
            data: sub_dataset1
          }
          hours_datasets_parsed.push(full_dataset1);
      }

      const days_datasets_parsed = [];
      for (const [key11, value11] of Object.entries(day_datasets)) {
          const sub_dataset1 = [0, 0, 0, 0, 0, 0, 0];
          for (const [key12, value12] of Object.entries(value11)) {
              var sum = 0;
              for (let j = 0; j < value12.length; j += 1) {
                sum+=value12[j];
              }
              sub_dataset1[key12 - 1] = sum/value12.length;
          }
          const full_dataset1 = {
            label: key11,
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(' + this.state.rgbs[key11] + ', ' + '0.2)',
            borderColor: 'rgb(' + this.state.rgbs[key11] + ')',
            borderWidth: 2,
            data: sub_dataset1
          }
          days_datasets_parsed.push(full_dataset1);
      }

      const dimensions_datasets_parsed = [];
      for (const [key11, value11] of Object.entries(dimensions_datasets)) {
          var dataset1 = [];
          for (let j = 0; j < value11["numberOfUnlocks"].length; j += 1) {
            dataset1.push({x: value11["numberOfUnlocks"][j], y: value11["avgKmsHour"][j], r: value11["sumKms"][j] + 2})
          }
          const full_dataset1 = {
            label: key11,
            data: dataset1,
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(' + this.state.rgbs[key11] + ', ' + '0.2)',
            borderColor: 'rgb(' + this.state.rgbs[key11] + ')',
            borderWidth: 2,
          }
          dimensions_datasets_parsed.push(full_dataset1);
      }

      const plot1OptionsPointer = this.state.plot1Options;
      plot1OptionsPointer["responsive"] = false;
      plot1OptionsPointer["responsive"] = true;

      const plot2OptionsPointer = this.state.plot2Options;
      plot2OptionsPointer["responsive"] = false;
      plot2OptionsPointer["responsive"] = true;

      const plot3OptionsPointer = this.state.plot3Options;
      plot3OptionsPointer["responsive"] = false;
      plot3OptionsPointer["responsive"] = true;

      this.setState({
        plot1Data: Object.assign({}, this.state.plot1Data, {
             labels: ["0am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "13pm", "14pm", "15pm", "16pm", "17pm", "18pm", "19pm", "20pm", "21pm", "22pm", "23pm"],
             datasets: hours_datasets_parsed
        })
      });

      this.setState({
        plot2Data: Object.assign({}, this.state.plot2Data, {
             labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
             datasets: days_datasets_parsed
        })
      });

      this.setState({
        plot3Data: Object.assign({}, this.state.plot3Data, {
             datasets: dimensions_datasets_parsed
        })
      });

      this.setState({ trips: fetchedTrips });
  }

  render(){
    return(
        <div>
            <h1>Dashboard</h1>
            <h3>Screen Activity By Hour of day</h3>
            <div>
                <Line options={this.state.plot1Options} data={this.state.plot1Data}/>
            </div>
            <h3>Screen Activity By Day of week</h3>
            <div>
                <Line options={this.state.plot2Options} data={this.state.plot2Data}/>
            </div>
            <h3>Screen Activity vs Trip Statistics</h3>
            <div>
                <Bubble options={this.state.plot3Options} data={this.state.plot3Data}/>
            </div>
            <h1>Latest Trips</h1>
            <div>
                <TripsList trips={this.state.trips} />
            </div>
        </div>
    )
  }
}

function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
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
                <th className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Avg Kms Hour (g)</th>
                <th className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Sum Kms</th>
              </tr>
            </thead>
            <tbody className="mdc-data-table__content">
            {this.props.trips.map(trip =>
              <tr key={trip.id} className="mdc-data-table__row">
                <th className="mdc-data-table__cell" scope="row">{trip.tripId}</th>
                <th className="mdc-data-table__cell" scope="row">{trip.username}</th>
                <td className="mdc-data-table__cell mdc-data-table__cell--numeric">{trip.numberOfUnlocks}</td>
                <td className="mdc-data-table__cell mdc-data-table__cell--numeric">{trip.avgKmsHour}</td>
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