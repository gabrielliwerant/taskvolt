import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import { Z_INDEX } from '../jss/constants';
import { todosSlice, listsSlice } from '../reducers';
import { getProjectsSort, getProjectsItems } from '../selectors';
import { makeId } from '../utils';
import Button from './Button';

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

const NavBar = ({ addSort, add, projectsSort, projectsItems }) => {
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
          {projectsSort['1'].map(projectId => (
            <li key={projectId}>{projectsItems[projectId].text.final}</li>
          ))}
        </ul>
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
  add: PropTypes.func.isRequired,
  projectsSort: PropTypes.object.isRequired,
  projectsItems: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  projectsSort: getProjectsSort(),
  projectsItems: getProjectsItems()
});

const mapDispatchToProps = dispatch => ({
  addSort: listId => dispatch(todosSlice.actions.addSort(listId)),
  add: (listId, projectId) => dispatch(listsSlice.actions.add(listId, projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
