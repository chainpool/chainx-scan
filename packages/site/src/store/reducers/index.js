import { combineReducers } from "redux";
import latestBlocks from "./latestBlocks";
import latestTransactions from "./latestTransactions";

export default combineReducers({
  latestBlocks,
  latestTransactions
});
