
const todoForm = document.querySelector("#todo-form");
const task = document.querySelector("#todo");
const date = document.querySelector("#date");
const descr = document.querySelector("#description");
const list = document.querySelector("#todo-list");
const msg = document.querySelector(".msg")
let fullList = [];
//let listUpdate = [];
let i = 0;
let id = 0;
//fortlaufende id
const test = document.querySelector("section");
//let forDelete;


todoForm.addEventListener("submit", onSubmit);

window.addEventListener("load", onLoad);

// function for reload, creates list from local storage
function onLoad() {
  const oldList = localStorage.getItem("List");
  id = localStorage.getItem("ListId");
  if (id === null){
    id = 0;
  }
  else {
    id++ //weil ohne liste eh nicht gespeichert wird!
  }
  if (oldList !== null) {
    const oldlist = JSON.parse(oldList);
    if (Array.isArray(oldlist)) {
      fullList = oldlist;
      console.log(fullList);
      
      for(const entry of fullList){
        addListItem(entry.Id, entry.Task, entry.Date, entry.Description);        
      }
      //loadTest();
    }
  } 
}

// function that creates the elements of the todo list, also counts entrys(i), "count" not needed anymore
function addListItem(count, output1, output2, output3) {
  const section = document.createElement("section");
  section.classList.add("forDelete");

  const num = document.createElement("h2");
  const line = document.createElement("div");
  num.appendChild(line);
  num.appendChild(document.createTextNode(`#${i+1}`))

  dlist = document.createElement("dl");
  addListElement("Task", output1);
  addListElement("Due", output2);
  addListElement("Description", output3);

  const buttn = document.createElement("button");
  buttn.innerHTML = "Done";
  buttn.value = `${count}`;
  buttn.id = `button${count}`;
  buttn.addEventListener("click", function(){onDone(buttn.value)});
  
  section.appendChild(num);
  section.appendChild(dlist);
  section.appendChild(buttn);

  list.appendChild(section);
  i++;

  function addListElement(name, output){
    const dt = document.createElement("dt");
    dt.appendChild(document.createTextNode(`${name}:`));
    const dd = document.createElement("dd");
    dd.appendChild(document.createTextNode(`${output}`));
  
    dlist.appendChild(dt);
    dlist.appendChild(dd);
  }  
}

// submit function, asks if important fields are filled in, then adds new entry to list and saves in ls as "key"
function onSubmit(e) {
  e.preventDefault();

  if(task.value === "" || date.value === "") {
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    setTimeout(() => msg.remove(), 3000);
  }
  else {
    console.log("succsess")


    // count wird nicht mehr benötigt aber ich lass ihn drinnen falls mich mal mein gedankenweg interessiert
    const newList = { Id: id,
                      Task: task.value,
                      Date: date.value,
                      Description: descr.value
                    };
    addListItem(newList.Id, newList.Task, newList.Date, newList.Description);
    fullList.push(newList);
    const fullListString = JSON.stringify(fullList);
    localStorage.setItem("List", fullListString);
    localStorage.setItem("ListId", id);
    console.log(fullListString);
    id++

    //clear input
    task.value = "";
    date.value = "";
    descr.value = "";

  }
}

//function to clear an entry, saves again and reloads page
function onDone(button) {
  const oldList = localStorage.getItem("List");

  if (oldList !== null) {
    const oldlist = JSON.parse(oldList);
    if (Array.isArray(oldlist)) {
      fullList = oldlist;
      console.log(button);
      button = parseInt(button);
      console.log(fullList);
      // console.log(fullList[i].count);
      const index = fullList.map(x => {
        return x.Id;
      }).indexOf(button);
      console.log(index);
      fullList.splice(index, 1);
      // console.log(fullList);
      const fullListString = JSON.stringify(fullList);
      localStorage.setItem("List", fullListString);
      // console.log(fullListString);
      //seite neu laden
      //location.reload();
      //oder, alte liste löschen, neu erstellen über key
      //removeElementsByClass("forDelete");

      // function removeElementsByClass(className){
      //   var elements = document.getElementsByClassName(className);
      //   while(elements.length > 0){
      //       elements[0].parentNode.removeChild(elements[0]);
      //   }
      // }
      const forDelete = document.querySelectorAll(".forDelete");
      const removeElements = (elms) => elms.forEach(el => el.remove());
      removeElements(forDelete);
      
      i = 0;

      for(const entry of fullList){
         addListItem(entry.Id, entry.Task, entry.Date, entry.Description);
      }

      //oder, durchiterieren, num mit id
      

      //one try but didnt work because i didnt have object but array with objects, just here in case I need this sometime ;)
      // delete fullList[i];
      // clean(fullList);
      // removeEmty(fullList);
      // console.log(listUpdate);
      //const listUpdateString = JSON.stringify(listUpdate);
      // localStorage.setItem("key", listUpdateString);
      // console.log(listUpdateString);
      // for(const entry of fullList){
      //   addListItem(entry.count, entry.task, entry.date, entry.description);
      // }

    }
  } 
}

//Unnötige funktionen aber ich lass sie mal so stehen :D
function clean(obj) {
  for (const entry in obj) {
    if (obj[entry] === null || obj[entry] === undefined) {
      delete obj[entry];
    }
  }
  return obj;
}

function removeEmty(obj) {
  listUpdate = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null));
  return listUpdate;
}
// console.log(window)


// const testList = [
//   {Id: 3,
//   Task: "Test1"},
//   {Id: 4,
//   Task: "Test2"}
// ]
// const test = 3;
// const index = testList.map(x => {
//   return x.Id;
// }).indexOf(test);
// console.log(testList);
// console.log(index);
function loadTest() {
// const remove = document.createElement("p");
// remove.class = "test";
// remove.appendChild(document.createTextNode("HI remove plz"));
// const keep = document.createElement("p");
// keep.class = "keep";
// keep.appendChild(document.createTextNode("HI leave me"));
// test.appendChild(remove);
// test.appendChild(keep);

const test2 = document.querySelector(".test");
console.log(test2);
console.log(test);
test2.remove();
// const removeElements = (elms) => elms.forEach(el => el.remove());
// removeElements( document.querySelectorAll(".test") );

}


