# Vibium demo

This repository contains a minimal synchronous demo using Vibium's "sync bridge" API. The demo script is `hello.js` and demonstrates launching a browser, navigating, taking screenshots, finding an element, typing into it, and quitting the browser.

Official getting-started tutorial:

- https://github.com/VibiumDev/vibium/blob/main/docs/tutorials/getting-started.md

Requirements

- Node.js 18 or newer
- A GUI-enabled environment with a local Chrome (the package will download "Chrome for Testing" during postinstall unless you set `VIBIUM_SKIP_BROWSER_DOWNLOAD=1`)

Install

```powershell
npm install
npm install vibium
```

Quick run

```powershell
node hello.js
```

What `hello.js` does (current implementation)

- `const { browserSync } = require('vibium')`
- `const vibe = browserSync.launch()` — starts the clicker bridge and opens Chrome
- `vibe.go(url)` — navigates to the URL and waits for load
- `vibe.screenshot()` — captures the current page as a PNG buffer
- `vibe.find(selector)` — finds an element by CSS selector (sync bridge)
- `element.type(text)` — types into the element
- `element.click()` — clicks the element
- `vibe.quit()` — closes the browser and stops the clicker

Files produced by the demo

- `Screenshot.png` — screenshot taken after initial navigation
- `Screenshot-after-email.png` — screenshot taken after typing into `input[placeholder='Enter your email']`

Notes & Troubleshooting

- TLS/SSL handshake logs: Chromium may log TLS/SSL handshake errors such as:

	[ERROR] net\socket\ssl_client_socket_impl.cc:916 handshake failed; returned -1, SSL error code 1, net_error -101

	This indicates Chrome's network stack saw a connection reset or TLS inspection for a resource. It often does not prevent the main page from loading. Typical causes:
	- Corporate proxy or antivirus performing TLS inspection
	- Local firewall or proxy dropping connections
	- Transient network/server reset

- Debug logs: enable verbose Vibium logging for more context

```powershell
$env:VIBIUM_DEBUG='1'
node hello.js 2>&1 | Tee-Object vibium.log
```

- Hide the Chromium SSL lines from live console output (still saved to log):

```powershell
$env:VIBIUM_DEBUG='1'
node hello.js 2>&1 | Where-Object { $_ -notmatch 'ssl_client_socket_impl.cc' } | Tee-Object vibium.log
```

- Headless mode: if you prefer no visible browser window, launch with the `headless` option in `hello.js`:

```js
const vibe = browserSync.launch({ headless: true });
```

- Proxy: if your environment requires a proxy, set `HTTP_PROXY` / `HTTPS_PROXY` env vars before running.

- Clicker binary: the clicker helper is installed in `node_modules/@vibium/<platform>-<arch>/bin/clicker` (on Windows: `node_modules\@vibium\win32-x64\bin\clicker.exe`). You can run it directly to inspect behavior:

```powershell
node_modules\@vibium\win32-x64\bin\clicker.exe serve --verbose
```

If you want, I can re-run the demo here with debug capture, or edit `hello.js` further. Open an issue or read the official tutorial for deeper examples.
