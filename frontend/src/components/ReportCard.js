import React from 'react';
import './ReportCard.css'; // Import a separate CSS file for styling

function ReportCard({ reportTitle, reportDescription , reportURL , reportImageID }) {
  const url = reportURL.startsWith("https://") ? reportURL : "https://" + reportURL
  console.log(url)
  return (
    <div className="report-card">
      <div className="report-content">
        <h3>{reportTitle}</h3>
        <p>{reportDescription}</p>
        <a href={url} style={{ textDecoration: 'underline', fontStyle: 'italic' }}>
          see detail</a>
      </div>
      <img 
        className="report-image"
        src={`/api/image/${reportImageID}`}
        alt="Report"
      />
    </div>
  );
}

export default ReportCard;
