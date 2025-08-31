// Функция для показа экрана
function showScreen(screenId) {
    // Скрываем все экраны
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Показываем нужный экран
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Функция для начала вопросов
function startQuestions() {
    showScreen('question1');
}

// Функция для обработки ответов
function answerQuestion(questionNumber, answer) {
    if (answer === 'yes') {
        // Если ответ "Да", переходим к следующему вопросу
        if (questionNumber === 1) {
            showScreen('question2');
        } else if (questionNumber === 2) {
            showScreen('question3');
        } else if (questionNumber === 3) {
            showScreen('answer3-yes');
        }
    } else {
        // Если ответ "Нет", показываем соответствующий ответ
        if (questionNumber === 1) {
            showScreen('answer1-no');
        } else if (questionNumber === 2) {
            showScreen('answer2-no');
        } else if (questionNumber === 3) {
            // Для 3-го вопроса "Нет" - телепортируем кнопку по экрану
            teleportButton();
        }
    }
}

// Функция для телепортации кнопки "Нет" по экрану
function teleportButton() {
    const noButton = document.querySelector('#question3 .no-btn');
    if (noButton) {
        // Добавляем класс для телепортации
        noButton.classList.add('teleporting');
        
        // Создаем эффект телепортации
        createTeleportParticles();
        
        // Телепортируем кнопку в случайное место на экране
        let teleportCount = 0;
        const maxTeleports = 20;
        
        const teleportInterval = setInterval(() => {
            if (teleportCount >= maxTeleports) {
                clearInterval(teleportInterval);
                // После всех телепортаций возвращаем кнопку на место
                setTimeout(() => {
                    noButton.classList.remove('teleporting');
                    noButton.style.position = '';
                    noButton.style.left = '';
                    noButton.style.top = '';
                    noButton.style.zIndex = '';
                }, 500);
                return;
            }
            
            // Случайные координаты для телепортации с учетом границ экрана
            const buttonWidth = 200;
            const buttonHeight = 60;
            const maxX = window.innerWidth - buttonWidth;
            const maxY = window.innerHeight - buttonHeight;
            
            const randomX = Math.max(20, Math.min(maxX - 20, Math.random() * maxX));
            const randomY = Math.max(20, Math.min(maxY - 20, Math.random() * maxY));
            
            // Анимация телепортации
            noButton.style.transition = 'all 0.2s ease';
            noButton.style.left = randomX + 'px';
            noButton.style.top = randomY + 'px';
            
            // Добавляем эффект мерцания
            noButton.style.animation = 'teleportBlink 0.2s ease';
            
            // Создаем след телепортации
            createTeleportTrail(randomX + buttonWidth/2, randomY + buttonHeight/2);
            
            teleportCount++;
        }, 200);
    }
}



// Функция для создания частиц телепортации
function createTeleportParticles() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'teleport-particle';
            particle.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: linear-gradient(45deg, #6c5ce7, #a29bfe);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat 2s ease-out forwards;
            `;
            
            container.appendChild(particle);
            
            // Удаляем частицу после анимации
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Функция для создания следа телепортации
function createTeleportTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'teleport-trail';
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #e17055, #d63031);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: trailFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    // Удаляем след через анимацию
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 1000);
}

// Функция для перезапуска
function restart() {
    showScreen('welcome');
}

// Добавляем CSS для частиц телепортации
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-100px);
        }
    }
    
    .teleport-particle {
        box-shadow: 0 0 10px rgba(108, 92, 231, 0.8);
    }
`;
document.head.appendChild(style);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем эффект появления для первого экрана
    const welcomeScreen = document.getElementById('welcome');
    if (welcomeScreen) {
        welcomeScreen.classList.add('active');
    }
});

// Добавляем звуковые эффекты (опционально)
function playSound(type) {
    // Здесь можно добавить звуковые эффекты
    // Например, для ответов "Да" и "Нет"
    console.log(`Playing sound: ${type}`);
}

// Улучшенная функция для ответов с звуком
function answerQuestionWithSound(questionNumber, answer) {
    // Воспроизводим звук
    if (answer === 'yes') {
        playSound('positive');
    } else {
        playSound('negative');
    }
    
    // Вызываем основную функцию
    answerQuestion(questionNumber, answer);
}

// Добавляем анимацию для кнопок при наведении
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function() {
            // Добавляем эффект нажатия
            this.style.transform = 'translateY(1px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 150);
        });
    });
});
