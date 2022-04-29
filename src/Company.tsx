import { styled } from "@mui/material";
import * as React from "react";
import ChoosenDate from "./ChoosenDate";
import TimeSlotsContainer from "./TimeSlotsContainer";

const Container = styled('div')({
  borderBottom: '2px solid black',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 'bold',
});

interface companyProps {
  data?: any;
  handleClick?: any;
  selected?: any;
  reservations?: any;
}

function Company(props: companyProps) {
  // const Company = ({ data, handleClick, selected, reservations }) => {
  const { data, handleClick, selected, reservations } = props
  // console.log(reservations, "reservations")
  // console.log(data, "data")

  const reserved = reservations.map((el: { companyId: any; start_time: string; end_time: string; }) => {
    if (el.companyId === data.companyId) {
      return el.start_time + "-" + el.end_time
    }
  })

  return (
    <div>
      <Container>
        {data.companyName}
      </Container>
      <ChoosenDate selected={reserved} />
      <Container />
      <TimeSlotsContainer data={data} handleClick={handleClick} />
    </div>
  )
}

export default Company;
