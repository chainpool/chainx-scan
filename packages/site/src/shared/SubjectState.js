import { BehaviorSubject } from "rxjs";
import { scan, shareReplay, distinctUntilChanged } from "rxjs/operators";

export default class SubjectState {
  constructor(initState) {
    this.subject = new BehaviorSubject(initState);
  }

  getValue() {
    return this.subject.getValue();
  }

  setState(value) {
    return this.subject.next(value);
  }

  getState$() {
    return this.subject.asObservable().pipe(
      scan((acc, newVal) => {
        return { ...acc, ...newVal };
      }),
      distinctUntilChanged(),
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }
}
