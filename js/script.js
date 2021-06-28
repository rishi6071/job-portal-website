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
  getJobs(text.trim()).then((jobs) => {
    // when the user try to filter the jobs
    showJobs(jobs);
  });
};

const getJobs = (search = "Software Engineer") => {
  // if promise fails then Testing Data will be shown
  return fetch(
    `https://job-search4.p.rapidapi.com/simplyhired/search?query=${search}&page=1`,
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
      return data.jobs;
    })
    .catch((err) => {
      console.log("ERROR");
      return err;
    });

  // https://api.npoint.io/b4408f3ff00cc5f7d4db
};

const showTestingData = () => {
  return fetch("https://api.npoint.io/b4408f3ff00cc5f7d4db", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
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
          <img src="${job.logo ? job.logo : "./img/job.png"}" alt="${
      job.title
    }" />
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

// when the application is loaded
getJobs().then((data) => {
  let testData = [];
  if (!data) {
    showTestingData().then((resData) => {
      testData = resData;
      showJobs(testData);
    });
  } else {
    showJobs(data);
  }
});
