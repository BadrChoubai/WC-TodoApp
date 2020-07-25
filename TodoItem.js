const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
        }

        .completed {
            text-decoration: line-through;
        }

        button {
            border: none;
            cursor: pointer;
            padding: 6px 16px;
        }
    </style>

    <li className="item">
        <input type="checkbox"/>
        <label></label>
        <button><i className="fa fa-trash"></i></button>
    </li>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$item = this._shadowRoot.querySelector(".item");
    this.$deleteButton = this._shadowRoot.querySelector("button");
    this.$todoItemText = this._shadowRoot.querySelector("label");
    this.$todoMarker = this._shadowRoot.querySelector("input");

    this.$deleteButton.addEventListener("click", (event) => {
      this.dispatchEvent(new CustomEvent("onRemove", { detail: this.index }));
    });

    this.$todoMarker.addEventListener("click", (event) => {
      this.dispatchEvent(new CustomEvent("onToggle", { detail: this.index }));
    });
  }

  static getObservedAttributes() {
    return ["text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._text = newValue;
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
