import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { getListsSort } from '../selectors';
import List from './List';

const useStyles = createUseStyles({
  lists: {
    display: 'flex',
    justifyContent: 'center',
    padding: '80px 30px 0 30px',
    position: 'absolute'
  }
});

const Lists = ({ listsSort }) => {
  const classes = useStyles();

  return (
    <Droppable
      droppableId='droppable-lists'
      direction='horizontal'
      type='LIST'
    >
      {(provided) => (
        <ul
          className={classes.lists}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {listsSort.map((listId, index) => (
            <Draggable
              key={listId}
              draggableId={`list-${listId}`}
              index={index}
            >
              {(provided) => <List listId={listId} provided={provided} />}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

Lists.propTypes = {
  listsSort: PropTypes.array.isRequired
};

const mapStateToProps = () => ({
  listsSort: getListsSort()
});

export default connect(mapStateToProps, null)(Lists);
