import { styled } from "@mui/material";
import * as React from "react";
import "./style.css";

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRight: '2px solid black',
  borderLeft: '2px solid black',
  marginTop: 20,
  '@media (min-width: 450px)': {
    padding: '20px'
  }
});
const TimeSlotContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

interface timeSlotProps {
  data?: any;
  handleClick?: any;
}

function TimeSlot(props: timeSlotProps) {
  const { data, handleClick } = props
  return (
    <TimeSlotContainer>
      <h5>{`${data.day}`}</h5>
      <div>
        {data.slots.map((slot: { state: string; start_time: React.Key; end_time: any; day: any; companyId: any; slotId: any; }) => (
          <div
            className={
              slot.state === "disabled"
                ? "disabled"
                : "timeSlot" && slot.state === "reserved"
                  ? "reserved"
                  : "timeSlot"
            }
            key={slot.start_time}
            onClick={
              slot.state !== "disabled"
                ? () =>
                  handleClick(
                    slot.start_time,
                    slot.end_time,
                    slot.day,
                    slot.companyId,
                    slot.slotId
                  )
                : () => null
            }
          >
            {`${slot.start_time} - ${slot.end_time}`}
          </div>
        ))}
      </div>
    </TimeSlotContainer>
  );
};

function TimeSlotsContainer(props: timeSlotProps) {
  const { data, handleClick } = props
  return (
    <Container>
      {
        data.days.map((el: { day: React.Key; }) => (
          <TimeSlot data={el} key={el.day} handleClick={handleClick} />
        ))
      }
    </Container>
  );
};

export default TimeSlotsContainer;
