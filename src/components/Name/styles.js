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
  justifyContent: 'center',
  minHeight: props => `${HEIGHTS[props.type].INPUT}px`
};

const text = {
  wordBreak: 'break-word',

  '& div': {
    fontSize: '14px'
  }
};

export { active, inactive, complete, incomplete, item, text };
