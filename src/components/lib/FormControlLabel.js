/**
 * src/components/lib/FormControlLabel.js
 *
 * Wraps the mui `FormControlLabel` for customization purposes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@mui/material/FormControlLabel';

import { Checkbox } from '@components/lib/Checkbox';

const MyFormControlLabel = ({ label, onChange, isChecked = false, isDisabled = false }) => {
  return (
    <FormControlLabel
      label={label}
      disabled={isDisabled}
      control={<Checkbox onChange={onChange} isChecked={isChecked} disabled={isDisabled} />}
    />
  );
};

MyFormControlLabel.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool
};

export { MyFormControlLabel as FormControlLabel };
