import {  useState } from "react";

import DatePicker from "react-datetime-picker";
//import DateTimePicker from 'react-datetime-picker'
//import 'react-clock/dist/Clock.css';
//import "../../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.css";
//import styles from "./MyWidget.module.css";
//import "node_modules/";
//import 'react-date-picker/dist/DatePicker.css';
//import 'react-calendar/dist/Calendar.css';

export const Pruebas = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        dateFormat="Pp"
      />
    //   <DateTimePicker
    //   selected={startDate}
    //     onChange={(date) => setStartDate(date)}
        
    //    showTimeSelect
    //    timeFormat="p"
    //     timeIntervals={15}
    //     value={startDate}
    //     format="y-MM-dd h:mm:ss a" />
    );
};
