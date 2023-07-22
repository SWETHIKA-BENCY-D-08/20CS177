import React, { useState } from 'react';
import axios from 'axios';

const TrainDataComponent = () => {
  const [trainData, setTrainData] = useState([]);

  const handleShowTrainData = () => {
    const authorizationHeader = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTAwMTM3MjUsImNvbXBhbnlOYW1lIjoiS1BSIiwiY2xpZW50SUQiOiI2M2JkMTAzYS0yNzRhLTRkMzQtYTlhMi1kMThkNTExNjU2MmEiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiMTc4In0.5EJmaakvON4kBdO2JJ6dcxPSsZtNsPZ2mrx3bChe7Nw"

    axios.get('http://20.244.56.144/train/trains', {
      headers: {
        Authorization: `Bearer ${authorizationHeader}`,
      },
    })
      .then((response) => {
        console.log('Train data received:', response.data);
        setTrainData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching train data:', error);
        setTrainData(null);
      });
  };

  return (
    <div>
      <button onClick={handleShowTrainData}>Show Train Data</button>
      {trainData.length > 0 ? (
        <div class='train-data-grid'>
          {trainData.map((train, index) => (
            <div key={index}>
              <p>Train Name: {train.trainName}</p>
              <p>Train Number: {train.trainNumber}</p>
              <p>
                Departure Time: {train.departureTime.Hours}:
                {train.departureTime.Minutes}:
                {train.departureTime.Seconds}
              </p>
              <p>Available Seats:</p>
              <ul>
                <li>Sleeper: {train.seatsAvailable.sleeper}</li>
                <li>AC: {train.seatsAvailable.AC}</li>
              </ul>
              <p>Ticket Prices:</p>
              <ul>
                <li>Sleeper: Rs. {train.price.sleeper}</li>
                <li>AC: Rs. {train.price.AC}</li>
              </ul>
              <p>Delayed By: {train.delayedBy} minutes</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No train data available.</p>
      )}
    </div>
  );
};

export default TrainDataComponent;