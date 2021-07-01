import React from 'react';
import { createUseStyles } from 'react-jss';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import Button from './Button';

const useStyles = createUseStyles({
  container: {
    width: '100%',
    height: '60px',
    background: '#dddddd',
    marginBottom: '20px',
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  inner: {
    marginRight: '20px'
  }
});

const NavBar = () => {
  const classes = useStyles();

  return (
    <header className={classes.container}>
      <nav className={classes.inner}>
        <ul>
          <li><Button onClick={() => {}} isIcon><AddTwoToneIcon /></Button></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
