import * as React from "react";
import Company from "./Company";
import "./style.css";
import * as db from "./db";
import { format, parseISO } from "date-fns";
import * as moment from "moment";
import { useEffect, useState } from "react";
import { styled } from "@mui/material";

const Container = styled('div')({
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-around',
  maxWidth: '700px',
  paddingTop: '50px'
});

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [companiesFormatted, setCompaniesFormatted] = useState([]);
  const [reservations, setReservations] = useState<any>([]);
  const [slotsState, setSlotsState] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    let companies = db.Companies;
    setCompanies(companies);

  }, []);

  console.log('test', selectedState)
  useEffect(() => {
    const allSlots = companies.map((company) => {
      return company.time_slots.map((slot: { start_time: string; end_time: string; }) => {
        return {
          ...slot,
          start_time: format(parseISO(slot.start_time), "HH:mm"),
          end_time: format(parseISO(slot.end_time), "HH:mm"),
          day: format(parseISO(slot.start_time), "MM/dd/yyyy"),
          companyId: company.id,
          state: "enabled",
          slotId: Math.random().toString().substr(2),
          //32 it is not neccesary
        };
      });
    });

    const mergedSlots = [].concat(...allSlots);
    setSlotsState(mergedSlots);
  }, [companies]);
  // 37-39 Check-Again

  useEffect(() => {
    const companiesFormatted = companies.map((company) => {
      const filteredByCompany = slotsState.filter(
        (slot) => slot.companyId === company.id
      );
      return {
        ...company,
        time_slots: filteredByCompany,
      };
    });
    const formatedDate = companiesFormatted.map((company) => {
      const slots = company.time_slots.map((slot: any) => {
        return {
          ...slot,
        };
      });
      return {
        company: company.name,
        slots,
        companyId: company.id
      };
    });
    const groupedByDayArray = formatedDate.map((company) => {
      const GroupedByDayObj = {};

      company.slots.forEach((element: { day: any; }) => {
        let dayKey = element.day;
        // console.log(typeof dayKey)
        if (!GroupedByDayObj[dayKey]) {
          GroupedByDayObj[dayKey] = [];
        }
        GroupedByDayObj[dayKey].push({
          ...element,
        });
      });
      const sortedByDate = Object.entries(GroupedByDayObj).sort(function (
        a,
        b
      ) {
        return new Date(a[0]).valueOf() - new Date(b[0]).valueOf();
        //80 uneccesary
      });

      const joinedSortedArray = sortedByDate.map((el) => {
        return {
          day: moment(el[0]).format("dddd"),
          date: moment(el[0]).format("l"),
          slots: el[1],
        };
      });

      return {
        days: joinedSortedArray,
        companyName: company.company,
        companyId: company.companyId
      };
    });
    setCompaniesFormatted(groupedByDayArray);
  }, [slotsState]);
  // 100

  useEffect(() => {
    const slotIds = reservations.map((el: { slotId: any; }) => el.slotId);
    const touchedSlots = slotsState.map((element) => {
      const booleanReservation = reservations.some(
        (reservation: { start_time: { toString: () => number; }; end_time: { toString: () => number; }; selectedDay: any; }) =>
          ((element.start_time.toString() >=
            reservation.start_time.toString() &&
            element.start_time.toString() < reservation.end_time.toString()) ||
            (element.end_time.toString() <= reservation.end_time.toString() &&
              element.end_time.toString() >
              reservation.start_time.toString())) &&
          reservation.selectedDay === element.day
        // 1 == '1' = true // converts data type
        // 1 === '1' = false // compares datas
      );
      if (booleanReservation && !slotIds.includes(element.slotId)) {
        return {
          ...element,
          state: "disabled",
        };
      } else if (slotIds.includes(element.slotId)) {
        setSelectedState(element.start_time + '-' + element.end_time)
        console.log(element, 'element')
        return {
          ...element,
          state: "reserved",
        };
      } else {
        return {
          ...element,
          state: "enabled",
        };
      }
    });
    // 105-132 utility service class (create a method)
    setSlotsState(touchedSlots);
  }, [reservations]);

  const handleClick = (
    start_time: any,
    end_time: any,
    selectedDay: { toString: () => any; },
    companyId: any,
    slotId: any
  ) => {
    if (
      reservations.length === 0 ||
      !reservations.some(
        (el: { selectedDay: any; companyId: any; }) =>
          el.selectedDay === selectedDay.toString() &&
          el.companyId === companyId
      )
    ) {
      setReservations([
        ...reservations,
        {
          start_time,
          end_time,
          selectedDay,
          companyId,
          slotId,
        },
      ]);
    } else if (reservations.some((el: { slotId: any; }) => el.slotId === slotId)) {
      const filteredSlots = reservations.filter((el: { slotId: any; }) => el.slotId !== slotId);
      setReservations(filteredSlots);
    }
  };
  return (
    <Container>
      {companiesFormatted.map((company) => (
        <Company
          data={company}
          handleClick={handleClick}
          key={company.companyName}
          selected={selectedState}
          reservations={reservations}
        />
      ))}
    </Container>
  );
};

export default Companies;
