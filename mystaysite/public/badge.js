/**
 * MyStaySite Badge Widget
 * Usage: <script src="https://mystaysite.com/badge.js"></script>
 *
 * Options (data attributes on the script tag):
 *   data-theme="light"  — light background version (default: dark)
 *   data-position="footer" — auto-append to <footer> (default: append to body)
 */
(function () {
  var script = document.currentScript;
  var theme = (script && script.getAttribute("data-theme")) || "dark";
  var position = (script && script.getAttribute("data-position")) || "auto";

  var isLight = theme === "light";
  var textColor = isLight ? "#64748b" : "#9ca3af";
  var accentColor = isLight ? "#2563eb" : "#60a5fa";
  var borderColor = isLight
    ? "rgba(0,0,0,0.06)"
    : "rgba(255,255,255,0.08)";

  var badge = document.createElement("div");
  badge.id = "mystaysite-badge";
  badge.style.cssText =
    "text-align:center;padding:12px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;color:" +
    textColor +
    ";border-top:1px solid " +
    borderColor +
    ";";

  var svg =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.7;vertical-align:middle;margin-right:4px;"><path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>';

  badge.innerHTML =
    '<a href="https://mystaysite.com?ref=badge" target="_blank" rel="noopener" style="color:' +
    textColor +
    ";text-decoration:none;display:inline-flex;align-items:center;gap:4px;transition:color 0.2s;" +
    '" onmouseover="this.style.color=\'' +
    accentColor +
    "';this.querySelector('strong').style.color='" +
    accentColor +
    '\'" onmouseout="this.style.color=\'' +
    textColor +
    "';this.querySelector('strong').style.color='" +
    accentColor +
    "'\">" +
    svg +
    'Built by <strong style="color:' +
    accentColor +
    ';">mystaysite</strong></a>';

  function insert() {
    if (position === "footer") {
      var footer = document.querySelector("footer");
      if (footer) {
        footer.appendChild(badge);
        return;
      }
    }
    var footer = document.querySelector("footer");
    if (footer) {
      footer.appendChild(badge);
    } else {
      document.body.appendChild(badge);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insert);
  } else {
    insert();
  }
})();
