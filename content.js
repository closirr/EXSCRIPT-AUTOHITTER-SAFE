// Безпечна версія розширення з функціональністю автозаповнення
// Видалено тільки відправку даних на зовнішні сервери

console.log('Safe Extension Loaded with Autofill functionality');

// Налаштування розширення
let settings = {
    bin1: '559888039',
    bin2: '',
    generateKey: 'x',
    clearKey: 'c',
    cardDetails: [],
    extensionEnabled: true
};

let lastGeneratedCardDetails = null;
let cardIndex = 0;
let currentBin = 'bin1';

// Безпечна функція логування (без відправки даних)
const log = (level, message, data = null) => {
    const timestamp = new Date().toLocaleString('en-GB', {
        timeZone: 'Africa/Casablanca',
        hour12: true
    });
    
    let levelText = '';
    switch(level) {
        case 1: levelText = 'INFO'; break;
        case 2: levelText = 'WARN'; break;
        case 3: levelText = 'ERROR'; break;
        case 4: levelText = 'SUCCESS'; break;
        default: levelText = 'DEBUG'; break;
    }
    
    console.log(`[${timestamp}] ${levelText}: ${message}`, data || '');
};

// Перевірка чи це сторінка оплати
const isCheckoutOrPaymentPage = () => {
    const patterns = [/^pay\./, /checkout\.stripe\.com/, /^buy\.stripe/, /checkout/i, /stripe/i];
    const isPaymentPage = patterns.some(pattern => 
        pattern.test(window.location.hostname) || pattern.test(window.location.pathname)
    );
    console.log('isCheckoutOrPaymentPage:', isPaymentPage);
    return isPaymentPage;
};

// Показ безпечних повідомлень
const showNotification = (type, title, message, customStyle = null) => {
    const duration = customStyle || type === 'success' || title.includes('Payment Page Detected') || title.includes('Card Generated') ? 7000 : 5000;
    
    const notification = document.createElement('div');
    notification.id = 'safe-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 10000;
        padding: 8px 16px;
        background-color: #f0f0f0;
        color: #333;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Arial', sans-serif;
    `;
    
    const icons = {
        'success': '✅',
        'error': '❌', 
        'warning': '🔄',
        'default': '💳'
    };
    
    const icon = icons[type] || icons['default'];
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
        <div class="notification-close">×</div>
    `;
    
    document.body.appendChild(notification);
    
    // Стилі для повідомлення
    const style = document.createElement('style');
    style.textContent = `
        .safe-notification {
            opacity: 0;
            transform: translateY(-20px);
        }
        .safe-notification.show {
            opacity: 1;
            transform: translateY(0);
        }
        .safe-notification .notification-icon {
            font-size: 24px;
            margin-right: 15px;
        }
        .safe-notification .notification-content {
            flex-grow: 1;
        }
        .safe-notification h3 {
            margin: 0 0 5px;
            font-size: 18px;
            font-weight: bold;
        }
        .safe-notification p {
            margin: 0;
            font-size: 14px;
            line-height: 1.4;
        }
        .safe-notification .notification-close {
            cursor: pointer;
            font-size: 24px;
            margin-left: 15px;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .safe-notification .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Закриття повідомлення
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    });
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, duration);
};

// Додавання кнопки генерації
const addGenerateButton = (buttonId) => {
    const button = document.createElement('button');
    button.id = buttonId;
    button.textContent = 'Generate Card';
    button.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: linear-gradient(45deg, #5D3FD3, #FFD700);
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 600;
        z-index: 9999;
        direction: rtl;
        text-align: center;
        transition: background 0.5s ease-in-out, transform 0.3s ease-in-out;
    `;
    
    document.body.appendChild(button);
    
    button.addEventListener('click', () => {
        if (settings.extensionEnabled) {
            log(1, 'Manually triggered card generation');
            button.style.opacity = '0.5';
            setTimeout(() => button.style.opacity = '1', 200);
            autoFillAndSubmit();
        } else {
            showNotification('error', 'Extension Disabled', 'Please enable the extension first.');
        }
    });
};

