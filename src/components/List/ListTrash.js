/**
 * src/components/List/ListTrash.js
 *
 * Renders list that have at least one removed todo item or is itself removed.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import DeleteIcon from '@mui/icons-material/DeleteRounded';

import { IconButton } from '@components/lib/IconButton';
import { TodosTrash } from '@components/Todo';
import { NameContainer } from '@components/Name';

import {
  listItemContainer,
  listContainer,
  listTitleContainer,
  text
} from '@components/List/styles';
import { flex } from '@jss/styles';

import { TYPES } from '@src/constants';
import {
  getListItemById,
  hasListItemById,
  isListRemoved,
  getListTextFinalFromList
} from '@redux/selectors/lists';
import { listsSlice } from '@redux/reducers/lists';

const classNames = require('classnames');

const useStyles = createUseStyles({
  listItemContainer,
  listContainer: {
    ...listContainer,

    '&:hover': {}
  },
  listTitleContainer,
  text: {
    ...text,

    cursor: 'default'
  },
  removed: {
    opacity: '0.6'
  },
  flex
});

const ListTrash = ({ id, item, isRemoved, hasList, expunge }) => {
  const classes = useStyles();

  return (
    <Fragment>
      {hasList &&
        <li key={id} className={classes.listItemContainer}>
          <div className={classes.listContainer}>
            <div className={classes.listTitleContainer}>
              <NameContainer
                textFinal={getListTextFinalFromList(item)}
                myClassNames={{
                  container: classNames({ [classes.removed]: !isRemoved }), text: classes.text
                }}
                type={TYPES.LIST}
              />
              <div className={classes.flex}>
                {isRemoved &&
                  <IconButton onClick={expunge} ariaLabel='Delete entire list permanently'>
                    <DeleteIcon fontSize='medium' />
                  </IconButton>
                }
              </div>
            </div>
            <TodosTrash listId={id} />
          </div>
        </li>
      }
    </Fragment>
  );
};

ListTrash.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object,
  isRemoved: PropTypes.bool.isRequired,
  hasList: PropTypes.bool.isRequired,
  expunge: PropTypes.func.isRequired
};

ListTrash.defaultProps = {
  item: {}
};

const mapStateToProps = (state, ownProps) => ({
  item: getListItemById(ownProps.id),
  isRemoved: isListRemoved(ownProps.id),
  hasList: hasListItemById(ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  expunge: () => dispatch(listsSlice.actions.expunge(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListTrash);
