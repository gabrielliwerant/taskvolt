import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { getListsSort } from '../selectors';
import MyList from './MyList';

const useStyles = createUseStyles({
  container: {
    margin: 'auto'
  },
  lists: {
    display: 'flex',
    justifyContent: 'center',
    margin: '80px 30px 0 30px',
    position: 'absolute'
  }
});

const ListsContainer = ({ listsSort }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ul className={classes.lists}>
        {listsSort.map(id => <MyList id={id} key={id} />)}
      </ul>
    </div>
  );
};

ListsContainer.propTypes = {
  listsSort: PropTypes.array.isRequired
};

const mapStateToProps = () => ({ listsSort: getListsSort() });

export default connect(mapStateToProps, null)(ListsContainer);
