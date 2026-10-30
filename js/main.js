(function () {
  var bar = document.querySelector(".progress");
  var links = Array.prototype.slice.call(document.querySelectorAll(".rail a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    if (bar && max > 0) bar.style.transform = "scaleX(" + doc.scrollTop / max + ")";
  }

  function spy() {
    if (!sections.length) return;
    var mark = 150;
    var currentId = sections[0].id;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= mark) currentId = section.id;
    });
    links.forEach(function (link) {
      var on = link.getAttribute("href") === "#" + currentId;
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  window.addEventListener("scroll", function () { onScroll(); spy(); }, { passive: true });
  onScroll();
  spy();

  var dialog = document.getElementById("lightbox");
  var shot = document.getElementById("lightbox-img");
  var caption = document.getElementById("lightbox-cap");
  if (!dialog || !shot) return;

  document.querySelectorAll("button.shot").forEach(function (button) {
    button.addEventListener("click", function () {
      var img = button.querySelector("img");
      shot.src = img.currentSrc || img.src;
      shot.alt = img.alt;
      caption.textContent = button.getAttribute("data-caption") || img.alt;
      if (typeof dialog.showModal === "function") dialog.showModal();
    });
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  var closeBtn = dialog.querySelector(".close");
  if (closeBtn) closeBtn.addEventListener("click", function () { dialog.close(); });
})();