// Генерація деталей картки
const generateCardDetails = () => {
    if (settings.cardDetails && settings.cardDetails.length > 0) {
        const cardData = settings.cardDetails[cardIndex];
        cardIndex = (cardIndex + 1) % settings.cardDetails.length;
        const [cardNumber, month, year, cvv] = cardData.split('|');
        
        return {
            email: 'test' + Math.floor(Math.random() * 900 + 100) + '@gmail.com',
            cardNumber: cardNumber,
            expirationDate: month + '/' + year.slice(-2),
            cvv: cvv,
            cardHolderName: 'Test User',
            addressLine1: 'Test Address',
            addressLine2: 'Test Address 2',
            postalCode: '10080',
            city: 'Test City'
        };
    } else {
        const bin = settings[currentBin] || settings['bin1'];
        currentBin = currentBin === 'bin1' ? 'bin2' : 'bin1';
        const randomNum = Math.floor(Math.random() * 900 + 100);
        
        return {
            email: 'test' + randomNum + '@gmail.com',
            cardNumber: generateCardNumber(bin),
            expirationDate: generateExpirationDate(),
            cvv: Math.floor(Math.random() * 900 + 100).toString(),
            cardHolderName: 'Test User',
            addressLine1: 'Test Address',
            addressLine2: 'Test Address 2',
            postalCode: '10080',
            city: 'Test City'
        };
    }
};

// Генерація номера картки з алгоритмом Luhn
const generateCardNumber = (bin) => {
    let cardNumber = bin;
    for (let i = cardNumber.length; i < 15; i++) {
        cardNumber += Math.floor(Math.random() * 10).toString();
    }
    
    for (let i = 0; i < 10; i++) {
        if (calculateLuhnChecksum(cardNumber + i)) {
            return cardNumber + i;
        }
    }
    return cardNumber + '0';
};

// Алгоритм Luhn для валідації картки
const calculateLuhnChecksum = (cardNumber) => {
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
};

// Генерація дати закінчення
const generateExpirationDate = () => {
    const currentYear = new Date().getFullYear();
    const month = Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0');
    const year = Math.floor(Math.random() * 5) + currentYear + 1;
    return month + '/' + year.toString().slice(-2);
};

// Кешування елементів
const cachedElements = {};
const getElement = (selector) => {
    if (!cachedElements[selector]) {
        cachedElements[selector] = document.querySelector(selector);
    }
    return cachedElements[selector];
};

// Заповнення полів форми
const fillFormFields = () => {
    lastGeneratedCardDetails = generateCardDetails();
    
    const fieldMappings = {
        'input#email': lastGeneratedCardDetails.email,
        'input#cardNumber': lastGeneratedCardDetails.cardNumber,
        'input#cardExpiry': lastGeneratedCardDetails.expirationDate,
        'input#cardCvc': lastGeneratedCardDetails.cvv,
        'input#billingName': lastGeneratedCardDetails.cardHolderName,
        'input#billingAddressLine1': lastGeneratedCardDetails.addressLine1,
        'input#billingAddressLine2': lastGeneratedCardDetails.addressLine2,
        'input#billingPostalCode': lastGeneratedCardDetails.postalCode,
        'input#billingLocality': lastGeneratedCardDetails.city
    };
    
    for (const [selector, value] of Object.entries(fieldMappings)) {
        const element = getElement(selector);
        if (element) {
            simulateTyping(element, value);
        }
    }
    
    logGeneratedDetails(lastGeneratedCardDetails, settings.cardDetails && settings.cardDetails.length > 0);
};

// Симуляція набору тексту
const simulateTyping = (element, value) => {
    element.focus();
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.blur();
};

// Логування згенерованих деталей (безпечно)
const logGeneratedDetails = (details, isFromCardList = false) => {
    log(1, (isFromCardList ? 'Loaded' : 'Generated') + ' Details', details);
};

// Очищення полів форми
const clearFormFields = () => {
    const selectors = [
        'input#email',
        'input#cardNumber', 
        'input#cardExpiry',
        'input#cardCvc',
        'input#billingName',
        'input#billingAddressLine1',
        'input#billingAddressLine2',
        'input#billingPostalCode',
        'input#billingLocality'
    ];
    
    selectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.value = '';
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
};

// Автозаповнення та відправка
const autoFillAndSubmit = () => {
    if (!settings.extensionEnabled) {
        log(2, 'Extension is disabled. Cannot autofill and submit.');
        return;
    }
    
    log(1, 'Autofilling and submitting form.');
    clearFormFields();
    
    setTimeout(() => {
        fillFormFields();
        setTimeout(() => {
            clickSubscribeButton();
        }, 1000);
    }, 1000);
};

