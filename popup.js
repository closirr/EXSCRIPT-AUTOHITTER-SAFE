// Безпечний popup script з управлінням функціональністю
console.log('Safe Popup Script Loaded with controls');

let settings = {
    bin1: '559888039',
    bin2: '',
    generateKey: 'X',
    clearKey: 'C',
    cardDetails: [],
    extensionEnabled: true
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Popup initialized safely');
    
    // Завантаження налаштувань
    chrome.storage.sync.get(settings, (result) => {
        settings = result;
        updateUI();
    });
    
    // Створення інтерфейсу
    createInterface();
});

function createInterface() {
    const container = document.createElement('div');
    container.style.cssText = `
        width: 350px;
        padding: 20px;
        font-family: Arial, sans-serif;
        background: #f8f9fa;
    `;
    
    container.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #4CAF50; margin: 0;">🔒 Safe Extension</h2>
            <p style="color: #666; margin: 5px 0;">With Autofill Functionality</p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 10px; color: #333;">⚙️ Settings</h3>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Extension Status:</label>
                <label style="display: flex; align-items: center; cursor: pointer;">
                    <input type="checkbox" id="extensionToggle" style="margin-right: 8px;">
                    <span id="statusText">Enabled</span>
                </label>
            </div>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">BIN 1:</label>
                <input type="text" id="bin1" style="width: 100%; padding: 5px; border: 1px solid #ddd; border-radius: 4px;" placeholder="559888039">
            </div>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">BIN 2:</label>
                <input type="text" id="bin2" style="width: 100%; padding: 5px; border: 1px solid #ddd; border-radius: 4px;" placeholder="Optional second BIN">
            </div>
            
            <div style="margin-bottom: 10px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Generate Key:</label>
                <input type="text" id="generateKey" style="width: 100%; padding: 5px; border: 1px solid #ddd; border-radius: 4px;" placeholder="X">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Clear Key:</label>
                <input type="text" id="clearKey" style="width: 100%; padding: 5px; border: 1px solid #ddd; border-radius: 4px;" placeholder="C">
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button id="saveButton" style="flex: 1; padding: 8px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Save</button>
                <button id="resetButton" style="flex: 1; padding: 8px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Reset</button>
            </div>
        </div>
        
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px; color: #2e7d32;">✅ Security Status</h3>
            <ul style="margin: 0; padding-left: 20px; color: #2e7d32;">
                <li>No data transmission to external servers</li>
                <li>Clean, readable code</li>
                <li>Limited permissions</li>
                <li>Safe autofill functionality</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px;">
            <h3 style="margin: 0 0 10px; color: #856404;">📋 Usage</h3>
            <p style="margin: 0; color: #856404; font-size: 14px;">
                • Press <strong>Ctrl + Generate Key</strong> to autofill forms<br>
                • Press <strong>Ctrl + Clear Key</strong> to clear forms<br>
                • Click the floating button on checkout pages<br>
                • Extension works only on Stripe domains
            </p>
        </div>
    `;
    
    document.body.appendChild(container);
    
    // Додавання обробників подій
    document.getElementById('saveButton').addEventListener('click', saveSettings);
    document.getElementById('resetButton').addEventListener('click', resetSettings);
    document.getElementById('extensionToggle').addEventListener('change', toggleExtension);
    
    // Оновлення полів при зміні
    ['bin1', 'bin2', 'generateKey', 'clearKey'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateSettings);
    });
}

function updateUI() {
    document.getElementById('bin1').value = settings.bin1 || '';
    document.getElementById('bin2').value = settings.bin2 || '';
    document.getElementById('generateKey').value = settings.generateKey || 'X';
    document.getElementById('clearKey').value = settings.clearKey || 'C';
    document.getElementById('extensionToggle').checked = settings.extensionEnabled;
    document.getElementById('statusText').textContent = settings.extensionEnabled ? 'Enabled' : 'Disabled';
}

function saveSettings() {
    const newSettings = {
        bin1: document.getElementById('bin1').value.trim(),
        bin2: document.getElementById('bin2').value.trim(),
        generateKey: document.getElementById('generateKey').value.trim(),
        clearKey: document.getElementById('clearKey').value.trim(),
        extensionEnabled: document.getElementById('extensionToggle').checked
    };
    
    // Валідація
    if (!newSettings.bin1 && !newSettings.bin2) {
        showNotification('error', 'Error', 'Please enter at least one BIN');
        return;
    }
    
    if (newSettings.generateKey === newSettings.clearKey) {
        showNotification('error', 'Error', 'Generate and Clear keys must be different');
        return;
    }
    
    chrome.storage.sync.set(newSettings, () => {
        settings = newSettings;
        showNotification('success', 'Success', 'Settings saved successfully');
        
        // Відправка повідомлення всім вкладкам
        chrome.tabs.query({}, (tabs) => {
            for (let tab of tabs) {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'updateSettings',
                    settings: newSettings
                }).catch(() => {});
            }
        });
    });
}

function resetSettings() {
    const defaultSettings = {
        bin1: '559888039',
        bin2: '',
        generateKey: 'X',
        clearKey: 'C',
        cardDetails: [],
        extensionEnabled: true
    };
    
    chrome.storage.sync.set(defaultSettings, () => {
        settings = defaultSettings;
        updateUI();
        showNotification('success', 'Success', 'Settings reset to defaults');
        
        // Відправка повідомлення всім вкладкам
        chrome.tabs.query({}, (tabs) => {
            for (let tab of tabs) {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'updateSettings',
                    settings: defaultSettings
                }).catch(() => {});
            }
        });
    });
}

function toggleExtension() {
    const enabled = document.getElementById('extensionToggle').checked;
    
    chrome.storage.sync.set({extensionEnabled: enabled}, () => {
        settings.extensionEnabled = enabled;
        document.getElementById('statusText').textContent = enabled ? 'Enabled' : 'Disabled';
        
        showNotification('success', 'Success', 
            'Extension ' + (enabled ? 'enabled' : 'disabled'));
        
        // Відправка повідомлення всім вкладкам
        chrome.tabs.query({}, (tabs) => {
            for (let tab of tabs) {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'toggleExtension',
                    enabled: enabled
                }).catch(() => {});
            }
        });
    });
}

function updateSettings() {
    // Автоматичне збереження при зміні полів
    const newSettings = {
        bin1: document.getElementById('bin1').value.trim(),
        bin2: document.getElementById('bin2').value.trim(),
        generateKey: document.getElementById('generateKey').value.trim(),
        clearKey: document.getElementById('clearKey').value.trim(),
        extensionEnabled: document.getElementById('extensionToggle').checked
    };
    
    chrome.storage.sync.set(newSettings, () => {
        settings = newSettings;
    });
}

function showNotification(type, title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    notification.textContent = `${title}: ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}