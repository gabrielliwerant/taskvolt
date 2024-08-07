/**
 * src/redux/selectors/projects.js
 *
 * Handles selectors for todo projects.
 */

import { getState } from '../config';

const _getProjects = () => getState('projects');

const getProjectsItems = () => _getProjects().items;
const getProjectsSort = () => _getProjects().sort;

export { getProjectsItems, getProjectsSort };
