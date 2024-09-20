/**
 * src/components/Name/Name.js
 *
 * Renders the name of a given item in various states.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { isEmpty } from 'lodash';

import { Typography } from '@components/lib/Typography';
import { Link } from '@components/lib/Link';
import Code from '@components/Code';

import {
  isUrl,
  splitByUrl,
  hasBacktickSurround,
  splitByBackticks,
  removeLeadingAndTrailing
} from '@components/Name/utils';
import { COLOR_OPTIONS } from '@src/theme';
import { TYPES, TYPE_TO_TYPOGRAPHY_VARIANT } from '@src/constants';

import { complete } from '@components/styles';
import { active, inactive, incomplete, item, text } from '@components/Name/styles';

const classNames = require('classnames');

const useStyles = createUseStyles({
  active,
  inactive,
  complete,
  incomplete,
  item: {
    ...item,

    cursor: 'pointer'
  },
  text
});

const Name = ({
  id = '',
  isActive = false,
  isComplete = false,
  onClick = () => {},
  value = '',
  type = TYPES.TODO,
  color = COLOR_OPTIONS.PRIMARY,
  myClassNames = {}
}) => {
  const classes = useStyles({ type });
  const myClasses = Object.values(myClassNames).join(' ');

  return (
    <div
      onClick={onClick}
      className={classNames({
        [myClasses]: !isEmpty(myClassNames),
        [classes.text]: !myClassNames?.text,
        [classes.active]: isActive,
        [classes.inactive]: !isActive,
        [classes.complete]: isComplete,
        [classes.incomplete]: !isComplete,
        [classes.item]: true
      })}
    >
      <Typography id={`text-${id}`} variant={TYPE_TO_TYPOGRAPHY_VARIANT[type]} color={color}>
        {splitByUrl(value).map(segment =>
          !isUrl(segment)
            ? splitByBackticks(segment).map(subSegment =>
                !hasBacktickSurround(subSegment)
                  ? subSegment
                  : <Code key={`code-${id}`} color={color}>
                      {removeLeadingAndTrailing(subSegment)}
                    </Code>
              )
            : <Link
                key={`link-${id}`}
                variant='caption'
                href={segment}
                color={color}
                isComplete={isComplete}
              >
                {segment}
              </Link>
        )}
      </Typography>
    </div>
  );
};

Name.propTypes = {
  id: PropTypes.string,
  isActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
  color: PropTypes.oneOf([
    COLOR_OPTIONS.PRIMARY,
    COLOR_OPTIONS.SECONDARY,
    COLOR_OPTIONS.ERROR,
    COLOR_OPTIONS.WARNING,
    COLOR_OPTIONS.SUCCESS,
    COLOR_OPTIONS.INFO,
    COLOR_OPTIONS.WHITE,
    COLOR_OPTIONS.BLACK
  ]),
  type: PropTypes.oneOf([ TYPES.TODO, TYPES.LIST, TYPES.PROJECT ]),
  myClassNames: PropTypes.object
};

export default Name;
