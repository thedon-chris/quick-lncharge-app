var express = require("express");
var router = express.Router();

const ChargeClient = require("lightning-charge-client");

// new is optional
const ln_charge = new ChargeClient(
  "https://btcpay.myawesomedomain.com/lightning-charge/btc/",
  "mysecretoken"
);
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/createInvoice", async (req, res, next) => {
  let invoice = await ln_charge.invoice({
    msatoshi: 10000,
    description: `My awesome lApp`
  });
  return res.json({ data: invoice });
});

router.get("/fetchInvoice/:id/wait", async (req, res, next) => {
  // Long poll payment updates for a specific invoice
  let invoice = req.params.id;
  const paid = null;
  do {
    const paid = await ln_charge.wait(
      invoice,
      /* timeout: */ 600 /* seconds */
    );
    if (paid) return res.json({ success: true, data: invoice });
    else if (paid === false)
      console.log("invoice expired and can no longer be paid");
    else if (paid === null)
      console.log("timeout reached without payment, invoice is still payable");
  } while (paid === null);
});

module.exports = router;
