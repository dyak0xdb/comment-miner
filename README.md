# Comment Miner

**Comment Miner** is a Chrome extension that extracts code snippets and commented code blocks from web resources. Easily collect, organize, and export code for analysis or reuse.

---

## Flow Explanation
	1.	Collect JS resources: First, the extension scans all the JavaScript resources loaded on the page via the Network tab.
	2.	Make requests: It sends requests to fetch the content of each JS file.
	3.	Extract comments: Using regular expressions, it parses the fetched content and extracts all commented code blocks.
	4.	Output: The extracted comments or code snippets are then displayed or exported for further use

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dyak0xdb/comment-miner.git
````

2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right corner).
4. Click **Load unpacked** and select the `Comment Miner` folder.
5. The extension should now appear in your toolbar.

---

## Usage

1. Navigate to the page you want to extract comments from.
2. Click the **Comment Miner** extension icon.
3. The extracted commented code snippets will be displayed.
---

