document.querySelector(".button-container").addEventListener("click", () => {
  let text = document.querySelector("#filter-jobs").value;
  getJobs().then(jobs => {
    let filteredJobs = filterJobs(jobs, text.toLowerCase());

    // when the user try to filter the jobs
    showJobs(filteredJobs);
  })
});

const getJobs = () => {
  // if promise fails then nothing returns
  return fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const showJobs = (jobs) => {
  const jobsContainer = document.querySelector(".jobs-container");

  let jobsHTML = "";
  jobs.forEach((job) => {
    jobsHTML += `<div class="job-tile">
      <div class="top">
          <img src="${job.logo}" alt="" />
          <span class="material-icons more_horiz">more_horiz</span>
      </div>

      <div class="rolename">
          <span>${job.roleName}</span>
      </div>

      <div class="description">
          <span>${job.requirements.content}</span>
      </div>

      <div class="buttons">
          <div class="button apply-now">
              Apply Now
          </div>
          <div class="button">
              Message
          </div>
      </div>
  </div>`;
  });

  document.querySelector(".jobs-list h1 span").innerText = jobs.length;
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
