let posts = JSON.parse(localStorage.getItem("posts")) || [];

function saveToLocalStorage() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost() {
  const name = document.getElementById("name").value;
  const content = document.getElementById("content").value;

  if (!name || !content) {
    alert("Please fill all fields");
    return;
  }

  const post = {
    id: Date.now(),
    name,
    content,
    comments: [],
    showComments: false,
    likes: 0,
    time: new Date().toLocaleString(),
  };

  posts.push(post);
  saveToLocalStorage();
  displayPosts();

  document.getElementById("name").value = "";
  document.getElementById("content").value = "";
}

function deletePost(postId) {
  posts = posts.filter((p) => p.id !== postId);
  saveToLocalStorage();
  displayPosts();
}

function likePost(postId) {
  const post = posts.find((p) => p.id === postId);
  post.likes++;
  saveToLocalStorage();
  displayPosts();
}

function toggleComments(postId) {
  const post = posts.find((p) => p.id === postId);
  post.showComments = !post.showComments;
  displayPosts();
}

function addComment(postId) {
  const input = document.getElementById(`comment-${postId}`);
  const text = input.value;

  if (!text) return;

  const post = posts.find((p) => p.id === postId);
  post.comments.push(text);

  input.value = "";
  saveToLocalStorage();
  displayPosts();
}

function displayPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";

  posts.forEach((post) => {
    container.innerHTML += `
      <div class="post">
        <h3>${post.name}</h3>
        <small>${post.time}</small>
        <p>${post.content}</p>

        <div class="actions">
          <button onclick="likePost(${post.id})">
            ❤️ ${post.likes}
          </button>

          <button onclick="deletePost(${post.id})">
            🗑️ Delete
          </button>

          <button onclick="toggleComments(${post.id})">
            ${post.showComments ? "Hide" : "Show"} Comments
          </button>
        </div>

        <div>
          <input id="comment-${post.id}" placeholder="Add comment">
          <button onclick="addComment(${post.id})">Add</button>
        </div>

        ${
          post.showComments
            ? post.comments
                .map((c) => `<div class="comment">${c}</div>`)
                .join("")
            : ""
        }
      </div>
    `;
  });
}

displayPosts();
