// currentDay display
var currentDay = document.querySelector("#currentDay");
var m = moment();
var today = m.format("dddd, MMMM Do YYYY").toString();
currentDay.append(today);

var time = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var container = document.querySelector(".container");

function html() {
  for (var i = 0; i < time.length; i++) {
    var a = document.createElement("div");
    a.setAttribute("class", "row");

    // div time
    var b = document.createElement("div");
    b.setAttribute("id", `time${time[i]}`);
    b.setAttribute("class", "col-2");

    //div schedule value
    var c = document.createElement("div");
    c.setAttribute("id", `col${time[i]}`);
    c.setAttribute("class", "col-8");

    //div button
    var d = document.createElement("div");
    d.setAttribute("class", "col-2");
    var e = document.createElement("button");
    e.setAttribute("class", `saveBtn${time[i]}`);
    var f = document.createElement("img");
    f.setAttribute("src", "img/Locked.svg.png");
    f.setAttribute("alt", "");
    f.setAttribute(
      "style",
      "width:100%;height:50px; padding: 0px; margin: 0px"
    );

    //append to the container
    e.append(f);
    d.append(e);
    a.append(b);
    a.append(c);
    a.append(d);
    container.append(a);
  }
  calendar();
  getFromLocalStorage();
  setToLocalStorage();
}
html();

//calendar function
function calendar() {
  for (let c = 0; c < time.length; c++) {
    let timeX = document.querySelector(`#time${time[c]}`);
    let period = function () {
      if (time[c] < 5 || time[c] == 12) {
        return "[PM]";
      } else {
        return "[AM]";
      }
    };

    let timeat = m.format(`${time[c]} ${period()}`).toString();
    timeX.append(timeat);

    var col = document.querySelector(`#col${time[c]}`);
    let x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("class", `input${time[c]}`);
    if (timeat === m.format("H [AM]").toString()) {
      x.setAttribute("placeholder", "Current time");
      x.style.backgroundColor = "red";
      col.append(x);
    } else if (m.format("H") < time[c]) {
      x.setAttribute("placeholder", "Coming time");
      x.style.backgroundColor = "green";
      col.append(x);
    } else if (m.format("H") < m.format(`${time[c]}`)){
      x.setAttribute("placeholder", "Passed time");
      x.style.backgroundColor = "silver";
      col.append(x);
    }
  }
}

//get from store
function getFromLocalStorage() {
  for (let t = 0; t < time.length; t++) {
    let period = function () {
      if (time[t] < 5 || time[t] == 12) {
        return "pm";
      } else {
        return "am";
      }
    };
    let savedEvent = localStorage.getItem(`${time[t]}:00${period()}`);
    $(`.input${time[t]}`).attr("value", savedEvent);
  }
}

//set to the store
function setToLocalStorage() {
  for (let t = 0; t < time.length; t++) {
    let period = function () {
      if (time[t] < 5 || time[t] == 12) {
        return "pm";
      } else {
        return "am";
      }
    };
    $(`.saveBtn${time[t]}`).click(function () {
      let event = $(`.input${time[t]}`).val();
      localStorage.setItem(`${time[t]}:00${period()}`, event);
    });
  }
}
