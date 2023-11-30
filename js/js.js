const CACHE_NAME = 'entries-cache-v1';
let currentKontostand = 100; // Инициализация начального Kontostand

document.addEventListener('DOMContentLoaded', function() {
  displayEntries();

  document.getElementById('cost-entry-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var description = document.getElementById('description').value;
    var date = document.getElementById('date').value;
    var category = document.getElementById('category').value;
    var amount = parseFloat(document.getElementById('amount').value); // Преобразовать значение в число

    currentKontostand -= amount; // Вычитать сумму из текущего Kontostand

    var entry = {
      description: description,
      date: date,
      category: category,
      amount: amount,
      konto: currentKontostand, // Использовать обновленный Kontostand
      id: Date.now()
    };

    saveEntryToCache(entry);
    document.getElementById('cost-entry-form').reset();
    displayEntries();
  });
});

// ... оставшаяся часть кода без изменений


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
          row.insertCell(3).textContent = entry.konto;
        });
      });
    });
  });
}
// Registrierung des Service Workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker Registered');
    })
    .catch(function(err) {
      console.log('Service Worker Registration Failed', err);
    });
  });
}

