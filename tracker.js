const jobs = [
    {
        id: 1,
        company: "CloudFirst Inc",
        position: "Backend Developer",
        location: "Seattle, WA",
        type: "Full-time",
        salary: "$140,000 - $190,000",
        description: "Design and maintain scalable backend systems using Python and AWS.",
        status: "all"
    },
    {
        id: 2,
        company: "Mobile First Corp",
        position: "React Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$120,000 - $160,000",
        description: "Build cross-platform mobile apps.",
        status: "all"
    },
    {
        id: 3,
        company: "WebFlow Agency",
        position: "Web Designer",
        location: "LA, CA",
        type: "Part-time",
        salary: "$80,000 - $120,000",
        description: "Create modern website designs.",
        status: "all"
    },
    {
        id: 4,
        company: "StartupXYZ",
        position: "Full Stack Engineer",
        location: "Remote",
        type: "Full-time",
        salary: "$110,000 - $150,000",
        description: "Work on scalable web apps.",
        status: "all"
    },
    {
        id: 5,
        company: "TechCorp",
        position: "Frontend Dev",
        location: "SF, CA",
        type: "Full-time",
        salary: "$130,000 - $170,000",
        description: "React & TypeScript apps.",
        status: "all"
    },
    {
          id: 6,
        company: "DataViz",
        position: "Data Specialist",
        location: "Boston",
        type: "Full-time",
        salary: "$125,000 - $165,000",
        description: "Visualize complex data.",
        status: "all"
    },
    {
        id: 7,
        company: "MegaCorp",
        position: "JS Developer",
        location: "NY",
        type: "Full-time",
        salary: "$130,000 - $170,000",
        description: "Enterprise applications.",
        status: "all"
    },
    {
        id: 8,
        company: "Innovation Labs",
        position: "UI/UX Engineer",
        location: "Austin",
        type: "Full-time",
        salary: "$110,000 - $150,000",
        description: "Create beautiful UI.",
        status: "all"
    }
];

let currrentTab = "all";

const jobsContainer = document.getElementById("jobsContainer");
const emptyState = document.getElementById("emptyState");

function renderJobs() {
    jobsContainer.innerHTML ="";

    const filtered = jobs.filter(job =>
        currrentTab === "all" ? true : job.status === currrentTab
    );

    document.getElementById("tabCount").textContent =
         filtered.length + "jobs";

    if (filtered.length === 0) {
        emptyState.classList.remove("hidden");
    }  else {
        emptyState.classList.add("hidden");
    }  

    filtered.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <button class="delete-btn" onclick="deleteJob(${job.id})">🗑</button>

            <div class="company">${job.company}</div>
            <div class="position">${job.position}</div>
            <div class="meta">${job.location} • ${job.type} • ${job.salary}</div>

            <div class="status ${job.status}">
                ${job.status === "all" ? "NOT APPLIED" : job.status.toUpperCase()}
            </div>

            <p>${job.description}</p>

            <div class="actions">
                <button class="btn btn-interview"
                    onclick="setStatus(${job.id}, 'interview')">
                    INTERVIEW
                </button>
                <button class="btn btn-rejected"
                    onclick="setStatus(${job.id}, 'rejected')">
                    REJECTED
                </button>
            </div>
        `;

        jobsContainer.appendChild(card);
    });

    updateDashboard();
}

function setStatus(id, status) {
    const job = jobs.find(j => j.id === id);
    job.status = job.status === status ? "all" : status;
    renderJobs();
}

function deleteJob(id) {
    const index =jobs.findIndex(j => j.id === id);
    jobs.splice(index, 1);
    renderJobs();
}


function updateDashboard() {
    document.getElementById("totalCount").textContent = jobs.length;
    document.getElementById("interviewCount").textContent =
        jobs.filter(j => j.status === "interview").length;
    document.getElementById("rejectedCount").textContent =
        jobs.filter(j => j.status === "rejected").length;
}

document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", function () {
        document.querySelectorAll(".tab").forEach(t =>
            t.classList.remove("active")
        );
        this.classList.add("active");
        currentTab = this.dataset.tab;
        renderJobs();
    });
});

renderJobs();

