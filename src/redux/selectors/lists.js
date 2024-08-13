/**
 * src/redux/selectors/lists.js
 *
 * Handles selectors for todo lists.
 */

import { getState } from '../config';

const _getLists = () => getState('lists');
const _getListsItems = () => _getLists().items;

const getListItemById = id => _getListsItems()[id];
const getListsSort = () => _getLists().sort;
const hasListsByProjectId = id => !!getListsSort()?.[id];
const getListRemoving = () => _getLists().removing;
const getListSelected = () => _getLists().selected;
const getListDropping = () => _getLists().dropping;

export {
  getListItemById,
  getListsSort,
  hasListsByProjectId,
  getListRemoving,
  getListSelected,
  getListDropping
};
