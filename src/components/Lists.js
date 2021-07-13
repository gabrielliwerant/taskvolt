import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { TOP_OFFSET } from '../jss/constants';
import { getListsSort } from '../selectors';
import { LIST_TYPE } from '../constants';
import Placeholder from './Placeholder';
import List from './List';

const useStyles = createUseStyles({
  lists: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${TOP_OFFSET}px 30px 0 30px`,
    position: 'absolute'
  }
});

const Lists = ({ listsSort }) => {
  const classes = useStyles();

  return (
    <Droppable
      droppableId='droppable-lists'
      direction='horizontal'
      type={LIST_TYPE}
    >
      {(provided) => (
        <ul
          className={classes.lists}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {listsSort['1'].map((listId, index) => (
            <Draggable
              key={listId}
              draggableId={`list-${listId}`}
              index={index}
            >
              {(provided) => (
                <List listId={listId} listIndex={index} provided={provided} />
              )}
            </Draggable>
          ))}
          {listsSort['1'].map((listId, listIndex) => (
            <Placeholder
              key={listId}
              id={listId}
              listIndex={listIndex}
              index={listIndex}
              variant='list'
            />
          ))}
          <div>{provided.placeholder}</div>
        </ul>
      )}
    </Droppable>
  );
};

Lists.propTypes = {
  listsSort: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  listsSort: getListsSort()
});

export default connect(mapStateToProps, null)(Lists);
