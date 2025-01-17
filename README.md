# tldr pages browser extension
[![Generate artifacts to publish](https://github.com/piraces/tldr-extension-browser/actions/workflows/artifacts-zip.yml/badge.svg)](https://github.com/piraces/tldr-extension-browser/actions/workflows/artifacts-zip.yml)


📚 A browser extension for [tldr-pages](https://github.com/tldr-pages/tldr).

![Dark theme gif](assets/gifs/extension-dark.gif)

# Download

**Get the extension:**
- For Edge: [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tldr-pages/hbplonhehblpcghgkhnjepdbohbpkoak)
- For Chrome: [in the Chrome Store](https://chrome.google.com/webstore/detail/tldr-pages/fcccijijdgmmcjnifgdhcmepnkcdingf).
- For Firefox: [Firefox Browser Add-ons](https://addons.mozilla.org/es/firefox/addon/tldr-pages/).

# Watch it!

## Dark theme:
![Dark theme gif](assets/gifs/extension-dark.gif)
![Dark theme tooltip screenshot](assets/screenshots/dark-tooltip.png)

## Light theme:
![Dark theme gif](assets/gifs/extension-light.gif)
![Light theme tooltip screenshot](assets/screenshots/light-tooltip.png)

# How it works

-  Highlight and right click a command on your webpage and select `tldr-pages` in the drop down - a tooltip should appear with information fetched from [tldr-pages](https://github.com/tldr-pages/tldr).


# Development

## Loading Extension for development

- The extension is yet to be released to the chrome webstore.
- Ensure you compile styles and install the needed libraries running the following commands:
```bash
npm i
npm run process-styles
```
- To load the extension, download the repository and open the extension preferences in Chrome/Chromium based browsers (go to `chrome://extensions`). Click the box marked as `Developer mode` and click the button `Load unpacked extension...` after which you can navigate to the project directory and load tldr-pages.

## Contribute

👷‍♂️ There is **[work in progress](https://github.com/piraces/tldr-extension-browser/projects/1) for this extension**

**Feel free to contribute 😀!!**

# License

MIT License

Copyright (c) 2017 Tom Hill

Modifications to the theme and codebase Copyright (c) 2021 Raúl Piracés @piraces_

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
