/**
 * src/components/Name/styles.js
 *
 * Reusable styles for `Name` components.
 */

import { WIDTHS, HEIGHTS, ANIMATION_TIMES } from '@jss/constants';

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
  opacity: '0.5',
  transition: `all ${ANIMATION_TIMES.SHORT}ms ease-out`
};

const incomplete = {
  textDecoration: 'none',
  transition: `all ${ANIMATION_TIMES.SHORT}ms ease-in`
};

const item = {
  justifyContent: 'center',
  minHeight: props => `${HEIGHTS[props.type].INPUT}px`
};

const text = {
  wordBreak: 'break-word',

  '& p': {
    padding: '9px 0' // KLUDGE: Makes height of text consistent regardless of # of lines of text
  },

  '& div': {
    fontSize: '14px'
  }
};

export { active, inactive, complete, incomplete, item, text };
