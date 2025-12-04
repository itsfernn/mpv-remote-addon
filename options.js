// Use 'browser' for standard Firefox WebExtension APIs
const BROWSER_API = typeof browser !== 'undefined' ? browser : chrome;

// Loads settings from storage and populates the form fields
function restoreOptions() {
    BROWSER_API.storage.local.get({
        mpv_ip: 'localhost', // Default values if nothing is stored
        mpv_port: '8000'
    }, (items) => {
        document.getElementById('mpv_ip').value = items.mpv_ip;
        document.getElementById('mpv_port').value = items.mpv_port;
    });
}

// Saves settings from the form fields to storage
function saveOptions() {
    const ip = document.getElementById('mpv_ip').value;
    const port = document.getElementById('mpv_port').value;

    BROWSER_API.storage.local.set({
        mpv_ip: ip,
        mpv_port: port
    }, () => {
        const status = document.getElementById('mpv-status-text');
        status.textContent = 'Settings saved!';
    });
}

document.getElementById('save_button').addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);
