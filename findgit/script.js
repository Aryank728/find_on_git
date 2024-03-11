$(document).ready(function () {
    $("#searchUser").on('keyup', function (e) {
        let username = e.target.value;

        //make request to github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: 'f29f787e615819790e76',
                client_secret: 'bd4a64413fef10bf4b0b90ac77d52bb7aaff6a24'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: 'f29f787e615819790e76',
                    client_secret: 'bd4a64413fef10bf4b0b90ac77d52bb7aaff6a24',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
                        <div class="well">
                        <div class="row">
                        <div class="col-md-7">
                          <strong>${repo.name}</strong>: ${repo.description}
                        </div>
                        <div class="col-md-3">
                          <span style="background-color: #007bff;" class="badge">Forks: ${repo.forks_count}</span>
                          <span style="background-color: #6c757d;" class="badge">Watchers: ${repo.watchers_count}</span>
                          <span style="background-color: #28a745;" class="badge">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                          <a href="${repo.html_url}" target="_blank" style="background-color: #dc3545;" class="badge">View Repo</a>
                        </div>
                      </div>
                        </div>
                    `);
                });                
            });
            $('#profile').html(`
            <div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">${user.name}</h3>
  </div>
  <div class="panel-body">
    <div class="row">
    <div class="col-md-3">
    <img class="thumbnail avatar" src="${user.avatar_url}">
    <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
    </div>
    <div class="col-md-9">
    <span style="background-color: #007bff;" class="badge">Public Repos: ${user.public_repos}</span>
    <span style="background-color: #6c757d;" class="badge">Public Gists: ${user.public_gists}</span>
    <span style="background-color: #28a745;" class="badge">Followers: ${user.followers}</span>
    <span style="background-color: #dc3545;" class="badge">Following: ${user.following}</span>
    <br><br>

    <ul class="list-group">
    <li class="list-group-item">Company: ${user.company}</li>
    <li class="list-group-item">Website/Blog: ${user.blog}</li>
    <li class="list-group-item">Location: ${user.location}</li>
    <li class="list-group-item">Member Since: ${user.created_at}</li>
    </ul>
        </div>
      </div>
  </div>
</div>
    
    <h3 class="card-title">Latest Repos</h3>
    <div id="repos"></div>
            `);
        })
    });
});