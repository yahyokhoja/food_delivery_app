/* filepath: /home/yahyo/food-delivery-app/public/scripts.js */
document.getElementById('menu-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const название = document.getElementById('название').value;
    const цена = document.getElementById('цена').value;

    const response = await fetch('/api/меню', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ название, цена })
    });

    if (response.ok) {
        alert('Элемент меню добавлен успешно');
        document.getElementById('menu-form').reset();
        fetchMenu(); // Обновляем меню после добавления нового элемента
    } else {
        alert('Ошибка при добавлении элемента меню');
    }
});

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

document.getElementById('edit-menu-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const название = document.getElementById('edit-название').value;
    const цена = document.getElementById('edit-цена').value;

    const response = await fetch(`/api/меню/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ название, цена })
    });

    if (response.ok) {
        alert('Элемент меню обновлен успешно');
        $('#editModal').modal('hide');
        fetchMenu(); // Обновляем меню после редактирования элемента
    } else {
        alert('Ошибка при обновлении элемента меню');
    }
});

fetchMenu();