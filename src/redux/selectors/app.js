/**
 * src/redux/selectors/app.js
 *
 * Handles selectors for overall application.
 */

import { getState } from '../config';

const _getApp = () => getState('app');

const getAppView = () => _getApp().ui.view;
const getAppActiveTab = () => _getApp().ui.activeTab;
const isAppLoggedIn = () => _getApp().user.isLoggedIn;

export { getAppView, getAppActiveTab, isAppLoggedIn };
