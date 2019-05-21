import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { createStore } from "redux";

export default class tableService {
  constructor(_fetchTable, params = {}, peddingData = {}) {
    const initialize = {
      ...tableService.initData,
      ...params,
      pagination: {
        ...tableService.initData.pagination,
        ...params.pagination
      }
    };

    this.initialize = initialize;
    this._peddingData = peddingData;

    this._store = createStore((state, action) => {
      switch (action.type) {
        case `set`:
          return { ...state, ...action.payload };
        default:
          return state;
      }
    }, initialize);

    this._state$ = new Observable(observer => {
      observer.next(this._store.getState());
      const unsubscribe = this._store.subscribe(() => {
        observer.next(this._store.getState());
      });
      return () => unsubscribe();
    });

    this._fetchTable = _fetchTable;
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

  get store() {
    return this._store;
  }

  fetchTable$ = (params = {}) => {
    const { current = this.initialize.pagination.current, pageSize = this.initialize.pagination.pageSize } = params;
    this.setState({ loading: true });

    this._fetchTable(
      {
        page: current - 1,
        pageSize
      },
      { ...this._peddingData }
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

    return this._state$;
  };

  handleChange = ({ current, pageSize }) => {
    this.fetchTable$({ current, pageSize });
  };

  setState = value => {
    return this.store.dispatch({ type: "set", payload: value });
  };
}
