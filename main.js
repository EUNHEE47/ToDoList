// 1. 유저가 값을 입력한다.
// 2. +버튼을 누르면 할일이 추가 됨.
// 3. delete버튼을 누르면 할일이 삭제 된다.
// 4. check 버튼을 누르면 할일이 끝나면서 밑줄이 그어진다.
// 5. 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 6. 끝난 탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나온다.
// 전체 탭을 누르면 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under-line");

for (i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keyup", function (event) {
  if (window.event.keyCode === 13) {
    addTask(event);
  }
});

// +버튼을 클릭 하면
function addTask() {
  if (taskInput.value === "") {
    alert("내용을 입력해 주세요");
    return;
  }

  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];

  if (event) {
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      e.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

// UI
function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      resultHTML += `<div class="task">
                      <div class="task-done">${list[i].taskContent}</div>
                      <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                      </div>
                    </div>`;
    } else {
      resultHTML += `<div class="task">
                      <div>${list[i].taskContent}</div>
                      <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                      </div>
                    </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

// checkBtn
function toggleComplete(id) {
  console.log("id:", id);
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

// deleteBtn
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

// ID값
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
