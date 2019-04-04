const dict = {
  ApplyExtrinsic: "交易执行",
  Finalization: "交易完成"
};

export default function Phase(props) {
  const { phase } = props;
  return dict[phase] || phase;
}
