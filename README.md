# Anki App

## Opis
Aplikacja do nauki i zarządzania kartami z pytaniami i odpowiedziami.

## Technologie
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js, PostgreSQL

**Use node 20.14.0**

## Uruchomienie

### Backend
1. Przejdź do katalogu `backend`:
    ```bash
    cd backend
    ```
2. Skonfiguruj plik `.env`:
    ```plaintext
    DB_NAME=anki_app
    DB_USER=postgres
    DB_PASSWORD=yourpassword
    DB_HOST=localhost
    PORT=3000
    ```
3. Zainstaluj zależności:
    ```bash
    npm install
    ```
4. Utwórz bazę danych w PostgreSQL:
    ```sql
    CREATE DATABASE anki_app;
    ```
5. Uruchom serwer:
    ```bash
    npm start
    ```

### Frontend
1. Przejdź do katalogu `frontend`:
    ```bash
    cd frontend
    ```
2. Otwórz plik `index.html` w przeglądarce:
   - **Visual Studio Code**: Użyj rozszerzenia **Live Server**, aby uruchomić `index.html`.
   - **WebStorm**: Kliknij prawym przyciskiem myszy na `index.html` i wybierz opcję **Run 'index.html'**.

## Testy
Aby uruchomić testy jednostkowe, użyj poniższego polecenia:
```bash
npm test
