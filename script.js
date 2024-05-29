let balance = 0;
let multiTapLevel = 1;
let investLevel = 0;

const balanceElement = document.getElementById("balance");
const clickButton = document.getElementById("clickButton");
const upgradeButton = document.getElementById("upgradeButton");
const upgradeModal = document.getElementById("upgradeModal");
const modalContent = document.querySelector(".modal-content");
const closeButton = document.getElementsByClassName("close")[0];
const multiTapButton = document.getElementById("multiTap");
const investButton = document.getElementById("invest");

// Функция для обновления баланса
function updateBalance() {
    balanceElement.textContent = `${balance.toLocaleString()}$`;
}

// Функция для пассивного дохода
function passiveIncome() {
    setInterval(() => {
        balance += investLevel * 10;
        updateBalance();
    }, 10000);
}

// Добавляем визуальный отклик и вибрацию на кнопки с использованием Vibrate.js
function addPressEffect(button) {
    $(button).on('touchstart mousedown', function() {
        $(this).addClass('pressed');
        // Вибрация при касании/нажатии
        $.vibrate([50]);
    });

    $(button).on('touchend mouseup mouseleave', function() {
        $(this).removeClass('pressed');
    });
}

clickButton.addEventListener('click', (event) => {
    balance++;
    updateBalance();
    createCoinAnimation(event.clientX, event.clientY); // Передаем координаты места нажатия
});

function updateBalance() {
    balanceAmount.textContent = balance;
}

function createCoinAnimation(x, y) {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.textContent = '+1';

    // Устанавливаем координаты монетки
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;

    document.body.appendChild(coin);

    setTimeout(() => {
        coin.remove();
    }, 1000); // Время анимации (в миллисекундах)
}

// Применяем визуальный отклик ко всем кнопкам
addPressEffect(clickButton);
addPressEffect(upgradeButton);
addPressEffect(multiTapButton);
addPressEffect(investButton);

// Обработчики событий для кликов
clickButton.addEventListener("click", () => {
    balance += multiTapLevel;
    updateBalance();
});

upgradeButton.addEventListener("click", () => {
    upgradeModal.classList.add("show");
    modalContent.classList.add("show");
});

closeButton.addEventListener("click", () => {
    upgradeModal.classList.remove("show");
    modalContent.classList.remove("show");
});

multiTapButton.addEventListener("click", () => {
    if (balance >= 100) {
        balance -= 100;
        multiTapLevel++;
        updateBalance();
    } else {
        alert("Not enough balance!");
    }
});

investButton.addEventListener("click", () => {
    if (balance >= 100) {
        balance -= 100;
        investLevel++;
        updateBalance();
    } else {
        alert("Not enough balance!");
    }
});

// Получаем все кнопки на странице
const allButtons = document.querySelectorAll('button');

// Добавляем обработчик событий для каждой кнопки
allButtons.forEach(button => {
    button.addEventListener('touchstart', function(event) {
        // Предотвращаем действие браузера по умолчанию
        event.preventDefault();
        // Симулируем клик на кнопке
        button.click();
    });
});

// Запускаем пассивный доход
passiveIncome();
