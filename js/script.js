var Delighters = new (function () {
  var self = this,
    dels = (this.dels = []),
    options = {
      attribute: "data-delighter",
      classNames: ["delighter", "started", "ended"],
      start: 0.75,
      end: 0.75,
      autoInit: true,
    };

  document.addEventListener("DOMContentLoaded", function () {
    if (options.autoInit) init();
  });

  function config(opts) {
    for (var name in opts) options[name] = opts[name];
  }

  function init() {
    document.addEventListener("scroll", scroll);
    var els = document.querySelectorAll("[" + options.attribute + "]");

    for (var i = 0; i < els.length; i++) {
      var el = els[i],
        def = el.getAttribute(options.attribute, 2),
        pairs = def.split(";"),
        del = {};
      del.start = options.start;
      del.end = options.end;

      for (var j = 0; j < pairs.length; j++) {
        var pair = pairs[j].split(":"),
          name = pair[0],
          val = isNaN(pair[1] * 1) ? pair[1] : pair[1] * 1;
        if (name) del[name] = val === undefined ? true : val;
      }

      del.el = el;
      del.id = dels.length;
      dels.push(del);
      el.classList.add(options.classNames[0]);
      if (del.debug) el.style.outline = "solid red 4px";
    }
    scroll();
  }

  function scroll() {
    var viewportHeight = window.innerHeight;
    for (var i = 0; i < dels.length; i++) {
      var del = dels[i],
        box = del.el.getBoundingClientRect(),
        factorStart = box.top / viewportHeight,
        factorEnd = box.bottom / viewportHeight;

      if (del.debug) {
        if (factorStart >= 0 && factorStart <= 1) {
          if (!del.startLine) {
            del.startLine = document.createElement("div");
            document.body.appendChild(del.startLine);
            del.startLine.style =
              "position:fixed;height:0;width:100%;border-bottom:dotted red 2px;top:" +
              del.start * 100 +
              "vh";
          }
        }
        if ((factorEnd < del.end || factorStart > 1) && del.startLine) {
          del.startLine.parentNode.removeChild(del.startLine);
          delete del.startLine;
        }
      }
      if (factorStart < del.start && !del.started) {
        del.started = true;
        del.el.classList.add(options.classNames[1]);
      } else if (factorStart > del.start && del.started) {
        del.started = false;
        del.el.classList.remove(options.classNames[1]);
      }
      if (factorEnd < del.end && !del.ended) {
        del.ended = true;
        del.el.classList.add(options.classNames[2]);
      } else if (factorEnd > del.end && del.ended) {
        del.ended = false;
        del.el.classList.remove(options.classNames[2]);
      }
    }
  }

  self.init = init;
  self.config = config;
})();

document.querySelector(".themetoggle").addEventListener("click", (event) => {
  event.preventDefault();
  if (localStorage.getItem("theme") === "light") {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", "light");
  }
  addlightClassToHTML();
});

function addlightClassToHTML() {
  try {
    if (localStorage.getItem("theme") === "light") {
      document.querySelector("html").classList.add("light");
      document.querySelector(".menu__link").classList.add("light");
      document
        .querySelector(".list__stories__item__link")
        .classList.add("light");
      document
        .querySelector(".list__stories__item__link")
        .classList.add("light");
      document
        .querySelector(".list__stories__item__link")
        .classList.add("light");
      document.querySelector(".themetoggle span").textContent = "dark_mode";
    } else {
      document.querySelector("html").classList.remove("light");
      document.querySelector(".menu__link").classList.remove("light");
      document
        .querySelector(".list__stories__item__link")
        .classList.remove("light");
      document
        .querySelector(".list__stories__item__link")
        .classList.remove("light");
      document
        .querySelector(".list__stories__item__link")
        .classList.remove("light");
      document.querySelector(".themetoggle span").textContent = "wb_sunny";
    }
  } catch (err) {}
}

addlightClassToHTML();
