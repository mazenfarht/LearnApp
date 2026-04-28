let videos = [
  { subject: "html" },
  { subject: "html" },
  { subject: "html" },

  { subject: "css" },
  { subject: "css" },
  { subject: "css" },

  { subject: "js" },
  { subject: "js" },
  { subject: "js" },
];

let subjects = ["html", "css", "js"];

let watched = JSON.parse(localStorage.getItem("watched")) || [];

function getProgress(subject) {
  let subjectVideos = videos.filter((v) => v.subject === subject);

  let total = subjectVideos.length;

  let completed = subjectVideos.filter((v, i) => {
    let index = videos.indexOf(v);
    return watched.includes(index);
  }).length;

  let percent = Math.round((completed / total) * 100);

  return { total, completed, percent };
}

function renderDashboard() {
  const container = document.getElementById("dashboard");
  container.innerHTML = "";

  subjects.forEach((subject) => {
    let p = getProgress(subject);

    container.innerHTML += `
        <div class="card">
          <h2>${subject.toUpperCase()}</h2>
  
          <div class="progress-bar">
            <div class="progress" style="width:${p.percent}%"></div>
          </div>
  
          <p>✔ ${p.completed} / ${p.total}</p>
          <p>📊 ${p.percent}% completed</p>
  
          ${p.percent === 100 ? "<span>🎉 Completed</span>" : ""}
        </div>
      `;
  });
}

renderDashboard();
