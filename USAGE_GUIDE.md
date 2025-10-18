# 📖 Complete Usage Guide

## Table of Contents
1. [Installation](#installation)
2. [First Setup](#first-setup)
3. [How to Use](#how-to-use)
4. [Configuration](#configuration)
5. [Keyboard Shortcuts](#keyboard-shortcuts)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## 🔧 Installation

### Step 1: Download the Extension
1. Download or clone this repository to your computer
2. Extract the files to a folder (if downloaded as ZIP)

### Step 2: Enable Developer Mode
1. Open Google Chrome browser
2. Navigate to `chrome://extensions/`
3. Toggle **"Developer mode"** in the top-right corner

### Step 3: Load the Extension
1. Click **"Load unpacked"** button
2. Select the folder containing this extension
3. The extension should now appear in your extensions list

### Step 4: Verify Installation
- Look for the extension icon in your Chrome toolbar
- The extension will activate automatically on Stripe payment pages

---

## ⚙️ First Setup

### Accessing Settings

**Method 1: Extension Popup**
1. Click the extension icon in Chrome toolbar
2. Configure basic settings in the popup window

**Method 2: Options Page**
1. Right-click the extension icon
2. Select **"Options"**
3. Configure advanced settings

### Basic Configuration

1. **Set BIN Numbers** (optional)
   - Default BIN: `559888039`
   - You can add a second BIN for variety
   
2. **Configure Keyboard Shortcuts** (optional)
   - Default Generate Key: `X` (Ctrl+X)
   - Default Clear Key: `C` (Ctrl+C)

3. **Enable Extension**
   - Make sure the extension toggle is ON

---

## 🎮 How to Use

### Method 1: Keyboard Shortcuts (Recommended)

1. **Navigate to a Stripe Test Payment Page**
   - Make sure you're on a test/development Stripe checkout page
   - The extension only works on Stripe domains

2. **Generate Card Details**
   - Press `Ctrl + X` (or your custom generate key)
   - Card number, expiry, and CVV will be filled automatically
   - Name and other fields will also be populated

3. **Clear Form (if needed)**
   - Press `Ctrl + C` (or your custom clear key)
   - All form fields will be cleared

### Method 2: Floating Button

1. **Find the Floating Button**
   - A small button appears on Stripe payment pages
   - Usually positioned in the bottom-right corner

2. **Click to Generate**
   - Click the floating button
   - Card details will be filled automatically

3. **Submit the Form**
   - If auto-submit is enabled, form submits automatically
   - Otherwise, click the submit button manually

### Method 3: Extension Popup

1. **Open the Popup**
   - Click the extension icon in Chrome toolbar

2. **Generate Cards**
   - Click the "Generate" button in popup
   - Switch between BIN 1 and BIN 2 if configured

---

## ⚙️ Configuration

### BIN Settings

**What is a BIN?**
- BIN (Bank Identification Number) is the first 6-9 digits of a card
- Used to generate test cards for specific card types

**How to Configure:**
1. Open extension options
2. Enter BIN 1 (primary): e.g., `559888039`
3. (Optional) Enter BIN 2 (alternative): e.g., `424242424`
4. Save settings

### Keyboard Shortcuts

**Default Shortcuts:**
- Generate: `Ctrl + X`
- Clear: `Ctrl + C`

**Customize Shortcuts:**
1. Open extension options
2. Find "Keyboard Settings" section
3. Enter new key (single character)
   - For example: `G` for generate, `D` for delete
4. Save settings
5. New shortcuts will be `Ctrl + [Your Key]`

### Auto-Submit Feature

**Enable/Disable:**
1. Open extension options
2. Toggle "Auto Submit" checkbox
3. When enabled, form submits automatically after filling

**Recommended:**
- Keep disabled for manual review
- Enable for automated testing workflows

---

## ⌨️ Keyboard Shortcuts

### Default Shortcuts

| Action | Shortcut | Description |
|--------|----------|-------------|
| Generate Card | `Ctrl + X` | Fills form with test card data |
| Clear Form | `Ctrl + C` | Clears all form fields |

### Custom Shortcuts

You can change the default keys to any single character:
- `Ctrl + G` - Generate
- `Ctrl + F` - Fill
- `Ctrl + D` - Delete/Clear

**Note:** Always use `Ctrl + [Key]` combination to avoid conflicts with page functionality.

---

## 🔍 Troubleshooting

### Extension Not Working

**Problem:** Extension doesn't activate on payment page

**Solutions:**
1. Verify you're on a Stripe domain
2. Refresh the page (F5)
3. Check if extension is enabled in `chrome://extensions/`
4. Reload the extension

### Forms Not Filling

**Problem:** Keyboard shortcuts or button don't fill forms

**Solutions:**
1. Make sure you're on a supported Stripe page
2. Check form field names match Stripe's format
3. Try clicking on form fields first to focus them
4. Reload the page and try again

### Keyboard Shortcuts Not Working

**Problem:** Ctrl+X or Ctrl+C don't work

**Solutions:**
1. Check if other extensions conflict with shortcuts
2. Verify shortcuts in extension options
3. Make sure page has focus (click somewhere on page)
4. Try reconfiguring to different keys

### Invalid Card Numbers

**Problem:** Generated cards are rejected

**Solutions:**
1. Verify BIN number is correct
2. Make sure you're using TEST mode Stripe
3. Check if card type is supported by merchant
4. Use Stripe's official test cards: `4242424242424242`

---

## ❓ FAQ

### Q: Is this extension safe to use?
**A:** Yes, this cleaned version contains no malicious code. It does not transmit any data externally. All operations are local.

### Q: Can I use this on live/production Stripe pages?
**A:** **NO!** This is for TESTING ONLY. Use only on test/development Stripe environments.

### Q: What cards does it generate?
**A:** It generates valid test card numbers using the Luhn algorithm based on your configured BIN.

### Q: Can I configure multiple BINs?
**A:** Yes, you can configure two BINs (BIN 1 and BIN 2) and switch between them.

### Q: Does it work on other payment processors?
**A:** No, it's designed specifically for Stripe. It may not work correctly on other payment platforms.

### Q: Will my data be collected?
**A:** No. This safe version does not collect, store, or transmit any data.

### Q: Can I modify the code?
**A:** Yes! The code is clean and readable. Feel free to review and modify as needed.

### Q: What permissions does it need?
**A:** Only access to Stripe domains (`*://*.stripe.com/*`). No access to other websites.

### Q: How do I uninstall?
**A:** Go to `chrome://extensions/`, find the extension, and click "Remove".

---

## 📝 Additional Notes

### Test Card Numbers

**Stripe Official Test Cards:**
- Visa: `4242424242424242`
- Visa (debit): `4000056655665556`
- Mastercard: `5555555555554444`
- Amex: `378282246310005`

**Expiry Date:**
- Any future date (e.g., 12/25, 01/26)

**CVV:**
- Any 3-digit number (4 digits for Amex)

### Best Practices

1. **Use Only in Test Mode**
   - Never use on production systems
   - Always verify you're in test environment

2. **Review Generated Data**
   - Check card details before submitting
   - Ensure test data is appropriate

3. **Keep Extension Updated**
   - Regularly check for updates
   - Review code changes

4. **Respect Terms of Service**
   - Follow Stripe's Terms of Service
   - Use responsibly

---

## 🆘 Support

If you encounter issues:
1. Check this guide first
2. Review the code (it's clean and readable)
3. Check browser console for errors (F12)
4. Report issues on GitHub

---

**Remember: This is a TESTING tool. Use responsibly and only in test environments!**

