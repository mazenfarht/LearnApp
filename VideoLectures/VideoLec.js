let videos = [
  {
    title: "HTML 1",
    subject: "html",
    youtube: "https://www.youtube.com/embed/kUMe1FH4CHE",
  },
  {
    title: "HTML 2",
    subject: "html",
    youtube: "https://www.youtube.com/embed/kUMe1FH4CHE",
  },
  {
    title: "HTML 3",
    subject: "html",
    youtube: "https://www.youtube.com/embed/kUMe1FH4CHE",
  },

  {
    title: "CSS 1",
    subject: "css",
    youtube: "https://www.youtube.com/embed/1Rs2ND1ryYc",
  },
  {
    title: "CSS 2",
    subject: "css",
    youtube: "https://www.youtube.com/embed/1Rs2ND1ryYc",
  },
  {
    title: "CSS 3",
    subject: "css",
    youtube: "https://www.youtube.com/embed/1Rs2ND1ryYc",
  },

  {
    title: "JS 1",
    subject: "js",
    youtube: "https://www.youtube.com/embed/W6NZfCO5SIk",
  },
  {
    title: "JS 2",
    subject: "js",
    youtube: "https://www.youtube.com/embed/W6NZfCO5SIk",
  },
  {
    title: "JS 3",
    subject: "js",
    youtube: "https://www.youtube.com/embed/W6NZfCO5SIk",
  },
];

let filteredVideos = [...videos];

// watched store (GLOBAL)
let watched = JSON.parse(localStorage.getItem("watched")) || [];

function displayVideos() {
  const container = document.getElementById("videosContainer");
  container.innerHTML = "";

  filteredVideos.forEach((video, index) => {
    let globalIndex = videos.indexOf(video);

    container.innerHTML += `
      <div class="video-card">

        <!-- Thumbnail -->
        <div class="thumb-wrapper">
          <img src="https://img.youtube.com/vi/${
            video.youtube.split("/embed/")[1]
          }/0.jpg" />
        </div>

        <div class="video-content">
          <h3>${video.title}</h3>
          <p>${video.subject}</p>

          <button onclick="openVideo('${video.youtube}', ${globalIndex})">
            ▶ Watch
          </button>
        </div>

      </div>
    `;
  });
}

function openVideo(url, index) {
  document.getElementById("videoModal").style.display = "block";
  document.getElementById("videoFrame").src = url;

  // 🔥 save progress
  if (!watched.includes(index)) {
    watched.push(index);
    localStorage.setItem("watched", JSON.stringify(watched));
  }
}

function closeVideo() {
  document.getElementById("videoModal").style.display = "none";
  document.getElementById("videoFrame").src = "";
}

function searchVideos() {
  const value = document.getElementById("search").value.toLowerCase();

  filteredVideos = videos.filter((v) => v.title.toLowerCase().includes(value));

  displayVideos();
}

function filterVideos() {
  const value = document.getElementById("filter").value;

  filteredVideos =
    value === "all" ? [...videos] : videos.filter((v) => v.subject === value);

  displayVideos();
}

window.onclick = function (e) {
  const modal = document.getElementById("videoModal");
  if (e.target === modal) closeVideo();
};

displayVideos();
