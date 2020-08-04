var dbPromised = idb.open("PanggilArtikel", 1, function(upgradeDb) {
    var teamObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    teamObjectStore.createIndex("name", "shortName", { unique: false });
  });

  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.add(team);
        return tx.complete;
      })
      .then(function() {
        console.log("data berhasil di simpan.");
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.get(id);
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }

  const dbDelete = teamId => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            const transaction = db.transaction("teams", `readwrite`);
            transaction.objectStore("teams").delete(teamId);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};