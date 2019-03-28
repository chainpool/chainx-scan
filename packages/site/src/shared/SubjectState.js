import { BehaviorSubject } from "rxjs";
import { scan, publishReplay, refCount, distinctUntilChanged } from "rxjs/operators";

export default class SubjectState {
  constructor(initState) {
    this.subject = new BehaviorSubject(initState);
    this.state$ = this.subject.asObservable().pipe(
      scan((acc, newVal) => {
        return { ...acc, ...newVal };
      }, initState),
      distinctUntilChanged(),
      publishReplay(1),
      refCount()
    );
  }

  setState(value) {
    return this.subject.next(value);
  }

  getState$() {
    return this.state$;
  }
}
