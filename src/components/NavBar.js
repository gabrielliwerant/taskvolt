import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import AddRounded from '@mui/icons-material/AddRounded';

import { makeId } from '@src/utils';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';

import { Z_INDEX } from '@jss/constants';

import { AppBar } from '@components/lib/AppBar';
import { Button } from '@components/lib/Button';
import Projects from '@components/Projects';

const useStyles = createUseStyles({
  container: {
    justifyContent: 'space-between'
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
    <AppBar color='default' myClassName={classes.container}>
      <Projects />
      <ul>
        <li>
          <Button onClick={onClick} startIcon={<AddRounded />}>Add List</Button>
        </li>
      </ul>
    </AppBar>
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
