import { Observable, Observer } from 'rxjs';

let numbers = [1, 2, 3, 4, 5, 6, 7];
let source = Observable.create((observer) => {
  console.log(observer);
  for(let n of numbers) {
    observer.next(n);
  }
  observer.complete();
}).map(input => input *2).take(5).filter(input => input > 4);

source.subscribe(
  value => console.log(`value : ${value}`),
  error => console.log(`error: ${error}`),
  () => console.log('complete')
);
