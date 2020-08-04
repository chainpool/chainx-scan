const proposal11 = require("./proposal11");
const proposal12 = require("./proposal12");
const proposal12Fix = require("./proposal12-fix");
const proposal13 = require("./proposal13");

module.exports = [
  {
    id: "1",
    yes: "0xb7cb582d33be7f9762625da56f3c7846e3a3558bdcaa76f92ead27bfc5120fa7",
    no: "0xb7cac65033f3149c3ac947f8f0f9af57964242b5fb8bda16e58c6466c942049b",
    isActive: "1",
    isPublish: true,
    title: {
      zh: "01号提案: 加强节点自抵押限制",
      en: "Proposal 01: Strengthening restrictions on self-collateralized nodes"
    },
    desc: {
      zh:
        "本提案提议节点最多只能接受 10 倍于自抵押的总得票。即当用户对某节点投票时，如果投票后节点的总得票数大于该节点自抵押的10倍，则该投票动作失败，需等待节点增加自抵押扩大该节点的用户投票上限。如：A节点当前的自抵押票数为1000PCX，得票总数为9000PCX(包含用户投票为8000PCX)，此时A节点最多可再接受用户投1000PCX，若B用户试图投票给A节点1200PCX，则投票失败。",
      en:
        "This proposal suggests that a node can only receive up to 10 times the votes it stores as collaterals. That is to say, when a user votes on a node, if the total number of votes after voting exceeds 10 times that of the votes it stores as collaterals, the voting fails to take place, and the node has to increase the collateralized votes for a higher upper limit. For example, the number of votes node A stores as collaterals is 1000PCX, and the total number of votes is 9000PCX (including 8000PCX from users). Node A can receive another 1000PCX from users at most. If user B attempts to vote 1200PCX to A, the voting will fail."
    },
    reason: {
      zh:
        "1、将节点运营方的利益和该节点的收益捆绑，为日后更加严格的双签等作恶惩罚机制奠定基础；2、增强社区用户对节点的信心，促进ChainX生态的可持续发展。",
      en:
        "1.To correspond the interests of the node operator with the revenues generated by the node, which will lay the foundation for more stringent punishment mechanisms like double-signing in the future; 2.To boost the confidence of the community users to the nodes and promote the sustainable development of the ChainX ecosystem."
    },
    rule: {
      zh:
        "1、用户投票效力以投票账户的PCX总余额计数；2、公投过程中用户可随时更改投票意见，以最后一次投票为有效票；3、截至投票结束时，赞成票数大于反对票数即为提案通过，反之则提案未通过。",
      en:
        "1. Users’ voting power is quantified by the number PCX in the voting account; 2. Users can change their votes at any time during the referendum, and the last one is valid; 3. After the referendum, if the number of votes in favor of the proposal is more than that against it, the proposal will pass, otherwise the proposal will not pass. "
    },
    deadBlock: 2640000
  },
  {
    id: "2",
    yes: "0xb7ceb4137bfd9aa701359fdd544ac4403db36c14544989f1c8264742b99f3382",
    no: "0xb7ce1e3f9a4c0b2093dabd3869741bcc97bc86197b6fa86d2d9cb65d2c32659a",
    isActive: "1",
    isPublish: true,
    title: {
      zh: "02号提案：限制用户频繁切换投票",
      en: "Proposal 02: Restricting users from frequently switching votes"
    },
    desc: {
      zh:
        "当前用户撤票锁定期为3天，本提案提议以撤票锁定期为基准，投票用户切换投票限制期也为3天，即用户3天内只能有一次切换投票的机会。当投票用户再次切换投票时，必须距离上次切换时间超过3天，否则再次切换失败。",
      en:
        "The current vote withdrawal period is 3 days. This proposal suggests a time limit should also be set for switching votes. That is also 3 days just like the withdrawal limit. In other words, users only have one opportunity to switch their votes in 3 days. Or when users switch their votes, it must be more than 3 days from the last switching time, otherwise the switching cannot take place."
    },
    reason: {
      zh: "在保证用户切换节点选择权的同时，增强社区用户对节点的忠诚度。",
      en:
        "To enhance the loyalty of users to the nodes while ensuring that their rights to choose are properly protected."
    },
    rule: {
      zh:
        "1、用户投票效力以投票账户的PCX总余额计数；2、公投过程中用户可随时更改投票意见，以最后一次投票为有效票；3、截至投票结束时，赞成票数大于反对票数即为提案通过，反之则提案未通过。",
      en:
        "1. Users’ voting power is quantified by the number PCX in the voting account; 2. Users can change their votes at any time during the referendum, and the last one is valid; 3. After the referendum, if the number of votes in favor of the proposal is more than that against it, the proposal will pass, otherwise the proposal will not pass."
    },
    deadBlock: 2640000
  },
  {
    id: "3",
    yes: "0xb7d216877e3e15eb9db05b0058dadacf273f190ac78bdc3f936aea4d1eb7662e",
    no: "0xb7d1819708013b0246720652f4ab0d45d57b345d9162a1821fd20eade95691cc",
    isActive: "1",
    isPublish: true,
    title: {
      zh: "03号提案：支出议会基金上币MXC抹茶交易所",
      en: "Proposal 03: Funding the listing on MXC exchange through Parliamentary Fund "
    },
    desc: {
      zh:
        "节点Nodeasy.com发起提案：议会基金支出2000个PCX，用于MXC抹茶交易所上币，目前议会基金总量为3000个PCX左右。其中1000PCX为技术对接服务费，另外1000PCX为活动奖励经费。同时需要在48小时内，超过2000个账户完成在抹茶交易所的PCX充值操作，可以从ChainX链发起向抹茶系统充值，或抹茶账户之间转账。 如果议案通过后，双方会进行技术对接，并商定具体的充值上币时间段，具体交易开放时间，具体活动奖励细则。",
      en:
        "The node Nodeasy.com initiated the proposal: the Parliamentary Fund spends 2,000 PCXs on MXC Exchange for the listing. The current total amount of PCX in the fund is around 3,000 among which 1000PCX is for technical service fees and another 1000PCX activity rewards. At the same time, more than 2,000 accounts need to complete PCX deposit operation at MXC Exchange within 48 hours by sending deposits from ChainX to MXC or transferring between MXC accounts. If the proposal is passed, the two parties will begin working on technical integration and agree on a specific listing time, trading time and activity rewards rules."
    },
    rule: {
      zh:
        "1、用户投票效力以投票账户的PCX总余额计数；2、公投过程中用户可随时更改投票意见，以最后一次投票为有效票；3、截至投票结束时，赞成票数大于反对票数即为提案通过，反之则提案未通过。",
      en:
        "1. Users’ voting power is quantified by the number PCX in the voting account; 2. Users can change their votes at any time during the referendum, and the last one is valid; 3. After the referendum, if the number of votes in favor of the proposal is more than that against it, the proposal will pass, otherwise the proposal will not pass. "
    },
    deadBlock: 2520000
  },
  {
    id: "4",
    yes: "0xb7d573c2e6b1597f75cd6eabfa36815892d5b04fd121910231a24339e6555da5",
    no: "0xb7d4d8ef9a0221c54be082b7a39cae20a7635f7d33b92470af60cbbe232449d3",
    isActive: "1",
    isPublish: true,
    title: {
      zh: "04号提案：支出议会基金支持BigONE推动ChainX生态发展",
      en: "Proposal 04: Funding 1000 PCX to BigONE for the promotion and development of the ChainX ecosystem "
    },
    desc: {
      zh:
        "节点Jinma发起提案：议会基金支出1000PCX，用于BigONE对ChainX 生态的推动和发展。BigONE交易平台已经做好技术对接，1000PCX将全部用于活动奖励经费，奖励给本周五参与BigONE社区投票活动的用户。如果提案通过，BigONE将会在此活动结束后，拨出预算进行下一步的市场营销活动。具体活动奖励细则，以 BigONE 官方公告为准。",
      en:
        "Node Jinma initiated a proposal: the parliamentary fund invest 1000 PCX for the promotion and development of the ChainX ecosystem by BigONE whose trading platform is already technically integrated with ChainX, and all the 1000PCX will be used for activity rewards, rewarding users who participate in the BigONE community voting this Friday. If the proposal is approved, BigONE will set up a new budget for the following marketing campaigns. For more information on activity rewards, please wait for BigONE official announcement."
    },
    rule: {
      zh:
        "1、用户投票效力以投票账户的PCX总余额计数；2、公投过程中用户可随时更改投票意见，以最后一次投票为有效票；3、截至投票结束时，赞成票数大于反对票数即为提案通过，反之则提案未通过。",
      en:
        "1. Users’ voting power is quantified by the number PCX in the voting account; 2. Users can change their votes at any time during the referendum, and the last one is valid; 3. After the referendum, if the number of votes in favor of the proposal is more than that against it, the proposal will pass, otherwise the proposal will not pass. "
    },
    deadBlock: 2610000
  },
  {
    id: "5",
    yes: "0xb7d8cc4d93b87dc336fd5aec3e62bf9b82ae193c64c05b6dec2b9d958f5b9c71",
    no: "0xb7d8402eefce2524f2f49ac2eac97f433e235a24ffcfc70b9161ede8c37d4b83",
    isActive: "1",
    isPublish: true,
    title: {
      zh: "05号提案：推动社区议会去中心化治理",
      en: "Proposal 05：Promote self-government of the community parliament "
    },
    desc: {
      zh:
        "节点联合社区发起提案：1.将社区议会进行扩充，囊括已经逐步成熟的节点社区。保留PolkaX团队作为最终的开发实施和升级组织者的1个议会席位，并新增10个议会席位。10个议会席位由总得票数前10且有意加入议会的诚实节点担任，任何有贿选返利行为的节点将无法参与议会选举。2. 由于节点总得票数经常变化，但议会需要在一段时间内保持一定的固定群体，所以每届议会的任期为1个月。届满后，将根据新的总得票数和节点诚信度得出下一届议会名单。3.11位议会成员均可收集社区意见并向议会提交任意提案。由议会成员采用一人一票的方式对提案进行初审表决，如果超半数议员同意（大于等于6），则提案通过初审。4.初审通过即进入公投流程，公投需要大于2/3赞成票才能通过（大于等于66.67%），通过后则交由PolkaX团队实施并上线。本提案由cha.in，hashquak，wetez，nodeeasy，buildlinks，polkaworld, sssnodes七个节点联合PolkaX团队及两位社区代表共12票，进行投票表决，最终以0反对票通过初审，现交由社区进行公投，若通过则开始执行。由于贿选和返利行为严重影响总得票数的可信性，引发节点后期作恶风险，通过不当手段得到的议会席位将严重妨碍社区总体利益。所以议会基金开通贿选钓鱼奖励，贿选标准很明确，不能有任何返利行为，任何社区成员均可匿名提交某节点的贿选和返利行为的截图或转账记录证明，如果超半数议员认为证据有效（大于等于6），则将剔除该节点的下届议员的竞选资格，并从议会基金中酌情给予举报奖励, 此外议会将有权惩罚该贿选节点的自抵押。声称不参与议会选举的节点不在举报范围，但仍然希望所有节点保持公平公开的选举规则，引导社区按贡献投票，而不是为了短视的返利而引发恶性竞争。",
      en:
        "The nodes  proposal together with the community:\n1. Expand the community parliament to include nodes that are matured. One seat is reserved for the PolkaX team  for the role it plays in developing and upgrading the system. Another 10 seats will be added.\n2. The 10 new seats will be held by credible nodes with intention to run for the parliament, that have secured the top 10 spots in terms of votes. Nodes that intent on bribing their way through the election will be disqualified.\n3. Given the fact that the total number of votes a node receives changes all the time, but the parliament seats should be held by a fixed group for a certain period of time, so each parliament term only lasts one month. After one month, elections will be held to select new nodes with high ratings and credibility.\nThis proposal is approved by the preliminary electoral group consisting of seven nodes cha.in, hashquak, wetez, nodeeasy, buildlinks, polkaworld, sssnodes and the PolkaX team as well as two community representatives, with no one voting against it. Now a referendum will be held in the community. If passed, it will be implemented."
    },
    deadBlock: 2691000
  },
  {
    id: "6",
    yes: "0xb7dc3152be4acca8c483810d08a913f2430d5bfb0dad864fd8f013e128c1564d",
    no: "0xb7db9fa66976fa3da58dac351dfac308ae2d2e7bb4a146731c9414f00e90b697",
    isActive: "1",
    isPublish: true,
    title: {
      zh: "06号提案：提高跨链挖矿用户的提息门槛",
      en: "Proposal 06: Improving the threshold of Interest claim of inter-chain mining for users"
    },
    desc: {
      zh:
        "目前的跨链挖矿用户包括：X-BTC充值挖矿，L-BTC锁仓挖矿，S-DOT映射挖矿。这三类资产的提息是无门槛的，造成了比较大的流通压力。经过第1届议会的初审，现提起如下议案：1：ChainX用户对单个跨链资产的提息间隔需要大于7天，否则失败；2：ChainX用户对所有跨链资产提息时，其PCX总投票冻结必须大于总利息的10倍，否则失败。议会节点10票赞成：buildlinks, BiHODL, SSSnodes, HashQuark, PolkaWorld, SNZHolding, Polkanordic, huolanshan, Scans, PolkaX，1票未出席：realgar.",
      en:
        "Currently the inter-chain mining includes X-BTC deposit mining, L-BTC lock-up mining and S-DOT mapping mining. There is no threshold for users claiming interests on these assets, resulting in relatively large circulation pressure. After the first trial of Parliament, the following proposals was Initiated: 1. ChainX users can claim interest of one type of interchain  asset with intervals of more than 7 days, otherwise they will fail; 2. When ChainX users claim interest of any interchain assets, their locked PCX must be 10 times greater than pending interest , otherwise they will fail. 10 votes of Parliamentary members are for the proposal: buildlinks, BiHODL, SSSnodes, HashQuark, PolkaWorld, SNZHolding, Polkanordic, huolanshan, Scans, PolkaX, 1 vote absent: realgar."
    },
    deadBlock: 2900000
  },
  {
    id: "7",
    yes: "0xb7df8c4a3669e1dd7fd66921b22727c89de965a0eb4c34bd0d23dbcb0519a57e",
    no: "0xb7def9f380ca6d54389e9d8e045c99a55d4ab3a9d297847b2467ff3d3d037a51",
    isActive: "1",
    isPublish: true,
    title: {
      zh: "07号提案：调整资产挖矿算力",
      en: "Proposal 07: Adjustment of assets mining power"
    },
    desc: {
      zh:
        "考虑到L-BTC锁仓挖矿对链实质性功能的作用远低于X-BTC产生的效应，以及维护PCX挖矿用户的权益，增强PCX持币用户的信心，现发起以下提案：\n\n1：将L-BTC用户锁仓挖矿的算力降低到X-BTC的一半，即L-BTC算力：X-BTC算力=1：2。\n2：先调整PCX的算力至全链挖矿算力的3/4，其它资产挖矿总和占比1/4；一个月后，再将PCX的算力调整至全链挖矿算力的2/3，其它资产挖矿总和占比1/3。",
      en:
        "Considering that the effect of L-BTC lock-up mining on the substantive function of the chain is far less than that of X-BTC, as well as ensuring the rights and interests of PCX mining users, and enhancing the confidence of PCX  holders, the following proposals are launched: \n\n 1: Reduce the mining power of L-BTC to half of that of X-BTC, that is, L-BTC: X-BTC = 1:2. \n 2: First adjust the mining power of PCX to 3/4 of the total mining power of the whole chain and the total mining power of other assets to 1/4 ; after one month, adjust the mining power of PCX to 2/3 of the total mining power of the whole chain and the total mining power of other assets to 1/3."
    },
    deadBlock: 4588000
  },
  {
    id: "8",
    yes: "0xb7e2e7e8b44151bdbf038277b565a4b56f46c0b8f643b30fa2303ce897512f8e",
    no: "0xb7e25a6a570f3f5293781773c83f094fa0723f759d4197bb775842116b8177fb",
    isActive: "1",
    isPublish: true,
    title: {
      zh: "08号提案：支出议会基金上线挖矿平台",
      en: "Proposal 08: Funding the listing on Staking Rewards platform"
    },
    desc: {
      zh:
        "为了更便利的在海外社区对 ChainX 进行营销宣传，议会预计支出议会基金 1500 PCX 用于 Stakingrewards.com 的上币费用。该网站是研究 POS/DPOS 挖矿收益的专业性网站，受到众多专业区块链记者关注。如果提案通过后，双方会进行技术对接，并商定具体的上线时间。",
      en:
        "In order of a marketing action and to make the project known as much as possible The Parliamentary Fund spends 1500 PCXs on stakingrewards.com for the listing. This site specializes in passive income and is read by many journalists who write reports about staking in cryptoworld. If the proposal is passed, the two parties will begin working on technical integration and listing time."
    },
    deadBlock: 11822000
  },
  {
    id: "9",
    yes: "0xb7e649e9d228cec1c38413aab8e255407d95d05ccf8c4ab9cbfbec609d51a444",
    no: "0xb7e5b37a0ee01f4eac6933c126091e407552e316f782e7a8a0967fa02ca3476c",
    isActive: "1",
    isPublish: true,
    title: {
      zh: "09号提案：关于 ChainX 挖矿收益分配的调整",
      en: "Proposal 09: The adjustment of mining rule on ChainX"
    },
    desc: {
      zh:
        "<p>目前，ChainX 的挖矿算力分配规则中，L-BTC 等 token 与 PCX、跨链资产共享算力挖矿。然而，L-BTC 作为 ChainX 链上的锁仓挖矿类型，其本质与 S-DOT 奖励挖矿类似，都是一种福利挖矿或有条件空投的代币分发模式。与 X-BTC 这种存在于 ChainX 链上的跨链资产有着本质的区别，而现有的算力分配规则不能很好的反映这一本质特点。</p> <p>提案提议，将 L-BTC、S-DOT 这种空投/锁仓奖励机制与挖矿算力彻底解耦。具体规则为： </p> <p>1. ChainX 链上每个周期（session，约 5 分钟）挖出 50 枚 PCX，按照白皮书的固定，其中 10 枚为团队预留；</p><p>2. 剩余 40 枚 PCX（记为 S）的分配为本次提案调整的内容；a) 预留 TR = 12%（即 TR*S=4.8 枚）进入议会基金（议会基金账户公布，每个月出一次财报；财报将在公众号里公示） \nb) 预留 AR = 8%（即 AR*S=3.2 枚）为本周期的福利挖矿收益；\nc) 剩余的部分记为可分配挖矿收益 AMO\n（AMO=(1-TR-AR)*S, 即 32 枚），跨链资产和 PCX 根据算力占比共享 AMO: 单位 PCX 算力为 1；\n单位 XBTC 算力为 PR_XBTC=400 倍单位 PCX 算力；\n其他 X-Token 算力关系等其上线时再由议会设定；\n设置跨链硬顶 XR=10%，当 X-Token 算力的和大于总算力的 XR 时（触碰硬顶），限制 X-Token 算力的和为总算力的 XR 倍，各 X-Token 按比例缩减收益；\n将 PCX 算力占总算力的比例固定为 1-XR，即 90%（AMO*(1-XR）=28.8枚）；\n最后，若还有剩余未分配的 PCX，则归属议会财库。</p><p>3. 将 L-BTC 和 S-DOT 的每周期挖矿收益改由福利挖矿总量中支付。\na) L-BTC 和 S-DOT 均分每周期的福利挖矿收益，各得 1.6 枚 PCX \nb) L-BTC 的挖矿收益按照用户锁仓比例进行分配；\nc) S-DOT 的挖矿收益按照用户映射的 S-DOT 比例进行分配。</p><p>本提案中的参数为：\nTR，财库比例，12%；\nAR，空投比例，8%；\nXR，跨链硬顶，10%；\nPR_XBTC，单位 XBTC 对 PCX 的算力，400。</p><p>注 1：ChainX 议会基金（即议会财库）成立目的是为了更好运营和推动项目，打造生态，积极拥抱社区。其资金动向接受全社区监督，其职责包括且不局限于：PR&市场合作（交易所/钱包等），生态合作（Dapp/开源社区等），量化团队等。</p><p>注 2：本提案确定了算力的框架，就是 X-token 的算力是通过某个函数转为对等 PCX 算力的。现在的函数是固定的 400 PCX，今后如果 PCX 价格大幅变动导致 XBTC 固定的算力比例不合理，那时议会也仅需要调整 PR_BTC，或者用其他算法阐述 X-token 与 PCX 的算力比例关系。</p>",
      en:
        "<p>At present, the mining distribution rule for the entire ChainX takes L-BTC, X-BTC, PCX as in same category. However, L-BTC, as a self-lockup mining method, is similar in nature to S-DOT reward mining and is a token distribution model of conditional airdrop. It is fundamentally different from X-BTC, a cross-chain asset that exists on the ChainX chain. We believe that the existing rules of mining income distribution do not reflect this essential characteristic well.</p> <p>\n\nWe recommend new specific rules to thoroughly decouple them, which are：</p><p>\n\n1. Every session(about 5 minutes), ChainX generates 50 pcx，Among which 10 pcx are reserved for the creator team；</p><p>\n2. Among the remaining 40 pcx, denoted as S.\na) Let TR = 12% of them (that is TR*S = 4.8 pcx), go to the Council Treasury (The address of Council Treasury would be published and financial report would also be released monthly in official social media account)；\nb) Let AR = 8% of them (that is AR*S = 3.2pcx), go to the Airdrop Pool；\nc) The remaining (which is 1-TR-AR of 40, denoted as AMO, Available Mining Output) would be distributed between PCX miners and X-BTC miners, according to their mining power. \ni. 1 PCX’s mining power set to 1; \nii. 1 XBTC’s mining power is PR_XBTC=400 times of 1 PCX；\niii. Other X-Token’s mining power will be clear when they are available；\niv. Set a hard ceiling, XR=10%. When sum of all X-Token’s mining power / total mining power >= XR (touch the ceiling), we limit the sum of all X-Token’s mining power to the hard ceiling. Each X-Token reduce their benefits in proportion；\nv. Fix mining power of PCX / total mining power = 1-XR，that is 90%；\nvi. At last, if any PCX remains, it goes to the Council Treasury. </p><p>\n\n3. Let mining income of L-BTC and S-DOT be paid from Airdrop Pool；\na) L-BTC and S-DOT share the benefits of Airdrop Pool per cycle, eg: each receives 1.6 pcx as ratio above; \nb) The mining revenue of L-BTC is distributed according to the user's lockup ratio；\nc) The mining revenue of S-DOT is distributed according to the S-DOT proportion mapped by the user.</p><p>\n\nNote 1: The purpose of the Council Fund（aka. Council Treasure）is to better operate and promote projects, build ecology, and actively embrace the community. Its funding trends are subject to community-wide supervision, and its responsibilities include, but are not limited to: PR & market cooperation (exchanges / wallets, etc.), ecological cooperation (Dapp / open source communities, etc.), quantitative teams, etc </p><p>\n\nNote 2: This proposal builds the new framework of mining power, that is, the mining power of X-token is converted into PCX’s mining power through a certain function. The current function is a fixed 400 times. In the future, if the price of pcx changes significantly, cause the fixed ratio of XBTC become unreasonable, then, the parliament can only adjust PR_BTC, or use other algorithms to explain the relationship between the mining power of X-Token and pcx.\n</p>"
    },
    deadBlock: 12118800
  },
  {
    id: "10",
    yes: "0x9550e520b708b721df1a91569bf50654316545cb8e8d9bdec763959b8e1bd6b2",
    no: "0x6914128b08393cc911e80d0979c99762b25be6d0c9de90a8e9b4485ae391fc4f",
    isActive: "1",
    isPublish: true,
    title: {
      zh: "10 号提案：节点帮扶计划",
      en: "Proposal 10. Support Program for Small and/or Oversea Nodes"
    },
    desc: {
      zh: `
      <p>为了增加 ChainX 网络上节点的去中心化程度，同时助力节点分布向境外扩展，ChainX 社区认为有必要对中小节点，海外节点提供一定程度扶持。激励他们以节点为依托，创建和拓展周边社区，丰富 ChainX 社群的人员规模和分布。
      </p>
      
      <p>10 号提案提议：每季度对目标节点依规则进行评选，选出帮扶节点后再针对性对其提供扶持。</p>
      
      <h3>目标节点</h3>
      <h4>1. 偏远节点</h4>
      <ul>
        <li>港澳台及海外节点</li>
        <li>在社区/议会表现活跃</li>
        <li>对 ChainX 发展做出卓越贡献</li>
      </ul>
      <p>每季度评选一次，由节点通过社区报名，议会投票，选出：</p>
      <ul>
        <li><b>重点支持节点 0-1 名，记为 A 类节点；</b></li>
        <li><b>有限支持节点 0-2 名，记为 B 类节点。</b></li>
      </ul>
      
      <h4>2. 中小节点</h4>
      <ul>
        <li>中小节点</li>
        <li>在社区/议会表现活跃</li>
        <li>对 ChainX 发展做出卓越贡献</li>
      </ul>
      <p>每季度评选一次，由节点通过社区报名，议会投票，选出：</p>
      <ul>
        <li><b>重点支持节点 0-1 名，记为 X 类节点；</b></li>
        <li><b>有限支持节点 0-2 名，记为 Y 类节点</b></li>
      </ul>
      
      <h3>支持内容</h3>
      <p>对这些节点在当期提供以下支持：</p>
      <h4>1. 无息 PCX 自抵押借贷（适用于 X，Y 类节点）</h4>
      <p>由议会出借一定额度的 PCX 给目标节点，用作其自抵押（额度为其自身自抵押量的 N 倍）。每期 90 天。其中：</p>
      <ul>
        <li>X 类节点，可获得 N=1 的借贷权，最大额度 10,000 枚 PCX，在当期无利息，可延长 1 期，延长期内按理论投票收益收取利息，超期后由议会赎回；</li>
        <li>Y 类节点，可获得 N=0.7 的借贷权，最大额度 5,000 枚 PCX，在当期无利息，可延长 1 期，延长期内按理论投票收益收取利息，超期后由议会赎回；</li>
      </ul>
      <p>当目标节点有不当行为或自身自抵押量变动导致不符合比例关系时，议会有权提前收回贷款。</p>
      
      <h4>2. 议会投票支持（适用于 A，B，X，Y 类节点）</h4>
      <p>议会向目标节点直接投票，投票量为其自抵押的 M 倍。其中：</p>
      <ul>
        <li>A，X 类节点，可获得 M=2 的投票量，最大额度 15,000 枚 PCX，超期后由议会赎回；</li>
        <li>B，Y 类节点，可获得 M=1.5 的投票量，最大额度 10,000 枚 PCX，超期后由议会赎回</li>
      </ul>
      <p>当目标节点有不当行为或自身自抵押量变动导致不符合比例关系时，议会有权提前收回投票。</p>
      
      <h4>3. 漏块惩罚优惠 (适用于 A，B 类节点）</h4>
      <p>在保持网络整体漏块惩罚机制不变的情况下，对目标节点启动漏块罚金部分返还。由议会拨出专项资金，通过技术手段跟踪目标节点的漏块情况。在网络收取漏块罚金后，按照罚金的 L 倍对其奖池自动进行充值。其中：</p>
      <ul>
        <li>A 类节点，可获得 L=0.75 的罚金返还；</li>
        <li>B 类节点，可获得 L=0.50 的罚金返还。</li>
      </ul>
      <p>当目标节点有不当行为时，议会有权提前结束该项优惠。</p>
      `,
      en: `
        <p>In order to promote decentralization of ChainX network, and at the same time help the expansion of node distribution outside China, it is necessary to provide a certain degree of support to small and medium-sized nodes and overseas nodes. Encourage them to create and maintain communities around their nodes as to expand the whole ChainX community.</p>
        <h3>Target Nodes</h3>
        <h4>1. Outlying Nodes</h4>
        <ul>
            <li>those nodes that far away from the most validators on the Chain</li>
            <li>active in the community</li>
            <li>Make outstanding contributions to the development of ChainX</li>
        </ul>
        <p>Every quarter(noted as Period), the Parliament selects out :</p>
        <ul>
            <li><b>0 - 1 node as categaory A;</b></li>
            <li><b>0 - 2 nodes as category B</b></li>
        </ul>
        
        <h4>2. Small Nodes</h4>
        <ul>
            <li>small and medium-sized nodes</li>
            <li>active in the community</li>
            <li>Make outstanding contributions to the development of ChainX</li>
        </ul>
        <p>Every quarter(noted as Period), the Parliament selects out :</p>
        <ul>
            <li><b>0 - 1 node as categaory X;</b></li>
            <li><b>0 - 2 nodes as category Y</b></li>
        </ul>
        
        <h3>During that Period, these nodes can take following programs:</h3>
        
        <h4>1. Interest-free PCX loan for self-delegation (available for X, Y)</h4>
        <p>The parliament lent a certain amount of PCX to the target node as its self-collateralization (the loan amount is N times as their own self-collateralization):</p>
        <ul>
            <li>Node in Categroy A，N=1 (Maximum 10,000PCX)，NO interest at first period, can expand to second period, but will charge interest on theoretical voting income during the second period, Redemption by Parliament after expiry;</li>
            <li>Node in Categroy B，N=0.7 (Maximum 5,000PCX)，NO interest at first period, can expand to second period, but will charge interest on theoretical voting income during the second period, Redemption by Parliament after expiry;</li>
        </ul>
        <p>When the target node has misconduct or the self-collateralization amount changes lead to non-compliance, the parliament has the right to recover the loan in advance.</p>
        
        <h4>2. Voting Support (available for A, B, X, Y)</h4>
        <p>The parliament votes a certain amount of PCX to the target node directly, and the amount is M times as their self-collateralization：</p>
        <ul>
            <li>Node in Categroy A，M=2 (Maximum 15,000PCX), Redemption by Parliament after expiry;</li>
            <li>Node in Categroy B，M=1.5 (Maximum 10,000PCX), Redemption by Parliament after expiry</li>
        </ul>
        <p>When the target node has misconduct or the self-collateralization amount changes lead to non-compliance, the parliament has the right to unstake the votes in advance.</p>
        
        <h4>3. Discount for missing-blocks (available for A, B)</h4>
        <p>Keeping the overall network protocol untouched, the partial penalty for missing blocks can be returned to the target node. Parliament would keep tracking the leakage of target nodes using technical ways and special funds are reserved. once penalties for missing blocks are detected, a curtain amount of PCX would be automatically transfered to their jackpots. The amount is L times as the penalty：</p>
        <ul>
            <li>Node in Categroy A，L=0.75;</li>
            <li>Node in Categroy B，L=0.50</li>
        </ul>
        <p>When the target node has misconduct, the parliament has the right to shutdown this discount in advance.</p>
      `
    },
    deadBlock: 15622000
  }
].concat([proposal11, proposal12, proposal12Fix, proposal13]);
