import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import { Z_INDEX } from '../jss/constants';
import { todosSlice } from '../redux/reducers/todos';
import { listsSlice } from '../redux/reducers/lists';
import { makeId } from '../utils';

import Button from './Button';
import Projects from './Projects';

const useStyles = createUseStyles({
  container: {
    width: '100%',
    background: '#dddddd',
    marginRight: '20px',
    position: 'fixed',
    zIndex: Z_INDEX.navBar,
    borderBottom: '1px solid #cccccc'
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 20px'
  }
});

const NavBar = ({ addTodoSortSection, addList }) => {
  const classes = useStyles();

  const onClick = () => {
    const id = makeId();
    addTodoSortSection({ id });
    addList(id);
  };

  return (
    <header className={classes.container}>
      <nav className={classes.inner}>
        <Projects />
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
  addTodoSortSection: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addTodoSortSection: listId => dispatch(todosSlice.actions.addSort(listId)),
  addList: (listId, projectId) => dispatch(listsSlice.actions.add(listId, projectId))
});

export default connect(null, mapDispatchToProps)(NavBar);
