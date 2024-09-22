/**
 * jss/styles.js
 *
 * Holds re-usable style objects for jss stlying.
 */

const tilt = 'rotate(2deg)';
const straighten = 'rotate(0deg)';

const flex = {
  display: 'flex'
};

const flexCenterY = {
  display: 'flex',
  alignItems: 'center'
};

const flexCenterX = {
  display: 'flex',
  justifyContent: 'space-between'
};

const maxContentWidth = {
  width: 'max-content',
  maxWidth: 'max-content !important'
};

const hidden = {
  display: 'none'
};

const visuallyHidden = {
  visibility: 'hidden'
};

const visuallyVisible = {
  visibility: 'visible'
};

export {
  tilt,
  straighten,
  flex,
  flexCenterY,
  flexCenterX,
  maxContentWidth,
  hidden,
  visuallyHidden,
  visuallyVisible
};
