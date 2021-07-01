import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-movable';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import {
  getTodosItems,
  getTodosItemsSort,
  getListsItems,
  getListsSort
} from '../selectors';
import { todosSlice, listSlice } from '../reducers';
import Button from './Button';
import NameInputEdit from './NameInputEdit';
import Todo from './Todo';

const useStyles = createUseStyles({
  container: {
    width: '310px',
    margin: 'auto'
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
    fontSize: '20px'
  }
});

const Todos = ({
  todosItems,
  todosSort,
  listsItems,
  listsSort,
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
    <div className={classes.container}>
      <ul>
        {listsSort.map(id => (
          <li key={id}>
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
            <List
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
        ))}
      </ul>
    </div>
  );
};

Todos.propTypes = {
  todosItems: PropTypes.object.isRequired,
  todosSort: PropTypes.object.isRequired,
  listsItems: PropTypes.object.isRequired,
  listsSort: PropTypes.array.isRequired,
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
  change: id => dispatch(listSlice.actions.change(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
