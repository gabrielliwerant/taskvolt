/**
 * src/components/List/ListTrash.js
 *
 * Renders list that have at least one removed todo item or is itself removed.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import RestoreIcon from '@mui/icons-material/RestoreRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';

import { Tooltip } from '@components/lib/Tooltip';
import { IconButton } from '@components/lib/IconButton';
import { TodosTrash } from '@components/Todo';
import { NameContainer } from '@components/Name';

import { listContainer, listItemContainer, text } from '@components/List/styles';
import { flex, flexCenterX, flexCenterY } from '@jss/styles';

import { TYPES } from '@src/constants';
import { getAppActiveTab } from '@redux/selectors/app';
import { isProjectRemoved } from '@redux/selectors/projects';
import {
  getListItemById,
  getListItemProjectId,
  hasListItemById,
  isListRemoved,
  getListTextFinalFromList
} from '@redux/selectors/lists';
import { getRemovedTodoIdsByListId } from '@redux/selectors/todos';
import { appSlice } from '@redux/reducers/app';
import { projectsSlice } from '@redux/reducers/projects';
import { listsSlice } from '@redux/reducers/lists';
import { todosSlice } from '@redux/reducers/todos';

const classNames = require('classnames');

const useStyles = createUseStyles({
  listContainer: {
    ...listContainer,

    '&:hover': {}
  },
  listItemContainer,
  listNameContainerText: {
    ...text,
    ...flexCenterY,

    cursor: 'default'
  },
  removed: {
    opacity: '0.6'
  },
  flexCenterX,
  flexCenterY,
  flex
});

const ListTrash = ({
  id,
  item,
  isRemoved,
  hasList,
  activeTab,
  expunge,
  restoreProject,
  restoreList,
  restoreTodo,
  setActiveTab
}) => {
  const classes = useStyles();

  /**
   * Handle list item restoration.
   *
   * When restoring a whole list, we must also restore any removed todos associated with it.
   *
   * @returns {void}
   */
  const onRestoreClick = () => {
    getRemovedTodoIdsByListId(id).forEach(todoId => restoreTodo(todoId));
    restoreList(id);

    const projectId = getListItemProjectId(id);

    if (!isProjectRemoved(projectId)) return;

    restoreProject(projectId);
    setActiveTab(activeTab + 1);
  };

  return (
    <Fragment>
      {hasList &&
        <li
          key={id}
          className={classes.listItemContainer}
        >
          <div className={classes.listContainer}>
            <div
              className={classNames({ [classes.flexCenterX]: true, [classes.flexCenterY]: true })}
            >
              <NameContainer
                textFinal={getListTextFinalFromList(item)}
                myClassNames={{
                  container: classNames({ [classes.removed]: !isRemoved }),
                  text: classes.listNameContainerText
                }}
                type={TYPES.LIST}
              />
              <div className={classes.flex}>
                {isRemoved &&
                  <Fragment>
                    <Tooltip title='Restore list'>
                      <IconButton onClick={onRestoreClick} ariaLabel='Restore entire list'>
                        <RestoreIcon fontSize='medium' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete permanently'>
                      <IconButton onClick={expunge} ariaLabel='Delete entire list permanently'>
                        <DeleteIcon fontSize='medium' />
                      </IconButton>
                    </Tooltip>
                  </Fragment>
                }
              </div>
            </div>
            <TodosTrash listId={id} />
          </div>
        </li>
      }
    </Fragment>
  );
};

ListTrash.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object,
  isRemoved: PropTypes.bool.isRequired,
  hasList: PropTypes.bool.isRequired,
  activeTab: PropTypes.number.isRequired,
  expunge: PropTypes.func.isRequired,
  restoreProject: PropTypes.func.isRequired,
  restoreList: PropTypes.func.isRequired,
  restoreTodo: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

ListTrash.defaultProps = {
  item: {}
};

const mapStateToProps = (state, ownProps) => ({
  item: getListItemById(ownProps.id),
  isRemoved: isListRemoved(ownProps.id),
  hasList: hasListItemById(ownProps.id),
  activeTab: getAppActiveTab()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  restoreProject: id => dispatch(projectsSlice.actions.restore(id)),
  restoreList: id => dispatch(listsSlice.actions.restore(id)),
  restoreTodo: id => dispatch(todosSlice.actions.restore(id)),
  setActiveTab: index => dispatch(appSlice.actions.setActiveTab(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListTrash);
