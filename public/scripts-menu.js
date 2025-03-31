document.addEventListener('DOMContentLoaded', async () => {
    const menuContainer = document.getElementById('menu');

    try {
        const response = await fetch('/api/menu');
        const menuItems = await response.json();

        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('col-md-4', 'mb-4');
            menuItem.innerHTML = `
                <div class="card">
                    <img src="/uploads/${item.photo}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="card-text"><strong>${item.price} руб.</strong></p>
                    </div>
                </div>
            `;
            menuContainer.appendChild(menuItem);
        });
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
});