
(function () {
  function renderTemplate(data) {
    const template = document.getElementById('myEJSTemplate').innerHTML;
    return ejs.render(template, data);
  };

  const root = document.getElementById("root");



  const nav = document.createElement("nav");
  root.appendChild(nav);
  const outlet = document.createElement("div");
  outlet.id = 'outlet';
  root.appendChild(outlet);

  const home = document.createElement("a");
  home.href = '/';
  home.textContent = "Home";
  const about = document.createElement("a");
  about.href = "/about";
  about.textContent = "About";
  nav.appendChild(home);
  nav.appendChild(about);

  function render() {
    const pathname = window.location.pathname;
    if (pathname === '/') return renderHome();
    if (pathname === '/about') return renderAbout();
  }

  function renderHome() {
    outlet.innerHTML = '';
    // const form = document.createElement('form');
    // const input = document.createElement('input');
    // const ul = document.createElement('ul');
    // const submitButton = document.createElement("button");
    // const loader = document.createElement("div");
    // loader.textContent = "Loading...";
    // loader.style.visibility = 'hidden';
    // outlet.appendChild(loader);

    function createErrorDiv(errorMessage) {
      const div = document.createElement('div');
      div.textContent = errorMessage;
      div.className = 'error';
      return div;
    }

    // submitButton.textContent = "Save";
    // input.name = "firstName";
    // input.placeholder = "First name"

    // form.appendChild(input);
    // form.appendChild(submitButton);
    // outlet.appendChild(ul);
    // outlet.appendChild(form);
    renderAllUsers();

    function renderAllUsers() {
      return getAllUsers().then(users => {
        const result = renderTemplate({ users });
        outlet.innerHTML = result;
        const form = outlet.querySelector('#form');
        const input = outlet.querySelector('#input');

        form.addEventListener("submit", (event) => {
          event.preventDefault();
          if (errMsg) { errMsg.remove(); }
          // event.stopPropagation();
          // event.stopImmediatePropagation();

          const firstName = input.value;
          if (firstName.length < 3) {
            errMsg = createErrorDiv('first name < 3');
            form.appendChild(errMsg);
            return;
          }

          loader.style.visibility = 'visible';
          createUser({ firstName }).then(() => renderAllUsers());
        });

      });
    }

    let errMsg;
  }

  function renderAbout() {
    outlet.innerHTML = '<div>This is about page</div>';
  }



  // document.body.addEventListener("click", (event) => {
  //   console.log('something was clicked!', event.target);
  // });

  // submitButton.addEventListener("click", (event) => {
  //   console.log('submit was clicked');
  // });

  function createUser(data) {
    return fetch('/api/users', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
  }

  function getAllUsers() {
    return fetch('/api/users', {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => res.json());
  }

  const anchors = document.querySelectorAll("a");
  anchors.forEach(a => a.addEventListener("click", event => {
    event.preventDefault();
    const path = event.target.href;
    history.pushState({}, '', path);
    render()
  }))

  window.addEventListener("popstate", () => {
    console.log("POP STATE")
    render()
  })

  render();
}());

