import { LitElement, html, css } from "lit-element/lit-element.js";
let { PythonShell } = require("python-shell");

const style = css`
  .DoIt {
    color: white;
    font-size: 2em;
    width: 140px;
    height: 80px;
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
  /**
   * Declare the properties that will be
   * available in the binding system
   */
  static get properties() {
    return {
      action: { type: String },
      value: { type: String },
      result: { type: String }
    };
  }
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
    let options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      args: ["127.0.0.1", "65432", this.action, this.value]
    };
    PythonShell.run("app-client.py", options, (err, results) => {
      if (err) {
        console.log("pyshell error");
        console.log(err);
      }
      // results is an array consisting of messages collected during execution
      console.log("results: %j", results);
      this.result = results[3];
    });
  }
  render() {
    return html`
      <div>
        <h2>${this.result}</h2>
        <h2>action</h2>
        <input
          type="text"
          .value=${this.action}
          @input=${this.handleActionInput}
        />
        <h2>value</h2>
        <input
          type="text"
          .value=${this.value}
          @input=${this.handleValueInput}
        />
        <button class="DoIt" @click=${this.doIt}>Do It</button>
      </div>
    `;
  }
}

// Register the new element with the browser.
customElements.define("py-client", PyClient);
