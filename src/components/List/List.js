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
import { Todos } from '@components/Todo';
import { NameContainer } from '@components/Name';

import {
  listItemContainer,
  listContainer,
  listTitleContainer,
  text
} from '@components/List/styles';
import { flex } from '@jss/styles';
import { tilt } from '@jss/utils';

import { TYPES } from '@src/constants';
import { getListItemById, getListSelected } from '@redux/selectors/lists';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';

const useStyles = createUseStyles({
  listItemContainer,
  listContainer,
  listTitleContainer,
  text,
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
        <div className={classes.listTitleContainer}>
          <NameContainer
            onClickEdit={edit}
            onChangeEdit={onChange}
            onClickSave={save(item.text.draft)}
            onClickCancel={cancel}
            textFinal={item.text.final}
            textDraft={item.text.draft}
            isEditActive={item.isEditActive}
            isComplete={false}
            myClassNames={{ text: classes.text }}
            type={TYPES.LIST}
          />
          {!item.isEditActive &&
            <div className={classes.flex}>
              <IconButton onClick={addTodo} ariaLabel='Add todo item to list'>
                <AddIcon fontSize='medium' />
              </IconButton>
              <IconButton onClick={remove} ariaLabel='Delete entire list'>
                <DeleteIcon fontSize='medium' />
              </IconButton>
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
