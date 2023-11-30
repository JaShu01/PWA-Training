const CACHE_NAME = 'entries-cache-v1';

// Event-Listener hinzufügen, sobald das Dokument geladen ist
document.addEventListener('DOMContentLoaded', function() {
  // Beim Laden der Seite die gespeicherten Einträge anzeigen
  displayEntries();

  // Event-Listener für das Formular, um neue Kosten zu speichern
  document.getElementById('cost-entry-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Daten aus dem Formular holen
    var description = document.getElementById('description').value;
    var date = document.getElementById('date').value;
    var category = document.getElementById('category').value;
    var amount = document.getElementById('amount').value;

    // Eintrag als Objekt erstellen
    var entry = {
      description: description,
      date: date,
      category: category,
      amount: amount,
      id: Date.now() // Einzigartige ID basierend auf der aktuellen Zeit
    };

    // Eintrag im Cache speichern
    saveEntryToCache(entry);

    // Formular zurücksetzen
    document.getElementById('cost-entry-form').reset();

    // Tabelle aktualisieren
    displayEntries();
  });
});

// Funktion zum Speichern eines Eintrags im Cache
function saveEntryToCache(entry) {
  const url = new URL(`/entry/${entry.id}`, location.href);
  const response = new Response(JSON.stringify(entry), {
    headers: { 'Content-Type': 'application/json' }
  });

  caches.open(CACHE_NAME).then(cache => {
    cache.put(url, response);
  });
}

// Funktion zum Anzeigen der Einträge aus dem Cache
function displayEntries() {
  var tableBody = document.getElementById('entries-table-body');
  tableBody.innerHTML = ''; // Tabelle leeren

  caches.open(CACHE_NAME).then(cache => {
    cache.keys().then(keys => {
      keys.forEach(key => {
        cache.match(key).then(response => {
          return response.json();
        }).then(entry => {
          var row = tableBody.insertRow();
          row.insertCell(0).textContent = entry.description;
          row.insertCell(1).textContent = entry.date;
          row.insertCell(2).textContent = entry.category;
          row.insertCell(3).textContent = entry.amount;
        });
      });
    });
  });
}
