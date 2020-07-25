const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
        }

        button {
            border: none;
            cursor: pointer;
            display: inline;
            margin-left: 1em;
        }

        .completed > label {
            text-decoration: line-through;
        }

        #item {
          align-items: center;
          display: flex;
        }
    </style>

    <li id="item">
        <input type="checkbox"/>
        <label></label>
        <button>X</button>
    </li>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._checked;
    this._text;

    this.$item = this._shadowRoot.querySelector("#item");
    this.$deleteButton = this._shadowRoot.querySelector("button");
    this.$todoItemText = this._shadowRoot.querySelector("label");
    this.$checkbox = this._shadowRoot.querySelector("input[type='checkbox']");

    this.$deleteButton.addEventListener("click", (event) => {
      this.dispatchEvent(new CustomEvent("onRemove", { detail: this.index }));
    });

    this.$checkbox.addEventListener("click", (event) => {
      this.dispatchEvent(new CustomEvent("onToggle", { detail: this.index }));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "checked":
        this._checked = this.hasAttribute("checked");
        break;
      case "index":
        this._index = parseInt(newValue);
        break;
      case "text":
        this._text = newValue;
        break;
    }
  }

  static get observedAttributes() {
    return ["checked", "index", "text"];
  }

  get index() {
    return this._index;
  }

  set index(val) {
    this.setAttribute("index", val);
  }

  connectedCallback() {
    if (!this.hasAttribute("text")) {
      this.setAttribute("text", "placeholder");
    }

    this._renderTodoItem();
  }

  _renderTodoItem() {
    if (this.hasAttribute("checked")) {
      this.$item.classList.add("completed");
      this.$checkbox.setAttribute("checked", "");
    } else {
      this.$item.classList.remove("completed");
      this.$checkbox.removeAttribute("checked");
    }
    this.$todoItemText.innerHTML = this._text;
  }
}

window.customElements.define("wc-todo-item", TodoItem);
