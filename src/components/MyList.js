import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import {
  getTodosItems,
  getTodosItemsSort,
  getListsItems,
  getListsSort
} from '../selectors';
import { todosSlice, listSlice } from '../reducers';
import { getDraggableId } from '../utilities';
import Button from './Button';
import NameInputEdit from './NameInputEdit';
import Todo from './Todo';

const useStyles = createUseStyles({
  listContainer: {
    width: '310px',
    marginRight: '30px',
    '&:last-child': {
      marginRight: 0
    }
  },
  lists: {
    display: 'flex',
    justifyContent: 'center',
    margin: '80px 30px 0 30px',
    position: 'absolute'
  },
  list: {
    marginTop: '7px'
  },
  listTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  item: {
    cursor: 'grab',
    width: '334px',
    marginBottom: '4px',
    '&:last-child': {
      marginBottom: 0
    },
    '&:focus': {
      outline: 'none'
    }
  },
  text: {
    fontFamily: '"Roboto", arial, sans-serif',
    fontSize: '20px',
    height: '25px'
  }
});

const MyList = ({
  todosItems,
  todosSort,
  listsItems,
  listsSort,
  add,
  reorder,
  edit,
  change,
  save,
  cancel,
  reorderList
}) => {
  const classes = useStyles();
  const onChange = id => e => change({ id, draft: e.target.value });
  const onDragEnd = result => {
    if (!result.destination) return;

    if (result.type === 'LIST') {
      reorderList({
        listId: getDraggableId(result.draggableId),
        oldIndex: result.source.index,
        newIndex: result.destination.index
      });
    }

    if (result.type === 'ITEM') {
      reorder({
        listId: getDraggableId(result.source.droppableId),
        oldIndex: result.source.index,
        newIndex: result.destination.index
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                {(provided) => (
                  <li
                    key={listId}
                    className={classes.listContainer}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className={classes.listTitleContainer}>
                      <NameInputEdit
                        onClickEdit={edit({ id: listId })}
                        onChangeEdit={onChange(listId)}
                        onClickSave={save(
                          { id: listId, draft: listsItems[listId].text.draft }
                        )}
                        onClickCancel={cancel({ id: listId })}
                        textFinal={listsItems[listId].text.final}
                        textDraft={listsItems[listId].text.draft}
                        isEditActive={listsItems[listId].isEditActive}
                        isComplete={false}
                        myClassNames={{ text: classes.text }}
                      />
                      <Button onClick={add({ listId })} isIcon>
                        <AddTwoToneIcon />
                      </Button>
                    </div>

                    <Droppable
                      droppableId={`droppable-items-${listId}`}
                      type='ITEM'
                    >
                      {(provided) => (
                        <ul
                          className={classes.list}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {todosSort[listId].map((todoId, index) => (
                            <Draggable
                              key={todoId}
                              draggableId={`item-${todoId}`}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  key={todoId}
                                  className={classes.item}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Todo todo={todosItems[todoId]} />
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

MyList.propTypes = {
  todosItems: PropTypes.object.isRequired,
  todosSort: PropTypes.object.isRequired,
  listsItems: PropTypes.object.isRequired,
  listsSort: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  reorder: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  reorderList: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  todosItems: getTodosItems(),
  todosSort: getTodosItemsSort(),
  listsItems: getListsItems(),
  listsSort: getListsSort()
});

const mapDispatchToProps = dispatch => ({
  add: listId => () => dispatch(todosSlice.actions.add(listId)),
  reorder: (listId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorder(listId, oldIndex, newIndex)
  ),
  edit: id => () => dispatch(listSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(listSlice.actions.save(id, draft)),
  cancel: id => () => dispatch(listSlice.actions.cancel(id)),
  change: id => dispatch(listSlice.actions.change(id)),
  reorderList: (listId, oldIndex, newIndex) => dispatch(
    listSlice.actions.reorder(listId, oldIndex, newIndex)
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
