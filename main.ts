// reduce import libraries
import { Observable } from 'rxjs';

let circle: any;
let button: any;
let output: any;
output = document.getElementById('output');
circle = document.getElementsByClassName('circle')[0];
button = document.getElementById('button');
let click = Observable.fromEvent(button, 'click');

function retryStrategy() {
  return (erros) => {
    return erros.scan((acc, value) => {
      console.log(acc, value);
      acc+=1;
      if (acc < 4) {
        return acc;
      } else {
        throw new Error(value);
      }
    }, 0).delay(1000);
  };
}

function loadWithFetchUrl(url: string) {
  return Observable.defer(() => {
    return Observable.fromPromise(
      fetch(url).then(r => {
        if (r.status === 200) {
          return r.json();
        } else {
          return Promise.reject(r);
        }
      })
    )}).retryWhen(retryStrategy());
}
loadWithFetchUrl("mosvies.json").subscribe(r => console.log(r),e => console.log(`Error : ${e}`), ()=>{ console.log('complete');});
