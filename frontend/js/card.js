export function addDragFunctionality(cardElement) {
    let isDragging = false;
    let startX;

    cardElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        cardElement.style.transition = 'none';
    });

    cardElement.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const diffX = currentX - startX;
        cardElement.style.transform = `translateX(${diffX}px)`;
    });

    cardElement.addEventListener('mouseup', (e) => {
        isDragging = false;
        cardElement.style.transition = 'transform 0.3s ease';
        if (parseInt(cardElement.style.transform.replace('translateX(', '')) > 100) {
            cardElement.style.transform = 'translateX(100%)';
            setTimeout(() => {
                cardElement.remove();
            }, 300);
        } else {
            cardElement.style.transform = 'translateX(0)';
        }
    });

    cardElement.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            cardElement.style.transition = 'transform 0.3s ease';
            cardElement.style.transform = 'translateX(0)';
        }
    });
}
