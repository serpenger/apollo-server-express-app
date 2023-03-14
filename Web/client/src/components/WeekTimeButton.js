import { useState } from 'react';
import './css/calendar.css';
import './css/schedule.css';

export default function WeekTimeButton({ value, updateFunct, clsName }) {
  const [theme, setTheme] = useState('white')

  const dayClickEvent = (value) => {
    updateFunct(value)
    setTheme(value.selected ? "green" : "white")
    console.log(`current value ${value.data} and is ${value.selected}`)
  }

  return (
    <button className={clsName} onClick={() => {
      dayClickEvent(value)
    }} style={{ backgroundColor: theme }}>{value.data}</button>
  );
}