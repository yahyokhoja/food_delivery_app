document.getElementById('add-food-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('название', document.getElementById('food-name').value);
    formData.append('цена', document.getElementById('food-price').value);
    formData.append('описание', document.getElementById('food-description').value);
    formData.append('фото', document.getElementById('food-image').files[0]);

    const response = await fetch('/api/меню', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Еда успешно добавлена');
        document.getElementById('add-food-form').reset();
    } else {
        alert('Ошибка при добавлении еды');
    }
});