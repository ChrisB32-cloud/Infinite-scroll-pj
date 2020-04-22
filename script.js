// 1 start
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

// 2
let limit = 5;
let page = 1;

// 3 fetch post from api
async function getPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// 4 Show Posts in DOM
async function showPost() {
  const posts = await getPost();

  // 5 Loop through posts
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
    </div>
    `;

    // 6 Show posts in the DOM
    postsContainer.appendChild(postEl);
  });
}

// 10 Show Loader and fetch more posts
function showLoading() {
  loading.classList.add('show');

  // 11 set a timeout
  setTimeout(() => {
    loading.classList.remove('show');

    // 12 increment page and show post
    setTimeout(() => {
      page++;
      showPost();
    }, 300);
  }, 1000);
}

// 14 Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
  // will give us a nodeList thats basiclly an Array

  // 15 Loop through posts
  posts.forEach(post => {
    // 16 to match what we type in
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    // 17 indexOf will serach for whatever we pass in
    // if it doesnt match it will return a -1
    // so if greater than -1 there is a match
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
      console.log(term);
    } else {
      post.style.display = 'none';
    }
  });
}

// 5 Show initial posts
showPost();

// 7
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // 8
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // 9
    showLoading();
  }
});

// 13 filter posts
filter.addEventListener('input', filterPosts);
