/**
 * src/components/List/List.js
 *
 * Renders a list of todo items with associated drag/drop functionality.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import AddIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';

import { IconButton } from '@components/lib/IconButton';
import { Tooltip } from '@components/lib/Tooltip';
import { Todos } from '@components/Todo';
import { NameContainer } from '@components/Name';

import { listContainer, listItemContainer, text } from '@components/List/styles';
import { tilt, flex, flexCenterX, flexCenterY } from '@jss/styles';

import { TYPES } from '@src/constants';
import {
  getListItemById,
  getListSelected,
  getListTextFinalFromList,
  getListDraftTextFromList,
  getListIsEditActiveFromList
} from '@redux/selectors/lists';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';

const classNames = require('classnames');

const useStyles = createUseStyles({
  listContainer,
  listItemContainer,
  listNameContainerText: {
    ...text,
    ...flexCenterY
  },
  flexCenterX,
  flexCenterY,
  flex
});

const List = ({
  provided,
  id,
  item,
  dragId,
  addTodo,
  edit,
  change,
  save,
  cancel,
  remove
}) => {
  const onChange = e => change(e.target.value);
  const classes = useStyles();

  return (
    <li
      key={id}
      className={classes.listItemContainer}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div
        className={classes.listContainer}
        style={{ transform: dragId === id ? tilt : '' }}
      >
        <div className={classNames({ [classes.flexCenterX]: true, [classes.flexCenterY]: true })}>
          <NameContainer
            onClickEdit={edit}
            onChangeEdit={onChange}
            onClickSave={save(getListDraftTextFromList(item))}
            onClickCancel={cancel}
            textFinal={getListTextFinalFromList(item)}
            textDraft={getListDraftTextFromList(item)}
            isEditActive={getListIsEditActiveFromList(item)}
            isComplete={false}
            myClassNames={{ text: classes.listNameContainerText }}
            type={TYPES.LIST}
          />
          {!getListIsEditActiveFromList(item) &&
            <div className={classes.flex}>
              <Tooltip title='Add todo item'>
                <IconButton onClick={addTodo} ariaLabel='Add todo item to list'>
                  <AddIcon fontSize='medium' />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete list'>
                <IconButton onClick={remove} ariaLabel='Delete entire list'>
                  <DeleteIcon fontSize='medium' />
                </IconButton>
              </Tooltip>
            </div>
          }
        </div>
        <Todos listId={id} />
      </div>
    </li>
  );
};

List.propTypes = {
  provided: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  dragId: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  item: getListItemById(ownProps.id),
  dragId: getListSelected()
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.id;

  return {
    addTodo: () => dispatch(todosSlice.actions.add(id)),
    edit: () => dispatch(listsSlice.actions.edit(id)),
    save: draft => () => dispatch(listsSlice.actions.save({ id, draft })),
    cancel: () => dispatch(listsSlice.actions.cancel(id)),
    change: draft => dispatch(listsSlice.actions.change({ id, draft }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
