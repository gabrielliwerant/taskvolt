import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import { todosSlice, listSlice } from '../reducers';
import { makeId } from '../utilities';
import Button from './Button';

const useStyles = createUseStyles({
  container: {
    width: '100%',
    height: '60px',
    background: '#dddddd',
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    position: 'fixed',
    zIndex: 1,
    borderBottom: '1px solid #cccccc'
  },
  inner: {
    marginRight: '20px'
  }
});

const NavBar = ({ addSort, add }) => {
  const classes = useStyles();
  const onClick = () => {
    const id = makeId();
    addSort({ id });
    add({ id });
  };

  return (
    <header className={classes.container}>
      <nav className={classes.inner}>
        <ul>
          <li>
            <Button onClick={onClick} isIcon trailing={<AddTwoToneIcon />}>
              Add List
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  addSort: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addSort: listId => dispatch(todosSlice.actions.addSort(listId)),
  add: listId => dispatch(listSlice.actions.add(listId))
});

export default connect(null, mapDispatchToProps)(NavBar);
