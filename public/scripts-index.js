/* filepath: /home/yahyo/food-delivery-app/public/scripts-index.js */
async function fetchMenu() {
    const response = await fetch('/api/меню');
    const menu = await response.json();
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых элементов
    menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item col-md-4';
        menuItem.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${item.название}</h5>
                    <p class="card-text">Цена: ${item.цена} руб.</p>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });
}

fetchMenu();