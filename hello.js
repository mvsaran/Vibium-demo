const fs = require('fs');
const { browserSync } = require('vibium');

// Launch a synchronous Vibe instance via the sync bridge
const vibe = browserSync.launch();

try {
  vibe.go('https://vibium.com/');
  console.log('vibium home page opened');

  const png = vibe.screenshot();
  fs.writeFileSync('Screenshot.png', png);
  console.log('Screenshot saved');
  // Find the email input by placeholder and type into it
  const selector = "input[placeholder='Enter your email']";
  try {
    const input = vibe.find(selector);
    if (input) {
      console.log('Found input:', input.text ? input.text() : selector);
      input.type('me@example.com');
      console.log('Typed email into input');
      // Take a screenshot after typing the email
      try {
        const afterPng = vibe.screenshot();
        fs.writeFileSync('Screenshot-after-email.png', afterPng);
        console.log('Screenshot after email saved');
      } catch (sErr) {
        console.log('Failed to save screenshot after typing:', sErr.message || sErr);
      }
    } else {
      console.log('Input not found:', selector);
    }
  } catch (e) {
    console.log('Error finding/typing input:', e.message || e);
  }
} finally {
  try { vibe.quit(); } catch (e) {}
  console.log('Done!');
}
