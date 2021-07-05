import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import { getListsItems } from '../selectors';
import { todosSlice, listSlice } from '../reducers';
import Button from './Button';
import NameInputEdit from './NameInputEdit';
import Todos from './Todos';

const useStyles = createUseStyles({
  listContainer: {
    width: '310px',
    marginRight: '30px',
    marginBottom: '30px',
    padding: '15px',
    background: '#f2f2f2',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    '&:last-child': {
      marginRight: 0
    }
  },
  listTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: '"Roboto", arial, sans-serif',
    fontSize: '20px',
    height: '25px'
  }
});

const List = ({
  provided,
  listId,
  listsItems,
  add,
  edit,
  change,
  save,
  cancel
}) => {
  const classes = useStyles();
  const onChange = id => e => change({ id, draft: e.target.value });

  return (
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
        <Button onClick={add({ listId })} isIcon><AddTwoToneIcon /></Button>
      </div>
      <Todos listId={listId} />
    </li>
  );
};

List.propTypes = {
  provided: PropTypes.object.isRequired,
  listId: PropTypes.string.isRequired,
  listsItems: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  listsItems: getListsItems()
});

const mapDispatchToProps = dispatch => ({
  add: listId => () => dispatch(todosSlice.actions.add(listId)),
  edit: id => () => dispatch(listSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(listSlice.actions.save(id, draft)),
  cancel: id => () => dispatch(listSlice.actions.cancel(id)),
  change: id => dispatch(listSlice.actions.change(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);