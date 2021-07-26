import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import { Z_INDEX } from '../jss/constants';
import { todosSlice, listsSlice, projectsSlice } from '../reducers';
import { getProjectsSort, getProjectsItems } from '../selectors';
import { makeId } from '../utils';
import Button from './Button';
import NameInputEdit from './NameInputEdit';

const useStyles = createUseStyles({
  container: {
    width: '100%',
    background: '#dddddd',
    marginRight: '20px',
    position: 'fixed',
    zIndex: Z_INDEX.navBar,
    borderBottom: '1px solid #cccccc'
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 20px'
  },
  text: {
    fontSize: '18px'
  }
});

const NavBar = ({
  addSort,
  add,
  edit,
  save,
  cancel,
  change,
  projectsSort,
  projectsItems
}) => {
  const classes = useStyles();
  const onClick = () => {
    const id = makeId();
    addSort({ id });
    add({ id });
  };
  const onChange = id => e => change({ id, draft: e.target.value });

  return (
    <header className={classes.container}>
      <nav className={classes.inner}>
        <ul>
          {projectsSort['1'].map(projectId => (
            <li key={projectId}>
              <NameInputEdit
                onClickEdit={edit({ id: projectId })}
                onChangeEdit={onChange(projectId)}
                onClickSave={save({
                  id: projectId,
                  draft: projectsItems[projectId].text.draft
                })}
                onClickCancel={cancel({ id: projectId })}
                textFinal={projectsItems[projectId].text.final}
                textDraft={projectsItems[projectId].text.draft}
                isEditActive={projectsItems[projectId].isEditActive}
                isComplete={false}
                myClassNames={{ text: classes.text }}
              />
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <Button onClick={onClick} isIcon trailing={<AddTwoToneIcon />}>
              Add List
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

NavBar.propTypes = {
  addSort: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  projectsSort: PropTypes.object.isRequired,
  projectsItems: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  projectsSort: getProjectsSort(),
  projectsItems: getProjectsItems()
});

const mapDispatchToProps = dispatch => ({
  addSort: listId => dispatch(todosSlice.actions.addSort(listId)),
  add: (listId, projectId) => dispatch(listsSlice.actions.add(listId, projectId)),
  edit: id => () => dispatch(projectsSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(projectsSlice.actions.save(id, draft)),
  cancel: id => () => dispatch(projectsSlice.actions.cancel(id)),
  change: id => dispatch(projectsSlice.actions.change(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
