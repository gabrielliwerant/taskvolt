import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { List as ReactMovableList } from 'react-movable';
import { connect } from 'react-redux';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import { getTodosItems, getTodosItemsSort, getListsItems } from '../selectors';
import { todosSlice, listSlice } from '../reducers';
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
  id,
  todosItems,
  todosSort,
  listsItems,
  add,
  reorder,
  edit,
  change,
  save,
  cancel
}) => {
  const classes = useStyles();
  const onChange = id => e => change({ id, draft: e.target.value });

  return (
    <li className={classes.listContainer} key={id}>
      <div className={classes.listTitleContainer}>
        <NameInputEdit
          onClickEdit={edit({ id })}
          onChangeEdit={onChange(id)}
          onClickSave={save({ id, draft: listsItems[id].text.draft })}
          onClickCancel={cancel({ id })}
          textFinal={listsItems[id].text.final}
          textDraft={listsItems[id].text.draft}
          isEditActive={listsItems[id].isEditActive}
          isComplete={false}
          myClassNames={{ text: classes.text }}
        />
        <Button onClick={add({ listId: id })} isIcon>
          <AddTwoToneIcon />
        </Button>
      </div>
      <ReactMovableList
        onChange={({ oldIndex, newIndex }) => reorder(
          { listId: id, oldIndex, newIndex }
        )}
        values={todosSort[id]}
        renderList={({ children, props }) => (
          <ul {...props} className={classes.list}>{children}</ul>
        )}
        renderItem={({ value, props }) => (
          <li {...props} key={value} id={value} className={classes.item}>
            <Todo todo={todosItems[value]} />
          </li>
        )}
      />
    </li>
  );
};

MyList.propTypes = {
  id: PropTypes.number.isRequired,
  todosItems: PropTypes.object.isRequired,
  todosSort: PropTypes.object.isRequired,
  listsItems: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  reorder: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  todosItems: getTodosItems(),
  todosSort: getTodosItemsSort(),
  listsItems: getListsItems()
});

const mapDispatchToProps = dispatch => ({
  add: listId => () => dispatch(todosSlice.actions.add(listId)),
  reorder: (listId, oldIndex, newIndex) => dispatch(
    todosSlice.actions.reorder(listId, oldIndex, newIndex)
  ),
  edit: id => () => dispatch(listSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(listSlice.actions.save(id, draft)),
  cancel: id => () => dispatch(listSlice.actions.cancel(id)),
  change: id => dispatch(listSlice.actions.change(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
