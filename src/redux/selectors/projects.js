/**
 * src/redux/selectors/projects.js
 *
 * Handles selectors for todo projects.
 */

import { getState } from '../config';

const _getProjects = () => getState('projects');

const getProjectsItems = () => _getProjects().items;
const isProjectRemoved = id => !!getProjectsItems()?.[id]?.isRemoved;
const getProjectsSort = (id = '1') => _getProjects().sort[id];
const getProjectRemoving = () => _getProjects().removing;
const getProjectActive = () => _getProjects().active;
const _getProjectById = id => _getProjects().items[id];
const getProjectIdBySortIndex = index => _getProjectById(getProjectsSort()[index]).id;
const getProjectIsEditActive = id => _getProjectById(id).isEditActive;
const getTrashTabIndex = () => getProjectsSort().length + 1; // Add one for the `add` tab

const getProjectTextFinalFromProject = project => project.text.final;
const getProjectDraftTextFromProject = project => project.text.draft;
const getProjectIsEditActiveFromProject = project => project.isEditActive;

export {
  getProjectsItems,
  isProjectRemoved,
  getProjectsSort,
  getProjectRemoving,
  getProjectActive,
  getProjectIdBySortIndex,
  getProjectIsEditActive,
  getTrashTabIndex,

  getProjectTextFinalFromProject,
  getProjectDraftTextFromProject,
  getProjectIsEditActiveFromProject
};
