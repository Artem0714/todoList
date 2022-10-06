console.log("Run script");

const getTodoList = () =>
  fetch("/api/v1/todo").then((response) => response.json());

const sendTodo = (data) =>
  fetch("/api/v1/todo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

const doneTodo = (id) =>
  fetch("/api/v1/todo/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDone: true }),
  });

const deleteTodo = (id) =>
  fetch("/api/v1/todo/" + id, {
    method: "DELETE",
  });

const getTodo = (id) =>
  fetch("/api/v1/todo/" + id).then((response) => response.json());

const renderTodoList = (data = []) => {
  const listDiv = document.getElementById("list");

  listDiv.innerHTML = "";

  if (data.length) {
    data.forEach((item) => {
      const itemDiv = document.createElement("div");
      const dataDiv = document.createElement("div");
      const getButton = document.createElement("button");
      const doneButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      dataDiv.innerText = JSON.stringify(item, null, 2);
      getButton.innerText = "get";
      doneButton.innerText = "done";
      deleteButton.innerText = "delete";

      itemDiv.className = "todo";
      itemDiv.append(dataDiv);
      itemDiv.append(getButton);
      itemDiv.append(doneButton);
      itemDiv.append(deleteButton);

      listDiv.append(itemDiv);

      getButton.addEventListener("click", async () => {
        const data = await getTodo(item.id);
        console.log(data);
      });

      doneButton.addEventListener("click", async () => {
        await doneTodo(item.id);
        renderTodoList(await getTodoList());
      });

      deleteButton.addEventListener("click", async () => {
        await deleteTodo(item.id);
        renderTodoList(await getTodoList());
      });
    });
  } else {
    listDiv.innerText = "Todo list is empty";
  }
};

window.addEventListener("load", () => {
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const sendButton = document.getElementById("send-button");

  sendButton?.addEventListener("click", async () => {
    await sendTodo({
      title: titleInput?.value ?? "",
      description: descriptionInput?.value ?? "",
    });
    renderTodoList(await getTodoList());
  });

  getTodoList().then(renderTodoList);
});
