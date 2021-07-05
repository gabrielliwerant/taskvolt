import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
const classNames = require('classnames');

const buttonStyles = {
  backgroundColor: '#1976d2',
  border: '1px solid #1976d2',
  color: '#ffffff',
  boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 500,
  fontSize: '0.5rem',
  transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: 'rgb(17, 82, 147)'
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 3px 2px #1982D2'
  }
};

const useStyles = createUseStyles({
  button: {
    ...buttonStyles,
    padding: '8px 20px'
  },
  iconButton: {
    ...buttonStyles,
    padding: '2px 3px 1px 3px'
  },
  iconButtonTrailing: {
    ...buttonStyles,
    padding: '4px 13px 5px 13px',
    display: 'flex',
    alignItems: 'center',
    '& $text': {
      marginRight: '7px'
    }
  },
  text: {
    fontSize: '1rem',
    fontWeight: 'bold'
  }
});

const Button = ({ onClick, myClassNames, isIcon, trailing, children }) => {
  const classes = useStyles();
  const hasText = (!isIcon && !trailing) || (isIcon && trailing);

  return (
    <button
      onClick={onClick}
      className={classNames({
        [myClassNames]: myClassNames,
        [classes.button]: !isIcon,
        [classes.iconButton]: isIcon && !trailing,
        [classes.iconButtonTrailing]: isIcon && trailing
      })}
    >
      {hasText && <span className={classes.text}>{children}</span>}
      {isIcon && !trailing && children}
      {trailing}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  myClassNames: PropTypes.string,
  isIcon: PropTypes.bool,
  trailing: PropTypes.element,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  myClassNames: '',
  isIcon: false,
  trailing: null
};

export default Button;
