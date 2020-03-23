import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="sticky" place-self="flex-end">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <nav className="nav" style={{ justifyContent: 'space-around', display: 'flex', flexDirection: 'row' }}>
              <Button style={{ margin: '20px' }} variant="outlined" className={classes.root} color="inherit" component={Link} to="/">Home</Button>
              <Button style={{ margin: '20px' }} variant="outlined" className={classes.root} color="inherit" component={Link} to="/people">People</Button>
              <Button style={{ margin: '20px' }} variant="outlined" className={classes.root} color="inherit" component={Link} to="/planets">Planets</Button>
            </nav>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
