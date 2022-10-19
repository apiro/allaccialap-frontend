import { Component } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listTrips } from './graphql/queries';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

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
    this.state = { trips: [] };
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
        <TripsList trips={this.state.trips} />
        <AmplifySignOut />
      </div>
    );
  }
}

export default withAuthenticator(App);

const styles = {
  container: { margin: '0 auto', padding: 20 },
  trip: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, marginBottom: 15 },
}
