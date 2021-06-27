// Get Jobs when user print enter or click find job on Search Func.
document.querySelector(".button-container").addEventListener("click", () => {
  getFilterTextFindJobs();
});
document
  .querySelector(".input-container input")
  .addEventListener("keydown", (event) => {
    let text = document.querySelector("#filter-jobs").value;
    if (event.keyCode === 13 || text === "") getFilterTextFindJobs();
  });

const getFilterTextFindJobs = () => {
  let text = document.querySelector("#filter-jobs").value;
  getJobs().then((jobs) => {
    let filteredJobs = filterJobs(jobs, text.trim().toLowerCase());

    // when the user try to filter the jobs
    showJobs(filteredJobs);
  });
};

const getJobs = () => {
  // if promise fails then nothing returns
  return fetch("https://api.npoint.io/b4408f3ff00cc5f7d4db", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const temp = () => {
  fetch(
    "https://job-search4.p.rapidapi.com/simplyhired/search?query=Software%20Engineer&page=2",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6f7060b3efmsh122f3af8594763dp1e7b8ajsn7ff3f2f5bd27",
        "x-rapidapi-host": "job-search4.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

const showJobs = (jobs) => {
  const jobsContainer = document.querySelector(".jobs-container");

  let jobsHTML = "";
  console.log("Helo", jobs);
  [...jobs].forEach((job) => {
    jobsHTML += `<div class="job-tile">
      <div class="top">
          <img src="${job.logo}" alt="${job.roleName}" />
          <span class="material-icons more_horiz">more_horiz</span>
      </div>

      <div class="rolename">
          <span>${job.roleName}</span>
      </div>

      <div class="description">
          <span>${job.requirements.content}</span>
      </div>

      <div class="buttons">
          <a class="button apply-now" href="${job.applicationLink}" target="_blank">
              Apply Now
          </a>
          <a class="button">
              Message
          </a>
      </div>
  </div>`;
  });

  document.querySelector(".jobs-list h1 span").innerText = jobs.length
    ? jobs.length
    : 0;
  jobsContainer.innerHTML = jobsHTML;
};

const filterJobs = (jobs, searchText) => {
  if (searchText) {
    let filteredJobs = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText) ||
        job.type.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.requirements.intro.toLowerCase().includes(searchText) ||
        job.location.toLowerCase().includes(searchText) ||
        job.requirements.content.toLowerCase().includes(searchText)
      ) {
        return true;
      }
    });
    return filteredJobs;
  } else {
    return jobs;
  }
};

// temp();

// when the application is loaded
getJobs().then((data) => {
  showJobs(data);
});

/**
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_lrvt3krh.json"  background="transparent"  speed="2"  style="width: 100%; height: 100%;"  loop controls autoplay></lottie-player>
 */
