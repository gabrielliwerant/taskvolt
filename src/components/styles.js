/**
 * src/components/styles.js
 *
 * Holds re-usable styles for components that have more specific use cases than the general styles
 * available in `jss/styles`.
 */

import { ANIMATION_TIMES } from '@jss/constants';

const complete = {
  textDecoration: 'line-through',
  opacity: '0.5',
  transition: `all ${ANIMATION_TIMES.SHORT}ms ease-out`
};

export { complete };
