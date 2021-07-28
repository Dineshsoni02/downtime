import React from "react";
import "./Details.scss";

const Details = (details) => {
  console.log(details.responseTime);
  console.log(details.url);
  console.log(details.statusCode);

  return (
    <div className="details">
      {/* <p>{details.message}</p> */}
      <h4>{details.url}</h4>
      <h4>{details.statusCode}</h4>
     
    </div>
  );
};

export default Details;
