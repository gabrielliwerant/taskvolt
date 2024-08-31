/**
 * src/components/lib/Tab/styles.js
 *
 * Handles reusable styles for tab-related components.
 */

import { ANIMATION_TIMES } from '@jss/constants';

const activeTab = {
  opacity: '1 !important'
};

const inactiveTab = {
  transition: `all ${ANIMATION_TIMES.SHORT}ms ease-in`,

  '&:hover': {
    opacity: '1 !important',
    transition: `all ${ANIMATION_TIMES.SHORT}ms ease-in`
  }
};

const inactiveTabIndicator = {
  transition: `all ${ANIMATION_TIMES.SHORT}ms ease-in`,

  '&:hover > *': {
    width: '100%',
    transition: `all ${ANIMATION_TIMES.SHORT}ms ease-in`
  }
};

export { activeTab, inactiveTab, inactiveTabIndicator };
