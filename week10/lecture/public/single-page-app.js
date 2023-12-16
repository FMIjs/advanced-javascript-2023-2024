(function () {
  const root = document.getElementById("root");

  const nav = document.createElement("nav");
  const home = document.createElement("a");
  home.href = '/';
  home.textContent = "Home";
  const about = document.createElement("a");
  about.href = "/about";
  about.textContent = "About";
  nav.appendChild(home);
  nav.appendChild(about);
  root.appendChild(nav);

  const form = document.createElement('form');
  const input = document.createElement('input');
  const ul = document.createElement('ul');
  const submitButton = document.createElement("button");
  const loader = document.createElement("div");
  loader.textContent = "Loading...";
  loader.style.visibility = 'hidden';
  root.appendChild(loader);

  function createErrorDiv(errorMessage) {
    const div = document.createElement('div');
    div.textContent = errorMessage;
    div.className = 'error';
    return div;
  }

  submitButton.textContent = "Save";
  input.name = "firstName";
  input.placeholder = "First name"

  form.appendChild(input);
  form.appendChild(submitButton);
  root.appendChild(ul);
  root.appendChild(form);


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

  function createUserLi(user) {
    const li = document.createElement('li');
    li.textContent = user.firstName;
    li.setAttribute("data-id", user.id);
    ul.appendChild(li);
    loader.style.visibility = 'hidden';
    input.value = '';
  }

  function renderAllUsers() {
    ul.innerHTML = '';
    return getAllUsers().then(users => {
      users.forEach(user => createUserLi(user));
    });
  }

  renderAllUsers();

  let errMsg;
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


  const anchors = document.querySelectorAll("a");
  anchors.forEach(a => a.addEventListener("click", event => {
    event.preventDefault();
    const path = event.target.href;
    history.pushState({}, '', path);
    router.render(path, );
  }))

  window.addEventListener("popstate", () => {
    console.log("POP STATE")
    router.render(path,);
  })
}());

