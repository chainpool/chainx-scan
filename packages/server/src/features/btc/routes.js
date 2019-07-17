const Router = require("koa-router");
const btcController = require("./btc.controller");
const lockUpController = require("./lock.controller");

const router = new Router();
router.get("/btc/headers", btcController.headers);
router.get("/btc/txs", btcController.txs);
router.get("/btc/status", btcController.status);
router.get("/btc/addresses", btcController.addresses);
router.get("/btc/address/:address", btcController.address);
router.get("/btc/deposits", btcController.deposits);
router.get("/btc/pending_deposits", btcController.pendingDeposits);
router.get("/btc/withdrawals", btcController.withdrawals);
router.get("/btc/session_trustees", btcController.sessionTrustees);
router.get("/btc/lock/records", lockUpController.allRecords);
router.get("/account/:accountId/btc/lock/records", lockUpController.accountRecords);
router.get("/account/:accountId/btc/lock/balances", lockUpController.accountLockStats);

router.post("/btc/lock/tx_state", lockUpController.txState);
router.post("/btc/lock/tx_states", lockUpController.txStates);

module.exports = router;
