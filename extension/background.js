// Use 'browser' for standard Firefox WebExtension APIs
const BROWSER_API = typeof browser !== 'undefined' ? browser : chrome;
const DEFAULT_IP = '127.0.0.1';
const DEFAULT_PORT = '8000';
const API_PATH = '/api/v1/playlist';

// --- Core API Send Function ---
async function enqueue(urlToEnqueue) {
    const settings = await BROWSER_API.storage.local.get({
        mpv_ip: DEFAULT_IP,
        mpv_port: DEFAULT_PORT
    });

    const apiUrl = `http://${settings.mpv_ip}:${settings.mpv_port}${API_PATH}`;

    const payload = {
        filename: urlToEnqueue,
    };
    
    // 1. Send Fetch Request
    return fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            console.log(`[Success] Enqueued ${urlToEnqueue}`);
            return 'Success';
        } else {
            return `Error: Server returned status ${response.status}`;
        }
    })
    .catch(error => {
        return `Network Error: ${error.message}. Is server running at ${apiUrl}?`;
    });
}

// --- Notification/Feedback Function ---
function notify(title, message) {
    BROWSER_API.notifications.create({
        type: 'basic',
        iconUrl: 'icon128.png',
        title: title,
        message: message
    });
}

// --- 1. Right-Click Menu Handler ---
BROWSER_API.runtime.onInstalled.addListener(() => {
    BROWSER_API.contextMenus.create({
        id: "enqueue-link-context",
        title: "Enqueue Link to MPV",
        contexts: ["link"] // Only shows up when a link is right-clicked
    });
});

BROWSER_API.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "enqueue-link-context") {
        const result = await enqueue(info.linkUrl); // info.linkUrl is the right-clicked link
        notify("Enqueue Result", result);
    }
});


// --- 2. Action (Icon) Click Handler ---
BROWSER_API.action.onClicked.addListener(async (tab) => {
    // tab.url is the URL of the current page
    const result = await enqueue(tab.url);
    notify("Enqueue Result", result);
});
