document.addEventListener('DOMContentLoaded', () => {
    // Tworzenie formularza
    const form = document.createElement('form');

    form.innerHTML = `
        <label for="date">Date:</label>
        <input type="date" id="date" name="date">
        
        <label for="cloudiness">Cloudiness (0-10):</label>
        <input type="number" id="cloudiness" name="cloudiness" min="0" max="10">
        
        <label for="moonPhase">Moon Phase:</label>
        <select id="moonPhase" name="moonPhase">
            <option value="new">New</option>
            <option value="firstQuarter">First Quarter</option>
            <option value="full">Full</option>
            <option value="lastQuarter">Last Quarter</option>
        </select>
        
        <label for="precipitation">Precipitation:</label>
        <select id="precipitation" name="precipitation">
            <option value="none">None</option>
            <option value="rain">Rain</option>
            <option value="snow">Snow</option>
        </select>
        
        <label for="fogDensity">Fog Density (0-10):</label>
        <input type="number" id="fogDensity" name="fogDensity" min="0" max="10">
        
        <button type="submit">Submit</button>
    `;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Pobieranie danych z formularza
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Wysłanie danych do backendu
        fetch('http://localhost:3000/api/sky', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                // Wyświetlenie wyniku w czytelny sposób
                displayResult(result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    document.getElementById('controls').appendChild(form);

    // Automatyczne pobieranie i wyświetlanie danych po załadowaniu strony
    fetch('http://localhost:3000/api/sky')
        .then(response => response.json())
        .then(result => {
            // Ustawienie wartości formularza na domyślne dane
            document.getElementById('date').value = result.date;
            document.getElementById('cloudiness').value = result.cloudiness;
            document.getElementById('moonPhase').value = result.moonPhase;
            document.getElementById('precipitation').value = result.precipitation;
            document.getElementById('fogDensity').value = result.fogDensity;

            // Wyświetlenie wyniku w czytelny sposób
            displayResult(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Funkcja do wyświetlania wyniku
function displayResult(data) {
    const display = document.getElementById('display');
    display.innerHTML = `
        <h2>Night Sky Conditions</h2>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Cloudiness:</strong> ${data.cloudiness}</p>
        <p><strong>Moon Phase:</strong> ${data.moonPhase}</p>
        <p><strong>Precipitation:</strong> ${data.precipitation}</p>
        <p><strong>Fog Density:</strong> ${data.fogDensity}</p>
    `;
}
