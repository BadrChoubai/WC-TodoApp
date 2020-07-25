const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
            text-align: left;
        }

        button {
            border: none;
            cursor: pointer;
            padding: 6px 16px;
        }

        ul {
            align-items: flex-start;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: space-around;
            list-style: none;
            padding: 0;
        }

        h1 {
          margin: 0;
          padding: 0;
        }

        #app {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 0 16px;
        }

        #todos-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 1.4rem;
          box-shadow: 0 .8em .3em rgba(0, 0, 0, 0.06);
          padding: 16px;
          justify-content: flex-start;
        }
    </style>

    <section id="app">
      <h1>Your Todos</h1>

      <div id="todo-input">
        <input type="text" placeholder="Add a new Todo Item" />
        <button>Add</button>
      </div>

      <ul id="todos-container"></ul>
    </section>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._todos;

    // Element refs
    this.$todoList = this._shadowRoot.querySelector("ul");
    this.$input = this._shadowRoot.querySelector("#todo-input").children[0];
    this.$submitButton = this._shadowRoot.querySelector(
      "#todo-input"
    ).children[1];

    this.$submitButton.addEventListener("click", this._addTodoItem.bind(this));
  }

  connectedCallback() {
    if (!this._todos) {
      let $message = document.createElement("p");
      $message.innerHTML = "No Todos";
      this.$todoList.appendChild($message);
    } else {
      this._renderTodoList();
    }
  }

  get todos() {
    return this._todos;
  }

  set todos(value) {
    this._todos = value;
    this._renderTodoList();
  }

  _addTodoItem() {
    if (this.$input.value.length > 0) {
      this._todos.push({ text: this.$input.value, checked: false });
      this._renderTodoList();
      this.$input.value = "";
    }
  }

  _renderTodoList() {
    this.$todoList.innerHTML = ``;

    this._todos.forEach((todo, index) => {
      let $todoItem = document.createElement("wc-todo-item");
      $todoItem.setAttribute("text", todo.text);

      if (todo.checked) {
        $todoItem.setAttribute("checked", "");
      }

      this.$todoList.appendChild($todoItem);
    });
  }
}

window.customElements.define("wc-todo-app", TodoApp);
