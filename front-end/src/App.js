import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import Modal from "./Modal";
const axios = require("axios");
const qrcode = require("qrcode");

function App() {
  const [open, setOpen] = React.useState(false);
  const [qrCode, setQrCode] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }

  function paymentSuccess() {
    setOpen(false);
  }

  async function onButtonClick() {
    let invoice = await axios.post("http://localhost:3000/createInvoice");
    const BOLT11 = "lightning:" + invoice.data.data.payreq;
    loadQr(BOLT11);
    setOpen(true);
    waitForPayment(invoice.data.data.id);
  }

  async function loadQr(BOLT11) {
    const qrCode = await qrcode.toDataURL(BOLT11, {
      margin: 2,
      width: 500
    });
    setQrCode(qrCode);
  }

  async function waitForPayment(invoiceId) {
    let payment = await axios.get(
      `http://localhost:3000/fetchInvoice/${invoiceId}/wait`
    );
    return payment ? paymentSuccess() : waitForPayment(invoiceId);
  }

  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={onButtonClick}>
        Show me an invoice
      </Button>
      <Modal open={open} handleClose={handleClose} qr={qrCode} />
    </div>
  );
}

export default App;
