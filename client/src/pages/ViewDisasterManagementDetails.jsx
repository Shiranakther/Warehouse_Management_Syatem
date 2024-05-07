import React, { useEffect, useState } from 'react';

const ViewDisasterManagementDetails = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/disasters');
        const data = await response.json();
        setDisasters(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>View Disaster Management Details</h2>
      <ul>
        {disasters.map((disaster) => (
          <li key={disaster._id}>
            <p>{disaster.name}</p>
            <p>{disaster.telephoneNo}</p>
            <p>{disaster.whatsapp}</p>
            <p>{disaster.gmail}</p>
            <p>{disaster.reason}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewDisasterManagementDetails;
