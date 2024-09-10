import React, { useEffect, useState } from 'react';
import ReportCard from '../components/ReportCard';

const Reports = () => {
  // Step 2: Create state to hold the data
  const [data, setData] = useState(null); // Store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Step 3: Fetch data in useEffect when the component mounts
  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      try {
        // const url = `${process.env.REACT_APP_BACKEND_URL}/api/data`
        const url = '/api/data'
        console.log(window.location.host)
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        // console.log(response.data)
        const result = await response.json(); // Parse JSON data
        setData(result); // Update state with fetched data
      } catch (error) {
        // console.log('error!', error)
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false even if an error occurs
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this runs once when the component mounts

  // Step 4: Conditionally render based on loading, error, and data state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Reports</h1>
      <p>Here are my analytics reports on various datasets:</p>
      {data.map(report => (
        <ReportCard
          key={report._id.$oid}
          reportTitle={report.title}
          reportDescription={report.description}
          reportURL={report.url}
          reportImageID={report.image_id.$oid}
        />
      ))}
    </div>
  );
};

export default Reports;
