/**
 * src/components/Name/styles.js
 *
 * Reusable styles for `Name` components.
 */

import { WIDTHS, HEIGHTS } from '@jss/constants';

const active = {
  display: 'inline-flex',

  '&:focus': {
    outline: 'none'
  }
};

const inactive = {
  display: 'none'
};

const complete = {
  textDecoration: 'line-through',
  opacity: '0.5'
};

const incomplete = {
  textDecoration: 'none'
};

const item = {
  height: props => `${HEIGHTS[props.type].INPUT}px`,
  overflow: 'hidden' // KLUDGE: Fix long text display
};

const text = {
  '& div': {
    fontSize: '14px'
  }
};

export { active, inactive, complete, incomplete, item, text };
