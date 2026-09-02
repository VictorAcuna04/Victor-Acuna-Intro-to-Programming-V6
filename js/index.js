let body = document.querySelector("body");
let footer = document.createElement("footer");
body.appendChild(footer);

let today = new Date();
let thisYear = today.getFullYear();

footer = document.querySelector("footer");

let copyright = document.createElement("p");
copyright.innerHTML = "© Victor Acuna " + thisYear;

footer.appendChild(copyright);

let skills = [
  "C++",
  "Python",
  "Swift",
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Unity",
  "Figma",
  "WordPress",
  "Arduino",
  "Git",
  "GitHub",
];

let skillsSection = document.querySelector("#skills");

let skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement("li");

  skill.innerText = skills[i];

  skillsList.appendChild(skill);
}

let messageForm = document.forms.leave_message;

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let usersName = event.target.usersName.value;
  let usersEmail = event.target.usersEmail.value;
  let usersMessage = event.target.usersMessage.value;

  console.log(usersName, usersEmail, usersMessage);

  let messageSection = document.querySelector("#messages");
  let messageList = messageSection.querySelector("ul");

  let newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a> <span>${usersMessage}</span>`;

  let removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", function (event) {
    let entry = event.target.parentNode;
    entry.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  messageForm.reset();
});

let repositories;

fetch("https://api.github.com/users/VictorAcuna04/repos")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    repositories = data;

    console.log(repositories);

    let projectSection = document.querySelector("#projects");
    let projectList = projectSection.querySelector("ul");

    for (let i = 0; i < repositories.length; i++) {
      let project = document.createElement("li");

      project.innerText = repositories[i].name;

      projectList.appendChild(project);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
