import { take } from "rxjs/operators";

import { SubjectState } from "../shared";

export default class tableService extends SubjectState {
  constructor(initData, _fetchTable) {
    const initialize = {
      ...tableService.initData,
      ...initData
    };
    super(initialize);
    this._fetchTable = _fetchTable;
    this.fetchTable(initialize.pagination);
  }

  static initData = {
    dataSource: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0
    }
  };

  fetchTable = ({ current, pageSize }) => {
    this.setState({ loading: true });
    this._fetchTable({
      page: current - 1,
      pageSize: pageSize
    })
      .pipe(take(1))
      .subscribe(({ items, page, pageSize, total }) => {
        this.setState({
          dataSource: items,
          loading: false,
          pagination: {
            current: page + 1,
            pageSize,
            total
          }
        });
      });
  };

  handleChange = ({ current, pageSize }) => {
    this.fetchTable({ current, pageSize });
  };
}
