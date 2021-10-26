import useStateWithCallback from 'use-state-with-callback';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import RightPickers from './RightPickers';
import '../styles/Calendar.css';
import axios from 'axios';
import { clickPeriod } from '../utils/utils';

const { RangePicker } = DatePicker;

const Calendar = props => {

  const [startDate, setStartDate] = useStateWithCallback(
    clickPeriod((start, stop) => start.set("month", stop.month()-1)).start,
    () => changeDetailingChart(startDate)
    );
  const [stopDate, setStopDate] = useStateWithCallback(
    clickPeriod((start, stop) => start.set("month", stop.month()-1)).stop, 
    () => changeDetailingChart(stopDate)
    );

  const setDatesAndGetDatesInPeriod = async (dates) => {
    setStartDate(dates.start);
    setStopDate(dates.stop);
    const result = await axios.get('http://localhost:8080/period-dates', { params: { startDate: dates.start.format('YYYY-MM-DD'), stopDate: dates.stop.format('YYYY-MM-DD') }});
    props.setDatesInPeriod(result.data.datesInPeriod);
  }
  
  const clickWeek = () => {
    setDatesAndGetDatesInPeriod(
      clickPeriod((start, stop) => start.set("date", stop.date() - 7))
    );
  }

  const clickMonth = () => {
    setDatesAndGetDatesInPeriod(
      clickPeriod((start, stop) => start.set("month", stop.month()-1))
    );
  }

  const clickQuarter = () => {
    setDatesAndGetDatesInPeriod(
      clickPeriod((start, stop) => start.set("month", stop.month() - 3))
    );
  }

  const clickYear = () => {
    setDatesAndGetDatesInPeriod(
      clickPeriod((start, stop) => start.set("year", stop.year()-1))
    );
  }

  const onChange = (value) => {
    if (!!value) {
      setDatesAndGetDatesInPeriod({ start: value[0], stop: value[1] });
      changeDetailingChart(value[0], value[1]);
    }
  }

  const changeDetailingChart = () => {
    if (!!startDate && !!stopDate) {
      props.setIsWeekPeriod(startDate.diff(stopDate, 'weeks') < 0);
      props.setIsQuarterPeriod(startDate.diff(stopDate, 'quarters') < 0);
      props.setIsMonthPeriod(startDate.diff(stopDate, 'months') < 0);
      props.setIsYearPeriod(startDate.diff(stopDate, 'years') < 0);  
    }
  }

  return (
    <div>
      <Space direction="horizonatal" size={12}>
        <RangePicker 
          dropdownClassName='custom-picker'
          picker="day"
          value={[startDate, stopDate]}
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

export default Calendar;