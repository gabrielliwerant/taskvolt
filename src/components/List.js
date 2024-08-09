import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import AddIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';

import { TYPES } from '@src/constants';
import { getListItemById, getListSelected } from '@redux/selectors/lists';
import { todosSlice } from '@redux/reducers/todos';
import { listsSlice } from '@redux/reducers/lists';

import { IconButton } from '@components/lib/IconButton';
import { BORDER_OFFSET, LIST_PADDING, MARGINS, WIDTHS, Z_INDEX } from '@jss/constants';
import { flex } from '@jss/styles';
import { tilt } from '@jss/utils';

import Todos from './Todos';
import { NameContainer } from './Name';

const useStyles = createUseStyles({
  container: {
    height: '100%',
    marginBottom: '30px',
    marginRight: '30px',
    position: 'relative',
    zIndex: Z_INDEX.LIST,
    '&:last-child': {
      marginRight: 0
    }
  },
  listContainer: {
    width: `${WIDTHS.TODO.MAIN + BORDER_OFFSET}px`,
    padding: `${LIST_PADDING}px ${LIST_PADDING}px ${LIST_PADDING - MARGINS[TYPES.TODO].MAIN}px ${LIST_PADDING}px`,
    background: '#f7f7f7',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    '&:hover': {
      background: '#f2f2f2'
    }
  },
  listTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: '20px'
  },
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
      className={classes.container}
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

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;

  return {
    item: getListItemById(id),
    dragId: getListSelected()
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.id;

  return {
    addTodo: () => dispatch(todosSlice.actions.add(id)),
    edit: () => dispatch(listsSlice.actions.edit(id)),
    save: draft => () => dispatch(listsSlice.actions.save({ id, draft })),
    cancel: () => dispatch(listsSlice.actions.cancel(id)),
    change: draft => dispatch(listsSlice.actions.change({ id, draft })),
    remove: () => dispatch(listsSlice.actions.remove(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
