// 1. 유저가 값을 입력한다.
// 2. +버튼을 누르면 할일이 추가 됨.
// 3. delete버튼을 누르면 할일이 삭제 된다.
// 4. check 버튼을 누르면 할일이 끝나면서 밑줄이 그어진다.
// 5. 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 6. 끝난 탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나온다.
// 전체 탭을 누르면 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-button");
let taskList = [];

// addBtn.addEventListener("click", addTask);

// function addTask() {

// }
addBtn.addEventListener("click", function () {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
});

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete === true) {
      resultHTML += `<div class="task">
                      <div class="task-done">${taskList[i].taskContent}</div>
                      <div>
                        <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                        <button>Delete</button>
                      </div>
                    </div>`;
    } else {
      resultHTML += `<div class="task">
                      <div>${taskList[i].taskContent}</div>
                      <div>
                        <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                        <button>Delete</button>
                      </div>
                    </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = true;
      break;
    }
  }
  render();
  console.log(taskList);
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
