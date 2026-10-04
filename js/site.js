/*
 * Montana Institute of Sport — small progressive-enhancement helpers.
 * No dependencies, no build step, safe to leave untouched for years.
 */
(function(){
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Nav goes solid once the page scrolls past the hero */
  var heroNav = document.querySelector(".hero-content .nav");
  if (heroNav) {
    var toggleScrolled = function(){
      if ((window.scrollY || document.documentElement.scrollTop) > 40) {
        document.body.classList.add("is-scrolled");
      } else {
        document.body.classList.remove("is-scrolled");
      }
    };
    toggleScrolled();
    window.addEventListener("scroll", toggleScrolled, { passive: true });
  }

  /* Gentle fade/rise-in for content as it enters the viewport */
  var revealables = document.querySelectorAll(".reveal, .reveal-stagger");
  if (revealables.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealables.forEach(function(el){ el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      revealables.forEach(function(el){ io.observe(el); });
    }
  }

  /* Contact forms post to Web3Forms (no server of our own). Submitted with
     fetch so visitors stay on the page; falls back to a normal POST if JS is off. */
  var FALLBACK_EMAIL = "jstephenson@montanainstituteofsport.org";
  document.querySelectorAll("form[data-contact-form]").forEach(function(form){
    var status = form.querySelector(".form-status");
    var button = form.querySelector("button[type=submit]");
    var say = function(msg, kind){
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status" + (kind ? " is-" + kind : "");
    };
    form.addEventListener("submit", function(e){
      e.preventDefault();
      if (form.access_key.value.indexOf("WEB3FORMS") === 0) {
        say("Our form is being set up. Please email " + FALLBACK_EMAIL + " in the meantime.", "error");
        return;
      }
      var data = new FormData(form);
      var first = data.get("first_name") || "", last = data.get("last_name") || "";
      data.append("subject", "Website: " + (data.get("subject") || "Inquiry") + " from " + (first + " " + last).trim());
      button.disabled = true;
      say("Sending\u2026");
      fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function(r){ return r.json(); })
        .then(function(json){
          if (!json.success) throw new Error(json.message);
          form.reset();
          say("Thanks \u2014 your message is on its way. We\u2019ll be in touch soon.", "ok");
        })
        .catch(function(){
          say("Something went wrong sending your message. Please email " + FALLBACK_EMAIL + ".", "error");
        })
        .then(function(){ button.disabled = false; });
    });
  });
})();
