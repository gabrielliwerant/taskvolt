import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

import { BORDER_OFFSET, TODO_WIDTH } from '../jss/constants';
import { tilt } from '../jss/utils';
import { getListsItems, getListSelected } from '../selectors';
import { todosSlice, listSlice } from '../reducers';
import Button from './Button';
import NameInputEdit from './NameInputEdit';
import Todos from './Todos';

const useStyles = createUseStyles({
  container: {
    height: '100%',
    marginBottom: '30px',
    marginRight: '30px',
    '&:last-child': {
      marginRight: 0
    }
  },
  listContainer: {
    width: `${TODO_WIDTH + BORDER_OFFSET}px`,
    padding: '15px',
    background: '#f2f2f2',
    border: '1px solid #cccccc',
    borderRadius: '4px'
  },
  listTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: '"Roboto", arial, sans-serif',
    fontSize: '20px',
    width: '164px',
    height: '25px'
  }
});

const List = ({
  provided,
  listId,
  listsItems,
  dragId,
  add,
  edit,
  change,
  save,
  cancel,
  remove
}) => {
  const onChange = id => e => change({ id, draft: e.target.value });
  const classes = useStyles();

  return (
    <li
      key={listId}
      className={classes.container}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div
        className={classes.listContainer}
        style={{ transform: dragId === listId ? tilt : '' }}
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
          <Button onClick={add({ id: listId })} isIcon><AddTwoToneIcon /></Button>
          <Button onClick={remove({ id: listId })} isIcon>
            <DeleteTwoToneIcon />
          </Button>
        </div>
        <Todos listId={listId} />
      </div>
    </li>
  );
};

List.propTypes = {
  provided: PropTypes.object.isRequired,
  listId: PropTypes.string.isRequired,
  listsItems: PropTypes.object.isRequired,
  dragId: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  listsItems: getListsItems(),
  dragId: getListSelected()
});

const mapDispatchToProps = dispatch => ({
  add: id => () => dispatch(todosSlice.actions.add(id)),
  edit: id => () => dispatch(listSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(listSlice.actions.save(id, draft)),
  cancel: id => () => dispatch(listSlice.actions.cancel(id)),
  change: id => dispatch(listSlice.actions.change(id)),
  remove: id => () => dispatch(listSlice.actions.remove(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
