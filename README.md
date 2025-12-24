# Vibium Demo

A minimal synchronous browser automation demo using Vibium's "sync bridge" API. This repository demonstrates basic browser automation tasks including navigation, screenshots, element finding, and form interaction.

## Overview

This demo showcases Vibium's synchronous API through a simple script (`hello.js`) that:
- Launches a Chrome browser instance
- Navigates to a webpage
- Takes screenshots at different stages
- Finds and interacts with page elements
- Types text into form fields

**Official Tutorial:** [Vibium Getting Started Guide](https://github.com/VibiumDev/vibium/blob/main/docs/tutorials/getting-started.md)

## Requirements

- **Node.js** 18 or newer
- **GUI-enabled environment** with local Chrome installation
- The package automatically downloads "Chrome for Testing" during postinstall (skip with `VIBIUM_SKIP_BROWSER_DOWNLOAD=1`)

## Installation

```powershell
npm install
npm install vibium
```

## Quick Start

```powershell
node hello.js
```

## What `hello.js` Does

The demo script performs the following operations:

1. **Import & Launch**
   ```js
   const { browserSync } = require('vibium')
   const vibe = browserSync.launch()
   ```
   Starts the clicker bridge and opens Chrome

2. **Navigate**
   ```js
   vibe.go(url)
   ```
   Navigates to the specified URL and waits for page load

3. **Capture Screenshot**
   ```js
   vibe.screenshot()
   ```
   Takes a PNG screenshot of the current page

4. **Find Elements**
   ```js
   vibe.find(selector)
   ```
   Locates elements using CSS selectors

5. **Interact with Elements**
   ```js
   element.type(text)  // Types into input fields
   element.click()     // Clicks elements
   ```

6. **Cleanup**
   ```js
   vibe.quit()
   ```
   Closes the browser and stops the clicker

## Output Files

The demo generates two screenshot files:

- `Screenshot.png` — Initial page capture after navigation
- `Screenshot-after-email.png` — Capture after typing into the email input field

## Troubleshooting

### TLS/SSL Handshake Errors

Chrome may log TLS/SSL errors like:
```
[ERROR] net\socket\ssl_client_socket_impl.cc:916 handshake failed; returned -1, SSL error code 1, net_error -101
```

These typically don't prevent page loading and are often caused by:
- Corporate proxy or antivirus TLS inspection
- Local firewall or proxy dropping connections
- Transient network/server resets

### Debug Logging

Enable verbose Vibium logging for detailed diagnostics:

```powershell
$env:VIBIUM_DEBUG='1'
node hello.js 2>&1 | Tee-Object vibium.log
```

Hide SSL error lines from console output while keeping them in the log:

```powershell
$env:VIBIUM_DEBUG='1'
node hello.js 2>&1 | Where-Object { $_ -notmatch 'ssl_client_socket_impl.cc' } | Tee-Object vibium.log
```

### Headless Mode

Run without a visible browser window by modifying `hello.js`:

```js
const vibe = browserSync.launch({ headless: true });
```

### Proxy Configuration

If your environment requires a proxy, set environment variables before running:

```powershell
$env:HTTP_PROXY='http://proxy.example.com:8080'
$env:HTTPS_PROXY='http://proxy.example.com:8080'
node hello.js
```

### Clicker Binary

The clicker helper is located at:
- **Windows:** `node_modules\@vibium\win32-x64\bin\clicker.exe`
- **Other platforms:** `node_modules/@vibium/<platform>-<arch>/bin/clicker`

Run directly for inspection:

```powershell
node_modules\@vibium\win32-x64\bin\clicker.exe serve --verbose
```

## Additional Resources

- [Vibium GitHub Repository](https://github.com/VibiumDev/vibium)
- [Official Getting Started Tutorial](https://github.com/VibiumDev/vibium/blob/main/docs/tutorials/getting-started.md)
- Open an issue in the repository for support or feature requests

## License

This demo is provided as-is for educational purposes. Check the Vibium repository for its licensing terms.