// Натискання кнопки підписки
const clickSubscribeButton = () => {
    const submitButton = document.querySelector('button[type="submit"], button.SubmitButton, #submitButton');
    
    if (submitButton && !submitButton.disabled) {
        log(1, 'Automatically clicking subscribe button...');
        submitButton.click();
        
        if (lastGeneratedCardDetails) {
            const { cardNumber, expirationDate, cvv } = lastGeneratedCardDetails;
            const [month, year] = expirationDate.split('/');
            showNotification('success', 'Card Generated', 
                'Card: ' + cardNumber + '|' + month + '|' + year + '|' + cvv);
        } else {
            showNotification('success', 'Card Generated', 'Card details not available');
        }
    } else {
        log(2, 'Subscribe button not found or is disabled.');
    }
};

// Обробка натискань клавіш
const handleKeyPress = (event) => {
    if (!settings.extensionEnabled) return;
    
    if (event.ctrlKey && event.key.toLowerCase() === settings.generateKey.toLowerCase()) {
        event.preventDefault();
        log(1, 'Manually triggered card generation');
        autoFillAndSubmit();
    } else if (event.ctrlKey && event.key.toLowerCase() === settings.clearKey.toLowerCase()) {
        event.preventDefault();
        clearFormFields();
    }
};

// Ініціалізація розширення
const initializeExtension = () => {
    log(1, 'Initializing extension');
    
    chrome.storage.sync.get({
        bin1: '559888039',
        bin2: '',
        generateKey: 'X',
        clearKey: 'C',
        cardDetails: [],
        extensionEnabled: true
    }, (result) => {
        settings = result;
        settings.extensionEnabled = result.extensionEnabled;
        
        log(1, 'Loaded settings:', settings);
        
        if (settings.extensionEnabled) {
            if (isCheckoutOrPaymentPage()) {
                addGenerateButton('generateCardButton');
                document.addEventListener('keydown', handleKeyPress);
                window.addEventListener('load', onPageLoad);
                
                log(1, 'Script loaded. Press "' + settings.generateKey + '" to generate new card details, "' + settings.clearKey + '" to clear form fields.');
                
                showNotification('default', '⚡CHECKOUT DETECTED ⚡', 'Made By Safe Extension', {
                    style: {
                        backgroundColor: '#2196F3',
                        borderRadius: '10px',
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        padding: '10px'
                    }
                });
                
                setTimeout(autoFillFields, 6000);
                addFloatingCredit();
            } else {
                log(1, 'Not a checkout or payment page. Extension features disabled.');
            }
        } else {
            log(1, 'Extension is disabled.');
        }
    });
};

// Завантаження сторінки
const onPageLoad = () => {
    log(1, 'Checkout page loaded. Ready for manual card generation.');
};

// Автозаповнення полів
const autoFillFields = () => {
    if (!settings.extensionEnabled) return;
    clearFormFields();
    setTimeout(() => {
        fillFormFields();
    }, 1000);
};

// Додавання плаваючого кредиту
const addFloatingCredit = () => {
    const creditDiv = document.createElement('div');
    creditDiv.textContent = '♠️SAFE AUTOCHECKOUTER 1.1🀄';
    creditDiv.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: linear-gradient(45deg, #5D3FD3, #FFD700);
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 600;
        z-index: 9999;
        direction: rtl;
        text-align: center;
        transition: background 0.5s ease-in-out, transform 0.3s ease-in-out;
    `;
    document.body.appendChild(creditDiv);
};

// Обробка повідомлень від background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateSettings') {
        settings = request.settings;
        log(1, 'Settings updated dynamically:', settings);
    } else if (request.action === 'toggleExtension') {
        settings.extensionEnabled = request.enabled;
        log(1, 'Extension ' + (settings.extensionEnabled ? 'enabled' : 'disabled'));
        
        if (!settings.extensionEnabled) {
            const button = document.getElementById('generateCardButton');
            if (button) button.remove();
            document.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('load', onPageLoad);
        } else {
            initializeExtension();
        }
    }
});

// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
    if (isCheckoutOrPaymentPage()) {
        onPageLoad();
        addFloatingCredit();
        
        document.addEventListener('keydown', (event) => {
            if (!settings.extensionEnabled) return;
            
            if (event.ctrlKey && event.key === 'g') {
                event.preventDefault();
                autoFillFields();
            } else if (event.ctrlKey && event.key === 'h') {
                event.preventDefault();
                clickSubscribeButton();
            }
        });
    }
});

// Запуск розширення
initializeExtension();