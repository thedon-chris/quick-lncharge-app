import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
function Modal({ handleClose, open, qr }) {
  return (
    <Dialog
      fullScreen
      aria-labelledby="simple-dialog-title"
      open={open}
      TransitionComponent={Transition}
    >
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
