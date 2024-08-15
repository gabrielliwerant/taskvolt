/**
 * src/redux/selectors/app.js
 *
 * Handles selectors for overall application.
 */

import { getState } from '../config';

const _getApp = () => getState('app');

const getAppView = () => _getApp().view;
const getAppActiveTab = () => _getApp().activeTab;
const isAppLoggedIn = () => _getApp().isLoggedIn;

export { getAppView, getAppActiveTab, isAppLoggedIn };
