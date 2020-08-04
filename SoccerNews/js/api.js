const league_id = 2021;
const token = 'd3acabd0138f41f48ea2778ef6aeddf9';
const base_url = "https://api.football-data.org/v2/";
const standing_url = `${base_url}competitions/${league_id}/standings`;
const team_url = `${base_url}teams/`;

var fetchApi = url => {
  return fetch(url, 
    { 
      mode : 'cors',
      headers: {'X-Auth-Token': token }

    });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(Error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + Error);
}
//Delete saved Team
var deleteFavoriteTeam = (id, name) => {
  //Confirm Delete Bookmark ?
  var yesDelete = confirm
  if (yesDelete) {
      //Delete Team From Database
      dbDelete(id).then(function(team) { });
      getSavedTeams();
      //Display Toast
      M.toast({
          html: `Delete Succes ${name}`,
      })
  }

}

// Blok kode untuk melakukan request data json
function getKlasmen() {
  return new Promise(function(resolve, reject) {
    var standing_url = `${base_url}competitions/${league_id}/standings`;

    if ("caches" in window) {
        caches.match(standing_url).then(function(response) {
          if (response) {
            response.json().then(function(data) {
              console.log(data);
              resolve(data);
            })
            .catch(error);
          }

        });
    }
    


  fetchApi(standing_url)
    .then(status)
    .then(json)
    .then(function(data) {
      var standingsHTML =  `
              <table style="font-size:12px;" class="striped">
                <thead>
                  <h3>Klasmen</h3>
                  <tr>
                    <th colspan="3">Club</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
          `;
        data.standings["0"].table.forEach(function(item) {
          standingsHTML += `
                  <tr>
                    <td>${item.position}</td>
                    <td><a href="./team.html?id=${item.team.id}"><img style="width:25px;" src="${item.team.crestUrl}"></a></td>
                    <td><a href="./team.html?id=${item.team.id}">${item.team.name}</a></td>
                    <td>${item.playedGames}</td>
                    <td>${item.won}</td>
                    <td>${item.draw}</td>
                    <td>${item.lost}</td>
                    <td>${item.points}</td>
                  </tr>
          `;
      });
      standingsHTML += `</tbody>
              </table>`;
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
  });
}

function getTeamById() {
  return new Promise(function(resolve, reject) {

  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  var team_id_url = `${base_url}teams/${idParam}`;

  if ("caches" in window) {
      caches.match(team_id_url).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            // Menyusun komponen card artikel secara dinamis
            var teamHTML = `
              <div class="row">
                <h4 class="light center grey-text text-darken-3"><b>${data.name}</b></h4>
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

  fetchApi(team_id_url)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      console.log(data);
      // tampilkan data detail team
      var teamHTML = `
        <div class="row">
        <div class="col m5 offset-m4 s12">
        <div class="card-panel center">
          <h4 class="light center grey-text text-darken-3"><img style="width:30px;" src="${data.crestUrl}"> <b>${data.name}</b></h4>
          <p align="center">Founded : ${data.founded}<br>Club Colors : ${data.clubColors}<br>Ground : ${data.venue}</p>
          </div>
          </div>
          <div class="col m5 offset-m4 s12">
            <div class="card-panel center">
              <h5>Competitions</h5>
              <p>
                <ul>
        `;
        data.activeCompetitions.forEach(function(item) {
        teamHTML += `
                  <li>${item.name}</li>
                    `;
        });
        teamHTML += `
                  </ul>
                </p>
              </div>
            </div>
            <div class="col m5 offset-m4 s12">
            <div class="card-panel center">
              <h5>Squad</h5>
              <p>
                <ul>
                    `;
        data.squad.forEach(function(item) {
        teamHTML += `
                  <li>${item.name} (${item.position})</li>
                    `;
        });
        teamHTML += `
                </ul>
              </p>
            </div>
          </div>
        </div>
                    `;
      document.getElementById("body-content").innerHTML = teamHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);
    });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function(team) {
     
      teamsHTML  += `
                  <div class = "row">
                    <div class = "col l11 s11">
                      <div class="card center ">
                        <a href="./team.html?id=${team.id}&saved=true">
                        <div class=" waves-effect waves-teal" >
                            <img src="${team.crestUrl}" style="max-width: 200px; />
                        </div>
                        </a>
                        <div class="card-content center ">
                          <span class="card-title truncate "><h3 class= "flow-text ">${team.name}</h3></span>
                          <p>Klik logo diatas untuk mengetahui informasi lebih detail mengenai club diatas.</p>
                        </div>
                        <a class="btn-floating btn-large red btn waves-effect waves-green" onclick="deleteFavoriteTeam(${team.id},'${team.name}')">
                          <i class="large material-icons">delete</i>
                        </a>
                      </div>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML ;
    let removeButtons = document.querySelectorAll("#delete");
           for(let button of removeButtons) {
               button.addEventListener("click", function (event) {
                   let teamid = event.target.id;
                   dbDelete(teamid)
               })
           }
  });
  
}

function getSavedTeamsById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(data) {
    teamHTML = '';
    var teamHTML = `
    <div class="row">
          <h4 class="light center grey-text text-darken-3"><img style="width:30px;" src="${data.crestUrl}"> <b>${data.name}</b></h4>
          <p align="center">Founded : ${data.founded}<br>Club Colors : ${data.clubColors}<br>Ground : ${data.venue}</p>
          <div class="col m4 s12">
            <div class="card-panel center">
              <h5>Competitions</h5>
              <p>
                <ul>
  `;
  data.activeCompetitions.forEach(function(item) {
    teamHTML += `
              <li>${item.name}</li>
                `;
    });
    teamHTML += `
              </ul>
            </p>
          </div>
        </div>
        <div class="col m4 s12">
        <div class="card-panel center">
          <h5>Squad</h5>
          <p>
            <ul>
                `;
    data.squad.forEach(function(item) {
    teamHTML += `
              <li>${item.name} (${item.position})</li>
                `;
    });
    teamHTML += `
            </ul>
          </p>
        </div>
      </div>
    </div>
                `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

