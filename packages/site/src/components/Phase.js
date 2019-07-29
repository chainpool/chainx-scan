import { injectIntl } from "react-intl";

export default injectIntl(function Phase(props) {
  const {
    phase,
    intl: { messages }
  } = props;

  if (!phase) return null;

  return messages.DICT[phase] || phase;
});
