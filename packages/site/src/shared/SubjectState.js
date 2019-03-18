import { BehaviorSubject } from "rxjs";
import { scan, shareReplay, distinctUntilChanged } from "rxjs/operators";

export default class SubjectState {
  constructor(initState) {
    this.subject = new BehaviorSubject(initState);
    this.state$ = this.subject.asObservable().pipe(
      scan((acc, newVal) => {
        return { ...acc, ...newVal };
      }, initState),
      distinctUntilChanged(),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  getValue() {
    return this.subject.getValue();
  }

  setState(value) {
    return this.subject.next(value);
  }

  getState$() {
    return this.state$;
  }
}
