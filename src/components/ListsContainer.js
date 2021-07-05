import React from 'react';
import { createUseStyles } from 'react-jss';

import MyList from './MyList';

const useStyles = createUseStyles({
  container: {
    margin: 'auto'
  }
});

const ListsContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <MyList />
    </div>
  );
};

export default ListsContainer;
