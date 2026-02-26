chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "fetchScripts") {
    (async () => {
      const results = await Promise.all(
        msg.urls.map(async url => {
          try {
            const res = await fetch(url);
            const code = await res.text();
            return { url, code };
          } catch (err) {
            return { url, error: err.message };
          }
        })
      );
      sendResponse(results);
    })();
    return true; 
  }
});
