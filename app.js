const API_URL = "https://jsonplaceholder.typicode.com/posts";
const blogAppElement = document.querySelector("#blog-1");
const blogAppBox = document.querySelector(".blog-data");

async function getBlogApp() {
  blogAppElement.innerHTML = "";
  const response = await fetch(API_URL);
  const json = await response.json();
  const bigPosts = json.filter((post) => post.id % 4 == 0);

  bigPosts.forEach((post) => {
    blogAppElement.innerHTML += `
    <div class="blog-box">
     <div class="blog-img">
       <img src="images/tele.png" alt="pic" />
     </div>
     <br />
     <div class="blog-text">
       <span>Maret 05, 2021</span>
       <a href="single.html" class="blog-title">${post.title}</a>
       <p>${post.body}</p>
      <a href="single.html" onClick="getSinglePost(${post.id})" class="btn">Read More</a>
     </div>
   </div>

    `;
  });
}

getBlogApp();

const getSinglePost = async (id) => {
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const response = await post.json();
  localStorage.setItem("currentPost", JSON.stringify(response));
  window.location.href = "single.html";
};
const showCurrentPost = () => {
  const currentPost = JSON.parse(localStorage.getItem("currentPost"));
  let body = "";
  body += `
  <section class="blog-data">
        <div class="info-1">
          <img src="image/tele.png" alt="pic" />
        </div>
        <div class="blog-text">
          <span>${currentPost.title}</span>
          <p>${currentPost.body}</p>
        </div>
  </section>
       `;

  blogAppBox.innerHTML = body;
};
showCurrentPost();
