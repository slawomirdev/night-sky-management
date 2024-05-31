# Night Sky Management

## Opis
Aplikacja do zarządzania wyglądem nocnego nieba.

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
2. Zainstaluj zależności:
    ```bash
    npm install
    ```
3. Utwórz bazę danych w PostgreSQL:
    ```sql
    CREATE DATABASE sky_management;
    ```
4. Uruchom serwer:
    ```bash
    node server.js
    ```

### Frontend
1. Otwórz plik `index.html` w przeglądarce.

## Funkcje
- Wybór poziomu zachmurzenia, fazy księżyca, rodzaju opadów, poziomu gęstości mgły.
- Zarządzanie gwiazdami i konstelacjami (dodawanie, usuwanie, edycja, przeglądanie).
