import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  button: {
    height: '20px',
    width: '64px',
    fontSize: '15px',
    fontWeight: 'normal',
    borderRadius: '2px',
    boxShadow: 'none',
    verticalAlign: 'top',
    marginTop: '1px',
  },
}));

function CheckButton() {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" className={classes.button}>
      Check
    </Button>
  );
}

export default CheckButton;
