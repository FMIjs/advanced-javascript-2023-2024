import { render, html } from "lit-html";
import { serverFetch } from './utils/server-fetch';
import { store } from './store';
import { withContext } from './decoratrs/with-context'

@withContext({ isLoading: false, error: null })
export class AppLogin extends HTMLElement {
  static selector = "app-login";
  #showRoot = null;

  constructor() {
    super();
    this.#showRoot = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
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
    serverFetch('/login', { body: data })
      .then(({ ok, data }) => {
        this.context.isLoading = false;
        if (!ok) {
          this.context.error = data.error.message;
          return;
        }
        const { token } = data;
        if (!token) {
          return (this.context.error = "Wrong email or password!");
        }
        localStorage.setItem("auth_token", token);
        store.authToken = token;
        window.dispatchEvent(
          new CustomEvent("vaadin-router-go", { detail: { pathname: "/users" } })
        );
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
