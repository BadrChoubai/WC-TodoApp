import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@latest/lit-element.js?module";
const template = document.createElement("template");
template.innerHTML = `
    <li id="item">
        <input type="checkbox"/>
        <label></label>
        <button>X</button>
    </li>
`;

class TodoItem extends LitElement {
  static get properties() {
    return {
      checked: {
        type: Boolean,
        reflect: true,
      },
      index: { type: Number },
      text: {
        attribute: "todo",
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    super();

    this.text = ``;
    this.checked = false;
  }

  _fire(eventType) {
    this.dispatchEvent(new CustomEvent(eventType, { detail: this.index }));
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      button {
        border: none;
        cursor: pointer;
        display: inline;
        margin-left: 1em;
      }

      .completed {
        text-decoration: line-through;
      }

      #item {
        background: #fff;
        box-shadow: 0 0.3em 0.2em transparent;
        align-items: center;
        border-bottom: 0.2rem solid rgba(88, 93, 96, 0.05);
        display: flex;
        padding: 16px;
        transition: box-shadow ease-in-out 300ms;
      }

      #item:hover {
        box-shadow: 0 0.3em 0.2em rgba(0, 0, 0, 0.07);
      }
    `;
  }

  render() {
    return html`
      <li id="item">
        <input
          type="checkbox"
          ?checked=${this.checked}
          @change=${() => this._fire("onToggle")}
        />
        <label class=${this.checked ? "completed" : ""}>${this.text}</label>
        <button @click=${() => this._fire("onRemove")}>X</button>
      </li>
    `;
  }
}

window.customElements.define("wc-todo-item", TodoItem);
