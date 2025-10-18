// Безпечний background script з підтримкою функціональності
console.log('Safe Background Script Loaded with functionality');

// Простий обробник повідомлень
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);
    
    if (request.action === 'ping') {
        sendResponse({status: 'safe', message: 'Extension is running safely'});
    } else if (request.action === 'updateSettings') {
        // Оновлення налаштувань без відправки даних
        chrome.storage.sync.set(request.settings, () => {
            console.log('Settings updated safely');
            sendResponse({status: 'success'});
        });
    } else if (request.action === 'toggleExtension') {
        // Перемикання розширення
        chrome.storage.sync.set({extensionEnabled: request.enabled}, () => {
            console.log('Extension toggled:', request.enabled);
            sendResponse({status: 'success'});
        });
    }
    
    return true;
});

// Простий обробник встановлення
chrome.runtime.onInstalled.addListener(() => {
    console.log('Safe extension installed');
    
    // Встановлення налаштувань за замовчуванням
    chrome.storage.sync.set({
        bin1: '559888039',
        bin2: '',
        generateKey: 'X',
        clearKey: 'C',
        cardDetails: [],
        extensionEnabled: true
    }, () => {
        console.log('Default settings saved');
    });
});

// Обробник змін налаштувань
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
        console.log('Settings changed:', changes);
        
        // Відправка повідомлення всім вкладкам про зміни
        chrome.tabs.query({}, (tabs) => {
            for (let tab of tabs) {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'updateSettings',
                    settings: changes
                }).catch(() => {
                    // Ігноруємо помилки для вкладок без content script
                });
            }
        });
    }
});