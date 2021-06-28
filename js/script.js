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
  // return fetch("https://api.npoint.io/b4408f3ff00cc5f7d4db", {
  //   method: "GET",
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     return data;
  //   });

  return fetch(
    "https://job-search4.p.rapidapi.com/simplyhired/search?query=Software%20Engineer&page=1",
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
      return data.jobs;
    })
    .catch((err) => {
      return err;
    });
};

const showJobs = (jobs = []) => {
  const jobsContainer = document.querySelector(".jobs-container");

  let jobsHTML = "";
  [...jobs].forEach((job) => {
    jobsHTML += `<div class="job-tile">
      <div class="top">
          <img src="./img/job.png" alt="${job.title}" />
          <span class="material-icons more_horiz">more_horiz</span>
      </div>

      <div class="rolename">
          <span>${job.title}</span>
      </div>

      <div class="companyname">
        <span>${job.company_name}</span>
      </div>

      <div class="location">
        <span>Location: ${job.location}</span>
      </div>

      <div class="description">
          <span>${job.description}</span>
      </div>

      <div class="buttons">
          <a class="button apply-now" href="${job.detail_url}" target="_blank">
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

// when the application is loaded
getJobs().then((data) => {
  showJobs(data);
});
