const username = "VictorAcuna04";
const results = document.querySelector("#results");
const status = document.querySelector("#status");
const panelKicker = document.querySelector("#panel-kicker");
const panelTitle = document.querySelector("#panel-title");
const panelDescription = document.querySelector("#panel-description");
const viewButtons = document.querySelectorAll(".view-button");

function setLoading(message) {
  status.textContent = "Loading";
  results.innerHTML = `<p class="loading">${message}</p>`;
}

function showError() {
  status.textContent = "Unavailable";
  results.innerHTML =
    '<p class="error">GitHub could not be reached right now. Please try this view again.</p>';
}

function createCard(title, description, meta, linkText, linkUrl) {
  const card = document.createElement("article");
  card.className = "result-card";

  const heading = document.createElement("h3");
  const link = document.createElement("a");
  link.href = linkUrl;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = linkText || title;
  heading.appendChild(link);

  const details = document.createElement("p");
  details.textContent = description;

  const footer = document.createElement("div");
  footer.className = "card-meta";
  footer.innerHTML = `<span>${title}</span><span>${meta}</span>`;

  card.append(heading, details, footer);
  return card;
}

function renderRepositories(repositories) {
  results.replaceChildren();

  if (repositories.length === 0) {
    results.innerHTML = '<p class="loading">No public repositories found.</p>';
    return;
  }

  repositories.forEach(function (repository) {
    const description = repository.description || "No description provided.";
    const language = repository.language || "Mixed stack";
    const card = createCard(
      "Repository",
      description,
      language,
      repository.name,
      repository.html_url,
    );
    results.appendChild(card);
  });
}

function renderActivity(events) {
  results.replaceChildren();

  if (events.length === 0) {
    results.innerHTML =
      '<p class="loading">No recent public activity found.</p>';
    return;
  }

  events.slice(0, 9).forEach(function (event) {
    const repositoryName = event.repo ? event.repo.name : "GitHub";
    const action = event.type.replace("Event", "");
    const date = new Date(event.created_at).toLocaleDateString();
    const card = createCard(
      action,
      `${action} activity in ${repositoryName}.`,
      date,
      repositoryName,
      `https://github.com/${repositoryName}`,
    );
    results.appendChild(card);
  });
}

function loadRepositories() {
  setLoading("Requesting the latest public repositories...");

  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=9`,
  )
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Repository request failed");
      }
      return response.json();
    })
    .then(function (repositories) {
      status.textContent = `${repositories.length} found`;
      renderRepositories(repositories);
    })
    .catch(showError);
}

function loadActivity() {
  setLoading("Requesting recent public activity...");

  return fetch(
    `https://api.github.com/users/${username}/events/public?per_page=9`,
  )
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Activity request failed");
      }
      return response.json();
    })
    .then(function (events) {
      status.textContent = `${events.length} found`;
      renderActivity(events);
    })
    .catch(showError);
}

function switchView(view) {
  viewButtons.forEach(function (button) {
    button.classList.toggle("active", button.dataset.view === view);
  });

  if (view === "activity") {
    panelKicker.textContent = "What is moving";
    panelTitle.textContent = "Recent activity";
    panelDescription.textContent =
      "See the latest public events from Victor's GitHub profile.";
    loadActivity();
    return;
  }

  panelKicker.textContent = "Public projects";
  panelTitle.textContent = "Repositories";
  panelDescription.textContent =
    "Browse the public repositories on Victor's GitHub profile.";
  loadRepositories();
}

viewButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    switchView(button.dataset.view);
  });
});

loadRepositories();
