import { injectIntl } from "react-intl";

export default injectIntl(function Phase(props) {
  const {
    phase,
    intl: { messages }
  } = props;
  return messages.DICT[phase] || phase;
});
