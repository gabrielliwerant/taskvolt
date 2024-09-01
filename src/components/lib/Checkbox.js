/**
 * src/components/lib/Checkbox.js
 *
 * Wraps the mui `Checkbox` for customization purposes.
 *
 * KLUDGE: There is a great deal of hackery in the `sx` prop to make the background of the unchecked
 *  checkbox a different color.
 *  @link https://stackoverflow.com/questions/58756193/change-background-color-of-an-unchecked-material-ui-checkbox
 */

import React from 'react';
import PropTypes from 'prop-types';

import SquareIcon from '@mui/icons-material/SquareRounded';
import Checkbox from '@mui/material/Checkbox';

import { theme, COLOR_OPTIONS } from '@src/theme';

const MyCheckbox = ({ onChange, isChecked, disabled, color, fillColor, ariaLabel }) => {
  /**
   * Determine which stroke color should be used for the checkbox based on which combination of
   * fill and regular color is used.
   *
   * @returns {string}
   */
  const getStrokeColor = () => {
    // When fill is white, use black border when primary, dark when different color
    if (fillColor === COLOR_OPTIONS.WHITE && color === COLOR_OPTIONS.PRIMARY)
      return 'rgba(0, 0, 0, 0.75)';
    if (fillColor === COLOR_OPTIONS.WHITE && color !== COLOR_OPTIONS.PRIMARY)
      return theme.palette[color].dark;

    // Use same fill for solid color look when fill color is non-white color
    if (fillColor !== COLOR_OPTIONS.WHITE) return theme.palette[fillColor].main;
  };

  return (
    <Checkbox
      size='small'
      onChange={onChange}
      checked={isChecked}
      disabled={disabled}
      color={color}
      inputProps={{ 'aria-label': ariaLabel }}
      icon={<SquareIcon />}
      sx={{
        '& .MuiSvgIcon-root path': {
          fill: fillColor === COLOR_OPTIONS.WHITE ? '' : theme.palette[fillColor].main
        },
        '&:not(.Mui-checked)': {
          '& .MuiSvgIcon-root path': {
            fill: theme.palette[fillColor].main,
            stroke: getStrokeColor(),
            strokeWidth: '2px'
          },
          '&.Mui-disabled .MuiSvgIcon-root path': {
            stroke: 'rgba(0, 0, 0, 0.4)'
          }
        }
      }}
    />
  );
};

MyCheckbox.propTypes = {
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  fillColor: PropTypes.oneOf([
    COLOR_OPTIONS.ERROR,
    COLOR_OPTIONS.WARNING,
    COLOR_OPTIONS.SUCCESS,
    COLOR_OPTIONS.PRIMARY,
    COLOR_OPTIONS.INFO,
    COLOR_OPTIONS.PRIMARY,
    COLOR_OPTIONS.SECONDARY,
    COLOR_OPTIONS.WHITE
  ]),
  ariaLabel: PropTypes.string
};

MyCheckbox.defaultProps = {
  onChange: () => {},
  isChecked: false,
  disabled: false,
  color: 'primary',
  fillColor: COLOR_OPTIONS.WHITE,
  ariaLabel: ''
};

export { MyCheckbox as Checkbox };
