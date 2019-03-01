import { combineReducers } from "redux";
import latestBlocks from "./latestBlocks";
import latestTransactions from "./latestTransactions";
import pageBlocks from "./pageBlocks";

export default combineReducers({
  latestBlocks,
  latestTransactions,
  pageBlocks
});
