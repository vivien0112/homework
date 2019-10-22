import { LitElement, html, css } from "lit-element/lit-element.js";

const style = css`
  .DoIt {
    color: white;
    font-size: 2em;
    width: 40px;
    height: 40px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #73ff73;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #47a947;
    margin: 20px auto 0;
  }

  .DoIt:hover {
    box-shadow: none;
    margin-left: calc(auto + 1px);
  }
  input {
    width: 60%;
    padding: 10px;
    font-size: 1em;
    margin: 10px auto;
    box-shadow: 1px 3px 20px 0px rgba(0, 0, 0, 0.3);
  }
`;
export class PyClient extends LitElement {
  constructor() {
    super();
    this.action = "search";
    this.value = "pearl";
    this.result = "n/a";
  }
  static get styles() {
    return [style];
  }

  handleActionInput(e) {
    this.action = e.target.value;
  }
  handleValueInput(e) {
    this.value = e.target.value;
  }
  doIt() {
    console.log("action=" + action + " value=" + value);
  }
  render() {
    return html`
    <div>
        <p>action</p>
          <input
            type="text"
            .value=${this.action}
            @input=${this.handleActionInput}
          />
          <p>value</p>
          <input
            type="text"
            .value=${this.value}
            @input=${this.handleValueInput}
          />
          <button
            class="DoIt"
            @click=${this.doIt}
          >Do It</button>
        </div>
    <p>${this.result}</p>
    `
  }
}
