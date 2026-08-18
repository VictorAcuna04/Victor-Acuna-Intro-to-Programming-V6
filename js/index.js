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
  "GitHub"
];

let skillsSection = document.querySelector("#skills");

let skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement("li");

  skill.innerText = skills[i];

  skillsList.appendChild(skill);
}
