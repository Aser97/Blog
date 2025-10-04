document.addEventListener("DOMContentLoaded", () => {
  const ICON_COPY = `
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" opacity="0.85"></rect>
      <rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" opacity="0.55"></rect>
    </svg>`;
  const ICON_CHECK = `
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z" fill="currentColor"></path>
    </svg>`;

  document.querySelectorAll("pre").forEach((block) => {
    // avoid duplicate buttons on hot reloads
    if (block.querySelector(".copy-btn")) return;

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Copy code");
    btn.innerHTML = ICON_COPY;

    btn.addEventListener("click", () => {
      const text = block.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add("copied");
        btn.innerHTML = ICON_CHECK;
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.innerHTML = ICON_COPY;
        }, 1600);
      });
    });

    block.appendChild(btn);
  });
});
