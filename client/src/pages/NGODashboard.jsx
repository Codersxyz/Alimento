import React, { useEffect, useState } from 'react';
import './NGODashboard.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NGODashboard() {
  const [donations, setDonations] = useState([]);
  const [receivedDonations, setReceivedDonations] = useState([]); // New state variable
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetch('/api/FoodDonation/getAll')
      .then(response => response.json())
      .then(data => setDonations(data));
  }, []);

  const handleReceiveDonation = (id) => {
    fetch(`/api/FoodDonation/donations/${id}/receive`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      // Add the received donation to the receivedDonations array
      setReceivedDonations([...receivedDonations, id]);
    });
  };

  return (
    <div className='container'>
      <div className="sidepanel">
      <div className="profile">
            <Link to="/NGOProfile">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="Profile" />
              ) : (
                'Profile'
              )}
            </Link>
            </div>
        <div className="profiledetails">
          Received Donations:
        </div>
      </div>

      <div className="main">
        {donations.map(donation => (
          donation.userId && ( // Only display donations where userId is not null
            <div className="cards" key={donation._id}>
              <ul>
                <li>Name: {donation.userId.username}</li> {/* Display the username */}
                <li>Email: {donation.userId.email}</li> {/* Display the email */}
                <li>Food Name: {donation.Food_Name}</li>
                <li>Category: {donation.Type_Of_Food}</li>
                <li>Type: {donation.Meal_Type}</li>
                <li>Phone: {donation.PhoneNumber}</li>
                <li>Quantity: {donation.Qauntity}</li>
                <li>Address: {donation.Address}</li>
              </ul>
              {receivedDonations.includes(donation._id) ? (
                <p>Donation completed</p>
              ) : (
                <button onClick={() => handleReceiveDonation(donation._id)}>Receive Donation</button>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
