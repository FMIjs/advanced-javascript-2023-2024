import { render, html } from "lit-html";
import { createContextForComponent } from "./context";
import { store } from './store'; 

export class AppLogin extends HTMLElement {
  static selector = "app-login";
  #showRoot = null;
  context = createContextForComponent(this, { isLoading: false, error: null });

  constructor() {
    super();
    this.#showRoot = this.attachShadow({ mode: "closed" });
    this.render();
  }

  submitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [...formData.entries()].reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    this.context.isLoading = true;
    this.context.error = "";
    fetch("http://localhost:8000/login", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ token }) => {
        this.context.isLoading = false;
        if (!token) {
          return (this.context.error = "Wrong email or password!");
        }
        localStorage.setItem("auth_token", token);
        store.authToken = token;
        window.dispatchEvent(
          new CustomEvent("vaadin-router-go", { detail: { pathname: "/users" } })
        );
      })
      .catch(() => {
        this.context.isLoading = false;
        this.context.error = "Failed to fetch!";
      });
  }

  getTemplate() {
    return html`
      <form @submit=${this.submitHandler.bind(this)}>
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" type="password" name="password" />
        </div>
        <button .disabled=${this.context.isLoading}>Login</button>
        ${this.context.error &&
        html`<div class="error">${this.context.error}</div>`}
      </form>
    `;
  }

  render() {
    render(this.getTemplate(this), this.#showRoot);
  }
}

customElements.define(AppLogin.selector, AppLogin);
