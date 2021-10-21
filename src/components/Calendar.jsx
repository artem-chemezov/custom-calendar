import React, { useState, useEffect } from 'react';
import moment from "moment";
import { withStyles } from "@material-ui/styles";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import RightPickers from './RightPickers'
import dateFormat from 'dateformat';

const { RangePicker } = DatePicker;

const styles = theme => ({
  wrapper: {
    // marginLeft: '20px'
  },
  picker: {

  }
})

// const dateFormat = require('dateformat');
const dateToString = date => dateFormat(date, "yyyy-mm-dd");


const Calendar = props => {
  const { classes } = props;
  const [startDate, setStartDate] = useState();
  const [stopDate, setStopDate] = useState();


  const clickWeek = () => {
    var start = new Date();
    var stop = new Date();
    start.setDate(start.getDate() - start.getDay());
    setStopDate(start);
    stop.setDate(start.getDate()-7);
    setStartDate(stop);
  }

  const clickMonth = () => {
    var start = new Date();
    start.setDate(start.getDate() - start.getDay());
    setStopDate(start);
    var stop = new Date(start);
    stop.setMonth(start.getMonth()-1)
    setStartDate(stop);
  }

  const clickYear = () => {
    var start = new Date();
    start.setDate(start.getDate() - start.getDay());
    setStopDate(start);
    var stop = new Date(start);
    stop.setFullYear(start.getFullYear()-1)
    setStartDate(stop);
  }

  const clickQuarter = () => {
    var start = new Date();
    start.setDate(start.getDate() - start.getDay());
    setStopDate(start);
    var stop = new Date(start);
    stop.setMonth(start.getMonth()-3)
    setStartDate(stop);
  }


  const onChange = (value) => {
    setStartDate(value[0].toDate());
    setStopDate(value[1].toDate());

    console.log(value[0].diff(value[1], 'weeks'));

    props.setIsWeekPeriod(value[0].diff(value[1], 'weeks') < 0);
    props.setIsQuarterPeriod(value[0].diff(value[1], 'quarters') < 0);
    props.setIsMonthPeriod(value[0].diff(value[1], 'months') < 0);
    props.setIsYearPeriod(value[0].diff(value[1], 'years') < 0)

  }

  useEffect(() => {
    clickMonth();
  }, []);

  return (
    <div className={classes.wrapper}>
      <Space direction="horizonatal" size={12}>
        <RangePicker 
          className={classes.picker}
          picker="day"
          value={[moment(startDate), moment(stopDate)]}
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")]
          }}
          format="YYYY-MM-DD"
          onChange={onChange}
          renderExtraFooter={()=>(
          <RightPickers 
            clickWeek={clickWeek}
            clickMonth={clickMonth}
            clickQuarter={clickQuarter}
            clickYear={clickYear}
          />)}
          />
      </Space>
    </div>
  ); 
}

export default withStyles(styles)(Calendar);