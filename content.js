chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== "getComments") return;

  const domScripts = [...document.scripts].map(s => s.src).filter(Boolean);

  const networkScripts = performance.getEntriesByType("resource")
    .filter(r => r.initiatorType === "script")
    .map(r => r.name);

  const allScripts = [...new Set([...domScripts, ...networkScripts])];

  chrome.runtime.sendMessage(
    { type: "fetchScripts", urls: allScripts },
    results => sendResponse(results)
  );

  return true;
});
