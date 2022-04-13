import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Reservations from "./data/db.json"

console.log("dbDataaaa", Reservations.reservations[0].time_slots[0, 9].start_time)
// console.log(Reservations.item.time_slots, "itemsloots")

function App() {

  return (
    <div className="App">

      <Box style={{ marginTop: 20 }}>
        {Reservations.reservations.map((item, i) => (
          <TextField key={i}
            style={{ marginRight: 50, textAlignLast: 'center' }}
            id="outlined-read-only-input"
            defaultValue={item.name}
            InputProps={{
              readOnly: true,
            }}
          />
        ))}
      </Box>

      <Box style={{ marginTop: 20 }}>
        <TextField
          style={{ marginRight: 50, textAlignLast: 'center' }}
          disabled
          id="outlined-disabled"
          // label="Disabled"
          defaultValue="Value Selected"
        />
        <TextField
          style={{ marginRight: 50, textAlignLast: 'center' }}
          disabled
          id="outlined-disabled"
          // label="Disabled"
          defaultValue="Value Selected"
        />
        <TextField
          style={{ marginRight: 50, textAlignLast: 'center' }}
          disabled
          id="outlined-disabled"
          // label="Disabled"
          defaultValue="Value Selected"
        />
      </Box>

      <Box style={{ marginTop: 60 }}>
        <Box style={{ display: 'inline-grid' }}>
          {Reservations.reservations[0].time_slots.map((item, i) => (
            < TextField key={i}
              style={{ marginRight: 50, textAlignLast: 'center' }}
              id="outlined-read-only-input"
              defaultValue={item}
              InputProps={{
                readOnly: true,
              }}
            />
          ))}
        </Box>
        <Box style={{ display: 'inline-grid' }}>
          {Reservations.reservations[1].time_slots.map((item, i) => (
            < TextField key={i}
              style={{ marginRight: 50, textAlignLast: 'center' }}
              id="outlined-read-only-input"
              defaultValue={item.start_time}
              InputProps={{
                readOnly: true,
              }}
            />
          ))}
        </Box>
        <Box style={{ display: 'inline-grid' }}>
          {Reservations.reservations[2].time_slots.map((item, i) => (
            < TextField key={i}
              style={{ marginRight: 50, textAlignLast: 'center' }}
              id="outlined-read-only-input"
              defaultValue={item}
              InputProps={{
                readOnly: true,
              }}
            />
          ))}
        </Box>
      </Box>

    </div >
  );
}

export default App;
