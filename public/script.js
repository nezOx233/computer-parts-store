const loadButton = document.getElementById('loadButton');
const itemsList = document.getElementById('itemsList');

loadButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/items');

        if (!response.ok) {
            throw new Error('Помилка отримання даних');
        }

        const items = await response.json();

        itemsList.innerHTML = '';

        items.forEach((item) => {
            const li = document.createElement('li');

            li.textContent = `${item.id}. ${item.name}`;

            itemsList.appendChild(li);
        });

    } catch (error) {
        console.error(error);

        itemsList.innerHTML =
            '<li>Не вдалося завантажити товари.</li>';
    }
});