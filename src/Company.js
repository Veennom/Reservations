import React from "react";
import TimeSlotsContainer from "./TimeSlotsContainer";

const Company = ({ data, handleClick }) => {
  return (
    <div>
      <div className="companyName">{data.companyName}</div>

      <div style={{ marginTop: 20 }}>
        <TimeSlotsContainer data={data} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Company;
