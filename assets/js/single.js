var issueContainerEl = document.querySelector("#issues-container");


var getRepoIssues = function(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    //request was successful
    fetch(apiUrl).then(function(response){
        //request was successful
        if(response.ok){
            response.json().then(function(data){
                //pass response data to dom function
                displayIssues(data);
            });
        }
        else{
            alert("There was a problem with your request!");
        }



    });

};

var displayIssues = function(issues){

    if(issues.length === 0){
        issueContainerEl.textContent = "This repo has no open issues!";
    }

    


    for(var i = 0; i<issues.length; i++){
        //creat a link element to take users to the issues on github
        var issueEL = document.createElement("a");
        issueEL.classList = "list-item flex-row justify-space-between align-center";
        issueEL.setAttribute("href", issues[i].html_url);
        issueEL.setAttribute("target", "_blank");

        //create a span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEL.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        //check if issues is an actual issue or a pull request
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull request)";
        }
        else{
            typeEl.textContent = "(Issue)";

        }
        //append to container
        issueEL.appendChild(typeEl);
        issueContainerEl.appendChild(issueEL);
    }

};

getRepoIssues("facebook/react");