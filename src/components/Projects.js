import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { projectsSlice } from '../reducers';
import { getProjectsSort, getProjectsItems } from '../selectors';
import NameInputEdit from './NameInputEdit';

const useStyles = createUseStyles({
  text: {
    fontSize: '18px'
  }
});

const Projects = ({
  projectsSort,
  projectsItems,
  edit,
  save,
  cancel,
  change
}) => {
  const classes = useStyles();
  const onChange = id => e => change({ id, draft: e.target.value });

  return (
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
  );
};

Projects.propTypes = {
  projectsSort: PropTypes.object.isRequired,
  projectsItems: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  projectsSort: getProjectsSort(),
  projectsItems: getProjectsItems()
});

const mapDispatchToProps = dispatch => ({
  edit: id => () => dispatch(projectsSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(projectsSlice.actions.save(id, draft)),
  cancel: id => () => dispatch(projectsSlice.actions.cancel(id)),
  change: id => dispatch(projectsSlice.actions.change(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
