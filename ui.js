const output = document.getElementById("output");
const commentBtn = document.querySelector('[data-view="comment"]');


commentBtn.addEventListener("click", () => {
  output.innerHTML = "<div>Loading...</div>";

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "getComments" },
      results => {

        if (!results) {
          output.textContent = "No response from page";
          return;
        }

        output.innerHTML = "";

        const commentRegex = /\/\*[\s\S]*?\*\/|(^|\s)\/\/.*$/gm;

        results.forEach(file => {
          if (file.error) return;

          const comments = file.code.match(commentRegex);
          if (!comments || !comments.length) return;

          const fileBox = document.createElement("div");
          fileBox.className = "file";

          const meta = document.createElement("div");
          meta.className = "file-meta";
          meta.dataset.full = file.url;
          const short = file.url.split("/").pop();
          meta.textContent = short;


          const commentsBox = document.createElement("div");
          commentsBox.className = "comments";

          comments.forEach(c => {
            const com = document.createElement("div");
            com.className = "comment";
            com.textContent = c.trim();
            commentsBox.appendChild(com);
          });

          fileBox.appendChild(meta);
          fileBox.appendChild(commentsBox);
          output.appendChild(fileBox);
        });

        if (!output.children.length) {
          output.textContent = "No comments found.";
        }
      }
    );
  });
});

output.addEventListener("click", e => {
  const meta = e.target.closest(".file-meta");
  if (!meta) return;

  const url = meta.dataset.full;

  navigator.clipboard.writeText(url);

meta.innerHTML = "<span class='copied'>Copied!</span>";
meta.style.color = "green";



  setTimeout(() => {
    meta.textContent = url;
  }, 800);
});
document.getElementById("output").addEventListener("click", e => {
  const comment = e.target.closest(".comment");
  if (!comment) return;

  comment.classList.toggle("open");
});
