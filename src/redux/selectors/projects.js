/**
 * src/redux/selectors/projects.js
 *
 * Handles selectors for todo projects.
 */

import { getState } from '../config';

const _getProjects = () => getState('projects');

const getProjectsItems = () => _getProjects().items;
const getProjectsSort = () => _getProjects().sort;
const _getProjectById = id => _getProjects().items[id];
const getProjectIsEditActive = id => _getProjectById(id).isEditActive;

export { getProjectsItems, getProjectsSort, getProjectIsEditActive };
