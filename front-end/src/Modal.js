import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";

function Modal({ handleClose, open, qr }) {
  return (
    <Dialog fullScreen aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Pay Lightning Invoice</DialogTitle>
      <QrCode qr={qr} />
      <Button variant="contained" color="secondary" onClick={handleClose}>
        Close
      </Button>
      <div />
    </Dialog>
  );
}

function QrCode({ qr }) {
  return (
    <div>
      <img className="" src={qr.toString()} alt={""} />
    </div>
  );
}

export default Modal;
