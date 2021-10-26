import '../styles/RightPicker.css';

const RightPickers = props => {

  return (
    <div className='pickers'>
      <button onClick={props.clickWeek}>
      Неделя
      </button>
      <button  onClick={props.clickMonth}>
      Месяц
      </button>
      <button onClick={props.clickQuarter}>
      Квартал
      </button>
      <button onClick={props.clickYear}>
      Год
      </button>
    </div>

  ); 
}

export default RightPickers;