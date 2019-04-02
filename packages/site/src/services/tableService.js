import { BehaviorSubject } from "rxjs";
import { take, scan, publishReplay, refCount, distinctUntilChanged } from "rxjs/operators";

export default class tableService {
  constructor(_fetchTable, initData = {}) {
    const initialize = {
      ...tableService.initData,
      ...initData
    };
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
    this.fetchTable({ ...initialize.pagination, tabFilter: initData.tabFilter });
  }

  static initData = {
    dataSource: [],
    loading: false,
    tabFilter: null,
    pagination: {
      current: 1,
      pageSize: 200,
      total: 0
    }
  };

  fetchTable = ({ current, pageSize, tabFilter }) => {
    this.setState({ loading: true });
    this._fetchTable({
      page: current - 1,
      pageSize,
      tabFilter
    })
      .pipe(take(1))
      .subscribe(({ items, page, pageSize, total }) => {
        console.log(items);
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

  setState(value) {
    return this.subject.next(value);
  }

  getState$() {
    return this.state$;
  }
}
