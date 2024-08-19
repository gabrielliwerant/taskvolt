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

import { COLORS } from '@jss/constants';

const MyCheckbox = ({ onChange, isChecked, disabled, ariaLabel }) => {
  return (
    <Checkbox
      size='small'
      onChange={onChange}
      checked={isChecked}
      disabled={disabled}
      inputProps={{ 'aria-label': ariaLabel }}
      icon={<SquareIcon />}
      sx={{
        '&:not(.Mui-checked)': {
          '& .MuiSvgIcon-root path': {
            fill: COLORS.WHITE,
            stroke: 'rgba(0, 0, 0, 0.75)',
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
  ariaLabel: PropTypes.string
};

MyCheckbox.defaultProps = {
  onChange: () => {},
  isChecked: false,
  disabled: false,
  ariaLabel: ''
};

export { MyCheckbox as Checkbox };
