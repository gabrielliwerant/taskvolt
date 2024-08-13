/**
 * src/components/Project.js
 *
 * Renders the project name and associated functionality.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { TYPES } from '@src/constants';
import { projectsSlice } from '@redux/reducers/projects';
import { getProjectsItems } from '@redux/selectors/projects';

import { NameContainer } from '@components/Name';

const useStyles = createUseStyles({
  project: {
    display: 'flex',
    marginRight: '10px'
  },
  text: {
    textTransform: 'none',
    fontSize: '20px'
  }
});

const Project = ({ projectsItems, id, edit, save, cancel, change }) => {
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
  const onChange = id => e => change(id, e.target.value);

  return (
    <div key={id} className={classes.project}>
      <NameContainer
        onClickEdit={edit(id)}
        onChangeEdit={onChange(id)}
        onClickSave={save(id, projectsItems[id].text.draft)}
        onClickCancel={cancel(id)}
        textFinal={projectsItems[id].text.final}
        textDraft={projectsItems[id].text.draft}
        isEditActive={projectsItems[id].isEditActive}
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
