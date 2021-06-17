import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-movable';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import { getItemsSort, getListItems } from '../selectors';
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
    paddingInlineStart: 0
  },
  listTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  item: {
    cursor: 'grab',
    listStyle: 'none',
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
  todos,
  list,
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
      <div className={classes.listTitleContainer}>
        <NameInputEdit
          onClickEdit={edit({ id: list.id })}
          onChangeEdit={onChange(list.id)}
          onClickSave={save({ id: list.id, draft: list.text.draft })}
          onClickCancel={cancel({ id: list.id })}
          textFinal={list.text.final}
          textDraft={list.text.draft}
          isEditActive={list.isEditActive}
          isComplete={false}
          myClassNames={{ text: classes.text }}
        />
        <Button onClick={add} isIcon><AddTwoToneIcon /></Button>
      </div>
      <List
        onChange={({ oldIndex, newIndex }) => reorder({ oldIndex, newIndex })}
        values={todos}
        renderList={({ children, props }) => (
          <ul {...props} className={classes.list}>{children}</ul>
        )}
        renderItem={({ value, props }) => (
          <li {...props} key={value.id} id={value.id} className={classes.item}>
            <Todo todo={value} />
          </li>
        )}
      />
    </div>
  );
};

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  list: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  reorder: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  todos: getItemsSort(),
  list: getListItems()
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(todosSlice.actions.add()),
  reorder: (oldIndex, newIndex) => dispatch(todosSlice.actions.reorder(oldIndex, newIndex)),
  edit: id => () => dispatch(listSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(listSlice.actions.save(id, draft)),
  cancel: id => () => dispatch(listSlice.actions.cancel(id)),
  change: id => dispatch(listSlice.actions.change(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
