/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrip = /* GraphQL */ `
  query GetTrip($id: ID!) {
    getTrip(id: $id) {
      id
      username
      appId
      deviceAddress
      deviceName
      startTimestamp
      avgKmsHour
      numberOfUnlocks
      sumKms
      createdAt
      updatedAt
    }
  }
`;
export const listTrips = /* GraphQL */ `
  query ListTrips(
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        appId
        deviceAddress
        deviceName
        startTimestamp
        avgKmsHour
        numberOfUnlocks
        sumKms
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
