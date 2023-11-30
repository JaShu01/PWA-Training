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

    // Daten im LocalStorage speichern
    var entries = JSON.parse(localStorage.getItem('entries') || '[]');
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    // Formular zurücksetzen
    document.getElementById('cost-entry-form').reset();

    // Tabelle aktualisieren
    displayEntries();
  });
});

// Funktion zum Anzeigen der Einträge in einer Tabelle
function displayEntries() {
  var entries = JSON.parse(localStorage.getItem('entries') || '[]');
  var tableBody = document.getElementById('entries-table-body');

  // Tabelle leeren
  tableBody.innerHTML = '';

  // Einträge in die Tabelle einfügen
  entries.forEach(function(entry) {
    var row = tableBody.insertRow();
    row.insertCell(0).textContent = entry.description;
    row.insertCell(1).textContent = entry.date;
    row.insertCell(2).textContent = entry.category;
    row.insertCell(3).textContent = entry.amount;
  });
}
