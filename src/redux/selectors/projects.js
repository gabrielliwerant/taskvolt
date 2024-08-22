/**
 * src/redux/selectors/projects.js
 *
 * Handles selectors for todo projects.
 */

import { getState } from '../config';

const _getProjects = () => getState('projects');

const getProjectsItems = () => _getProjects().items;
const isProjectRemoved = id => !!getProjectsItems()?.[id]?.trash.isTrashed;
const getProjectsSort = () => _getProjects().sort;
const hasProjects = () => !!getProjectsSort().length;
const getProjectRemoving = () => _getProjects().removing;
const getProjectActive = () => _getProjects().active;
const _getProjectById = id => _getProjects().items[id];
const getProjectSortIndexById = id => getProjectsSort().findIndex(i => i === id);
const getProjectIsEditActive = id => _getProjectById(id).isEditActive;
const getTrashTabIndex = () => getProjectsSort().length + 1; // Add one for the `add` tab

const getProjectTextFinalFromProject = project => project.text.final;
const getProjectDraftTextFromProject = project => project.text.draft;
const getProjectIsEditActiveFromProject = project => project.isEditActive;

export {
  getProjectsItems,
  isProjectRemoved,
  getProjectsSort,
  hasProjects,
  getProjectRemoving,
  getProjectActive,
  getProjectSortIndexById,
  getProjectIsEditActive,
  getTrashTabIndex,

  getProjectTextFinalFromProject,
  getProjectDraftTextFromProject,
  getProjectIsEditActiveFromProject
};
