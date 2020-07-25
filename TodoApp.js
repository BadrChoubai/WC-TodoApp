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
          box-shadow: 0 .8em .3em rgba(0, 0, 0, 0.06);
          padding: 16px;
        }
    </style>

    <section id="app">
      <h1>Your Todos</h1>
      <button><i className="far fa-check-square"></i></button>

      <ul id="todos-container"></ul>
    </section>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._todos;
    this.$todoList = this._shadowRoot.querySelector("ul");
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

  _renderTodoList() {
    this.$todoList.innerHTML = ``;

    this._todos.forEach((todo, index) => {
      console.log(todo);
      let $todoItem = document.createElement("div");
      $todoItem.innerHTML = todo.text;
      this.$todoList.appendChild($todoItem);
    });
  }
}

window.customElements.define("wc-todo-app", TodoApp);
