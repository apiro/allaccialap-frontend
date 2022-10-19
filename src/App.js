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

class LineChart extends Component {
  state = {
    data: {
        labels: ['0'],
        datasets: [
          {
            label: 'Test',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [0]
          }
        ]
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

  fetch() {
      const datasetsCopy = this.state.data.datasets.slice(0);
      const dataCopy = datasetsCopy[0].data.slice(0);
      const labelsCopy = this.state.data.labels;

      console.log(dataCopy)
      console.log(labelsCopy)

      const newValue = Math.random() * (100 - 0) + 0;

      labelsCopy.push(String(newValue));
      dataCopy.push(newValue);

      datasetsCopy[0].data = dataCopy;

      this.setState({
          data: Object.assign({}, this.state.data, {
              labels: labelsCopy,
              datasets: datasetsCopy
          })
      });
  }

  render(){
    return(
      <div>
      <Line data = {this.state.data}/>
      </div>
    )
  }
}

class TripsList extends Component {
  render() {
    return (
      <div>
        {this.props.trips.map(trip =>
          <div key={trip.id} style={styles.trip}>
            <p>{trip.id}</p>
          </div>
        )}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        trips: []
    };
  }

  componentDidMount() {
    this.loadNewData()
    this.interval = setInterval(() => this.loadNewData(), 1000);
  }

  async loadNewData() {
      console.log("checking if there is new data !")
      var result = await API.graphql(graphqlOperation(listTrips));
      this.setState({ trips: result.data.listTrips.items });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>Trips</h1>
        <LineChart />
        <TripsList trips={this.state.trips} />
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
