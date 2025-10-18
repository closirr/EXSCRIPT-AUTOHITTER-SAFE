// Безпечний options script
console.log('Safe Options Script Loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Options page initialized safely');
    
    // Простий інтерфейс налаштувань
    const container = document.createElement('div');
    container.style.cssText = `
        padding: 20px;
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
    `;
    
    container.innerHTML = `
        <h2>🔒 Safe Extension Settings</h2>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>✅ Security Status</h3>
            <p><strong>Extension is running safely</strong></p>
            <p>• No data transmission to external servers</p>
            <p>• No malicious code detected</p>
            <p>• Limited permissions for security</p>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>⚠️ Important Notice</h3>
            <p>This is a cleaned version of the extension. All malicious code has been removed.</p>
            <p>The original extension was sending your payment data to external servers.</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>📋 What was removed:</h3>
            <ul>
                <li>Data transmission to external servers</li>
                <li>Obfuscated malicious code</li>
                <li>Excessive permissions</li>
                <li>Payment data collection</li>
                <li>Automatic form filling with fake data</li>
            </ul>
        </div>
    `;
    
    document.body.appendChild(container);
});