/**
 * src/redux/selectors/lists.js
 *
 * Handles selectors for todo lists.
 */

import { getState } from '../config';

const _getLists = () => getState('lists');
const _getListsItems = () => _getLists().items;

const getListItemById = id => _getListsItems()[id];
const isListRemoved = id => !!_getListsItems()?.[id]?.isRemoved;
const hasListItemById = id => !!_getListsItems()?.[id];
const getListsSort = () => _getLists().sort;
const hasListsByProjectId = id => !!getListsSort()?.[id].length;
const getListRemoving = () => _getLists().removing;
const getListSelected = () => _getLists().selected;
const getListDropping = () => _getLists().dropping;

const getListTextFinalFromList = list => list.text.final;
const getListDraftTextFromList = list => list.text.draft;
const getListIsEditActiveFromList = list => list.isEditActive;

export {
  getListItemById,
  isListRemoved,
  hasListItemById,
  getListsSort,
  hasListsByProjectId,
  getListRemoving,
  getListSelected,
  getListDropping,

  getListTextFinalFromList,
  getListDraftTextFromList,
  getListIsEditActiveFromList
};
