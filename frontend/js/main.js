import { navigate } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    const initialRoute = localStorage.getItem('numCards') ? 'study' : 'home';
    navigate(initialRoute);

    document.querySelectorAll('a[data-route]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('data-route');
            navigate(route);
        });
    });
});
