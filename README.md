# MPV Remote Addon
**MPV Remote Addon** is a minimalist Firefox extension and companion to the
[https://github.com/open-dynaMIX/simple-mpv-webui](https://github.com/husudosu/mpv-remote-node) project.
It allows you to control a remote MPV instance directly from your browser. It acts as a frontend to the popular **`mpv-remote-node`** server, letting you instantly queue up YouTube videos or media links without ever leaving your browser.

-----

## Features

  * **Action Button:** Click the extension icon to **enqueue the URL of the current active tab** (e.g., the YouTube video you are watching).
  * **Context Menu:** **Right-click any link** and select **"Enqueue Link to MPV"** to add that specific link to the queue.
  * **Customizable Settings:** Easily configure the **IP address and Port** of your remote MPV server via the extension's options page.

-----

## Requirements

This extension requires a running server that exposes the compatible JSON API.

  * **MPV Remote Server:** Your target machine must be running the **`mpv-remote-node`** package.
  * **MPV Player:** A compatible MPV player must be running, ideally with the `--idle` flag.
  * **Browser:** Firefox (or any Chromium-based browser with minor adjustments).

## Setup and Installation

### 1\. MPV Server Setup

The extension is designed to communicate with the `mpv-remote-node` API on the endpoint `/api/v1/playlist`.

1.  **Install `mpv-remote-node`:**
    ```bash
    sudo npm install -g mpv-remote
    mpv-remote # Follow instructions to finalize installation
    ```
2.  **Run MPV:** Start your MPV player, ensuring it has JavaScript support and the MPV remote script is loaded:
    ```bash
    mpv --idle
    ```
3.  **Configure Port:** Ensure your MPV remote server is using the expected port (default is `8000`). This can be configured in your `mpvremote.conf` file:
    ```bash
    # ~/.config/mpv/script-opts/mpvremote.conf
    webport=8000
    # ... other options
    ```

### 2\. Addon Configuration

After installation, you can configure the target server details:
Note: Default values should work out of the box.

1.  Go to `about:addons`.
2.  Find **"MPV Remote Enqueuer"** and click **Options**.
3.  Enter the **Server IP/Hostname** (e.g., `192.168.1.50`) and **Port** (`8000`) of the machine running your MPV server.
4.  Click **Save Settings**.

-----

## Usage

  * **To Queue Current Page:** Navigate to a YouTube video and click the **extension icon** in your toolbar.
  * **To Queue a Link:** **Right-click** any media link and select **"Enqueue Link to MPV."**
