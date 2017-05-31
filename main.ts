import { Observable, Observer } from 'rxjs';
let circle: any;
let button: any;
let output: any;
output = document.getElementById('output');
circle = document.getElementsByClassName('circle')[0];
button = document.getElementById('button');
let click = Observable.fromEvent(button, 'click');

function loadData(url: string){
  return Observable.create(observer => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener("load", ()=>{
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        observer.next(data);
        observer.complete();
      } else {
        observer.error(xhr);
      }
    });
    xhr.send();
  }).retryWhen((errors) => {
    return errors.delay(1000).take(4);
  });
}


function renderMovie(movies) {
  movies.forEach(m => {
    let div = document.createElement("div");
    div.innerText = m.title;
    output.appendChild(div);
  });
}

// click.map(e => loadData("movies.json")).subscribe(o => console.log(o));


click.flatMap(e => loadData("mosvies.json")).subscribe(o => renderMovie(o), error => console.log(`error: ${error}`));
