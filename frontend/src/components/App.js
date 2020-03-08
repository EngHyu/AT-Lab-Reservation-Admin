import '../styles/App.css';
import React from 'react';
import { UserTable, SeatTable, LogTable } from './table'
import * as strings from '../strings'

function App() {
  const lang = 'ko'

  return (
    <div className="mt-5">
      {<UserTable strings={strings[lang]} />}
      {<SeatTable strings={strings[lang]} />}
      {<LogTable strings={strings[lang]} />}
    </div>
  );
}

export default App;
