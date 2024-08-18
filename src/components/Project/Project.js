/**
 * src/components/Project.js
 *
 * Renders the project name and associated functionality.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { NameContainer } from '@components/Name';

import { text } from '@components/Project/styles';

import { TYPES, MAX_LENGTH_INPUT } from '@src/constants';
import { projectsSlice } from '@redux/reducers/projects';
import {
  getProjectsItems,
  getProjectTextFinalFromProject,
  getProjectDraftTextFromProject,
  getProjectIsEditActiveFromProject
} from '@redux/selectors/projects';

const useStyles = createUseStyles({
  project: {
    display: 'flex',
    marginRight: '10px'
  },
  text
});

const Project = ({ projectsItems, id, activeId, edit, save, cancel, change }) => {
  const classes = useStyles();

  /**
   * Handles change action for input edit.
   *
   * @param {string} id Project id
   * @returns {function[
   *  @param {object} e Event
   *  @returns {void}
   * ]}
   */
  const onChange = id => e => {
    // Prevent entering characters past our limit
    if (e.target.value.length > MAX_LENGTH_INPUT[TYPES.PROJECT]) return;

    change(id, e.target.value);
  };

  return (
    <div key={id} className={classes.project}>
      <NameContainer
        onClickEdit={id === activeId ? edit(id) : () => {}}
        onChangeEdit={onChange(id)}
        onClickSave={save(id, getProjectDraftTextFromProject(projectsItems[id]))}
        onClickCancel={cancel(id)}
        textFinal={getProjectTextFinalFromProject(projectsItems[id])}
        textDraft={getProjectDraftTextFromProject(projectsItems[id])}
        isEditActive={getProjectIsEditActiveFromProject(projectsItems[id])}
        isComplete={false}
        type={TYPES.PROJECT}
        myClassNames={{ text: classes.text }}
      />
    </div>
  );
};

Project.propTypes = {
  projectsItems: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  activeId: PropTypes.string.isRequired,
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
  save: (id, draft) => () => dispatch(projectsSlice.actions.save({ id, draft })),
  cancel: id => () => dispatch(projectsSlice.actions.cancel(id)),
  change: (id, draft) => dispatch(projectsSlice.actions.change({ id, draft }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
