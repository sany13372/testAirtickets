import '@mantine/core/styles.css';

import {createTheme, MantineProvider} from '@mantine/core';
import './App.css'
import TicketSection from "./TicketSection/TicketSection";
import {ticketDefault} from "./tecketsDefault";

function App() {
    const theme = createTheme({
        cursorType: 'pointer',
    });
  return (
    <MantineProvider theme={theme}>
      <TicketSection tickets={ticketDefault}/>
    </MantineProvider>
  )
}

export default App
