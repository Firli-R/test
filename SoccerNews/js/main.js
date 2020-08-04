function standingTeams(data) {
    var html = '';
    var content = '';
    var str = JSON.stringify(data).replace(/http:/g, 'https:');
    data = JSON.parse(str);
    data.standings[0].table.forEach(function(team){
      content += `
      <tr>
      <td>${team.position}</td>
      <td style="text-align: left">${team.team.name}</td>
      <td>${team.playedGames}</td>
      <td>${team.won}</td>
      <td>${team.draw}</td>
      <td>${team.lost}</td>
      <td>${team.goalsFor}</td>
      <td>${team.goalsAgainst}</td>
      <td>${team.goalDifference}</td>
      <td><strong>${team.points}</strong></td>
      </tr>`;
    })
    html += `
    <div class="card">
      <table class="responsive-table striped">
      <thead>
        <tr>
        <th>Posisi</th>
        <th>Tim</th>
        <th>Main</th>
        <th>Menang</th>
        <th>Imbang</th>
        <th>Kalah</th>
        <th>GM</th>
        <th>GK</th>
        <th>Selisih</th>
        <th>Poin</th>
        </tr>
      </thead>
      <tbody>`+ content +`</tbody>
      </table>
    </div>`
    document.getElementById("header-title").innerHTML = "Klasemen Liga";
    document.getElementById("main-content").innerHTML = html;
  };