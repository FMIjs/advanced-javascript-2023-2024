(function () {
  const apiURL = 'http://localhost:3000/api';
  const postList = document.getElementById('post-list');
  const userDetail = document.getElementById('user-detail');
  const userPosts = document.getElementById('user-posts');

  const loadingLi = document.createElement('li');
  loadingLi.innerText = 'Loading...';

  const loadPosts = () => {
    fetch('http://localhost:3000/api/posts')
    //...
  }
  const loadUserData = () => {
    //...
  }
  const loadUserPosts = () => {
    //...
  }

  const loadAndRenderPosts = () => {
    postList.innerHTML = '';
    postList.appendChild(loadingLi);
    loadPosts().then((/*...*/) => {
      // ...
    });
  }


  const loadAndRenderUserDetails = (user) => {
    userDetail.innerHTML = '';
    userDetail.appendChild(loadingLi);
    Promise.all([
      loadUserData(user.id),
      loadUserPosts(user.id)
    ]).then((/*...*/) => {
      // ...
    });
  }

  function postListClickHandler(event) {
    // ...
  }

  function init() {
    loadAndRenderPosts();
  }

  init();
}());