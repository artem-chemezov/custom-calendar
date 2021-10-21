import clsx from "clsx";
import React, { useState, useEffect } from 'react';
import { withStyles } from "@material-ui/styles";
import Calendar from './Calendar';

const styles = theme => ({
  wrapper: {
    display: 'inline-flex',
    padding: '50px',
    alignItems: 'center',
  },
  period: {
    display: 'flex',
    margin: '0px 20px',
    alignItems: 'center',
  },
  detailingWrapper: {
    display: 'inline-flex',
  },
  detailing: {
    marginLeft: '10px',
    background: 'grey',
    color: 'white',
  },
  detailingChosen: {
    background: 'blue'
  }
})

const MainPage = props => {

  const { classes } = props;
  const [isWeekPeriod, setIsWeekPeriod] = useState(false);
  const [isMonthPeriod, setIsMonthPeriod] = useState(false);
  const [isQuarterPeriod, setIsQuarterPeriod] = useState(false);
  const [isYearPeriod, setIsYearPeriod] = useState(false);

  return (
    <div className={classes.wrapper}>
      <div className={classes.period}>
        <span>Период</span>
        <Calendar 
          setIsWeekPeriod={setIsWeekPeriod}
          setIsMonthPeriod={setIsMonthPeriod}
          setIsQuarterPeriod={setIsQuarterPeriod}
          setIsYearPeriod={setIsYearPeriod}
        />
      </div>
      <div>
        <span>Детализация графика</span>
        <div className={classes.detailingWrapper}>
          <div className={ clsx( isWeekPeriod && !(isMonthPeriod || isQuarterPeriod || isYearPeriod) 
            ? classes.detailingChosen : {}, classes.detailing) }>Неделя</div>
          <div className={ clsx( isMonthPeriod && !(isQuarterPeriod || isYearPeriod) 
            ? classes.detailingChosen : {}, classes.detailing) }>Месяц</div>
          <div className={ clsx( isQuarterPeriod && !isYearPeriod ? classes.detailingChosen : {}, classes.detailing) }>Квартал</div>
          <div className={ clsx( isYearPeriod ? classes.detailingChosen : {}, classes.detailing) }>Год</div>
        </div>

      </div>
    </div>
  ); 
}

export default withStyles(styles)(MainPage);