import clsx from "clsx";
import React, { useState } from 'react';
import Calendar from './Calendar';
import '../styles/MainPage.css';

const MainPage = props => {

  const [isWeekPeriod, setIsWeekPeriod] = useState(false);
  const [isMonthPeriod, setIsMonthPeriod] = useState(false);
  const [isQuarterPeriod, setIsQuarterPeriod] = useState(false);
  const [isYearPeriod, setIsYearPeriod] = useState(false);
  const [datesInPeriod, setDatesInPeriod] = useState([]);

  return (
    <div>
      <div className={'wrapper'}>
        <div className={'period'}>
          <span>Период</span>
          <Calendar 
            setIsWeekPeriod={setIsWeekPeriod}
            setIsMonthPeriod={setIsMonthPeriod}
            setIsQuarterPeriod={setIsQuarterPeriod}
            setIsYearPeriod={setIsYearPeriod}
            setDatesInPeriod={setDatesInPeriod}
          />
        </div>
        <div>
          <span>Детализация графика</span>
          <div className={'detailingWrapper'}>
            <div className={ clsx( isWeekPeriod && !(isMonthPeriod || isQuarterPeriod || isYearPeriod) 
              ? 'detailingChosen' : {}, 'detailing') }>Неделя</div>
            <div className={ clsx( isMonthPeriod && !(isQuarterPeriod || isYearPeriod) 
              ? 'detailingChosen' : {}, 'detailing') }>Месяц</div>
            <div className={ clsx( isQuarterPeriod && !isYearPeriod ? 'detailingChosen' : {}, 'detailing') }>Квартал</div>
            <div className={ clsx( isYearPeriod ? 'detailingChosen' : {}, 'detailing') }>Год</div>
          </div>
        </div>
      </div>
      { !!datesInPeriod.length && (
        <div className={'datesInPeriod'}>
          <span>Даты из диапазона:</span>
          <br />
            {datesInPeriod.map(x => x + "   ")}
        </div>
      )}
      
    </div>
  ); 
}

export default MainPage;