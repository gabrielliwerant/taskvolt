/**
 * src/components/ImportDataDialog.js
 *
 * Renders the dialog to confirm upload and replacement of all data.
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@components/lib/Dialog';
import { Button } from '@components/lib/Button';

import { appSlice } from '@redux/reducers/app';
import { importLocalJsonData } from '@main/import';

const ImportDataDialog = ({ open, onClose, id, toggleIsUploadOn }) => {
  /**
   * Handle upload.
   *
   * We find out hidden input file type and triggering click to begin upload selection, followed by
   * listening for upload change and then importing data if successful.
   *
   * @returns {void}
   */
  const onUpload = () => {
    const fileInputEl = document.getElementById('file_input');

    if (!fileInputEl) return console.log('File input field not found.');

    /**
     * Handle the file input change event, looking for uploaded file data and setting loading state.
     *
     * @param {element} el HTML element
     * @returns {function[
     *  @returns {void}
     * ]}
     */
    const onChangeHandler = el => () => {
      importLocalJsonData(el);
      toggleIsUploadOn(); // Change state last since the component will re-render
    };

    fileInputEl.addEventListener('change', onChangeHandler(fileInputEl));
    fileInputEl.click();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm'>
      <Fragment>
        <DialogTitle id="import-data-dialog-title">Upload and Replace Data</DialogTitle>
        <DialogContent>
          <DialogContentText id="import-data-dialog-description">
            This action will <strong>replace</strong> all current data. It is strongly recommended
            that you export and backup your data first.
            <p>Are you sure you would like to proceed?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Fragment>
            <Button onClick={onUpload} color='error'>Replace Data</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Fragment>
        </DialogActions>
      </Fragment>
    </Dialog>
  );
};

ImportDataDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  toggleIsUploadOn: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  toggleIsUploadOn: () => dispatch(appSlice.actions.toggleIsUploadOn())
});

export default connect(null, mapDispatchToProps)(ImportDataDialog);
