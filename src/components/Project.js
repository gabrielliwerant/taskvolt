import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { projectsSlice } from '@redux/reducers/projects';
import { getProjectsItems } from '@redux/selectors/projects';

import { NameContainer } from './Name';

const useStyles = createUseStyles({
  text: {
    fontSize: '18px'
  }
});

const Project = ({ projectsItems, id, edit, save, cancel, change }) => {
  const classes = useStyles();
  const onChange = id => e => change({ id, draft: e.target.value });

  return (
    <li key={id}>
      <NameContainer
        onClickEdit={edit({ id })}
        onChangeEdit={onChange(id)}
        onClickSave={save({ id, draft: projectsItems[id].text.draft })}
        onClickCancel={cancel({ id })}
        textFinal={projectsItems[id].text.final}
        textDraft={projectsItems[id].text.draft}
        isEditActive={projectsItems[id].isEditActive}
        isComplete={false}
        myClassNames={{ text: classes.text }}
      />
    </li>
  );
};

Project.propTypes = {
  projectsItems: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  projectsItems: getProjectsItems()
});

const mapDispatchToProps = dispatch => ({
  edit: id => () => dispatch(projectsSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(projectsSlice.actions.save(id, draft)),
  cancel: id => () => dispatch(projectsSlice.actions.cancel(id)),
  change: id => dispatch(projectsSlice.actions.change(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
