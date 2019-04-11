import { BehaviorSubject } from "rxjs";
import { take, scan, publishReplay, refCount, distinctUntilChanged } from "rxjs/operators";

export default class tableService {
  constructor(_fetchTable, initData = {}, peddingData = {}) {
    const initialize = {
      ...tableService.initData,
      ...initData
    };
    this.initialize = initialize;
    this.peddingData = peddingData;
    this.subject = new BehaviorSubject(initialize);
    this.state$ = this.subject.asObservable().pipe(
      scan((acc, newVal) => {
        return { ...acc, ...newVal };
      }, initialize),
      distinctUntilChanged(),
      publishReplay(1),
      refCount()
    );
    this._fetchTable = _fetchTable;
    this.fetchTable();
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

  fetchTable = (params = {}) => {
    const { current = this.initialize.pagination.current, pageSize = this.initialize.pagination.pageSize } = params;
    this.setState({ loading: true });
    this._fetchTable(
      {
        page: current - 1,
        pageSize
      },
      { ...this.peddingData }
    )
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
    return this;
  };

  handleChange = ({ current, pageSize }) => {
    this.fetchTable({ current, pageSize }, this.peddingData);
  };

  setState(value) {
    return this.subject.next(value);
  }

  getState$() {
    return this.state$;
  }
}
