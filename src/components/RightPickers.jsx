import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  pickers: {
    margin: '20px'
  }
})

const RightPickers = props => {
  const { classes } = props;


  return (
    <div className={classes.pickers}>
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

export default withStyles(styles)(RightPickers);