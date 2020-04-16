// append to container from html
var issuesContainerEl = document.querySelector("#issues-container");


// take in a repo name 
var getRepoIssues = function(repo) {

    // api for issues 
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // request to url 
    fetch(apiUrl).then(function(response) {
        // if request was successful 
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
    }

// displaying issues 
var displayIssues = function(issues) {
    // if there are no issues 
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!"
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // create a link to take users to the issues on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        
        // append to container 
        issueEl.appendChild(titleEl); 

        // create a type of element 
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else { 
            typeEl.textContent = "(Issue)";
        }

        // append to container 
        issueEl.appendChild(typeEl);

        // append to the page 
        issuesContainerEl. appendChild(issueEl);
    }
};


