import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";
import "./TodoItem.js";

class TodoApp extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
    };
  }
  constructor() {
    super();
    this.todos = [];

    this.$input = this.shadowRoot.querySelector("input");
  }

  firstUpdated() {
    this.$input = this.shadowRoot.querySelector("input");
  }

  _addTodoItem(event) {
    event.preventDefault();

    if (this.$input.value.length > 0) {
      this.todos = [...this.todos, { text: this.$input.value, checked: false }];
      this.$input.value = ``;
    }
  }

  _removeTodoItem(event) {
    this.todos = this.todos.filter((todo, index) => {
      return index !== event.detail;
    });
  }

  _toggleTodoItem(event) {
    this.todos = this.todos.map((todo, index) => {
      return index === event.detail ? { ...todo, check: !todo.checked } : todo;
    });
  }

  static get styles() {
    return css`
      :host {
        display: block;
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

      h1,
      h2 {
        margin: 0;
        padding: 0;
      }

      #app {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 16px;
      }

      #todo-input {
        margin-bottom: 1rem;
      }

      #todos-container {
        background: #f5f5f3;
        box-shadow: 0 0.2em 0.3em rgba(0, 0, 0, 0.06);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1.4rem;
        padding: 16px;
        justify-content: flex-start;
      }
    `;
  }

  render() {
    return html`
      <section id="app">
        <form id="todo-input">
          <input type="text" placeholder="Add a new to-do"></input>
          <button @click=${this._addTodoItem}>Add Todo</button>
        </form>

        <h1>Your Todos</h1>

        <ul id="todos-container">
          ${
            this.todos.length > 0
              ? this.todos.map(
                  (todo, index) => html`
                    <wc-todo-item
                      ?checked=${todo.checked}
                      .index=${index}
                      todo=${todo.text}
                      @onRemove=${this._removeTodoItem}
                      @onToggle=${this._toggleTodoItem}
                    >
                    </wc-todo-item>
                  `
                )
              : html`<h2 id="no-data">Nothing to do.</h2>`
          }
        </ul>
      </section>
    `;
  }
}

window.customElements.define("wc-todo-app", TodoApp);
