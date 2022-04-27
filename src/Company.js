import React from "react";
import ChoosenDate from "./ChoosenDate";
import TimeSlotsContainer from "./TimeSlotsContainer";

const Company = ({ data, handleClick, selected, reservations }) => {

  console.log(reservations, "resss")
  console.log(data, "datadata")

  const reserved = reservations.map((el) => {
    if (el.companyId === data.companyId) {
      return el.start_time + "-" + el.end_time
    }
  })
  return (
    <div>
      <div className="companyName">{data.companyName}</div>
      <div style={{ marginTop: 20, marginBottom: -35 }}>
        <ChoosenDate selected={reserved} />
      </div>
      <div className="companyName"></div>
      <div style={{ marginTop: 20 }}>
        <TimeSlotsContainer data={data} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Company;
