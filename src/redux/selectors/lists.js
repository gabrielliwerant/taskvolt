/**
 * src/redux/selectors/lists.js
 *
 * Handles selectors for todo lists.
 */

import { getState } from '../config';

const _getLists = () => getState('lists');

const getListsItems = () => _getLists().items;
const getListsSort = () => _getLists().sort;
const getListSelected = () => _getLists().selected;
const getListDropping = () => _getLists().dropping;

export { getListsItems, getListsSort, getListSelected, getListDropping };
