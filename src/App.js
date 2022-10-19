import { Component } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createTrip, deleteTrip } from './graphql/mutations';
import { listTrips } from './graphql/queries';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

class AddTrip extends Component {
  constructor(props) {
    super(props);
    this.state = { deviceAddress: '' };
  }

  handleChange = (event) => {
    this.setState({ deviceAddress: event.target.value });
  }

  handleClick = () => {
    this.props.addTrip(this.state);
    this.setState({ deviceAddress: '' });
  }

  render() {
    return (
      <div style={styles.form}>
        <input
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="New Trip"
          style={styles.input}
        />
        <button onClick={this.handleClick} style={styles.addButton}>Add Trip</button>
      </div>
    );
  }
}

class TripsList extends Component {
  render() {
    return (
      <div>
        {this.props.trips.map(trip =>
          <div key={trip.id} style={styles.trip}>
            <p>{trip.deviceAddress}</p>
            <button onClick={() => { this.props.deleteTrip(trip) }} style={styles.deleteButton}>x</button>
          </div>
        )}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { trips: [] };
  }

  async componentDidMount() {
    var result = await API.graphql(graphqlOperation(listTrips));
    this.setState({ trips: result.data.listTrips.items });
  }

  deleteTrip = async (trip) => {
    const id = {
      id: trip.id
    };
    await API.graphql(graphqlOperation(deleteTrip, { input: id }));
    this.setState({ trips: this.state.trips.filter(item => item.id !== trip.id) });
  }

  addTrip = async (trip) => {
    var result = await API.graphql(graphqlOperation(createTrip, { input: trip }));
    this.state.trips.push(result.data.createTrip);
    this.setState({ trips: this.state.trips });
  }

  render() {
    return (
      <div style={styles.container}>
        <h1>Trips App</h1>
        <AddTrip addTrip={this.addTrip} />
        <TripsList trips={this.state.trips} deleteTrip={this.deleteTrip} />
        <AmplifySignOut />
      </div>
    );
  }
}

export default withAuthenticator(App);

const styles = {
  container: { width: 480, margin: '0 auto', padding: 20 },
  form: { display: 'flex', marginBottom: 15 },
  input: { flexGrow: 2, border: 'none', backgroundColor: '#ddd', padding: 12, fontSize: 18 },
  addButton: { backgroundColor: 'black', color: 'white', outline: 'none', padding: 12, fontSize: 18 },
  trip: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, marginBottom: 15 },
  deleteButton: { fontSize: 18, fontWeight: 'bold' }
}
