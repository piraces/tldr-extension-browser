// Define constants
const apiContentURL = 'https://api.github.com/repos/tldr-pages/tldr/contents/pages';
const defaultPlatform = 'common';
const pagesDirs = [defaultPlatform, "android", "linux", "osx", "sunos", "windows"];

const portCommunicationName = 'tldr-pages-comm';

const defaultContentEncoding = 'base64';

const defaultErrorResponse = '404: Not Found';
const defaultNotFoundMessageHTML = '<div class="not-found"><p class="large">😱</p><p>Page Not Found!</p><p>Submit a pull request to: <a target="_blank" href="https://github.com/tldr-pages/tldr">https://github.com/tldr-pages/tldr</a></p></div>';
const defaultSpinnerHTML = '<div id="tldr-chrome-spinner"></div>';
const defaultCopyCodeButtonText = 'Copy!';

const tooltipId = 'tldr-chrome';
const toooltipArrowId = 'tldr-chrome-arrow';

const tooltipOffset = 200;
const arrowHeight = 20;
const tooltipHeight = 195;

// Variables

let tooltip = null;
let arrow = null;
let currentContent = null;
let linkElement = null;
let currentSelectionPath = null;

// For right-click tldr search
var port = chrome.runtime.connect();
port.postMessage({ comm: portCommunicationName, data: true });
port.onMessage.addListener(function(message) {
    linkElement = null;
    if (message.comm === portCommunicationName) {
        createTooltip(defaultSpinnerHTML, true);
        if (message.data) {
            getContent(message.data);
        } else if (message.linkUrl) {
            var links = document.querySelectorAll("[href='" + message.linkUrl + "']");
            if (links && links.length > 0) {
                linkElement = getVisibleLinkIfAny(links);
                var text = linkElement ? linkElement.text : "";
                getContent(text);
            }
        } else {
            getContent("");
        }
    }
});

function getVisibleLinkIfAny(links) {
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        position = link.getBoundingClientRect();
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
            return link;
        }
    }
    return undefined;
}

async function getContent(word) {
    let result = defaultErrorResponse;
    const wordFormatted = word.toLowerCase().trim().replace(' ', '-');
    let currentDirIndex = 0;
    while (result === defaultErrorResponse && currentDirIndex < pagesDirs.length) {
        result = await searchTLDR(wordFormatted, pagesDirs[currentDirIndex]);
        currentDirIndex++;
    }
    createTooltip(result);
}

async function searchTLDR(command, platform = defaultPlatform) {
    // Fetch the content from TLDR github repo
    return fetch(`${apiContentURL}/${platform}/${command}.md`)
        .then((response) => {
            return response.json();
        })
        .then(responseText => {
            if (responseText.content && responseText.encoding == defaultContentEncoding) {
                return atob(responseText.content);
            } else {
                return defaultErrorResponse;
            }
        })
        .catch(_ => {
            return defaultErrorResponse;
        });
}

function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function createTooltip(content, isMarked = false) {
    removeTooltip();
    if (linkElement) {
        selectElementContents(linkElement);
    }

    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let rect = range.getBoundingClientRect();
    let newtop = null;
    let flip = false;

    if (rect.top === 0 && rect.bottom === 0 && rect.left === 0 && rect.right === 0 && rect.width === 0 && rect.height === 0) {
        return;
    }

    if (rect.top - tooltipOffset < 0) {
        flip = true;
    }

    if (rect.width >= 0) {

        if (tooltip) {
            tooltip.parentNode.removeChild(tooltip);
        }

        tooltip = document.createElement('div');
        tooltip.id = tooltipId;
        newtop = flip ? rect.top + rect.height + arrowHeight + window.scrollY : rect.top - tooltipOffset + window.scrollY;

        Object.assign(
            tooltip.style, {
                top: `${newtop}px`,
                left: `${rect.left}px`
            }
        );

        document.body.appendChild(tooltip);

        // Create Arrow
        arrow = document.createElement('div');
        arrow.id = toooltipArrowId;
        document.body.appendChild(arrow);

        Object.assign(
            arrow.style, {
                left: `${rect.left}px`,
                top: flip ? `${newtop - arrowHeight}px` : `${newtop + tooltipHeight}px`,
                transform: flip ? 'rotate(180deg)' : 'initial',
                height: `${arrowHeight}px`
            }
        );

        // Create markdown and append to tooltip
        let markdown = null;
        if (content.trim() === defaultErrorResponse) {
            markdown = defaultNotFoundMessageHTML;
        } else {
            if (isMarked) {
                markdown = content;
            } else {
                markdown = marked.parse(content);
            }
        }

        currentContent = markdown;

        let markdownContent = document.createElement('div');
        markdownContent.innerHTML = markdown;
        markdownContent.className += tooltipId;
        tooltip.appendChild(markdownContent);
        formatCodeInsideTooltip();
    }
}

function copyCodeToClipboard(event) {
    const codeContent = event.currentTarget.parentElement.firstElementChild.textContent;
    if (codeContent) {
        navigator.clipboard.writeText(codeContent);
    }
}

function formatCodeInsideTooltip() {
    let codeBlocks = document.querySelectorAll('#' + tooltipId + ' p > code');
    for (let i = 0; i < codeBlocks.length; i++) {
        let codeBlock = codeBlocks[i];
        let newButton = document.createElement('button');
        newButton.type = 'button';
        newButton.className = 'copy-code-button';
        newButton.innerHTML = defaultCopyCodeButtonText;
        codeBlock.parentElement.appendChild(newButton);
    }

    const buttons = document.querySelectorAll('#tldr-chrome button.copy-code-button');
    if (buttons && buttons.length > 0) {
        buttons.forEach(button => {
            button.addEventListener('click', copyCodeToClipboard);
        });
    }
}

// removes the tooltip, arrow and content
function removeTooltip() {
    if (tooltip != null) {
        tooltip.parentNode.removeChild(tooltip);
        tooltip = null;
        arrow.parentNode.removeChild(arrow);
        arrow = null;
        currentContent = null;
    }
}

// Ensures the tldr tooltip does not close if clicked on
window.onmousedown = (mouseDownEvent) => {
    let isPopup = false
    mouseDownEvent.composedPath().forEach((elementInPath) => {
        if (elementInPath.id === tooltipId) {
            isPopup = true;
        }
    })

    if (!isPopup) {
        removeTooltip();
    }
}

// Deletes the tooltip and resizes when window is resized.
window.onresize = _ => {
    let oldContent;
    if (tooltip) {
        oldContent = currentContent;
        removeTooltip();
        createTooltip(oldContent, true);
    }
}