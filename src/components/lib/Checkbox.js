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

import Checkbox from '@mui/material/Checkbox';

const MyCheckbox = ({ onChange, isChecked, disabled, ariaLabel }) => {
  return (
    <Checkbox
      size='small'
      onChange={onChange}
      checked={isChecked}
      disabled={disabled}
      inputProps={{ 'aria-label': ariaLabel }}
      sx={{
        '&:not(.Mui-checked)': {
          '& .PrivateSwitchBase-input': {
            width: 'auto',
            height: 'auto',
            top: 'auto',
            left: 'auto',
            opacity: '1',
            visibility: 'hidden'
          },
          '& .PrivateSwitchBase-input:before': {
            content: '""',
            position: 'absolute',
            width: 'calc(100% - 1px)',
            height: 'calc(100% - 1px)',
            backgroundColor: '#FFFFFF',
            visibility: 'visible'
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
