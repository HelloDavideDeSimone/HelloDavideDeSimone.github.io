import { ViteSSG } from "vite-ssg";
import { defineComponent, computed, useSSRContext, mergeProps, ref, onMounted, onUnmounted, resolveComponent, withCtx, createTextVNode, toDisplayString, watch, createVNode, resolveDynamicComponent, createBlock, openBlock, nextTick, reactive } from "vue";
import { useStore, createStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useI18n, createI18n } from "vue-i18n";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderVNode, ssrRenderStyle } from "vue/server-renderer";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$o = defineComponent({
  name: "LanguageToggle",
  setup() {
    const store2 = useStore();
    const i18n2 = useI18n();
    const currentLanguage = computed(() => store2.getters.currentLanguage);
    const toggleLanguage = () => {
      const newLang = currentLanguage.value === "it" ? "en" : "it";
      store2.dispatch("changeLanguage", newLang);
      i18n2.locale.value = newLang;
    };
    return {
      currentLanguage,
      toggleLanguage
    };
  }
});
function _sfc_ssrRender$o(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "language-toggle" }, _attrs))} data-v-2c4b6a51><button class="language-btn"${ssrRenderAttr("title", _ctx.currentLanguage === "en" ? "Switch to Italian" : "Switch to English")} data-v-2c4b6a51><span class="language-icon" data-v-2c4b6a51>${ssrInterpolate(_ctx.currentLanguage === "en" ? "🇬🇧" : "🇮🇹")}</span><span class="language-code" data-v-2c4b6a51>${ssrInterpolate(_ctx.currentLanguage.toUpperCase())}</span></button></div>`);
}
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/LanguageToggle.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const LanguageToggle = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["ssrRender", _sfc_ssrRender$o], ["__scopeId", "data-v-2c4b6a51"]]);
const _sfc_main$n = defineComponent({
  name: "TheNavbar",
  components: {
    LanguageToggle
  },
  setup() {
    const scrolled = ref(false);
    const navOpen = ref(false);
    const activeSection = ref("home");
    const navItems = [
      { label: "nav.home", section: "/#home" },
      { label: "nav.about", section: "/#about" },
      { label: "nav.skills", section: "/#skills" },
      { label: "nav.experience", section: "/#experience" },
      // Projects è l'unico che deve rimanere con il percorso separato
      { label: "nav.projects", section: "/projects" },
      { label: "nav.contact", section: "/#contact" }
    ];
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        scrolled.value = window.scrollY > 50;
      }
    };
    const toggleNav = () => {
      navOpen.value = !navOpen.value;
      if (typeof window !== "undefined") {
        if (navOpen.value) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      }
    };
    const closeNav = () => {
      navOpen.value = false;
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
    const checkActiveSection = () => {
      if (typeof window !== "undefined") {
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute("id");
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            activeSection.value = sectionId;
          }
        });
      }
    };
    const handleClickOutside = (event) => {
      if (navOpen.value && !event.target.closest(".navbar-nav") && !event.target.closest(".navbar-toggler")) {
        closeNav();
      }
    };
    onMounted(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("scroll", checkActiveSection);
        document.addEventListener("click", handleClickOutside);
      }
      handleScroll();
      checkActiveSection();
    });
    onUnmounted(() => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("scroll", checkActiveSection);
        document.removeEventListener("click", handleClickOutside);
      }
    });
    return {
      scrolled,
      navOpen,
      navItems,
      activeSection,
      toggleNav,
      closeNav
    };
  }
});
function _sfc_ssrRender$n(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_LanguageToggle = resolveComponent("LanguageToggle");
  _push(`<header${ssrRenderAttrs(mergeProps({
    class: ["navbar", { "scrolled": _ctx.scrolled, "nav-open": _ctx.navOpen }]
  }, _attrs))} data-v-1676841f><div class="container navbar-container" data-v-1676841f><div class="navbar-logo" data-v-1676841f><a href="/#home" class="logo" data-v-1676841f><span data-v-1676841f>&lt;</span>DavideDeSimone<span data-v-1676841f>/&gt;</span></a></div><div class="navbar-right" data-v-1676841f><nav class="${ssrRenderClass([{ "active": _ctx.navOpen }, "navbar-nav"])}" data-v-1676841f><ul data-v-1676841f><!--[-->`);
  ssrRenderList(_ctx.navItems, (item) => {
    _push(`<li data-v-1676841f><a${ssrRenderAttr("href", item.section)} class="${ssrRenderClass({ "active": _ctx.activeSection === item.section.substring(1) })}" data-v-1676841f>${ssrInterpolate(_ctx.$t(item.label))}</a></li>`);
  });
  _push(`<!--]--></ul></nav>`);
  _push(ssrRenderComponent(_component_LanguageToggle, { class: "language-toggle" }, null, _parent));
  _push(`<div class="navbar-toggler" data-v-1676841f><span data-v-1676841f></span><span data-v-1676841f></span><span data-v-1676841f></span></div></div></div></header>`);
}
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/TheNavbar.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const TheNavbar = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["ssrRender", _sfc_ssrRender$n], ["__scopeId", "data-v-1676841f"]]);
const _sfc_main$m = defineComponent({
  name: "TheFooter",
  setup() {
    const store2 = useStore();
    const openCookieSettings = () => {
      store2.commit("setShowCookieSettings", true);
    };
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    return {
      openCookieSettings,
      currentYear
    };
  }
});
function _sfc_ssrRender$m(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-91e25671><div class="container" data-v-91e25671><div class="footer-content" data-v-91e25671><div class="footer-logo" data-v-91e25671><span data-v-91e25671>&lt;</span>DavideDeSimone<span data-v-91e25671>/&gt;</span></div><div class="footer-links" data-v-91e25671><div class="social-links" data-v-91e25671><a target="_blank" href="https://github.com/hellodavidedesimone" aria-label="GitHub" data-v-91e25671><i class="fab fa-github" data-v-91e25671></i></a><a target="_blank" href="https://www.linkedin.com/in/hellodavidedesimone/" aria-label="LinkedIn" data-v-91e25671><i class="fab fa-linkedin" data-v-91e25671></i></a><a target="_blank" href="https://wa.me/393757386393" aria-label="Whatsapp" data-v-91e25671><i class="fab fa-whatsapp" data-v-91e25671></i></a><a target="_blank" href="mailto:info@davidedesimone.dev" aria-label="Email" data-v-91e25671><i class="fas fa-envelope" data-v-91e25671></i></a></div></div></div><div class="footer-links-bottom" data-v-91e25671>`);
  _push(ssrRenderComponent(_component_router_link, { to: "/privacy-policy" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("footer.privacyPolicy"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("footer.privacyPolicy")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_router_link, { to: "/cookie-policy" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("footer.cookiePolicy"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("footer.cookiePolicy")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<a href="#" data-v-91e25671>${ssrInterpolate(_ctx.$t("footer.cookieSettings"))}</a></div><div class="footer-bottom" data-v-91e25671><p data-v-91e25671>© ${ssrInterpolate(_ctx.currentYear)} Davide De Simone. ${ssrInterpolate(_ctx.$t("footer.allRightsReserved"))}</p></div></div></footer>`);
}
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/TheFooter.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const TheFooter = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["ssrRender", _sfc_ssrRender$m], ["__scopeId", "data-v-91e25671"]]);
const _sfc_main$l = defineComponent({
  name: "CircuitAnimation",
  setup() {
    const circuitContainer = ref(null);
    let animationFrameId = null;
    let nodes = [];
    let lines = [];
    let pulses = [];
    const nodeCount = 20;
    const maxConnections = 2;
    const pulseCount = 3;
    const pulseSpeed = 1.5;
    const randomPosition = (containerWidth, containerHeight) => {
      return {
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight
      };
    };
    const distance = (p1, p2) => {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };
    const createNodes = (container) => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      for (let i = 0; i < nodeCount; i++) {
        const nodePos = randomPosition(width, height);
        const node = document.createElement("div");
        node.className = "circuit-node";
        node.style.left = `${nodePos.x}px`;
        node.style.top = `${nodePos.y}px`;
        container.appendChild(node);
        nodes.push({
          element: node,
          x: nodePos.x,
          y: nodePos.y,
          connections: []
        });
      }
    };
    const createLines = (container) => {
      nodes.forEach((node) => {
        const others = [...nodes].filter((n) => n !== node);
        others.sort((a, b) => {
          return distance(node, a) - distance(node, b);
        });
        const connectTo = others.slice(0, maxConnections);
        connectTo.forEach((targetNode) => {
          if (!node.connections.includes(targetNode) && !targetNode.connections.includes(node)) {
            node.connections.push(targetNode);
            const dist = distance(node, targetNode);
            const angle = Math.atan2(targetNode.y - node.y, targetNode.x - node.x);
            const line = document.createElement("div");
            line.className = "circuit-line";
            line.style.left = `${node.x}px`;
            line.style.top = `${node.y}px`;
            line.style.width = `${dist}px`;
            line.style.transform = `rotate(${angle}rad)`;
            container.appendChild(line);
            lines.push({
              element: line,
              start: node,
              end: targetNode,
              distance: dist
            });
          }
        });
      });
    };
    const createPulses = (container) => {
      for (let i = 0; i < pulseCount; i++) {
        setTimeout(() => {
          const randomLine = lines[Math.floor(Math.random() * lines.length)];
          const pulse = document.createElement("div");
          pulse.className = "circuit-pulse";
          pulse.style.left = `${randomLine.start.x}px`;
          pulse.style.top = `${randomLine.start.y}px`;
          container.appendChild(pulse);
          pulses.push({
            element: pulse,
            line: randomLine,
            progress: 0,
            speed: 0.5 + Math.random() * pulseSpeed
          });
        }, i * 2e3);
      }
    };
    const updatePulses = () => {
      pulses.forEach((pulse, index) => {
        pulse.progress += pulse.speed / pulse.line.distance;
        if (pulse.progress >= 1) {
          pulse.element.remove();
          pulses.splice(index, 1);
          const randomLine = lines[Math.floor(Math.random() * lines.length)];
          const newPulse = document.createElement("div");
          newPulse.className = "circuit-pulse";
          newPulse.style.left = `${randomLine.start.x}px`;
          newPulse.style.top = `${randomLine.start.y}px`;
          circuitContainer.value.appendChild(newPulse);
          pulses.push({
            element: newPulse,
            line: randomLine,
            progress: 0,
            speed: 0.5 + Math.random() * pulseSpeed
          });
        } else {
          const x = pulse.line.start.x + (pulse.line.end.x - pulse.line.start.x) * pulse.progress;
          const y = pulse.line.start.y + (pulse.line.end.y - pulse.line.start.y) * pulse.progress;
          pulse.element.style.left = `${x}px`;
          pulse.element.style.top = `${y}px`;
        }
      });
    };
    const animate = () => {
      updatePulses();
      animationFrameId = requestAnimationFrame(animate);
    };
    const initCircuit = () => {
      if (!circuitContainer.value) return;
      circuitContainer.value.innerHTML = "";
      nodes = [];
      lines = [];
      pulses = [];
      createNodes(circuitContainer.value);
      createLines(circuitContainer.value);
      createPulses(circuitContainer.value);
      animate();
    };
    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      initCircuit();
    };
    onMounted(() => {
      initCircuit();
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    });
    return {
      circuitContainer
    };
  }
});
function _sfc_ssrRender$l(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "circuit-background",
    ref: "circuitContainer"
  }, _attrs))} data-v-cb3a46c9></div>`);
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CircuitAnimation.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const CircuitAnimation = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$l], ["__scopeId", "data-v-cb3a46c9"]]);
const _sfc_main$k = defineComponent({
  name: "CookieConsent",
  setup() {
    const store2 = useStore();
    const consentGiven = computed(() => store2.state.cookieConsent.consentGiven);
    const showSettings = ref(false);
    const analyticsEnabled = ref(false);
    onMounted(() => {
      const savedConsent = localStorage.getItem("cookieConsent");
      if (savedConsent) {
        const consent = JSON.parse(savedConsent);
        store2.commit("setCookieConsent", {
          consentGiven: true,
          analytics: consent.analytics
        });
        if (consent.analytics) {
          enableAnalytics();
        }
      }
    });
    const acceptAll = () => {
      const consent = { consentGiven: true, analytics: true };
      saveConsent(consent);
      enableAnalytics();
    };
    const acceptEssential = () => {
      const consent = { consentGiven: true, analytics: false };
      saveConsent(consent);
    };
    const saveSettings = () => {
      const consent = { consentGiven: true, analytics: analyticsEnabled.value };
      saveConsent(consent);
      showSettings.value = false;
      if (analyticsEnabled.value) {
        enableAnalytics();
      }
    };
    const saveConsent = (consent) => {
      localStorage.setItem("cookieConsent", JSON.stringify(consent));
      store2.commit("setCookieConsent", consent);
    };
    const enableAnalytics = () => {
      store2.dispatch("initializeAnalytics");
    };
    return {
      consentGiven,
      showSettings,
      analyticsEnabled,
      acceptAll,
      acceptEssential,
      saveSettings
    };
  }
});
function _sfc_ssrRender$k(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if (!_ctx.consentGiven) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "cookie-consent" }, _attrs))} data-v-58c140a6><div class="cookie-content" data-v-58c140a6><div class="cookie-text" data-v-58c140a6><h3 data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.title"))}</h3><p data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.message"))}</p></div><div class="cookie-buttons" data-v-58c140a6><button class="btn-accept" data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.acceptAll"))}</button><button class="btn-essential" data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.essential"))}</button><button class="btn-settings" data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.settings"))}</button></div></div>`);
    if (_ctx.showSettings) {
      _push(`<div class="cookie-settings" data-v-58c140a6><div class="settings-header" data-v-58c140a6><h3 data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.settingsTitle"))}</h3><button class="btn-close" data-v-58c140a6>×</button></div><div class="settings-content" data-v-58c140a6><div class="cookie-option" data-v-58c140a6><div class="option-header" data-v-58c140a6><h4 data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.essential"))}</h4><label class="switch" data-v-58c140a6><input type="checkbox" checked disabled data-v-58c140a6><span class="slider" data-v-58c140a6></span></label></div><p data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.essentialDesc"))}</p></div><div class="cookie-option" data-v-58c140a6><div class="option-header" data-v-58c140a6><h4 data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.analytics"))}</h4><label class="switch" data-v-58c140a6><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(_ctx.analyticsEnabled) ? ssrLooseContain(_ctx.analyticsEnabled, null) : _ctx.analyticsEnabled) ? " checked" : ""} data-v-58c140a6><span class="slider" data-v-58c140a6></span></label></div><p data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.analyticsDesc"))}</p></div></div><div class="settings-footer" data-v-58c140a6><button class="btn-save" data-v-58c140a6>${ssrInterpolate(_ctx.$t("cookieConsent.save"))}</button></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CookieConsent.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const CookieConsent = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["ssrRender", _sfc_ssrRender$k], ["__scopeId", "data-v-58c140a6"]]);
const _sfc_main$j = defineComponent({
  name: "CookieSettings",
  setup() {
    const store2 = useStore();
    const showCookieSettings = computed(() => store2.state.showCookieSettings);
    const analyticsEnabled = ref(store2.state.cookieConsent.analytics);
    const closeSettings = () => {
      store2.commit("setShowCookieSettings", false);
    };
    const saveSettings = () => {
      const consent = { consentGiven: true, analytics: analyticsEnabled.value };
      saveConsent(consent);
      if (analyticsEnabled.value) {
        store2.dispatch("initializeAnalytics");
      }
      closeSettings();
    };
    const saveConsent = (consent) => {
      localStorage.setItem("cookieConsent", JSON.stringify(consent));
      store2.commit("setCookieConsent", consent);
    };
    return {
      showCookieSettings,
      analyticsEnabled,
      closeSettings,
      saveSettings
    };
  }
});
function _sfc_ssrRender$j(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if (_ctx.showCookieSettings) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "cookie-settings-modal" }, _attrs))} data-v-3949a05a><div class="modal-content" data-v-3949a05a><div class="modal-header" data-v-3949a05a><h3 data-v-3949a05a>${ssrInterpolate(_ctx.$t("cookieConsent.settingsTitle"))}</h3><button class="btn-close" data-v-3949a05a>×</button></div><div class="modal-body" data-v-3949a05a><div class="cookie-option" data-v-3949a05a><div class="option-header" data-v-3949a05a><h4 data-v-3949a05a>${ssrInterpolate(_ctx.$t("cookieConsent.essential"))}</h4><label class="switch" data-v-3949a05a><input type="checkbox" checked disabled data-v-3949a05a><span class="slider" data-v-3949a05a></span></label></div><p data-v-3949a05a>${ssrInterpolate(_ctx.$t("cookieConsent.essentialDesc"))}</p></div><div class="cookie-option" data-v-3949a05a><div class="option-header" data-v-3949a05a><h4 data-v-3949a05a>${ssrInterpolate(_ctx.$t("cookieConsent.analytics"))}</h4><label class="switch" data-v-3949a05a><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(_ctx.analyticsEnabled) ? ssrLooseContain(_ctx.analyticsEnabled, null) : _ctx.analyticsEnabled) ? " checked" : ""} data-v-3949a05a><span class="slider" data-v-3949a05a></span></label></div><p data-v-3949a05a>${ssrInterpolate(_ctx.$t("cookieConsent.analyticsDesc"))}</p></div></div><div class="modal-footer" data-v-3949a05a><button class="btn-save" data-v-3949a05a>${ssrInterpolate(_ctx.$t("cookieConsent.save"))}</button></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CookieSettings.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const CookieSettings = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["ssrRender", _sfc_ssrRender$j], ["__scopeId", "data-v-3949a05a"]]);
const _sfc_main$i = {
  name: "MessageSentModal",
  data() {
    return {
      messageSentTo: false
    };
  },
  created() {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const queryString = hash.includes("?") ? hash.substring(hash.indexOf("?") + 1) : "";
      const params = new URLSearchParams(queryString);
      const messageSent = params.get("messageSent");
      if (messageSent) {
        this.messageSentTo = messageSent;
      }
    }
  },
  methods: {
    closeModal() {
      this.messageSentTo = false;
      const query = { ...this.$route.query };
      delete query.messageSent;
      this.$router.replace({ path: this.$route.path, query });
    }
  }
};
function _sfc_ssrRender$i(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($data.messageSentTo) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-overlay" }, _attrs))} data-v-5040bf71><div class="modal" data-v-5040bf71><h2 data-v-5040bf71>${ssrInterpolate(_ctx.$t("contact.messageSentTitle"))}</h2><p class="description" data-v-5040bf71>${ssrInterpolate(_ctx.$t("contact.messageSentText"))}</p><p class="email" data-v-5040bf71>${ssrInterpolate(_ctx.$t("contact.messageSentToText"))} <strong data-v-5040bf71>${ssrInterpolate($data.messageSentTo)}</strong></p><button class="btn" data-v-5040bf71>${ssrInterpolate(_ctx.$t("contact.close"))}</button></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/MessageSentModal.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const MessageSentModal = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$i], ["__scopeId", "data-v-5040bf71"]]);
const _sfc_main$h = defineComponent({
  name: "App",
  components: {
    TheNavbar,
    TheFooter,
    CircuitAnimation,
    CookieConsent,
    CookieSettings,
    MessageSentModal
  },
  setup() {
    const store2 = useStore();
    useRoute();
    const router = useRouter();
    const { t, locale } = useI18n();
    const updateMetaTags = () => {
      document.title = locale.value === "en" ? "Davide De Simone - Electronics enthusiast & Web Developer" : "Davide De Simone - Sviluppatore Web ed Appassionato Elettronico";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          locale.value === "en" ? "Davide De Simone - Electronics enthusiast and web developer from Pisa, Italy, specializing in Laravel, Node.js, Vue.js and DevOps" : "Davide De Simone - Appassionato di elettronica e sviluppatore web a Pisa, specializzato in Laravel, Node.js, Vue.js e DevOps"
        );
      }
      document.querySelectorAll('meta[property="og:title"], meta[property="twitter:title"]').forEach((meta) => {
        meta.setAttribute("content", document.title);
      });
      document.querySelectorAll('meta[property="og:description"], meta[property="twitter:description"]').forEach((meta) => {
        meta.setAttribute("content", metaDesc.getAttribute("content"));
      });
      const ogLocale = document.querySelector('meta[property="og:locale"]');
      if (ogLocale) {
        ogLocale.setAttribute("content", locale.value === "en" ? "en_US" : "it_IT");
      }
    };
    onMounted(() => {
      updateMetaTags();
      router.afterEach((to) => {
        if (store2.state.cookieConsent.analytics) {
          store2.dispatch("trackPageView", {
            path: to.fullPath,
            title: document.title
          });
        }
      });
    });
    watch(locale, () => {
      updateMetaTags();
    });
  }
});
function _sfc_ssrRender$h(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CircuitAnimation = resolveComponent("CircuitAnimation");
  const _component_TheNavbar = resolveComponent("TheNavbar");
  const _component_router_view = resolveComponent("router-view");
  const _component_MessageSentModal = resolveComponent("MessageSentModal");
  const _component_TheFooter = resolveComponent("TheFooter");
  const _component_CookieConsent = resolveComponent("CookieConsent");
  const _component_CookieSettings = resolveComponent("CookieSettings");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-container" }, _attrs))} data-v-c508acfe>`);
  _push(ssrRenderComponent(_component_CircuitAnimation, null, null, _parent));
  _push(ssrRenderComponent(_component_TheNavbar, null, null, _parent));
  _push(`<main data-v-c508acfe>`);
  _push(ssrRenderComponent(_component_router_view, null, {
    default: withCtx(({ Component }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Component), null, null), _parent2, _scopeId);
      } else {
        return [
          (openBlock(), createBlock(resolveDynamicComponent(Component)))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</main>`);
  _push(ssrRenderComponent(_component_MessageSentModal, null, null, _parent));
  _push(ssrRenderComponent(_component_TheFooter, null, null, _parent));
  _push(ssrRenderComponent(_component_CookieConsent, null, null, _parent));
  _push(ssrRenderComponent(_component_CookieSettings, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$h], ["__scopeId", "data-v-c508acfe"]]);
const _sfc_main$g = defineComponent({
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isInternalProject = computed(() => {
      return props.project.link && props.project.link.startsWith("/projects/");
    });
    const hasInternalAndExternalLinks = computed(() => {
      return isInternalProject.value && props.project.externalLink;
    });
    return {
      isInternalProject,
      hasInternalAndExternalLinks
    };
  }
});
function _sfc_ssrRender$g(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-card" }, _attrs))} data-v-a1ff8887><div class="project-image" data-v-a1ff8887><img${ssrRenderAttr("src", _ctx.project.image)}${ssrRenderAttr("alt", _ctx.project.title)} data-v-a1ff8887><div class="project-overlay" data-v-a1ff8887>`);
  if (_ctx.hasInternalAndExternalLinks) {
    _push(`<div class="project-links" data-v-a1ff8887>`);
    if (_ctx.project.exludeInternalLink) {
      _push(ssrRenderComponent(_component_router_link, {
        to: _ctx.project.link,
        class: "project-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-a1ff8887${_scopeId}>${ssrInterpolate(_ctx.$t("projects.viewDetails"))}</span><i class="fas fa-arrow-right" data-v-a1ff8887${_scopeId}></i>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(_ctx.$t("projects.viewDetails")), 1),
              createVNode("i", { class: "fas fa-arrow-right" })
            ];
          }
        }),
        _: 1
      }, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`<a${ssrRenderAttr("href", _ctx.project.externalLink)} target="_blank" class="project-link project-link-secondary" data-v-a1ff8887><span data-v-a1ff8887>${ssrInterpolate(_ctx.$t("projects.viewLive"))}</span><i class="fas fa-external-link-alt" data-v-a1ff8887></i></a></div>`);
  } else if (_ctx.isInternalProject) {
    _push(ssrRenderComponent(_component_router_link, {
      to: _ctx.project.link,
      class: "project-link"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<span data-v-a1ff8887${_scopeId}>${ssrInterpolate(_ctx.$t("projects.viewProject"))}</span><i class="fas fa-arrow-right" data-v-a1ff8887${_scopeId}></i>`);
        } else {
          return [
            createVNode("span", null, toDisplayString(_ctx.$t("projects.viewProject")), 1),
            createVNode("i", { class: "fas fa-arrow-right" })
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<a${ssrRenderAttr("href", _ctx.project.link)} target="_blank" class="project-link" data-v-a1ff8887><span data-v-a1ff8887>${ssrInterpolate(_ctx.$t("projects.viewProject"))}</span><i class="fas fa-external-link-alt" data-v-a1ff8887></i></a>`);
  }
  _push(`</div></div><div class="project-content" data-v-a1ff8887><h3 class="project-title" data-v-a1ff8887>${ssrInterpolate(_ctx.project.title)}</h3>`);
  if (_ctx.$te(_ctx.project.description)) {
    _push(`<p class="project-description" data-v-a1ff8887>${ssrInterpolate(_ctx.$t(_ctx.project.description))}</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="project-technologies" data-v-a1ff8887><!--[-->`);
  ssrRenderList(_ctx.project.technologies, (tech) => {
    _push(`<span class="tech-badge" data-v-a1ff8887>${ssrInterpolate(tech)}</span>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ProjectCard.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const ProjectCard = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$g], ["__scopeId", "data-v-a1ff8887"]]);
const _sfc_main$f = defineComponent({
  name: "SimpleTerminal",
  setup() {
    const store2 = useStore();
    const { t } = useI18n();
    const skills = computed(() => store2.getters.getAllSkills);
    const terminalContainer = ref(null);
    const terminalOutput = ref(null);
    const isExpanded = ref(false);
    ref(false);
    const animationStarted = ref(false);
    const isTyping = ref(false);
    const currentTypingText = ref("");
    const displayedLines = ref([]);
    const allOutputs = ref([]);
    const currentLine = ref(0);
    const typingInterval = ref(null);
    const typingSpeed = 100;
    const commandToType = "list-skills";
    const scrollToBottom = () => {
      if (terminalOutput.value) {
        terminalOutput.value.scrollTop = terminalOutput.value.scrollHeight;
      }
    };
    const toggleMaximize = () => {
      isExpanded.value = !isExpanded.value;
    };
    const prepareOutputs = () => {
      allOutputs.value = [];
      allOutputs.value.push({
        type: "output",
        text: `
          <div class="welcome-message">
            <p>Welcome to the skills terminal!</p>
            <p>Auto-executing command <strong>list-skills</strong>...</p>
          </div>
        `
      });
      allOutputs.value.push({
        type: "command",
        prompt: "user@portfolio:~$",
        text: commandToType
      });
      let skillsHtml = '<div class="skills-tree">';
      if (skills.value && skills.value.length > 0) {
        skills.value.forEach((category) => {
          skillsHtml += `
            <div class="skills-category">
              <div class="category-title">▶ ${t(category.category)}</div>
              <div class="category-items">
          `;
          category.items.forEach((skill) => {
            skillsHtml += `
              <div class="skill-item">
                <span class="tree-branch">├── </span>
                <span class="skill-name">${skill.name}</span>
              </div>
            `;
          });
          skillsHtml += "</div></div>";
        });
      } else {
        skillsHtml += `
          <div class="skills-category">
            <div class="category-title">▶ Skills</div>
            <div class="category-items">
              <div class="skill-item">
                <span class="tree-branch">├── </span>
                <span class="skill-name">Vue.js</span>
              </div>
              <div class="skill-item">
                <span class="tree-branch">├── </span>
                <span class="skill-name">JavaScript</span>
              </div>
              <div class="skill-item">
                <span class="tree-branch">├── </span>
                <span class="skill-name">Node.js</span>
              </div>
            </div>
          </div>
        `;
      }
      skillsHtml += "</div>";
      allOutputs.value.push({
        type: "output",
        text: skillsHtml
      });
      allOutputs.value.push({
        type: "output",
        text: '<div class="command"><span class="prompt">user@portfolio:~$</span><span class="cursor-static"></span></div>'
      });
      console.log("Terminal outputs prepared:", allOutputs.value);
    };
    const showNextOutput = () => {
      console.log("Showing next output, current line:", currentLine.value, "total outputs:", allOutputs.value.length);
      if (currentLine.value < allOutputs.value.length) {
        const output = allOutputs.value[currentLine.value];
        console.log("Current output to show:", output);
        if (output.type === "command") {
          isTyping.value = true;
          let charIndex = 0;
          currentTypingText.value = "";
          console.log("Starting typing animation for command:", output.text);
          typingInterval.value = setInterval(() => {
            if (charIndex < output.text.length) {
              currentTypingText.value += output.text[charIndex];
              charIndex++;
            } else {
              clearInterval(typingInterval.value);
              isTyping.value = false;
              displayedLines.value.push(output);
              currentLine.value++;
              console.log("Command typing complete, showing next output in 500ms");
              setTimeout(showNextOutput, 500);
            }
            nextTick(scrollToBottom);
          }, typingSpeed);
        } else {
          console.log("Showing output with processing time:", output.type);
          if (currentLine.value === 2) {
            displayedLines.value.push({
              type: "output",
              text: `<div class="processing">Processing...</div>`
            });
            nextTick(scrollToBottom);
            setTimeout(() => {
              displayedLines.value.pop();
              displayedLines.value.push(output);
              currentLine.value++;
              nextTick(scrollToBottom);
              console.log("All outputs shown");
              setTimeout(() => {
                displayedLines.value.push({
                  type: "final-prompt",
                  text: ""
                });
                nextTick(scrollToBottom);
              }, 300);
            }, 800);
          } else {
            displayedLines.value.push(output);
            currentLine.value++;
            if (currentLine.value < allOutputs.value.length) {
              console.log("More outputs to show, continuing...");
              setTimeout(showNextOutput, 300);
            } else {
              console.log("All outputs shown");
              setTimeout(() => {
                displayedLines.value.push({
                  type: "final-prompt",
                  text: ""
                });
                nextTick(scrollToBottom);
              }, 300);
            }
            nextTick(scrollToBottom);
          }
        }
      } else {
        console.log("No more outputs to show");
      }
    };
    onMounted(() => {
      console.log("SimpleTerminal component mounted");
      prepareOutputs();
      setTimeout(() => {
        console.log("Starting terminal animation directly");
        if (!animationStarted.value) {
          animationStarted.value = true;
          showNextOutput();
        }
      }, 500);
      try {
        if (typeof window !== "undefined" && window.IntersectionObserver) {
          console.log("Setting up IntersectionObserver");
          const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            console.log("Terminal intersection:", entry.isIntersecting);
            if (entry.isIntersecting && !animationStarted.value) {
              console.log("Terminal is now visible, starting animation");
              animationStarted.value = true;
              showNextOutput();
              observer.disconnect();
            }
          }, { threshold: 0.1 });
          if (terminalContainer.value) {
            observer.observe(terminalContainer.value);
            console.log("Observer set up for terminal container");
          } else {
            console.error("Terminal container ref is not available");
          }
        } else {
          console.log("IntersectionObserver not supported by browser");
        }
      } catch (error) {
        console.error("Error setting up IntersectionObserver:", error);
      }
    });
    onUnmounted(() => {
      if (typingInterval.value) {
        clearInterval(typingInterval.value);
      }
    });
    return {
      terminalContainer,
      terminalOutput,
      isExpanded,
      isTyping,
      currentTypingText,
      displayedLines,
      toggleMaximize
    };
  }
});
function _sfc_ssrRender$f(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "terminal-container",
    ref: "terminalContainer"
  }, _attrs))} data-v-867d3d86><div class="terminal-header" data-v-867d3d86><div class="terminal-buttons" data-v-867d3d86><div class="terminal-button close" data-v-867d3d86></div><div class="terminal-button minimize" data-v-867d3d86></div><div class="terminal-button maximize" data-v-867d3d86></div></div><div class="terminal-title" data-v-867d3d86>Terminal</div></div><div class="${ssrRenderClass([{ "expanded": _ctx.isExpanded }, "terminal-body"])}" data-v-867d3d86><div class="terminal-output" data-v-867d3d86><!--[-->`);
  ssrRenderList(_ctx.displayedLines, (line, index) => {
    _push(`<div class="${ssrRenderClass(line.type)}" data-v-867d3d86>`);
    if (line.type === "command") {
      _push(`<div class="command" data-v-867d3d86><span class="prompt" data-v-867d3d86>${line.prompt ?? ""}</span><span class="command-text" data-v-867d3d86>${ssrInterpolate(line.text)}</span></div>`);
    } else {
      _push(`<div data-v-867d3d86>${line.text ?? ""}</div>`);
    }
    _push(`</div>`);
  });
  _push(`<!--]-->`);
  if (_ctx.isTyping) {
    _push(`<div class="terminal-input-line" data-v-867d3d86><span class="prompt" data-v-867d3d86>user@portfolio:~$</span><div class="input-area" data-v-867d3d86><span class="input-text" data-v-867d3d86>${ssrInterpolate(_ctx.currentTypingText)}</span><span class="cursor blink" data-v-867d3d86></span></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SimpleTerminal.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const SimpleTerminal = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$f], ["__scopeId", "data-v-867d3d86"]]);
const _sfc_main$e = defineComponent({
  name: "ExperienceComponent"
});
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "experience" }, _attrs))} data-v-ebcad14b><div class="container" data-v-ebcad14b><h2 class="section-title" data-v-ebcad14b>${ssrInterpolate(_ctx.$t("experience.title"))}</h2><p class="section-subtitle" data-v-ebcad14b>${ssrInterpolate(_ctx.$t("experience.subtitle"))}</p><div class="timeline" data-v-ebcad14b><div class="timeline-item" data-v-ebcad14b><div class="timeline-dot" data-v-ebcad14b></div><div class="timeline-content card" data-v-ebcad14b><h3 data-v-ebcad14b>${ssrInterpolate(_ctx.$t("experience.job1.title"))}</h3><div class="company-info" data-v-ebcad14b><span class="company-name" data-v-ebcad14b>${ssrInterpolate(_ctx.$t("experience.job1.company"))}</span><span class="company-period" data-v-ebcad14b>${ssrInterpolate(_ctx.$t("experience.job1.period"))}</span></div><p data-v-ebcad14b>${ssrInterpolate(_ctx.$t("experience.job1.description"))}</p></div></div><div class="timeline-item" data-v-ebcad14b><div class="timeline-dot" data-v-ebcad14b></div><div class="timeline-content card" data-v-ebcad14b><h3 data-v-ebcad14b>${ssrInterpolate(_ctx.$t("experience.job2.title"))}</h3><div class="company-info" data-v-ebcad14b><span class="company-name" data-v-ebcad14b>${ssrInterpolate(_ctx.$t("experience.job2.company"))}</span><span class="company-period" data-v-ebcad14b>${ssrInterpolate(_ctx.$t("experience.job2.period"))}</span></div><p data-v-ebcad14b>${ssrInterpolate(_ctx.$t("experience.job2.description"))}</p></div></div>`);
  {
    _push(`<!---->`);
  }
  _push(`</div></div></section>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ExperienceComponent.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const ExperienceComponent = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$e], ["__scopeId", "data-v-ebcad14b"]]);
const _imports_0$2 = "/img/davidedesimone.jpeg";
const _sfc_main$d = defineComponent({
  name: "AboutComponent"
});
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "about" }, _attrs))} data-v-1cc72a0b><div class="container" data-v-1cc72a0b><h2 class="section-title" data-v-1cc72a0b>${ssrInterpolate(_ctx.$t("about.title"))}</h2><div class="about-content" data-v-1cc72a0b><div class="about-text" data-v-1cc72a0b><p data-v-1cc72a0b>${ssrInterpolate(_ctx.$t("about.intro"))}</p><p data-v-1cc72a0b>${ssrInterpolate(_ctx.$t("about.journey"))}</p><p data-v-1cc72a0b>${ssrInterpolate(_ctx.$t("about.current"))}</p><p data-v-1cc72a0b>${ssrInterpolate(_ctx.$t("about.projects"))}</p><p data-v-1cc72a0b>${ssrInterpolate(_ctx.$t("about.closing"))}</p></div><div class="about-image" data-v-1cc72a0b><div class="image-container" data-v-1cc72a0b><img${ssrRenderAttr("src", _imports_0$2)} alt="Davide De Simone profile photo" class="main-image" data-v-1cc72a0b><div class="overlay" data-v-1cc72a0b></div></div></div></div></div></section>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/AboutComponent.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const AboutComponent = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$d], ["__scopeId", "data-v-1cc72a0b"]]);
const _sfc_main$c = {
  name: "ContactForm",
  data() {
    return {
      formEndpoint: `https://formsubmit.co/${"1392a348b5694adea2ea5878e17dc989"}`,
      form: {
        name: "",
        email: "",
        message: "",
        honey: null,
        privacy: false
      },
      v$: null,
      submitting: false,
      formError: false
    };
  },
  validations() {
    return {
      form: {
        name: { required },
        email: { required, email },
        message: { required },
        privacy: { required }
      }
    };
  },
  created() {
    this.v$ = useVuelidate();
  },
  methods: {
    async sendMessage() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      this.submitting = true;
      try {
        const form = this.$refs.contactForm;
        const hiddenInputs = [
          { name: "name", value: this.form.name },
          { name: "email", value: this.form.email },
          { name: "message", value: this.form.message },
          { name: "_honey", value: this.form.honey },
          { name: "_subject", value: "SITE FORM REQUEST" },
          // opzionale
          { name: "_captcha", value: "false" },
          // disabilita CAPTCHA
          { name: "_next", value: typeof window !== "undefined" ? window.location.href + "?messageSent=" + this.form.email : "" }
          // redirect
        ];
        hiddenInputs.forEach(({ name, value }) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          form.appendChild(input);
        });
        this.form = { name: "", email: "", message: "", privacy: false };
        this.v$.$reset();
        form.submit();
      } catch (error) {
        this.formError = true;
        console.error("Errore invio messaggio", error);
      } finally {
        this.submitting = false;
      }
    }
  }
};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const _component_router_link = resolveComponent("router-link");
  _push(`<section${ssrRenderAttrs(_attrs)} data-v-da851817><div class="container" data-v-da851817><h2 class="section-title" data-v-da851817>${ssrInterpolate(_ctx.$t("contact.title"))}</h2><p class="section-subtitle" data-v-da851817>${ssrInterpolate(_ctx.$t("contact.subtitle"))}</p><div class="contact-container" data-v-da851817><div class="contact-info" data-v-da851817><div class="contact-card card" data-v-da851817><div class="contact-item" data-v-da851817><i class="fas fa-envelope" data-v-da851817></i><h3 data-v-da851817>Email</h3><a href="mailto:info@davidedesimone.dev" data-v-da851817>info@davidedesimone.dev</a></div><div class="contact-item" data-v-da851817><i class="fa-brands fa-whatsapp" data-v-da851817></i><h3 data-v-da851817>Whatsapp</h3><a href="https://wa.me/393757386393" data-v-da851817>(+39) 3757386393</a></div><div class="contact-item" data-v-da851817><i class="fas fa-map-marker-alt" data-v-da851817></i><h3 data-v-da851817>Location</h3><p data-v-da851817>Pisa - Italy</p></div></div></div><div class="contact-form-container" data-v-da851817><form class="contact-form card"${ssrRenderAttr("action", $data.formEndpoint)} method="POST" data-v-da851817><div class="form-group" data-v-da851817><label for="name" data-v-da851817>${ssrInterpolate(_ctx.$t("contact.name"))}</label><input type="text" id="name"${ssrRenderAttr("value", $data.form.name)} class="${ssrRenderClass([{ "error": (_b = (_a = $data.v$.form) == null ? void 0 : _a.name) == null ? void 0 : _b.$error }, "form-control"])}" data-v-da851817>`);
  if ((_d = (_c = $data.v$.form) == null ? void 0 : _c.name) == null ? void 0 : _d.$error) {
    _push(`<div class="form-error" data-v-da851817>${ssrInterpolate(_ctx.$t("contact.nameRequired"))}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="form-group" data-v-da851817><label for="email" data-v-da851817>${ssrInterpolate(_ctx.$t("contact.email"))}</label><input type="email" id="email"${ssrRenderAttr("value", $data.form.email)} class="${ssrRenderClass([{ "error": (_e = $data.v$.form) == null ? void 0 : _e.email.$error }, "form-control"])}" data-v-da851817>`);
  if ((_f = $data.v$.form) == null ? void 0 : _f.email.$error) {
    _push(`<div class="form-error" data-v-da851817>${ssrInterpolate($data.v$.form.email.email.$invalid ? _ctx.$t("contact.emailInvalid") : _ctx.$t("contact.emailRequired"))}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="form-group" data-v-da851817><label for="message" data-v-da851817>${ssrInterpolate(_ctx.$t("contact.message"))}</label><textarea id="message" class="${ssrRenderClass([{ "error": (_g = $data.v$.form) == null ? void 0 : _g.message.$error }, "form-control"])}" data-v-da851817>${ssrInterpolate($data.form.message)}</textarea>`);
  if ((_h = $data.v$.form) == null ? void 0 : _h.message.$error) {
    _push(`<div class="form-error" data-v-da851817>${ssrInterpolate(_ctx.$t("contact.messageRequired"))}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="form-group" data-v-da851817><input${ssrRenderAttr("value", $data.form.honey)} type="text" name="_honey" style="${ssrRenderStyle({ "display": "none" })}" data-v-da851817></div><div class="form-group checkbox" data-v-da851817><label class="${ssrRenderClass({ "error": (_i = $data.v$.form) == null ? void 0 : _i.privacy.$error })}" data-v-da851817><input type="checkbox" id="privacy"${ssrIncludeBooleanAttr(Array.isArray($data.form.privacy) ? ssrLooseContain($data.form.privacy, null) : $data.form.privacy) ? " checked" : ""} required data-v-da851817><span class="custom-checkbox" data-v-da851817></span> ${ssrInterpolate(_ctx.$t("contact.privacy"))}`);
  _push(ssrRenderComponent(_component_router_link, { to: "/privacy-policy" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("contact.privacyPolicy"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("contact.privacyPolicy")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`* </label>`);
  if ((_j = $data.v$.form) == null ? void 0 : _j.privacy.$error) {
    _push(`<div class="form-error" data-v-da851817>${ssrInterpolate($data.v$.form.privacy.required.$invalid ? _ctx.$t("contact.privacyInvalid") : _ctx.$t("contact.privacyRequired"))}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><button type="submit" class="btn"${ssrIncludeBooleanAttr($data.submitting) ? " disabled" : ""} data-v-da851817>`);
  if ($data.submitting) {
    _push(`<span data-v-da851817><i class="fas fa-spinner fa-spin" data-v-da851817></i></span>`);
  } else {
    _push(`<span data-v-da851817>${ssrInterpolate(_ctx.$t("contact.send"))}</span>`);
  }
  _push(`</button></form></div></div></div></section>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ContactForm.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const ContactForm = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$c], ["__scopeId", "data-v-da851817"]]);
const _sfc_main$b = defineComponent({
  name: "HomeComponent"
});
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero" }, _attrs))} data-v-b8ee9e72><div class="container" data-v-b8ee9e72><div class="hero-content" data-v-b8ee9e72><h4 class="greeting" data-v-b8ee9e72>${ssrInterpolate(_ctx.$t("hero.greeting"))}</h4><h1 class="name" data-v-b8ee9e72>${ssrInterpolate(_ctx.$t("hero.name"))}</h1><h2 class="title typing-animation" data-v-b8ee9e72>${ssrInterpolate(_ctx.$t("hero.title"))}</h2><p class="description" data-v-b8ee9e72>${ssrInterpolate(_ctx.$t("hero.description"))}</p><div class="hero-cta" data-v-b8ee9e72>`);
  _push(ssrRenderComponent(_component_router_link, {
    to: "/projects",
    class: "btn"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("hero.ctaButton"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("hero.ctaButton")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div class="tech-background" data-v-b8ee9e72><div class="circuit-graphic float" data-v-b8ee9e72><svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" data-v-b8ee9e72><circle cx="200" cy="200" r="180" fill="none" stroke="rgba(0, 229, 255, 0.1)" stroke-width="2" data-v-b8ee9e72></circle><circle cx="200" cy="200" r="150" fill="none" stroke="rgba(0, 229, 255, 0.1)" stroke-width="2" data-v-b8ee9e72></circle><circle cx="200" cy="200" r="120" fill="none" stroke="rgba(0, 229, 255, 0.1)" stroke-width="2" data-v-b8ee9e72></circle><line x1="200" y1="20" x2="200" y2="100" stroke="rgba(0, 119, 255, 0.2)" stroke-width="2" data-v-b8ee9e72></line><line x1="200" y1="300" x2="200" y2="380" stroke="rgba(0, 119, 255, 0.2)" stroke-width="2" data-v-b8ee9e72></line><line x1="20" y1="200" x2="100" y2="200" stroke="rgba(0, 119, 255, 0.2)" stroke-width="2" data-v-b8ee9e72></line><line x1="300" y1="200" x2="380" y2="200" stroke="rgba(0, 119, 255, 0.2)" stroke-width="2" data-v-b8ee9e72></line><line x1="120" y1="120" x2="160" y2="160" stroke="rgba(0, 119, 255, 0.2)" stroke-width="2" data-v-b8ee9e72></line><line x1="240" y1="240" x2="280" y2="280" stroke="rgba(0, 119, 255, 0.2)" stroke-width="2" data-v-b8ee9e72></line><line x1="120" y1="280" x2="160" y2="240" stroke="rgba(0, 119, 255, 0.2)" stroke-width="2" data-v-b8ee9e72></line><line x1="240" y1="160" x2="280" y2="120" stroke="rgba(0, 119, 255, 0.2)" stroke-width="2" data-v-b8ee9e72></line><circle cx="200" cy="100" r="5" fill="rgba(0, 229, 255, 0.8)" class="pulse" data-v-b8ee9e72></circle><circle cx="200" cy="300" r="5" fill="rgba(0, 229, 255, 0.8)" class="pulse" data-v-b8ee9e72></circle><circle cx="100" cy="200" r="5" fill="rgba(0, 229, 255, 0.8)" class="pulse" data-v-b8ee9e72></circle><circle cx="300" cy="200" r="5" fill="rgba(0, 229, 255, 0.8)" class="pulse" data-v-b8ee9e72></circle><circle cx="160" cy="160" r="5" fill="rgba(0, 229, 255, 0.8)" class="pulse" data-v-b8ee9e72></circle><circle cx="240" cy="240" r="5" fill="rgba(0, 229, 255, 0.8)" class="pulse" data-v-b8ee9e72></circle><circle cx="160" cy="240" r="5" fill="rgba(0, 229, 255, 0.8)" class="pulse" data-v-b8ee9e72></circle><circle cx="240" cy="160" r="5" fill="rgba(0, 229, 255, 0.8)" class="pulse" data-v-b8ee9e72></circle></svg></div></div></div></section>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/HomeComponent.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const HomeComponent = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$b], ["__scopeId", "data-v-b8ee9e72"]]);
const _sfc_main$a = defineComponent({
  name: "SinglePageView",
  components: {
    ProjectCard,
    SimpleTerminal,
    ExperienceComponent,
    AboutComponent,
    ContactForm,
    HomeComponent
  },
  setup() {
    const store2 = useStore();
    const allProjects = computed(() => store2.getters.getAllProjects);
    const featuredProjects = computed(() => {
      const webProjects = allProjects.value.filter((p) => p.category === "web").slice(0, 4);
      const electronicsProjects = allProjects.value.filter((p) => p.category === "electronics").slice(0, 2);
      return [...webProjects, ...electronicsProjects];
    });
    const form = reactive({
      name: "",
      email: "",
      message: ""
    });
    const rules = {
      form: {
        name: { required },
        email: { required, email },
        message: { required }
      }
    };
    const v$ = useVuelidate(rules, { form });
    const isSubmitting = ref(false);
    const formSuccess = ref(false);
    const formError = ref(false);
    const sendMessage = async () => {
      formSuccess.value = false;
      formError.value = false;
      const isValid = await v$.value.$validate();
      if (!isValid) return;
      isSubmitting.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        form.name = "";
        form.email = "";
        form.message = "";
        v$.value.$reset();
        formSuccess.value = true;
      } catch (error) {
        formError.value = true;
        console.error("Form submission error:", error);
      } finally {
        isSubmitting.value = false;
      }
    };
    return {
      featuredProjects,
      form,
      v$,
      isSubmitting,
      formSuccess,
      formError,
      sendMessage
    };
  }
});
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HomeComponent = resolveComponent("HomeComponent");
  const _component_AboutComponent = resolveComponent("AboutComponent");
  const _component_SimpleTerminal = resolveComponent("SimpleTerminal");
  const _component_ExperienceComponent = resolveComponent("ExperienceComponent");
  const _component_ProjectCard = resolveComponent("ProjectCard");
  const _component_router_link = resolveComponent("router-link");
  const _component_ContactForm = resolveComponent("ContactForm");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "single-page" }, _attrs))} data-v-2267b869><section id="home" data-v-2267b869>`);
  _push(ssrRenderComponent(_component_HomeComponent, null, null, _parent));
  _push(`</section><section id="about" data-v-2267b869>`);
  _push(ssrRenderComponent(_component_AboutComponent, null, null, _parent));
  _push(`</section><section id="skills" class="skills" data-v-2267b869><div class="container" data-v-2267b869><h2 class="section-title" data-v-2267b869>${ssrInterpolate(_ctx.$t("skills.title"))}</h2><p class="section-subtitle" data-v-2267b869>${ssrInterpolate(_ctx.$t("skills.subtitle"))}</p>`);
  _push(ssrRenderComponent(_component_SimpleTerminal, null, null, _parent));
  _push(`</div></section><section id="experience" data-v-2267b869>`);
  _push(ssrRenderComponent(_component_ExperienceComponent, null, null, _parent));
  _push(`</section><section id="projects" class="projects" data-v-2267b869><div class="container" data-v-2267b869><h2 class="section-title" data-v-2267b869>${ssrInterpolate(_ctx.$t("projects.title"))}</h2><p class="section-subtitle" data-v-2267b869>${ssrInterpolate(_ctx.$t("projects.subtitle"))}</p><div class="projects-grid" data-v-2267b869><!--[-->`);
  ssrRenderList(_ctx.featuredProjects, (project) => {
    _push(ssrRenderComponent(_component_ProjectCard, {
      key: project.id,
      project
    }, null, _parent));
  });
  _push(`<!--]--></div><div class="view-all-projects" data-v-2267b869>`);
  _push(ssrRenderComponent(_component_router_link, {
    to: "/projects",
    class: "btn-secondary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fas fa-project-diagram" data-v-2267b869${_scopeId}></i> ${ssrInterpolate(_ctx.$t("projects.viewAllProjects"))}`);
      } else {
        return [
          createVNode("i", { class: "fas fa-project-diagram" }),
          createTextVNode(" " + toDisplayString(_ctx.$t("projects.viewAllProjects")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></section><section id="contact" class="contact" data-v-2267b869>`);
  _push(ssrRenderComponent(_component_ContactForm, null, null, _parent));
  _push(`</section></div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/SinglePageView.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const SinglePageView = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$a], ["__scopeId", "data-v-2267b869"]]);
const _sfc_main$9 = defineComponent({
  name: "ProjectsView",
  components: {
    ProjectCard
  },
  setup() {
    const store2 = useStore();
    const allProjects = computed(() => store2.getters.getAllProjects);
    const selectedCategory = ref("all");
    const categories = [
      { id: "all", name: "projects.categories.all" },
      { id: "web", name: "projects.categories.web" },
      { id: "electronics", name: "projects.categories.electronics" },
      { id: "other", name: "projects.categories.other" }
    ];
    const filteredProjects = computed(() => {
      if (selectedCategory.value === "all") {
        return allProjects.value;
      } else {
        return allProjects.value.filter((project) => project.category === selectedCategory.value);
      }
    });
    return {
      categories,
      selectedCategory,
      filteredProjects
    };
  }
});
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ProjectCard = resolveComponent("ProjectCard");
  const _component_router_link = resolveComponent("router-link");
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "projects-page" }, _attrs))} data-v-42d409f7><div class="container" data-v-42d409f7><h1 class="page-title" data-v-42d409f7>${ssrInterpolate(_ctx.$t("projects.title"))}</h1><p class="page-subtitle" data-v-42d409f7>${ssrInterpolate(_ctx.$t("projects.subtitle"))}</p><div class="categories-nav" data-v-42d409f7><!--[-->`);
  ssrRenderList(_ctx.categories, (category) => {
    _push(`<button class="${ssrRenderClass([{ active: _ctx.selectedCategory === category.id }, "category-btn"])}" data-v-42d409f7>${ssrInterpolate(_ctx.$t(category.name))}</button>`);
  });
  _push(`<!--]--></div><div class="projects-grid" data-v-42d409f7><!--[-->`);
  ssrRenderList(_ctx.filteredProjects, (project) => {
    _push(ssrRenderComponent(_component_ProjectCard, {
      key: project.id,
      project
    }, null, _parent));
  });
  _push(`<!--]--></div>`);
  if (_ctx.filteredProjects.length === 0) {
    _push(`<div class="no-projects" data-v-42d409f7>${ssrInterpolate(_ctx.$t("projects.noProjects"))}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="back-to-home" data-v-42d409f7>`);
  _push(ssrRenderComponent(_component_router_link, {
    to: "/",
    class: "btn-secondary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fas fa-arrow-left" data-v-42d409f7${_scopeId}></i> ${ssrInterpolate(_ctx.$t("common.backToHome"))}`);
      } else {
        return [
          createVNode("i", { class: "fas fa-arrow-left" }),
          createTextVNode(" " + toDisplayString(_ctx.$t("common.backToHome")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></section>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ProjectsView.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const ProjectsView = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$9], ["__scopeId", "data-v-42d409f7"]]);
const _imports_0$1 = "/assets/schema-blocchi-fence-Dnm32OvQ.webp";
const _sfc_main$8 = defineComponent({
  name: "ElectricFenceProject"
});
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-detail-view" }, _attrs))} data-v-2c448ea2><div class="container" data-v-2c448ea2><div class="project-header" data-v-2c448ea2><h1 class="project-title" data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.title"))}</h1>`);
  _push(ssrRenderComponent(_component_router_link, {
    to: "/projects",
    class: "back-button"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fas fa-arrow-left" data-v-2c448ea2${_scopeId}></i> ${ssrInterpolate(_ctx.$t("common.backToProjects"))}`);
      } else {
        return [
          createVNode("i", { class: "fas fa-arrow-left" }),
          createTextVNode(" " + toDisplayString(_ctx.$t("common.backToProjects")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="project-content" data-v-2c448ea2><section class="project-section" data-v-2c448ea2><h2 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.intro.title"))}</h2><p data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.intro.content"))}</p></section><section class="project-section" data-v-2c448ea2><h2 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.idea.title"))}</h2><p data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.idea.content"))}</p></section><div class="project-image-container" data-v-2c448ea2><img${ssrRenderAttr("src", _imports_0$1)} alt="Electric Fence Circuit" class="project-image" data-v-2c448ea2><div class="image-caption" data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.circuit.caption"))}</div></div><section class="project-section" data-v-2c448ea2><h2 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.blockDiagram.title"))}</h2><p data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.blockDiagram.content"))}</p><div class="technical-specs" data-v-2c448ea2><h3 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.title"))}</h3><p data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.details"))} <a target="_BLANK" href="/public/docs/safety_circuit.pdf" data-v-2c448ea2>Safety.pdf</a> <a target="_BLANK" href="/public/docs/Energizer.pdf" data-v-2c448ea2>Energizer.pdf</a></p><ul data-v-2c448ea2><li data-v-2c448ea2><h4 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.protection.title"))}</h4><p data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.protection.content"))}</p></li><li data-v-2c448ea2><h4 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.gps.title"))}</h4><p data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.gps.content"))}</p></li><li data-v-2c448ea2><h4 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.timer.title"))}</h4><p data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.timer.content"))}</p></li><li data-v-2c448ea2><h4 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.batteryIndicator.title"))}</h4><p data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.batteryIndicator.content"))}</p></li><li data-v-2c448ea2><h4 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.generator.title"))}</h4><p data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.generator.content"))}</p></li><li data-v-2c448ea2><h4 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.neonLight.title"))}</h4><p data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.components.neonLight.content"))}</p></li></ul></div></section><section class="project-section" data-v-2c448ea2><h2 data-v-2c448ea2>${ssrInterpolate(_ctx.$t("projects.electricfence.references.title"))}</h2><ul class="reference-list" data-v-2c448ea2><!--[-->`);
  ssrRenderList(_ctx.$tm("projects.electricfence.references.items"), (reference, index) => {
    _push(`<li data-v-2c448ea2><a${ssrRenderAttr("href", reference.url)} target="_blank" rel="noopener noreferrer" data-v-2c448ea2>${ssrInterpolate(reference.text)}</a></li>`);
  });
  _push(`<!--]--></ul></section></div></div></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/electric_fence.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const electric_fence = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8], ["__scopeId", "data-v-2c448ea2"]]);
const _imports_0 = "/img/projects/rampa_salita.webp";
const _imports_1 = "/img/projects/tx_cw_schema_blocchi.webp";
const _imports_2 = "/img/projects/imp_trafo.jpeg";
const _sfc_main$7 = defineComponent({
  name: "TxCwProject"
});
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-detail-view" }, _attrs))} data-v-23d9286d><div class="container" data-v-23d9286d><div class="project-header" data-v-23d9286d><h1 class="project-title" data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.title"))}</h1>`);
  _push(ssrRenderComponent(_component_router_link, {
    to: "/projects",
    class: "back-button"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fas fa-arrow-left" data-v-23d9286d${_scopeId}></i> ${ssrInterpolate(_ctx.$t("common.backToProjects"))}`);
      } else {
        return [
          createVNode("i", { class: "fas fa-arrow-left" }),
          createTextVNode(" " + toDisplayString(_ctx.$t("common.backToProjects")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="project-content" data-v-23d9286d><section class="project-section" data-v-23d9286d><h2 data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.intro.title"))}</h2><p data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.intro.content"))}</p></section><div class="project-image-container" data-v-23d9286d><img src="https://images.unsplash.com/photo-1635257600832-161522894a0c" alt="QRP CW Transmitter" class="project-image" data-v-23d9286d><div class="image-caption" data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.circuit.caption"))}</div></div><section class="project-section" data-v-23d9286d><h2 data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.design.title"))}</h2><p data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.design.content"))}</p><div class="specs-container" data-v-23d9286d><div class="specs-item" data-v-23d9286d><h3 data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.specs.title"))}</h3><ul class="specs-list" data-v-23d9286d><li data-v-23d9286d><strong data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.specs.frequency.title"))}:</strong><span data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.specs.frequency.value"))}</span></li><li data-v-23d9286d><strong data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.specs.power.title"))}:</strong><span data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.specs.power.value"))}</span></li></ul></div></div></section><section class="project-section" data-v-23d9286d><h2 data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.anticlick.title"))}</h2><p data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.anticlick.content"))}</p><div class="code-container" data-v-23d9286d><h4 data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.anticlick.code_title"))}</h4><pre class="code-block" data-v-23d9286d><code data-v-23d9286d>// Funzione per generare una rampa di salita per evitare &quot;click&quot; da manipolazione
void generateRamp(FILE *out, int samples, double max_amplitude) {
    double step = max_amplitude / samples;
    double amplitude = 0;
    
    for(int i = 0; i &lt; samples; i++) {
        // Incrementa l&#39;ampiezza gradualmente
        amplitude += step;
        
        // Applica una curva esponenziale per addolcire ulteriormente la transizione
        double smoothed_amplitude = amplitude * (1 - exp(-3 * (double)i / samples));
        
        // Scrivi il campione nel file di output
        fwrite(&amp;smoothed_amplitude, sizeof(double), 1, out);
    }
}// end main
            </code></pre></div><div class="project-image-container" data-v-23d9286d><img${ssrRenderAttr("src", _imports_0)} alt="Forma d&#39;onda della rampa di salita" class="project-image" data-v-23d9286d><div class="image-caption" data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.anticlick.image_caption"))}</div></div></section><section class="project-section" data-v-23d9286d><h2 data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.blockdiagram.title"))}</h2><div class="project-image-container" data-v-23d9286d><img${ssrRenderAttr("src", _imports_1)} alt="Schema a blocchi del trasmettitore QRP CW" class="project-image" data-v-23d9286d><div class="image-caption" data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.blockdiagram.caption"))}</div></div></section><section class="project-section" data-v-23d9286d><h2 data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.transformer.title"))}</h2><p data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.transformer.content"))}</p><div class="project-image-container" data-v-23d9286d><img${ssrRenderAttr("src", _imports_2)} alt="Dettaglio del trasformatore d&#39;impedenza" class="project-image" data-v-23d9286d><div class="image-caption" data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.transformer.caption"))}</div></div></section><section class="project-section" data-v-23d9286d><h2 data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.video.title"))}</h2><p data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.video.description"))}</p><div class="video-container" data-v-23d9286d><iframe width="100%" height="400" src="https://www.youtube.com/embed/UySG41uV-mA" title="QRP CW Transmitter Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-23d9286d></iframe></div></section><section class="project-section" data-v-23d9286d><h2 data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.conclusion.title"))}</h2><p data-v-23d9286d>${ssrInterpolate(_ctx.$t("projects.txcw.conclusion.content"))}</p></section></div></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/tx_cw.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const tx_cw = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7], ["__scopeId", "data-v-23d9286d"]]);
const _sfc_main$6 = defineComponent({
  name: "SmallBusinessServices"
});
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-detail-view" }, _attrs))} data-v-21bc8afe><div class="container" data-v-21bc8afe><div class="project-header" data-v-21bc8afe><h1 class="project-title" data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.title"))}</h1>`);
  _push(ssrRenderComponent(_component_router_link, {
    to: "/projects",
    class: "back-button"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fas fa-arrow-left" data-v-21bc8afe${_scopeId}></i> ${ssrInterpolate(_ctx.$t("common.backToProjects"))}`);
      } else {
        return [
          createVNode("i", { class: "fas fa-arrow-left" }),
          createTextVNode(" " + toDisplayString(_ctx.$t("common.backToProjects")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="project-content" data-v-21bc8afe><section class="project-section" data-v-21bc8afe><h2 data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.overview.title"))}</h2><p data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.overview.content"))}</p></section><div class="project-image-container" data-v-21bc8afe><img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0" alt="Small Business Web Services" class="project-image" data-v-21bc8afe><div class="image-caption" data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.image.caption"))}</div></div><section class="project-section" data-v-21bc8afe><h2 data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.services.title"))}</h2><div class="services-grid" data-v-21bc8afe><!--[-->`);
  ssrRenderList(_ctx.$tm("projects.smallbusiness.services.items"), (service, index) => {
    _push(`<div class="service-card" data-v-21bc8afe><div class="service-icon" data-v-21bc8afe><i class="${ssrRenderClass(service.icon)}" data-v-21bc8afe></i></div><h3 class="service-title" data-v-21bc8afe>${ssrInterpolate(service.title)}</h3><p class="service-description" data-v-21bc8afe>${ssrInterpolate(service.description)}</p></div>`);
  });
  _push(`<!--]--></div></section><section class="project-section" data-v-21bc8afe><h2 data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.approach.title"))}</h2><p data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.approach.content"))}</p><h3 class="process-title" data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.process.title"))}</h3><div class="process-steps" data-v-21bc8afe><!--[-->`);
  ssrRenderList(_ctx.$tm("projects.smallbusiness.process.steps"), (step, index) => {
    _push(`<div class="process-step" data-v-21bc8afe><div class="step-number" data-v-21bc8afe>${ssrInterpolate(index + 1)}</div><div class="step-content" data-v-21bc8afe><h4 data-v-21bc8afe>${ssrInterpolate(step.title)}</h4><p data-v-21bc8afe>${ssrInterpolate(step.description)}</p></div></div>`);
  });
  _push(`<!--]--></div></section><section class="project-section" data-v-21bc8afe><h2 data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.technologies.title"))}</h2><div class="tech-grid" data-v-21bc8afe><!--[-->`);
  ssrRenderList(_ctx.$tm("projects.smallbusiness.technologies.items"), (tech, index) => {
    _push(`<div class="tech-item" data-v-21bc8afe><div class="tech-name" data-v-21bc8afe>${ssrInterpolate(tech)}</div></div>`);
  });
  _push(`<!--]--></div></section><section class="project-section cta-section" data-v-21bc8afe><h2 data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.contact.title"))}</h2><p data-v-21bc8afe>${ssrInterpolate(_ctx.$t("projects.smallbusiness.contact.content"))}</p>`);
  _push(ssrRenderComponent(_component_router_link, {
    to: "/contact",
    class: "cta-button"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("projects.smallbusiness.contact.button"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("projects.smallbusiness.contact.button")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</section></div></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/WebProjects/SmallBusinessServices.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const SmallBusinessServices = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-21bc8afe"]]);
const _sfc_main$5 = defineComponent({
  name: "SmallBusinessLanding",
  components: {
    ContactForm
  }
});
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ContactForm = resolveComponent("ContactForm");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "landing-page" }, _attrs))} data-v-549314ac><div class="hero-section" data-v-549314ac><div class="container" data-v-549314ac><h1 class="main-title" data-v-549314ac>Non basta essere online. Serve farsi notare.</h1><p class="intro-text" data-v-549314ac>Mi chiamo Davide De Simone.<br data-v-549314ac> Aiuto professionisti e piccole imprese a migliorare l&#39;immagine e far crescere il proprio business attraverso siti web veloci, eleganti e su misura.</p></div></div><section class="features-section" data-v-549314ac><div class="container" data-v-549314ac><h2 class="section-title" data-v-549314ac>✨ Perché oggi ti serve un sito statico</h2><p data-v-549314ac>Un sito statico non è un ripiego. È la scelta perfetta se vuoi:</p><div class="benefits-list" data-v-549314ac><div class="benefit-item" data-v-549314ac><span class="check-icon" data-v-549314ac>✅</span><p data-v-549314ac><strong data-v-549314ac>Velocità estrema:</strong> tempi di caricamento quasi istantanei → meno attesa = più clienti</p></div><div class="benefit-item" data-v-549314ac><span class="check-icon" data-v-549314ac>✅</span><p data-v-549314ac><strong data-v-549314ac>Massima sicurezza:</strong> nessun database = meno vulnerabilità</p></div><div class="benefit-item" data-v-549314ac><span class="check-icon" data-v-549314ac>✅</span><p data-v-549314ac><strong data-v-549314ac>Zero manutenzione tecnica:</strong> aggiornamenti semplici, nessun back-end complicato</p></div><div class="benefit-item" data-v-549314ac><span class="check-icon" data-v-549314ac>✅</span><p data-v-549314ac><strong data-v-549314ac>Costi contenuti:</strong> più valore, meno spese inutili</p></div><div class="benefit-item" data-v-549314ac><span class="check-icon" data-v-549314ac>✅</span><p data-v-549314ac><strong data-v-549314ac>Ottimizzazione SEO nativa:</strong> Google adora i siti puliti e veloci</p></div></div></div></section><section class="target-section" data-v-549314ac><div class="container" data-v-549314ac><h2 class="section-title" data-v-549314ac>🎯 Un sito per farti scegliere</h2><p data-v-549314ac>Un sito non è solo una vetrina.<br data-v-549314ac> È la prima impressione che un cliente ha della tua attività.<br data-v-549314ac> In pochi secondi decide se fidarsi di te o cliccare altrove.</p><p data-v-549314ac>Con il design giusto, i messaggi giusti e una navigazione fluida, possiamo:</p><ul class="advantages-list" data-v-549314ac><li data-v-549314ac>Trasmettere professionalità e autorevolezza</li><li data-v-549314ac>Rafforzare la credibilità del tuo brand</li><li data-v-549314ac>Attirare più contatti, più richieste, più clienti</li></ul></div></section><section class="services-section" data-v-549314ac><div class="container" data-v-549314ac><h2 class="section-title" data-v-549314ac>💼 Cosa ti offro</h2><div class="services-grid" data-v-549314ac><div class="service-card" data-v-549314ac><div class="service-content" data-v-549314ac><h3 data-v-549314ac>Progettazione su misura</h3><p data-v-549314ac>Niente template fotocopia</p></div></div><div class="service-card" data-v-549314ac><div class="service-content" data-v-549314ac><h3 data-v-549314ac>Design responsive</h3><p data-v-549314ac>Moderno e intuitivo</p></div></div><div class="service-card" data-v-549314ac><div class="service-content" data-v-549314ac><h3 data-v-549314ac>SEO tecnica</h3><p data-v-549314ac>Per farti trovare su Google</p></div></div><div class="service-card" data-v-549314ac><div class="service-content" data-v-549314ac><h3 data-v-549314ac>Hosting e dominio inclusi</h3><p data-v-549314ac>Se vuoi semplificare tutto</p></div></div><div class="service-card" data-v-549314ac><div class="service-content" data-v-549314ac><h3 data-v-549314ac>Assistenza vera</h3><p data-v-549314ac>Anche dopo la pubblicazione</p></div></div></div></div></section><section class="psychology-section" data-v-549314ac><div class="container" data-v-549314ac><h2 class="section-title" data-v-549314ac>🧠 Psicologia del risultato</h2><p class="highlight-text" data-v-549314ac>Le persone non scelgono il migliore,<br data-v-549314ac> scelgono quello che comunica meglio.</p><p data-v-549314ac>Un sito ben fatto racconta chi sei, perché fai la differenza<br data-v-549314ac> e perché dovrebbero scegliere proprio te.</p></div></section><section class="investment-section" data-v-549314ac><div class="container" data-v-549314ac><h2 class="section-title" data-v-549314ac>🚀 Un investimento che si ripaga da solo</h2><p data-v-549314ac>Con un sito snello, efficace e senza costi ricorrenti,<br data-v-549314ac> il tuo business ottiene visibilità continua senza dipendere dai social o da campagne pubblicitarie.</p><p class="highlight-text" data-v-549314ac>🎁 E non serve un grande budget.<br data-v-549314ac> Il mio obiettivo è offrirti una soluzione professionale, sostenibile e adatta alla tua realtà.</p></div></section><section class="contact-section" data-v-549314ac>`);
  _push(ssrRenderComponent(_component_ContactForm, null, null, _parent));
  _push(`</section></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Services/smallServices.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const smallServices = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-549314ac"]]);
const _sfc_main$4 = defineComponent({
  name: "SmallBusinessLanding",
  setup() {
    const route = useRoute();
    const fromWebsite = ref(null);
    const formStatus = ref(null);
    const formData = reactive({
      name: "",
      email: "",
      message: ""
    });
    const errors = reactive({
      name: "",
      email: "",
      message: ""
    });
    onMounted(() => {
      if (route.query.from_website) {
        fromWebsite.value = route.query.from_website;
      }
    });
    const validateForm = () => {
      let isValid = true;
      errors.name = "";
      errors.email = "";
      errors.message = "";
      if (!formData.name) {
        errors.name = "Il nome è obbligatorio";
        isValid = false;
      }
      if (!formData.email) {
        errors.email = "L'email è obbligatoria";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Inserisci un'email valida";
        isValid = false;
      }
      if (!formData.message) {
        errors.message = "Il messaggio è obbligatorio";
        isValid = false;
      }
      return isValid;
    };
    const submitForm = async () => {
      if (!validateForm()) {
        return;
      }
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        formStatus.value = "success";
        formData.name = "";
        formData.email = "";
        formData.message = "";
        setTimeout(() => {
          formStatus.value = null;
        }, 5e3);
      } catch (error) {
        formStatus.value = "error";
      }
    };
    return {
      formData,
      errors,
      formStatus,
      fromWebsite,
      submitForm
    };
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "landing-page" }, _attrs))} data-v-7d43ae34><div class="hero-section" data-v-7d43ae34><div class="container" data-v-7d43ae34><h1 class="main-title" data-v-7d43ae34>Non basta essere online. Serve farsi notare.</h1><p class="intro-text" data-v-7d43ae34>Mi chiamo Davide De Simone.<br data-v-7d43ae34> Aiuto professionisti e piccole imprese a migliorare l&#39;immagine e far crescere il proprio business attraverso siti web veloci, eleganti e su misura.</p></div></div><section class="features-section" data-v-7d43ae34><div class="container" data-v-7d43ae34><h2 class="section-title" data-v-7d43ae34>✨ Perché oggi ti serve un sito statico</h2><p data-v-7d43ae34>Un sito statico non è un ripiego. È la scelta perfetta se vuoi:</p><div class="benefits-list" data-v-7d43ae34><div class="benefit-item" data-v-7d43ae34><span class="check-icon" data-v-7d43ae34>✅</span><p data-v-7d43ae34><strong data-v-7d43ae34>Velocità estrema:</strong> tempi di caricamento quasi istantanei → meno attesa = più clienti</p></div><div class="benefit-item" data-v-7d43ae34><span class="check-icon" data-v-7d43ae34>✅</span><p data-v-7d43ae34><strong data-v-7d43ae34>Massima sicurezza:</strong> nessun database = meno vulnerabilità</p></div><div class="benefit-item" data-v-7d43ae34><span class="check-icon" data-v-7d43ae34>✅</span><p data-v-7d43ae34><strong data-v-7d43ae34>Zero manutenzione tecnica:</strong> aggiornamenti semplici, nessun back-end complicato</p></div><div class="benefit-item" data-v-7d43ae34><span class="check-icon" data-v-7d43ae34>✅</span><p data-v-7d43ae34><strong data-v-7d43ae34>Costi contenuti:</strong> più valore, meno spese inutili</p></div><div class="benefit-item" data-v-7d43ae34><span class="check-icon" data-v-7d43ae34>✅</span><p data-v-7d43ae34><strong data-v-7d43ae34>Ottimizzazione SEO nativa:</strong> Google adora i siti puliti e veloci</p></div></div></div></section><section class="target-section" data-v-7d43ae34><div class="container" data-v-7d43ae34><h2 class="section-title" data-v-7d43ae34>🎯 Un sito per farti scegliere</h2><p data-v-7d43ae34>Un sito non è solo una vetrina.<br data-v-7d43ae34> È la prima impressione che un cliente ha della tua attività.<br data-v-7d43ae34> In pochi secondi decide se fidarsi di te o cliccare altrove.</p><p data-v-7d43ae34>Con il design giusto, i messaggi giusti e una navigazione fluida, possiamo:</p><ul class="advantages-list" data-v-7d43ae34><li data-v-7d43ae34>Trasmettere professionalità e autorevolezza</li><li data-v-7d43ae34>Rafforzare la credibilità del tuo brand</li><li data-v-7d43ae34>Attirare più contatti, più richieste, più clienti</li></ul></div></section><section class="services-section" data-v-7d43ae34><div class="container" data-v-7d43ae34><h2 class="section-title" data-v-7d43ae34>Cosa ti offro</h2><div class="services-grid" data-v-7d43ae34><div class="service-card" data-v-7d43ae34><div class="service-content" data-v-7d43ae34><h3 data-v-7d43ae34>Progettazione su misura</h3><p data-v-7d43ae34>Niente template fotocopia</p></div></div><div class="service-card" data-v-7d43ae34><div class="service-content" data-v-7d43ae34><h3 data-v-7d43ae34>Design responsive</h3><p data-v-7d43ae34>Moderno e intuitivo</p></div></div><div class="service-card" data-v-7d43ae34><div class="service-content" data-v-7d43ae34><h3 data-v-7d43ae34>SEO tecnica</h3><p data-v-7d43ae34>Per farti trovare su Google</p></div></div><div class="service-card" data-v-7d43ae34><div class="service-content" data-v-7d43ae34><h3 data-v-7d43ae34>Assistenza vera</h3><p data-v-7d43ae34>Anche dopo la pubblicazione</p></div></div></div></div></section><section class="psychology-section" data-v-7d43ae34><div class="container" data-v-7d43ae34><h2 class="section-title" data-v-7d43ae34>Psicologia del risultato</h2><p class="highlight-text" data-v-7d43ae34>Le persone non scelgono il migliore,<br data-v-7d43ae34> scelgono quello che comunica meglio.</p><p data-v-7d43ae34>Un sito ben fatto racconta chi sei, perché fai la differenza<br data-v-7d43ae34> e perché dovrebbero scegliere proprio te.</p></div></section><section class="investment-section" data-v-7d43ae34><div class="container" data-v-7d43ae34><h2 class="section-title" data-v-7d43ae34>🚀 Un investimento che si ripaga da solo</h2><p data-v-7d43ae34>Con un sito snello, efficace e senza costi ricorrenti,<br data-v-7d43ae34> il tuo business ottiene visibilità continua senza dipendere dai social o da campagne pubblicitarie.</p><p class="highlight-text" data-v-7d43ae34>🎁 E non serve un grande budget.<br data-v-7d43ae34> Il mio obiettivo è offrirti una soluzione professionale, sostenibile e adatta alla tua realtà.</p></div></section><section class="contact-section" data-v-7d43ae34><div class="container" data-v-7d43ae34><h2 class="section-title" data-v-7d43ae34>📩 Hai un&#39;attività e ti serve un sito fatto bene?</h2><p data-v-7d43ae34>Scrivimi. Ti rispondo senza impegno.<br data-v-7d43ae34> Lavoriamo insieme su qualcosa che funziona davvero.</p><form class="contact-form" data-v-7d43ae34><div class="form-group" data-v-7d43ae34><label for="name" data-v-7d43ae34>${ssrInterpolate(_ctx.$t("contact.name"))}</label><input type="text" id="name"${ssrRenderAttr("value", _ctx.formData.name)}${ssrRenderAttr("placeholder", _ctx.$t("contact.name"))} required data-v-7d43ae34>`);
  if (_ctx.errors.name) {
    _push(`<span class="error-message" data-v-7d43ae34>${ssrInterpolate(_ctx.errors.name)}</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="form-group" data-v-7d43ae34><label for="email" data-v-7d43ae34>${ssrInterpolate(_ctx.$t("contact.email"))}</label><input type="email" id="email"${ssrRenderAttr("value", _ctx.formData.email)}${ssrRenderAttr("placeholder", _ctx.$t("contact.email"))} required data-v-7d43ae34>`);
  if (_ctx.errors.email) {
    _push(`<span class="error-message" data-v-7d43ae34>${ssrInterpolate(_ctx.errors.email)}</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="form-group" data-v-7d43ae34><label for="message" data-v-7d43ae34>${ssrInterpolate(_ctx.$t("contact.message"))}</label><textarea id="message"${ssrRenderAttr("placeholder", _ctx.$t("contact.message"))} rows="5" required data-v-7d43ae34>${ssrInterpolate(_ctx.formData.message)}</textarea>`);
  if (_ctx.errors.message) {
    _push(`<span class="error-message" data-v-7d43ae34>${ssrInterpolate(_ctx.errors.message)}</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if (_ctx.fromWebsite) {
    _push(`<input type="hidden" name="from_website"${ssrRenderAttr("value", _ctx.fromWebsite)} data-v-7d43ae34>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button type="submit" class="btn submit-btn" data-v-7d43ae34>${ssrInterpolate(_ctx.$t("contact.send"))}</button>`);
  if (_ctx.formStatus) {
    _push(`<div class="form-message" data-v-7d43ae34>`);
    if (_ctx.formStatus === "success") {
      _push(`<div class="success-message" data-v-7d43ae34>${ssrInterpolate(_ctx.$t("contact.formSuccess"))}</div>`);
    } else {
      _push(`<!---->`);
    }
    if (_ctx.formStatus === "error") {
      _push(`<div class="error-message" data-v-7d43ae34>${ssrInterpolate(_ctx.$t("contact.formError"))}</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</form></div></section></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/WebProjects/SmallBusinessLanding.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const SmallBusinessLanding = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-7d43ae34"]]);
const _sfc_main$3 = defineComponent({
  name: "GiuliaSelvino"
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-detail-view" }, _attrs))} data-v-2344d12b><div class="container" data-v-2344d12b><div class="project-header" data-v-2344d12b><h1 class="project-title" data-v-2344d12b>${ssrInterpolate(_ctx.$t("projects.giuliaselvino.title"))}</h1>`);
  _push(ssrRenderComponent(_component_router_link, {
    to: "/projects",
    class: "back-button"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fas fa-arrow-left" data-v-2344d12b${_scopeId}></i> ${ssrInterpolate(_ctx.$t("common.backToProjects"))}`);
      } else {
        return [
          createVNode("i", { class: "fas fa-arrow-left" }),
          createTextVNode(" " + toDisplayString(_ctx.$t("common.backToProjects")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="project-content" data-v-2344d12b><section class="project-section" data-v-2344d12b><h2 data-v-2344d12b>${ssrInterpolate(_ctx.$t("projects.giuliaselvino.overview.title"))}</h2><p data-v-2344d12b>${ssrInterpolate(_ctx.$t("projects.giuliaselvino.overview.content"))}</p></section><div class="project-image-container" data-v-2344d12b><img src="https://images.unsplash.com/photo-1586336783984-ebacb89ab4d5" alt="Giulia Selvino Website" class="project-image" data-v-2344d12b><div class="image-caption" data-v-2344d12b>${ssrInterpolate(_ctx.$t("projects.giuliaselvino.image.caption"))}</div></div><div class="project-links-container" data-v-2344d12b><a${ssrRenderAttr("href", _ctx.$t("projects.giuliaselvino.link"))} target="_blank" rel="noopener noreferrer" class="project-link" data-v-2344d12b><i class="fas fa-external-link-alt" data-v-2344d12b></i> ${ssrInterpolate(_ctx.$t("projects.common.visitSite"))}</a></div><section class="project-section" data-v-2344d12b><h2 data-v-2344d12b>${ssrInterpolate(_ctx.$t("projects.giuliaselvino.features.title"))}</h2><ul class="features-list" data-v-2344d12b><!--[-->`);
  ssrRenderList(_ctx.$tm("projects.giuliaselvino.features.items"), (feature, index) => {
    _push(`<li data-v-2344d12b><i class="fas fa-check" data-v-2344d12b></i><span data-v-2344d12b>${ssrInterpolate(feature)}</span></li>`);
  });
  _push(`<!--]--></ul></section><section class="project-section" data-v-2344d12b><h2 data-v-2344d12b>${ssrInterpolate(_ctx.$t("projects.giuliaselvino.technologies.title"))}</h2><div class="tech-grid" data-v-2344d12b><!--[-->`);
  ssrRenderList(_ctx.$tm("projects.giuliaselvino.technologies.items"), (tech, index) => {
    _push(`<div class="tech-item" data-v-2344d12b><div class="tech-name" data-v-2344d12b>${ssrInterpolate(tech)}</div></div>`);
  });
  _push(`<!--]--></div></section><section class="project-section" data-v-2344d12b><h2 data-v-2344d12b>${ssrInterpolate(_ctx.$t("projects.giuliaselvino.challenges.title"))}</h2><p data-v-2344d12b>${ssrInterpolate(_ctx.$t("projects.giuliaselvino.challenges.content"))}</p></section><section class="project-section" data-v-2344d12b><h2 data-v-2344d12b>${ssrInterpolate(_ctx.$t("projects.giuliaselvino.outcomes.title"))}</h2><p data-v-2344d12b>${ssrInterpolate(_ctx.$t("projects.giuliaselvino.outcomes.content"))}</p></section></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/WebProjects/GiuliaSelvino.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const GiuliaSelvino = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-2344d12b"]]);
const _sfc_main$2 = defineComponent({
  name: "PrivacyPolicyView"
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "privacy-policy" }, _attrs))} data-v-895cc722><div class="container" data-v-895cc722><h1 class="page-title" data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.title"))}</h1><div class="policy-content" data-v-895cc722><section data-v-895cc722><h2 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.introduction.title"))}</h2><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.introduction.content"))}</p></section><section data-v-895cc722><h2 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.dataController.title"))}</h2><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.dataController.content"))}</p></section><section data-v-895cc722><h2 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.dataCollected.title"))}</h2><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.dataCollected.intro"))}</p><h3 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.dataCollected.usage.title"))}</h3><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.dataCollected.usage.content"))}</p><h3 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.dataCollected.cookies.title"))}</h3><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.dataCollected.cookies.content"))}</p><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.dataCollected.cookies.details"))}</p></section><section data-v-895cc722><h2 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.usageData.title"))}</h2><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.usageData.content"))}</p></section><section data-v-895cc722><h2 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.purposes.title"))}</h2><ul class="purposes-list" data-v-895cc722><li data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.purposes.items.maintenance"))}</li><li data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.purposes.items.analytics"))}</li><li data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.purposes.items.contact"))}</li></ul></section><section data-v-895cc722><h2 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.thirdParties.title"))}</h2><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.thirdParties.content"))}</p><ul data-v-895cc722><li data-v-895cc722><strong data-v-895cc722>Google Analytics:</strong> ${ssrInterpolate(_ctx.$t("privacy.thirdParties.analytics"))} <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.thirdParties.policy"))}</a></li></ul></section><section data-v-895cc722><h2 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.rights.title"))}</h2><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.rights.intro"))}</p><ul class="rights-list" data-v-895cc722><li data-v-895cc722><strong data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.rights.items.access.title"))}:</strong> ${ssrInterpolate(_ctx.$t("privacy.rights.items.access.content"))}</li><li data-v-895cc722><strong data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.rights.items.rectification.title"))}:</strong> ${ssrInterpolate(_ctx.$t("privacy.rights.items.rectification.content"))}</li><li data-v-895cc722><strong data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.rights.items.deletion.title"))}:</strong> ${ssrInterpolate(_ctx.$t("privacy.rights.items.deletion.content"))}</li><li data-v-895cc722><strong data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.rights.items.restriction.title"))}:</strong> ${ssrInterpolate(_ctx.$t("privacy.rights.items.restriction.content"))}</li><li data-v-895cc722><strong data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.rights.items.objection.title"))}:</strong> ${ssrInterpolate(_ctx.$t("privacy.rights.items.objection.content"))}</li><li data-v-895cc722><strong data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.rights.items.portability.title"))}:</strong> ${ssrInterpolate(_ctx.$t("privacy.rights.items.portability.content"))}</li></ul></section><section data-v-895cc722><h2 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.contact.title"))}</h2><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.contact.content"))}</p></section><section data-v-895cc722><h2 data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.updates.title"))}</h2><p data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.updates.content"))}</p><p class="last-updated" data-v-895cc722>${ssrInterpolate(_ctx.$t("privacy.updates.lastUpdated"))} April 23, 2023</p></section></div><div class="back-link" data-v-895cc722>`);
  _push(ssrRenderComponent(_component_router_link, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("common.backToHome"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("common.backToHome")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PrivacyPolicyView.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PrivacyPolicyView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-895cc722"]]);
const _sfc_main$1 = defineComponent({
  name: "CookiePolicyView",
  setup() {
    const store2 = useStore();
    const openCookieSettings = () => {
      store2.commit("setShowCookieSettings", true);
    };
    return {
      openCookieSettings
    };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "cookie-policy" }, _attrs))} data-v-83064f7b><div class="container" data-v-83064f7b><h1 class="page-title" data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.title"))}</h1><div class="policy-content" data-v-83064f7b><section data-v-83064f7b><h2 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.introduction.title"))}</h2><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.introduction.content"))}</p></section><section data-v-83064f7b><h2 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.whatAreCookies.title"))}</h2><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.whatAreCookies.content1"))}</p><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.whatAreCookies.content2"))}</p></section><section data-v-83064f7b><h2 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.title"))}</h2><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.intro"))}</p><h3 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.essential.title"))}</h3><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.essential.content"))}</p><p data-v-83064f7b><strong data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.purpose"))}:</strong> ${ssrInterpolate(_ctx.$t("cookies.typesUsed.essential.purpose"))}</p><p data-v-83064f7b><strong data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.provider"))}:</strong> ${ssrInterpolate(_ctx.$t("cookies.typesUsed.essential.provider"))}</p><p data-v-83064f7b><strong data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.duration"))}:</strong> ${ssrInterpolate(_ctx.$t("cookies.typesUsed.essential.duration"))}</p><h3 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.analytics.title"))}</h3><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.analytics.content"))}</p><p data-v-83064f7b><strong data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.purpose"))}:</strong> ${ssrInterpolate(_ctx.$t("cookies.typesUsed.analytics.purpose"))}</p><p data-v-83064f7b><strong data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.provider"))}:</strong> ${ssrInterpolate(_ctx.$t("cookies.typesUsed.analytics.provider"))}</p><p data-v-83064f7b><strong data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.typesUsed.duration"))}:</strong> ${ssrInterpolate(_ctx.$t("cookies.typesUsed.analytics.duration"))}</p></section><section data-v-83064f7b><h2 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.management.title"))}</h2><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.management.content1"))}</p><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.management.content2"))}</p><h3 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.management.browsers.title"))}</h3><ul data-v-83064f7b><li data-v-83064f7b><strong data-v-83064f7b>Chrome:</strong><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener" data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.management.browsers.chrome"))}</a></li><li data-v-83064f7b><strong data-v-83064f7b>Firefox:</strong><a href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener" data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.management.browsers.firefox"))}</a></li><li data-v-83064f7b><strong data-v-83064f7b>Safari:</strong><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener" data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.management.browsers.safari"))}</a></li><li data-v-83064f7b><strong data-v-83064f7b>Edge:</strong><a href="https://support.microsoft.com/help/4468242/microsoft-edge-browsing-data-and-privacy" target="_blank" rel="noopener" data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.management.browsers.edge"))}</a></li></ul></section><section data-v-83064f7b><h2 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.consent.title"))}</h2><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.consent.content"))}</p><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.consent.withdrawal"))}</p></section><section data-v-83064f7b><h2 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.contact.title"))}</h2><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.contact.content"))}</p></section><section data-v-83064f7b><h2 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.updates.title"))}</h2><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.updates.content"))}</p><p class="last-updated" data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.updates.lastUpdated"))} April 23, 2023</p></section><div class="cookie-preferences" data-v-83064f7b><h3 data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.preferences.title"))}</h3><p data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.preferences.content"))}</p><button class="btn-preferences" data-v-83064f7b>${ssrInterpolate(_ctx.$t("cookies.preferences.button"))}</button></div></div><div class="back-link" data-v-83064f7b>`);
  _push(ssrRenderComponent(_component_router_link, { to: "/" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("common.backToHome"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("common.backToHome")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/CookiePolicyView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CookiePolicyView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-83064f7b"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "not-found-page" }, _attrs))} data-v-5eda1e80><div class="not-found-content" data-v-5eda1e80><div class="error-code" data-v-5eda1e80>404</div><h1 data-v-5eda1e80>${ssrInterpolate(_ctx.$t("notfound.title"))}</h1><p data-v-5eda1e80>${ssrInterpolate(_ctx.$t("notfound.subtitle"))}</p>`);
  _push(ssrRenderComponent(_component_router_link, {
    to: "/",
    class: "home-button"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<i class="fas fa-home" data-v-5eda1e80${_scopeId}></i> ${ssrInterpolate(_ctx.$t("common.backToHome"))}`);
      } else {
        return [
          createVNode("i", { class: "fas fa-home" }),
          createTextVNode(" " + toDisplayString(_ctx.$t("common.backToHome")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/NotFound.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NotFound = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-5eda1e80"]]);
const routes = [
  {
    path: "/",
    name: "home",
    component: SinglePageView,
    meta: {
      title: "Home",
      description: "Davide De Simone - Electronics enthusiast and web developer from Pisa, Italy"
    }
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsView,
    meta: {
      title: "Projects",
      description: "Explore my portfolio of web development, electronics, and other projects I've worked on"
    }
  },
  {
    path: "/projects/electric_fence",
    name: "project-electric-fence",
    component: electric_fence,
    meta: {
      title: "Electric Fence",
      description: "Electric fence for wildlife control, specifically designed to keep wild boars away from crops",
      projectId: 5
    }
  },
  {
    path: "/projects/tx_cw",
    name: "project-tx-cw",
    component: tx_cw,
    meta: {
      title: "QRP CW Transmitter",
      description: "QRP transmitter for Morse code using DDS (Direct Digital Synthesis) technology",
      projectId: 4
    }
  },
  {
    path: "/projects/small-business",
    name: "SmallBusinessServices",
    component: SmallBusinessServices,
    meta: {
      title: "Web Design for Small Businesses",
      description: "Professional web design services for small businesses - custom design, responsive layouts, and SEO optimization",
      projectId: 1
    }
  },
  {
    path: "/landing/small-services-business",
    name: "SmallBusinessLandingd",
    component: smallServices,
    meta: {
      title: "Web Design for Small Businesses",
      description: "Professional web design services for small businesses - custom design, responsive layouts, and SEO optimization",
      projectId: 1
    }
  },
  {
    path: "/landing/small-business",
    name: "SmallBusinessLanding",
    component: SmallBusinessLanding,
    meta: {
      title: "Web Design for Small Businesses",
      description: "Professional web design services for small businesses - custom design, responsive layouts, and SEO optimization",
      projectId: 1
    }
  },
  {
    path: "/projects/giulia-selvino",
    name: "GiuliaSelvino",
    component: GiuliaSelvino,
    meta: {
      title: "Giulia Selvino - Portfolio Website",
      description: "Professional portfolio website for a tattoo artist based in Italy with responsive design and appointment booking system",
      projectId: 2
    }
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: PrivacyPolicyView,
    meta: {
      title: "Privacy Policy",
      description: "Privacy Policy of Davide De Simone website"
    }
  },
  {
    path: "/cookie-policy",
    name: "cookie-policy",
    component: CookiePolicyView,
    meta: {
      title: "Cookie Policy",
      description: "Cookie Policy of Davide De Simone website"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "404 - Page not found",
      description: "La pagina che stai cercando non esiste o è stata spostata."
    }
  }
];
let isAnalyticsInitialized = false;
const loadGoogleAnalytics = () => {
  if (isAnalyticsInitialized) return;
  const measurementId = "G-PM01CNB8WL";
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", /* @__PURE__ */ new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
    // GDPR compliance
    cookie_flags: "SameSite=None;Secure",
    // Cookie security
    send_page_view: false
    // We'll handle page views manually
  });
  isAnalyticsInitialized = true;
};
const trackPageView = (path, title) => {
  if (!isAnalyticsInitialized || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    send_to: "G-PM01CNB8WL"
  });
};
const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window === "undefined" || !isAnalyticsInitialized || !window.gtag) return;
  window.gtag("event", eventName, eventParams);
};
const disableAnalytics = () => {
  window["ga-disable-G-PM01CNB8WL"] = true;
  document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "_ga_" + "G-PM01CNB8WL".replace("G-", "") + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  if (isAnalyticsInitialized) {
    isAnalyticsInitialized = false;
  }
};
const analyticsService = {
  loadGoogleAnalytics,
  trackPageView,
  trackEvent,
  disableAnalytics
};
const defaultLocale$1 = typeof window !== "undefined" ? localStorage.getItem("language") || "it" : "it";
const store = createStore({
  state: {
    isDarkMode: true,
    currentLanguage: defaultLocale$1,
    cookieConsent: {
      consentGiven: false,
      analytics: false
    },
    showCookieSettings: false,
    projects: [
      // Web Projects
      {
        id: 1,
        title: "Web Design for Small Businesses",
        description: "projects.smallbusiness.description",
        technologies: ["Vue.js", "HTML5/CSS3", "Responsive Design", "SEO"],
        image: "/img/websites/building_websites.jpg",
        link: "/projects/small-business",
        category: "web"
      },
      {
        id: 2,
        title: "Giulia Selvino - Website",
        exludeInternalLink: false,
        description: "projects.giuliaselvino.description",
        technologies: ["Vuejs", "Custom Theme", "Responsive Design", "SEO", "GitHub Pages", "Mini Games"],
        image: "/img/websites/giuliaselvinowebsite.webp",
        link: "/projects/giulia-selvino",
        category: "web",
        externalLink: "https://giuliaselvino.it"
      },
      {
        id: 3,
        exludeInternalLink: false,
        title: "Ilaria Melchioni - Website",
        description: "projects.ilariamelchioni.description",
        technologies: ["Vuejs", "Custom Theme", "Responsive Design", "SEO", "GitHub Pages"],
        image: "/img/websites/ilariamelchioniwebsite.webp",
        link: "/projects/ilaria-melchioni",
        category: "web",
        externalLink: "https://ilariamelchioni.github.io"
      },
      {
        id: 6,
        exludeInternalLink: false,
        title: "Luca Mutone - Website",
        description: "projects.lucamautone.description",
        technologies: ["Vuejs", "Custom Theme", "Responsive Design", "SEO", "GitHub Pages"],
        image: "/img/websites/lucamautone.webp",
        link: "/projects/luca-mautone",
        category: "web",
        externalLink: "https://davidedesimone.dev/lucamautone/"
      },
      {
        id: 4,
        exludeInternalLink: false,
        title: "Bess Emulator",
        description: "projects.bessemulator.description",
        technologies: ["Vuejs", "MQTT", "Responsive Design", "Emulation", "WebSocket", "Modbus"],
        image: "/img/websites/bess_emulator.webp",
        link: "/projects/bess-simulator",
        category: "web",
        externalLink: "https://davidedesimone.dev/bess-simulator/"
      },
      // Electronics Projects
      {
        id: 4,
        title: "QRP CW Transmitter",
        description: "projects.txcw.description",
        technologies: ["DDS", "PIC Microcontroller", "RF", "Electronic Design"],
        image: "/img/projects/imp_trafo.jpeg",
        link: "/projects/tx_cw",
        category: "electronics"
      },
      {
        id: 5,
        title: "Electric Fence",
        description: "projects.electricfence.description",
        technologies: ["High Voltage", "Transistors", "Battery Operation", "Wildlife Control"],
        image: "/img/projects/electric_fence.jpeg",
        link: "/projects/electric_fence",
        category: "electronics"
      }
    ],
    skills: [
      {
        category: "skills.frontend",
        items: [
          { name: "Vue.js", level: 95 },
          { name: "JavaScript/ES6+", level: 90 },
          { name: "HTML5/CSS3", level: 88 },
          { name: "SCSS/SASS", level: 85 }
        ]
      },
      {
        category: "skills.backend",
        items: [
          { name: "Node.js", level: 92 },
          { name: "Laravel", level: 90 },
          { name: "Symfony", level: 75 },
          { name: "PHP", level: 88 }
        ]
      },
      {
        category: "skills.devops",
        items: [
          { name: "Docker", level: 90 },
          { name: "CI/CD", level: 85 },
          { name: "Microservices", level: 88 },
          { name: "Cloud Services", level: 80 }
        ]
      },
      {
        category: "skills.other",
        items: [
          { name: "Python", level: 85 },
          { name: "C (PIC Microcontrollers)", level: 78 },
          { name: "Electronics", level: 88 },
          { name: "Data Analysis", level: 80 }
        ]
      }
    ]
  },
  mutations: {
    setLanguage(state, lang) {
      state.currentLanguage = lang;
      localStorage.setItem("language", lang);
    },
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setCookieConsent(state, { consentGiven, analytics }) {
      state.cookieConsent.consentGiven = consentGiven;
      state.cookieConsent.analytics = analytics;
    },
    setShowCookieSettings(state, value) {
      state.showCookieSettings = value;
    }
  },
  actions: {
    changeLanguage({ commit }, lang) {
      commit("setLanguage", lang);
    },
    toggleTheme({ commit }) {
      commit("toggleDarkMode");
    },
    initializeAnalytics({ state }) {
      if (state.cookieConsent.analytics) {
        analyticsService.loadGoogleAnalytics();
      }
    },
    trackPageView({ state }, { path, title }) {
      if (state.cookieConsent.analytics) {
        analyticsService.trackPageView(path, title);
      }
    },
    trackEvent({ state }, { name, params }) {
      if (state.cookieConsent.analytics) {
        analyticsService.trackEvent(name, params);
      }
    },
    disableAnalytics({ commit }) {
      analyticsService.disableAnalytics();
      commit("setCookieConsent", { consentGiven: true, analytics: false });
    }
  },
  getters: {
    currentLanguage: (state) => state.currentLanguage,
    isDarkMode: (state) => state.isDarkMode,
    getAllProjects: (state) => state.projects,
    getAllSkills: (state) => state.skills,
    cookieConsent: (state) => state.cookieConsent,
    showCookieSettings: (state) => state.showCookieSettings
  }
});
const en = {
  notfound: {
    title: "Page not found",
    subtitle: "The page that you are looking for doesn't exist or has been moved."
  },
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact"
  },
  hero: {
    greeting: "Hello, I'm",
    name: "Davide De Simone",
    title: "Electronics Enthusiast & Web Developer",
    description: "From circuit design to web applications",
    ctaButton: "View My Work"
  },
  about: {
    title: "About Me",
    intro: "Electronics has been my passion since childhood. My curiosity led me to learn how to use laboratory electronic instrumentation and to design and assemble circuits.",
    journey: "I started with PIC microcontrollers (from Microchip), developing programming skills in C, and later moved to Python for laboratory data analysis using libraries such as Matplotlib, NumPy, and SciPy.",
    current: "Today, I develop web applications with Laravel, Node.js, and Vue.js. I have DevOps expertise and typically oversee projects from prototyping to production deployment. I specialize in building microservices architectures and leveraging Docker for containerization.",
    projects: "I have worked on projects involving technologies such as RabbitMQ, MQTT, Modbus, Cassandra DB, MongoDB, Symfony, Capacitor, and more. I have integrated third-party APIs and developed microservices applications using Node.js.",
    closing: "I am always looking for challenges and stimulating projects where, together with the team, I can enhance my skills and contribute with innovative solutions."
  },
  skills: {
    title: "Skills",
    subtitle: "Technologies I work with",
    frontend: "Frontend",
    backend: "Backend",
    devops: "DevOps",
    other: "Other Skills"
  },
  experience: {
    title: "Experience",
    subtitle: "My professional journey",
    job1: {
      title: "Senior Full Stack Developer and Analyst",
      company: "Holocron",
      period: "2022 - Present",
      description: "Developing microservices-based applications with Node.js, Vue.js, Laravel and Docker. Managing the entire development lifecycle from prototype to production deployment."
    },
    job2: {
      title: "Web Developer",
      company: "Eidos srl",
      period: "2021 - 2022",
      description: "Created web applications using Symfony and Vue.js. Implemented RESTful APIs and integrated third-party services."
    }
  },
  projects: {
    title: "Projects",
    subtitle: "Selected work I've done",
    viewProject: "View Project",
    viewAllProjects: "View All Projects",
    viewCategory: "View Category",
    viewDetails: "View Details",
    viewLive: "View Live Site",
    overview: "Project Overview",
    technologies: "Technologies Used",
    features: "Key Features",
    screenshots: "Screenshots",
    approach: "Approach",
    challenges: "Challenges & Solutions",
    results: "Results",
    process: "My Process",
    services: "Services Offered",
    examples: "Project Examples",
    noProjects: "No projects found in this category.",
    categories: {
      all: "All Projects",
      web: "Web Development",
      electronics: "Electronics",
      other: "Other Projects"
    },
    smallbusiness: {
      title: "Web Design for Small Businesses",
      description: "I specialize in creating professional websites for small businesses. With my services, you get a custom design that perfectly represents your brand, optimized for search engines and responsive across all devices.",
      services: {
        design: "Custom Design",
        designDesc: "Unique and professional design that reflects your brand identity and resonates with your target audience.",
        responsive: "Responsive Design",
        responsiveDesc: "Your website will look great and function perfectly on all devices - from desktop computers to smartphones.",
        seo: "SEO Optimization",
        seoDesc: "Built with search engines in mind to help your business get found online by potential customers.",
        hosting: "Hosting & Maintenance",
        hostingDesc: "Reliable hosting solutions and ongoing maintenance to keep your website secure and up-to-date."
      },
      examples: {
        giulia: "Tattoo artist portfolio with booking system",
        ilaria: "Art therapist portfolio with service showcase"
      },
      process: {
        discovery: "Discovery",
        discoveryDesc: "We start by understanding your business, goals, target audience, and what makes you unique.",
        design: "Design",
        designDesc: "Creating wireframes and visual designs that align with your brand identity and business objectives.",
        development: "Development",
        developmentDesc: "Building your website with clean, efficient code that ensures fast loading times and smooth functionality.",
        launch: "Launch",
        launchDesc: "Testing across all devices and browsers before launching your site to the public.",
        support: "Support & Growth",
        supportDesc: "Ongoing maintenance, updates, and support to help your business grow online."
      },
      cta: {
        title: "Ready to take your business online?",
        description: "Let's create a professional website that will help your business grow.",
        button: "Get in Touch"
      },
      approach: "I take a collaborative approach to web design, working closely with small business owners to create websites that truly represent their brand and meet their specific business needs.",
      challenges: "Small businesses often face unique challenges online, from limited budgets to competition with larger companies. I focus on creating efficient, targeted websites that maximize impact while remaining cost-effective.",
      results: "My clients typically see increased customer engagement, improved brand perception, and better conversion rates after launching their new websites."
    },
    giuliaselvino: {
      title: "Portfolio Website",
      description: "A professional portfolio website for a tattoo artist based in Italy. The site features a responsive design, image gallery, contact form, and appointment booking system implemented with WordPress."
    },
    bessemulator: {
      description: "Bess Emulator is a web-based tool for emulating Modbus register queries via MQTT. Built with Vue.js, it allows users to simulate and test Modbus communication in a user-friendly interface."
    },
    ilariamelchioni: {
      title: "Portfolio Website",
      description: null
    },
    txcw: {
      description: "QRP transmitter for Morse code using DDS (Direct Digital Synthesis) technology. Built with a PIC18F4550 microcontroller and Analog Device AD9850 chip."
    },
    electricfence: {
      description: "Electric fence for wildlife control, specifically designed to keep wild boars away from crops. Built with transistors and optimized for low power consumption with battery operation."
    },
    iot: {
      description: "IoT system for real-time monitoring using MQTT protocol. Frontend built with Vue.js, backend with Laravel, and data stored in Cassandra DB."
    },
    lab: {
      description: "Custom software for laboratory data analysis and visualization. Built with Python using scientific libraries like NumPy, SciPy, and Matplotlib."
    },
    mobile: {
      description: "Cross-platform mobile application built with Vue.js and Capacitor. Backend services implemented with Node.js."
    },
    ecommerce: {
      description: "Full-featured e-commerce platform with inventory management, payment processing, and customer management. Built with Laravel, Vue.js, MySQL, and Redis."
    },
    website: {
      description: "Complete redesign of a company website with modern UI/UX principles, responsive design, and interactive elements using HTML5, CSS3, and JavaScript."
    },
    cms: {
      description: "Custom content management system built from scratch with PHP and MySQL, featuring user roles, media management, and content versioning."
    },
    greenhouse: {
      description: "Automated greenhouse control system using Arduino microcontrollers. Features temperature, humidity, and soil moisture sensing with automated irrigation."
    },
    homeautomation: {
      description: "Home automation system based on Raspberry Pi that integrates various sensors and actuators. Features remote control via mobile app and voice commands."
    },
    drone: {
      description: "Custom flight controller for a quadcopter drone using STM32 microcontroller. Implements PID control loops for stable flight and sensor fusion algorithms."
    },
    audio: {
      description: "Desktop digital audio workstation application built with C++ and Qt. Features multi-track recording, effects processing, and MIDI sequencing."
    },
    ml: {
      description: "Machine learning research project focused on computer vision. Implemented various neural network architectures for image classification and object detection."
    }
  },
  contact: {
    title: "Contact",
    subtitle: "Let's work together",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send Message",
    formSuccess: "Your message has been sent successfully!",
    formError: "There was an error sending your message. Please try again.",
    nameRequired: "Name is required",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email",
    messageRequired: "Message is required",
    privacy: "I accept the",
    privacyPolicy: "Privacy Policy",
    privacyRequired: "You must accept the Privacy Policy to send the message.",
    privacyInvalid: "Invalid Privacy Policy acceptance.",
    messageSentTitle: "Message sent!",
    messageSentText: "Your message has been successfully sent.",
    messageSentToText: "You will be contacted shortly at the following email:",
    close: "Close"
  },
  footer: {
    allRightsReserved: "All rights reserved.",
    builtWith: "Built with Vue.js",
    privacyPolicy: "Privacy Policy",
    cookiePolicy: "Cookie Policy",
    cookieSettings: "Cookie Settings"
  },
  cookieConsent: {
    title: "Cookie Consent",
    message: "This website uses cookies to improve your browsing experience and to analyze our traffic. You can choose which cookies you want to accept.",
    acceptAll: "Accept All",
    essential: "Accept Essential Only",
    settings: "Cookie Settings",
    settingsTitle: "Cookie Preferences",
    essentialDesc: "These cookies are necessary for the website to function properly and cannot be disabled.",
    analytics: "Analytics Cookies",
    analyticsDesc: "These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously.",
    save: "Save Settings"
  },
  privacy: {
    title: "Privacy Policy",
    introduction: {
      title: "Introduction",
      content: "This Privacy Policy describes how your personal information is collected, used, and shared when you visit our website."
    },
    dataController: {
      title: "Data Controller",
      content: "The Data Controller of your personal information is Davide De Simone, based in Pisa, Italy. If you have any questions or concerns about this Privacy Policy or our data practices, please contact us using the contact form on this website."
    },
    dataCollected: {
      title: "Information We Collect",
      intro: "When you visit the website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.",
      usage: {
        title: "Usage Data",
        content: "We may also collect information about how you interact with the website, including the pages you visit, the links you click, and other actions you take on the website."
      },
      cookies: {
        title: "Cookies",
        content: "We use cookies and similar tracking technologies to track the activity on our website and hold certain information.",
        details: "Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
      }
    },
    usageData: {
      title: "How We Use Your Information",
      content: "We use the information we collect about you to provide, maintain, and improve our website, to monitor the usage of our service, and to detect, prevent, and address technical issues."
    },
    purposes: {
      title: "Purposes for Processing Personal Data",
      items: {
        maintenance: "To maintain and improve our website",
        analytics: "To analyze how our website is used and improve user experience",
        contact: "To respond to your communications or inquiries"
      }
    },
    thirdParties: {
      title: "Third-Party Service Providers",
      content: "We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, or assist us in analyzing how our website is used.",
      analytics: "We use Google Analytics to help us understand how our customers use the site. You can read more about how Google uses your Personal Information here:",
      policy: "Google Privacy Policy"
    },
    rights: {
      title: "Your Rights",
      intro: "Under the General Data Protection Regulation (GDPR), you have certain rights regarding your personal data:",
      items: {
        access: {
          title: "Right to Access",
          content: "You have the right to request copies of your personal data."
        },
        rectification: {
          title: "Right to Rectification",
          content: "You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete."
        },
        deletion: {
          title: "Right to Erasure",
          content: "You have the right to request that we erase your personal data, under certain conditions."
        },
        restriction: {
          title: "Right to Restriction of Processing",
          content: "You have the right to request that we restrict the processing of your personal data, under certain conditions."
        },
        objection: {
          title: "Right to Object",
          content: "You have the right to object to our processing of your personal data, under certain conditions."
        },
        portability: {
          title: "Right to Data Portability",
          content: "You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions."
        }
      }
    },
    contact: {
      title: "Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at [your email]."
    },
    updates: {
      title: "Changes to This Privacy Policy",
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
      lastUpdated: "Last updated:"
    }
  },
  cookies: {
    title: "Cookie Policy",
    introduction: {
      title: "Introduction",
      content: "This Cookie Policy explains what cookies are and how we use them on our website. By using our website, you consent to the use of cookies in accordance with this policy."
    },
    whatAreCookies: {
      title: "What Are Cookies",
      content1: "Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.",
      content2: 'Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you close your browser, while session cookies are deleted when you close your browser.'
    },
    typesUsed: {
      title: "Types of Cookies We Use",
      intro: "We use different types of cookies for different reasons:",
      purpose: "Purpose",
      provider: "Provider",
      duration: "Duration",
      essential: {
        title: "Essential Cookies",
        content: "These cookies are necessary for the website to function properly and cannot be switched off in our systems.",
        purpose: "To enable basic functions like page navigation and access to secure areas of the website",
        provider: "Our website",
        duration: "Session/Persistent"
      },
      analytics: {
        title: "Analytics Cookies",
        content: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our website.",
        purpose: "To collect anonymous statistical information about how visitors use our website",
        provider: "Google Analytics",
        duration: "2 years"
      }
    },
    management: {
      title: "How to Manage Cookies",
      content1: "Most web browsers allow you to control cookies through their settings. You can refuse the use of cookies by selecting the appropriate settings on your browser.",
      content2: "However, please note that if you do this, you may not be able to use the full functionality of this website.",
      browsers: {
        title: "Browser-specific instructions:",
        chrome: "Manage cookies in Chrome",
        firefox: "Manage cookies in Firefox",
        safari: "Manage cookies in Safari",
        edge: "Manage cookies in Edge"
      }
    },
    consent: {
      title: "Your Consent",
      content: "By using our website, you consent to the use of essential cookies. For non-essential cookies, we will only use them if you have given your consent.",
      withdrawal: 'You can withdraw your consent at any time by clicking on the "Cookie Settings" link in the footer of our website.'
    },
    contact: {
      title: "Contact Us",
      content: "If you have any questions about our Cookie Policy, please contact us at [your email]."
    },
    updates: {
      title: "Changes to This Cookie Policy",
      content: "We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.",
      lastUpdated: "Last updated:"
    },
    preferences: {
      title: "Cookie Preferences",
      content: "You can change your cookie preferences at any time.",
      button: "Manage Cookie Settings"
    }
  },
  common: {
    backToHome: "Back to Home",
    backToProjects: "Back to Projects",
    projectNotFound: "Project not found"
  }
};
const it = {
  notfound: {
    title: "Pagina non trovata",
    subtitle: "La pagina che stai cercando non esiste o è stata spostata."
  },
  nav: {
    home: "Home",
    about: "Chi Sono",
    skills: "Competenze",
    experience: "Esperienza",
    projects: "Progetti",
    contact: "Contatti"
  },
  hero: {
    greeting: "Ciao, sono",
    name: "Davide De Simone",
    title: "Appassionato di Elettronica & Sviluppatore Web",
    description: "Dal design di circuiti alle applicazioni web",
    ctaButton: "Vedi i Miei Lavori"
  },
  about: {
    title: "Chi Sono",
    intro: "L'elettronica è la mia passione fin dall'infanzia. La mia curiosità mi ha portato a imparare ad utilizzare la strumentazione elettronica di laboratorio e a progettare e assemblare circuiti.",
    journey: "Ho iniziato con i microcontrollori PIC (di Microchip), sviluppando competenze di programmazione in C, e successivamente mi sono spostato su Python per l'analisi dati di laboratorio utilizzando librerie come Matplotlib, NumPy e SciPy.",
    current: "Oggi sviluppo applicazioni web con Laravel, Node.js e Vue.js. Ho competenze DevOps e tipicamente supervisiono i progetti dal prototipo al deployment in produzione. Mi specializzo nella creazione di architetture di microservizi e nell'utilizzo di Docker per la containerizzazione.",
    projects: "Ho lavorato a progetti che coinvolgono tecnologie come RabbitMQ, MQTT, Modbus, Cassandra DB, MongoDB, Symfony, Capacitor e altro. Ho integrato API di terze parti e sviluppato applicazioni di microservizi utilizzando Node.js.",
    closing: "Sono sempre alla ricerca di sfide e progetti stimolanti dove, insieme al team, posso migliorare le mie competenze e contribuire con soluzioni innovative."
  },
  skills: {
    title: "Competenze",
    subtitle: "Tecnologie con cui lavoro",
    frontend: "Frontend",
    backend: "Backend",
    devops: "DevOps",
    other: "Altre Competenze"
  },
  experience: {
    title: "Esperienza",
    subtitle: "Il mio percorso professionale",
    job1: {
      title: "Senior Full Stack Developer e Analista",
      company: "Holocron srl",
      period: "2022 - Presente",
      description: "Sviluppo di applicazioni basate su microservizi con Node.js, Vue.js, Laravel e Docker. Gestione dell'intero ciclo di sviluppo dal prototipo al deployment in produzione."
    },
    job2: {
      title: "Web Developer",
      company: "Eidos srl",
      period: "2021 - 2022",
      description: "Creazione di applicazioni web utilizzando Symfony e Vue.js. Implementazione di API RESTful e integrazione di servizi di terze parti."
    }
  },
  projects: {
    title: "Progetti",
    subtitle: "Lavori selezionati che ho realizzato",
    viewProject: "Vedi Progetto",
    viewAllProjects: "Vedi Tutti i Progetti",
    viewCategory: "Vedi Categoria",
    viewDetails: "Vedi Dettagli",
    viewLive: "Visita il Sito",
    overview: "Panoramica del Progetto",
    technologies: "Tecnologie Utilizzate",
    features: "Caratteristiche Principali",
    screenshots: "Screenshot",
    approach: "Approccio",
    challenges: "Sfide e Soluzioni",
    results: "Risultati",
    process: "Il Mio Processo",
    services: "Servizi Offerti",
    examples: "Esempi di Progetti",
    noProjects: "Nessun progetto trovato in questa categoria.",
    categories: {
      all: "Tutti i Progetti",
      web: "Sviluppo Web",
      electronics: "Elettronica",
      other: "Altri Progetti"
    },
    smallbusiness: {
      title: "Web Design per Piccole Imprese",
      description: "Mi specializzo nella creazione di siti web professionali per piccole imprese. Con i miei servizi, ottieni un design personalizzato che rappresenta perfettamente il tuo brand, ottimizzato per i motori di ricerca e responsive su tutti i dispositivi.",
      services: {
        design: "Design Personalizzato",
        designDesc: "Design unico e professionale che riflette l'identità del tuo brand e risuona con il tuo pubblico target.",
        responsive: "Design Responsive",
        responsiveDesc: "Il tuo sito web sarà esteticamente gradevole e funzionerà perfettamente su tutti i dispositivi - dai computer desktop agli smartphone.",
        seo: "Ottimizzazione SEO",
        seoDesc: "Realizzato tenendo conto dei motori di ricerca per aiutare la tua azienda ad essere trovata online dai potenziali clienti.",
        hosting: "Hosting e Manutenzione",
        hostingDesc: "Soluzioni di hosting affidabili e manutenzione continua per mantenere il tuo sito web sicuro e aggiornato."
      },
      examples: {
        giulia: "Portfolio di tatuatrice con sistema di prenotazione",
        ilaria: "Portfolio di arte-terapeuta con presentazione dei servizi"
      },
      process: {
        discovery: "Scoperta",
        discoveryDesc: "Iniziamo comprendendo la tua attività, gli obiettivi, il pubblico target e ciò che ti rende unico.",
        design: "Design",
        designDesc: "Creazione di wireframe e design visivi allineati con l'identità del tuo brand e gli obiettivi aziendali.",
        development: "Sviluppo",
        developmentDesc: "Costruzione del tuo sito web con codice pulito ed efficiente che garantisce tempi di caricamento veloci e funzionalità fluide.",
        launch: "Lancio",
        launchDesc: "Test su tutti i dispositivi e browser prima di lanciare il tuo sito al pubblico.",
        support: "Supporto e Crescita",
        supportDesc: "Manutenzione continua, aggiornamenti e supporto per aiutare la tua attività a crescere online."
      },
      cta: {
        title: "Pronto a portare la tua attività online?",
        description: "Creiamo insieme un sito web professionale che aiuterà la tua attività a crescere.",
        button: "Contattami"
      },
      approach: "Adotto un approccio collaborativo al web design, lavorando a stretto contatto con i proprietari di piccole imprese per creare siti web che rappresentino veramente il loro brand e soddisfino le loro specifiche esigenze aziendali.",
      challenges: "Le piccole imprese spesso affrontano sfide uniche online, da budget limitati alla concorrenza con aziende più grandi. Mi concentro sulla creazione di siti web efficienti e mirati che massimizzano l'impatto rimanendo economicamente vantaggiosi.",
      results: "I miei clienti in genere vedono un aumento del coinvolgimento dei clienti, una migliore percezione del brand e tassi di conversione più elevati dopo il lancio dei loro nuovi siti web."
    },
    giuliaselvino: {
      title: "Sito Web Portfolio",
      description: "Un sito web portfolio professionale per un'educatrice con sede in Italia."
    },
    bessemulator: {
      description: "Emulatore di Bess Realizzato con Vue.js per emulare l'interrogazione dei registri Modbus via MQTT."
    },
    ilariamelchioni: {
      title: "Sito Web Portfolio",
      description: "Sito web portfolio per una psicologa/psicoterapeuta che mostra il suo lavoro, la sua filosofia e i suoi servizi. Realizzato con Vue.js e distribuito su GitHub Pages."
    },
    txcw: {
      description: "Trasmettitore QRP per codice Morse utilizzando la tecnologia DDS (Direct Digital Synthesis). Realizzato con un microcontrollore PIC18F4550 e chip AD9850 di Analog Device."
    },
    electricfence: {
      description: "Recinto elettrico per il controllo della fauna selvatica, progettato specificamente per tenere lontani i cinghiali dalle colture. Costruito con transistor e ottimizzato per un basso consumo energetico con funzionamento a batteria."
    },
    iot: {
      description: "Sistema IoT per il monitoraggio in tempo reale utilizzando il protocollo MQTT. Frontend costruito con Vue.js, backend con Laravel e dati memorizzati in Cassandra DB."
    },
    lab: {
      description: "Software personalizzato per l'analisi e la visualizzazione dei dati di laboratorio. Costruito con Python utilizzando librerie scientifiche come NumPy, SciPy e Matplotlib."
    },
    mobile: {
      description: "Applicazione mobile cross-platform costruita con Vue.js e Capacitor. Servizi backend implementati con Node.js."
    },
    ecommerce: {
      description: "Piattaforma e-commerce completa con gestione inventario, elaborazione pagamenti e gestione clienti. Realizzata con Laravel, Vue.js, MySQL e Redis."
    },
    website: {
      description: "Ridisegno completo di un sito web aziendale con principi moderni di UI/UX, design responsive ed elementi interattivi utilizzando HTML5, CSS3 e JavaScript."
    },
    cms: {
      description: "Sistema di gestione dei contenuti personalizzato costruito da zero con PHP e MySQL, con ruoli utente, gestione dei media e versioning dei contenuti."
    },
    greenhouse: {
      description: "Sistema di controllo automatizzato per serra utilizzando microcontrollori Arduino. Include sensori di temperatura, umidità e umidità del suolo con irrigazione automatizzata."
    },
    homeautomation: {
      description: "Sistema domotico basato su Raspberry Pi che integra vari sensori e attuatori. Include controllo remoto tramite app mobile e comandi vocali."
    },
    drone: {
      description: "Controllore di volo personalizzato per drone quadricottero utilizzando microcontrollore STM32. Implementa loop di controllo PID per volo stabile e algoritmi di fusione dei sensori."
    },
    audio: {
      description: "Applicazione desktop per workstation audio digitale costruita con C++ e Qt. Include registrazione multi-traccia, elaborazione effetti e sequencing MIDI."
    },
    ml: {
      description: "Progetto di ricerca sull'apprendimento automatico concentrato sulla visione artificiale. Implementazione di varie architetture di reti neurali per classificazione delle immagini e rilevamento degli oggetti."
    }
  },
  contact: {
    title: "Contatti",
    subtitle: "Lavoriamo insieme",
    name: "Nome",
    email: "Email",
    message: "Messaggio",
    send: "Invia Messaggio",
    formSuccess: "Il tuo messaggio è stato inviato con successo!",
    formError: "Si è verificato un errore durante l'invio del messaggio. Riprova.",
    nameRequired: "Il nome è obbligatorio",
    emailRequired: "L'email è obbligatoria",
    emailInvalid: "Inserisci un'email valida",
    messageRequired: "Il messaggio è obbligatorio",
    privacy: "Accetto la",
    privacyPolicy: "Privacy Policy",
    privacyRequired: "Devi accettare la Privacy Policy per inviare il messaggio.",
    privacyInvalid: "Accettazione della Privacy Policy non valida.",
    messageSentTitle: "Messaggio inviato!",
    messageSentText: "Il tuo messaggio è stato inviato correttamente.",
    messageSentToText: "Verrai ricontattato a breve alla seguente email:",
    close: "Chiudi"
  },
  footer: {
    allRightsReserved: "Tutti i diritti riservati.",
    privacyPolicy: "Informativa sulla Privacy",
    cookiePolicy: "Politica dei Cookie",
    cookieSettings: "Impostazioni Cookie"
  },
  cookieConsent: {
    title: "Consenso Cookie",
    message: "Questo sito utilizza cookie per migliorare la tua esperienza di navigazione e per analizzare il nostro traffico. Puoi scegliere quali cookie accettare.",
    acceptAll: "Accetta Tutti",
    essential: "Solo Essenziali",
    settings: "Impostazioni Cookie",
    settingsTitle: "Preferenze Cookie",
    essentialDesc: "Questi cookie sono necessari per il corretto funzionamento del sito e non possono essere disattivati.",
    analytics: "Cookie Analitici",
    analyticsDesc: "Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito raccogliendo e riportando informazioni in modo anonimo.",
    save: "Salva Impostazioni"
  },
  privacy: {
    title: "Informativa sulla Privacy",
    introduction: {
      title: "Introduzione",
      content: "Questa Informativa sulla Privacy descrive come le tue informazioni personali vengono raccolte, utilizzate e condivise quando visiti il nostro sito web."
    },
    dataController: {
      title: "Titolare del Trattamento",
      content: "Il Titolare del trattamento dei tuoi dati personali è Davide De Simone, con sede a Pisa, Italia. Se hai domande o dubbi su questa Informativa sulla Privacy o sulle nostre pratiche relative ai dati, ti preghiamo di contattarci utilizzando il modulo di contatto su questo sito web."
    },
    dataCollected: {
      title: "Informazioni Raccolte",
      intro: "Quando visiti il sito web, raccogliamo automaticamente alcune informazioni sul tuo dispositivo, tra cui informazioni sul tuo browser web, indirizzo IP, fuso orario e alcuni dei cookie installati sul tuo dispositivo.",
      usage: {
        title: "Dati di Utilizzo",
        content: "Possiamo anche raccogliere informazioni su come interagisci con il sito web, incluse le pagine che visiti, i link su cui fai clic e altre azioni che compi sul sito."
      },
      cookies: {
        title: "Cookie",
        content: "Utilizziamo cookie e tecnologie di tracciamento simili per monitorare l'attività sul nostro sito web e memorizzare determinate informazioni.",
        details: "I cookie sono file contenenti una piccola quantità di dati che possono includere un identificatore unico anonimo. Puoi impostare il tuo browser per rifiutare tutti i cookie o per indicare quando viene inviato un cookie."
      }
    },
    usageData: {
      title: "Come Utilizziamo le Tue Informazioni",
      content: "Utilizziamo le informazioni che raccogliamo su di te per fornire, mantenere e migliorare il nostro sito web, per monitorare l'utilizzo del nostro servizio e per rilevare, prevenire e affrontare problemi tecnici."
    },
    purposes: {
      title: "Finalità del Trattamento dei Dati Personali",
      items: {
        maintenance: "Per mantenere e migliorare il nostro sito web",
        analytics: "Per analizzare come viene utilizzato il nostro sito web e migliorare l'esperienza utente",
        contact: "Per rispondere alle tue comunicazioni o richieste"
      }
    },
    thirdParties: {
      title: "Fornitori di Servizi Terzi",
      content: "Possiamo impiegare società e individui terzi per facilitare il nostro sito web, fornire servizi per nostro conto o assisterci nell'analisi di come viene utilizzato il nostro sito web.",
      analytics: "Utilizziamo Google Analytics per aiutarci a capire come i nostri clienti utilizzano il sito. Puoi leggere ulteriori informazioni su come Google utilizza le tue informazioni personali qui:",
      policy: "Informativa sulla Privacy di Google"
    },
    rights: {
      title: "I Tuoi Diritti",
      intro: "Ai sensi del Regolamento Generale sulla Protezione dei Dati (GDPR), hai determinati diritti riguardo ai tuoi dati personali:",
      items: {
        access: {
          title: "Diritto di Accesso",
          content: "Hai il diritto di richiedere copie dei tuoi dati personali."
        },
        rectification: {
          title: "Diritto di Rettifica",
          content: "Hai il diritto di richiedere la correzione di qualsiasi informazione che ritieni inesatta o di completare informazioni che ritieni incomplete."
        },
        deletion: {
          title: "Diritto alla Cancellazione",
          content: "Hai il diritto di richiedere la cancellazione dei tuoi dati personali, a determinate condizioni."
        },
        restriction: {
          title: "Diritto alla Limitazione del Trattamento",
          content: "Hai il diritto di richiedere la limitazione del trattamento dei tuoi dati personali, a determinate condizioni."
        },
        objection: {
          title: "Diritto di Opposizione",
          content: "Hai il diritto di opporti al trattamento dei tuoi dati personali, a determinate condizioni."
        },
        portability: {
          title: "Diritto alla Portabilità dei Dati",
          content: "Hai il diritto di richiedere il trasferimento dei dati che abbiamo raccolto a un'altra organizzazione, o direttamente a te, a determinate condizioni."
        }
      }
    },
    contact: {
      title: "Contattaci",
      content: "Se hai domande su questa Informativa sulla Privacy, contattaci all'indirizzo [la tua email]."
    },
    updates: {
      title: "Modifiche a questa Informativa sulla Privacy",
      content: "Potremmo aggiornare la nostra Informativa sulla Privacy di tanto in tanto. Ti informeremo di eventuali modifiche pubblicando la nuova Informativa sulla Privacy su questa pagina.",
      lastUpdated: "Ultimo aggiornamento:"
    }
  },
  cookies: {
    title: "Politica dei Cookie",
    introduction: {
      title: "Introduzione",
      content: "Questa Politica dei Cookie spiega cosa sono i cookie e come li utilizziamo sul nostro sito web. Utilizzando il nostro sito web, acconsenti all'uso dei cookie in conformità con questa politica."
    },
    whatAreCookies: {
      title: "Cosa Sono i Cookie",
      content1: "I cookie sono piccoli file di testo che vengono memorizzati sul tuo computer o dispositivo mobile quando visiti un sito web. Sono ampiamente utilizzati per far funzionare i siti web in modo più efficiente e fornire informazioni ai proprietari del sito.",
      content2: 'I cookie possono essere "persistenti" o "di sessione". I cookie persistenti rimangono sul tuo dispositivo dopo la chiusura del browser, mentre i cookie di sessione vengono eliminati quando chiudi il browser.'
    },
    typesUsed: {
      title: "Tipi di Cookie Utilizzati",
      intro: "Utilizziamo diversi tipi di cookie per scopi diversi:",
      purpose: "Scopo",
      provider: "Fornitore",
      duration: "Durata",
      essential: {
        title: "Cookie Essenziali",
        content: "Questi cookie sono necessari per il corretto funzionamento del sito web e non possono essere disattivati nei nostri sistemi.",
        purpose: "Per abilitare funzioni di base come la navigazione delle pagine e l'accesso ad aree protette del sito web",
        provider: "Il nostro sito web",
        duration: "Sessione/Persistenti"
      },
      analytics: {
        title: "Cookie Analitici",
        content: "Questi cookie ci permettono di contare le visite e le fonti di traffico in modo da poter misurare e migliorare le prestazioni del nostro sito web.",
        purpose: "Per raccogliere informazioni statistiche anonime su come i visitatori utilizzano il nostro sito web",
        provider: "Google Analytics",
        duration: "2 anni"
      }
    },
    management: {
      title: "Come Gestire i Cookie",
      content1: "La maggior parte dei browser web consente di controllare i cookie attraverso le loro impostazioni. Puoi rifiutare l'uso dei cookie selezionando le impostazioni appropriate sul tuo browser.",
      content2: "Tuttavia, tieni presente che se lo fai, potresti non essere in grado di utilizzare tutte le funzionalità di questo sito web.",
      browsers: {
        title: "Istruzioni specifiche per browser:",
        chrome: "Gestire i cookie in Chrome",
        firefox: "Gestire i cookie in Firefox",
        safari: "Gestire i cookie in Safari",
        edge: "Gestire i cookie in Edge"
      }
    },
    consent: {
      title: "Il Tuo Consenso",
      content: "Utilizzando il nostro sito web, acconsenti all'uso di cookie essenziali. Per i cookie non essenziali, li utilizzeremo solo se hai dato il tuo consenso.",
      withdrawal: 'Puoi ritirare il tuo consenso in qualsiasi momento facendo clic sul link "Impostazioni Cookie" nel piè di pagina del nostro sito web.'
    },
    contact: {
      title: "Contattaci",
      content: "Se hai domande sulla nostra Politica dei Cookie, contattaci all'indirizzo [la tua email]."
    },
    updates: {
      title: "Modifiche a questa Politica dei Cookie",
      content: "Potremmo aggiornare la nostra Politica dei Cookie di tanto in tanto. Ti informeremo di eventuali modifiche pubblicando la nuova Politica dei Cookie su questa pagina.",
      lastUpdated: "Ultimo aggiornamento:"
    },
    preferences: {
      title: "Preferenze Cookie",
      content: "Puoi modificare le tue preferenze sui cookie in qualsiasi momento.",
      button: "Gestisci Impostazioni Cookie"
    }
  },
  common: {
    backToHome: "Torna alla Home",
    backToProjects: "Torna ai Progetti",
    projectNotFound: "Progetto non trovato"
  }
};
const projectsEn = {
  title: "Projects",
  subtitle: "A selection of my web development and electronics projects",
  filterAll: "All",
  filterWeb: "Web",
  filterElectronics: "Electronics",
  filterOther: "Other",
  viewProject: "View Project",
  visitSite: "Visit Site",
  common: {
    visitSite: "Visit Site",
    sourceCode: "Source Code",
    caseStudy: "Case Study"
  },
  txcw: {
    title: "QRP CW Transmitter",
    description: "A low-power morse code transmitter for amateur radio communications, built with PIC microcontroller and DDS (Direct Digital Synthesis).",
    intro: {
      title: "Introduction",
      content: "Today it is possible to purchase a chip for a few euros that can generate signals while maintaining constant wave characteristics over time. The method in question is DDS (Direct Digital Synthesis) and in this article I will not dwell on how it all works, but rather on a possible application: A high frequency transmitter for Morse code."
    },
    design: {
      title: "Materials and Design",
      content: "To create the transmitter, first of all, a DDS chip is needed. I used one manufactured by Analog Device (AD9850) already mounted on a development board. It is necessary to communicate with our DDS, so we need a communication interface. In my case, a PIC18F4550 was more than sufficient; the PIC handles the management of inputs (encoder, buttons, and keying key), the display, and the programming of the DDS."
    },
    specs: {
      title: "Technical Specifications",
      frequency: {
        title: "Frequency Range",
        value: "1-40 MHz (14.050 MHz used in demo)"
      },
      power: {
        title: "Output Power",
        value: "0.5 Watts"
      },
      supply: {
        title: "Power Supply",
        value: "12V DC"
      },
      microcontroller: {
        title: "Microcontroller",
        value: "PIC18F4550"
      },
      dds: {
        title: "DDS Chip",
        value: "Analog Devices AD9850"
      }
    },
    circuit: {
      caption: "Circuit diagram of the QRP CW Transmitter"
    },
    blockdiagram: {
      title: "Block Diagram",
      caption: "Block diagram showing the main components and their interconnections"
    },
    features: {
      title: "How It Works",
      items: [
        "Digital frequency control with encoder",
        "Frequency stored in ROM, retained when device is powered off",
        "Encoder allows changing digits from 0 to 9",
        "Two buttons to move the cursor to the digit to be modified",
        "0.5W amplifier built with a simple radio transistor",
        "Smooth keying with anti-click circuit",
        "LCD display showing frequency"
      ]
    },
    anticlick: {
      title: "Anti-Click Manipulation Improvement",
      content: 'Compared to a simple Morse code transmitter, this one is equipped with an anti-manipulation click function. When there is a sudden current variation, a pulse is generated that "dirties" the carrier signal; this can be annoying to listeners. To overcome this problem, the output amplitude of the DDS signal was modulated (through a transistor) to have a softer rise ramp. Using an R-2-R network, an 8-bit I/O register was configured as a DAC to obtain 256 amplitude levels. The amplitude progression follows an error function to make the waveform more natural.',
      code_title: "Code for generating the error function values",
      image_caption: "Oscilloscope screenshot showing the smooth rise ramp waveform"
    },
    transformer: {
      title: "Impedance Transformer",
      content: "The output impedance was then adapted through a small impedance transformer.",
      caption: "Detail of the impedance transformer"
    },
    video: {
      title: "In Action!",
      description: "In the video, a transmission test is performed. The audio you hear is coming from a receiver tuned to the transmission frequency (14.050MHz). A button allows switching the position of the relay (and therefore the antenna) from transmission to reception by activating the amplifier and signaling it by lighting a red LED. It's all very basic but perfectly functional!"
    },
    components: {
      title: "Main Components",
      items: [
        {
          title: "DDS Module",
          description: "The AD9850 DDS module generates a clean signal from 1-40 MHz with excellent stability and low phase noise."
        },
        {
          title: "PIC18F4550",
          description: "Handles all digital functions including frequency programming, display management, and the anti-click system."
        },
        {
          title: "LCD Display",
          description: "A 16x2 LCD display shows the current frequency and operational status."
        },
        {
          title: "RF Amplifier",
          description: "A simple transistor amplifier boosts the signal to 0.5W output power."
        },
        {
          title: "Low Pass Filter",
          description: "A 30MHz low-pass filter ensures clean output with minimal harmonics."
        }
      ]
    },
    conclusion: {
      title: "Conclusion",
      content: "This QRP CW transmitter project demonstrates how modern digital technology can be applied to classic radio applications. The anti-click system provides clean transmission that makes for a better listening experience, and the entire project is built with readily available components."
    }
  },
  electricfence: {
    title: "Electric Fence",
    description: "A solar-powered electric fence controller for wildlife management, featuring energy-efficient design and remote monitoring capabilities.",
    intro: {
      title: "Introduction",
      content: "The Electric Fence project was born out of a real need to protect agricultural areas from wild boars. In 2020, in addition to the pandemic, there was a significant problem with invasive wild boars reproducing faster than the native species. Natural predators were unable to control their growth, leading to an invasion. The most serious issues were the risk of collision with vehicles and damage to cultivated fields."
    },
    idea: {
      title: "The Idea",
      content: "While there are commercial electric fence kits available, I decided to build one using transistors I had on hand to save money. The goal was to reuse partially depleted batteries that could still hold some charge. The system needed to be safe for humans and animals, theft-proof, and consume minimal energy to avoid frequent battery recharging."
    },
    blockDiagram: {
      title: "Block Diagram",
      content: "The electric fence controller includes a diode for reverse polarity protection since the circuit will be connected to the battery via terminals. There's a timer that activates an audio and visual signal for about 10 seconds before activating the high voltage circuit. It also includes a battery voltage indicator, a GPS locator with a low battery sensor, and a pulse high voltage generator."
    },
    circuit: {
      caption: "Block diagram created with PAINT"
    },
    components: {
      title: "Components",
      details: "You can find circuit diagrams on circuitmaker.com or download them directly by clicking the links:",
      protection: {
        title: "Reverse Polarity Protection",
        content: "A diode is the simplest choice but not always the best as its internal resistance can make the circuit inefficient. In my case, with an average consumption of about 50mA, there are no problems using a simple diode [1]."
      },
      gps: {
        title: "GPS",
        content: "I chose the Sinotrack ST-901 model as it was the most economical and versatile option. It's designed for vehicle use but had features perfect for my application. Without modification, the locator comes with a backup battery allowing it to function for hours after disconnection from the main battery. It also has an input (ACC) designed to inform the owner when the vehicle ignition is turned on, which I'll use to indicate low battery level."
      },
      timer: {
        title: "Timer with Visual/Audible Alert",
        content: "This circuit simply waits for a capacitor to charge before powering the high voltage circuit. While the high voltage circuit is off, a 12V buzzer and multi-color LED remain active to signal its imminent activation."
      },
      batteryIndicator: {
        title: "Battery Level Indicator",
        content: "To minimize energy consumption, a small button controls a voltmeter that indicates the battery voltage."
      },
      generator: {
        title: "High Voltage Generator",
        content: "This component creates the high voltage pulses needed to deter animals from crossing the fence. It's designed to be safe while still providing an effective deterrent."
      },
      neonLight: {
        title: "Neon Indicator",
        content: "To provide an indicator showing the presence of high voltage on the fence wires, I used a neon bulb with two electrodes acting as a spark gap, connected in parallel to the high voltage output. This setup allows adjustment of the threshold voltage for the neon indicator by varying the distance between the electrodes."
      }
    },
    references: {
      title: "References",
      items: [
        { text: "[1] Infineon - reverse battery protection. Application Note, 2.0, June 2009", url: "https://www.infineon.com/dgdl/Reverse-Batery-Protection-Rev2.pdf?fileId=db3a304412b407950112b41887722615" },
        { text: '[2] M. W. Kroll, et al., "Safety of a High-Efficiency Electrical Fence Energizer," 2020 42nd Annual International Conference of the IEEE Engineering in Medicine & Biology Society', url: "https://ieeexplore.ieee.org/document/9176351" },
        { text: "[3] Vittorio Crapella, GENERATORE DI ALTA TENSIONE - scossa 2", url: "https://sites.google.com/view/elettronica-di-vittorio-i2viu/elettronica/miscdellanea/alta-tensione-con-eat" },
        { text: "[4] Ferdous, A.H.M & Faisal, Arif & Mahbub, Shahriar & Abdussami, Rafiul & Hashmey, Syed. (2016). Design And Development Of An External Cardiac Defibrillator Using The Fly Back Transformer.", url: "http://www.jmest.org/wp-content/uploads/JMESTN42351519.pdf" },
        { text: `[5] Stefano Cassetta (2016), Master's Thesis, "Generatori di alte tensioni impulsive per il controllo di animali e persone."`, url: "http://tesi.cab.unipd.it/51558/1/Casetta_Stefano_307267.pdf" },
        { text: "[6] Federal Mogul (2013), All about ignition coils", url: "https://www.championpowersports.eu/assets/Beru/ti-07-ignition-coils-gb-2013-lowres-0.pdf" },
        { text: "[7] Ruhmkorff coil on Wikipedia", url: "https://en.wikipedia.org/wiki/Induction_coil" },
        { text: "[8] Jeff Falin(2003), Reverse Current/Battery Protection Circuits", url: "https://www.ti.com/lit/an/slva139/slva139.pdf?ts=1614792323751&ref_url=https%253A%252F%252Fwww.google.com%252F" }
      ]
    }
  },
  giuliaselvino: {
    title: "Giulia Selvino Website",
    description: null,
    link: "https://giuliaselvino.it",
    overview: {
      title: "Project Overview",
      content: "This project involved creating a professional website for Giulia Selvino, an Italian architect. The site needed to showcase her architectural projects in a visually appealing way while maintaining a clean, minimal aesthetic that complemented her design philosophy."
    },
    image: {
      caption: "Homepage of the Giulia Selvino educator portfolio website"
    },
    features: {
      title: "Key Features",
      items: [
        "Responsive design optimized for all device sizes",
        "Image-focused layout highlighting architectural photography",
        "Contact form with custom validation",
        "Performance optimized for fast loading times",
        "SEO-friendly structure for improved online visibility"
      ]
    },
    technologies: {
      title: "Technologies Used",
      items: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "CSS Grid", "PHP"]
    },
    challenges: {
      title: "Challenges & Solutions",
      content: "The main challenge was creating a website that maintained the visual impact of high-resolution architectural photography while ensuring fast load times. This was solved by implementing responsive image loading and optimization techniques that deliver appropriate image sizes based on the user's device."
    },
    outcomes: {
      title: "Outcomes",
      content: "The finished website successfully showcases Giulia's portfolio in an elegant, user-friendly interface. The site has helped her attract new clients and showcase her work to a broader audience. The responsive design ensures her work looks great on any device, from smartphones to large desktop screens."
    }
  },
  ilariaMelchioni: {
    title: "Ilaria Melchioni Website",
    description: null,
    link: "https://ilariamelchioni.github.io",
    overview: {
      title: "Project Overview",
      content: ""
    },
    image: {
      caption: "Homepage of the Ilaria Melchioni website"
    },
    features: {
      title: "Key Features",
      items: [
        "Clean, academic-focused design",
        "Publication list with citation information and links",
        "Research projects showcase with detailed descriptions",
        "CV/Resume section with downloadable PDF option",
        "Contact information and academic affiliations",
        "Mobile-responsive layout for accessibility on all devices"
      ]
    },
    technologies: {
      title: "Technologies Used",
      items: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GitHub Pages", "Jekyll"]
    },
    challenges: {
      title: "Challenges & Solutions",
      content: "The main challenge was organizing complex academic information in a way that was both comprehensive and user-friendly. I implemented a logical information architecture with clear navigation patterns to help visitors quickly find the information they needed, whether they were colleagues, potential collaborators, or students."
    },
    outcomes: {
      title: "Outcomes",
      content: "The website successfully presents Ilaria's academic credentials and research in a professional format. It has enhanced her online presence in the academic community and provided an accessible platform for sharing her work. The site is easily updateable, allowing her to add new publications and research projects as her career progresses."
    }
  },
  lucamautone: {
    title: "Luca Mautone Website",
    description: null,
    link: "https://lucamautone.it",
    overview: {
      title: "Project Overview",
      content: ""
    },
    image: {
      caption: "Homepage of Luca Mautone website"
    }
  },
  smallbusiness: {
    title: "Web Design for Small Businesses",
    description: "Specialized web design and development services tailored for small businesses and local entrepreneurs.",
    overview: {
      title: "Service Overview",
      content: "This service provides affordable, high-quality web design and development solutions specifically tailored for small businesses. I work closely with business owners to create websites that effectively represent their brand, reach their target audience, and achieve their business goals, all while staying within budget constraints."
    },
    image: {
      caption: "Sample small business website design showcasing responsive layouts"
    },
    services: {
      title: "Services Offered",
      items: [
        {
          title: "Custom Website Design",
          description: "Unique designs created specifically for your business brand and target audience.",
          icon: "fas fa-paint-brush"
        },
        {
          title: "Mobile Responsiveness",
          description: "Websites that look and function perfectly on all devices, from smartphones to desktops.",
          icon: "fas fa-mobile-alt"
        },
        {
          title: "E-commerce Solutions",
          description: "Online stores with secure payment processing, inventory management, and order tracking.",
          icon: "fas fa-shopping-cart"
        },
        {
          title: "SEO Optimization",
          description: "Technical SEO implementation to help your business rank higher in search engine results.",
          icon: "fas fa-search"
        },
        {
          title: "Content Management",
          description: "User-friendly systems that allow you to update your website content without technical knowledge.",
          icon: "fas fa-edit"
        },
        {
          title: "Maintenance & Support",
          description: "Ongoing technical support, updates, and maintenance to keep your website secure and functioning smoothly.",
          icon: "fas fa-wrench"
        }
      ]
    },
    approach: {
      title: "My Approach",
      content: "I believe small businesses deserve the same quality of web presence as larger companies, but with solutions that respect their budget constraints. My approach focuses on understanding your specific business needs and creating tailored solutions that maximize your online effectiveness while minimizing unnecessary expenses."
    },
    process: {
      title: "Working Process",
      steps: [
        {
          title: "Discovery",
          description: "In-depth discussion to understand your business, target audience, goals, and requirements."
        },
        {
          title: "Planning & Design",
          description: "Creating site architecture, wireframes, and visual designs based on your brand identity."
        },
        {
          title: "Development",
          description: "Building a fully-functional website with all required features and optimizations."
        },
        {
          title: "Testing & Review",
          description: "Thorough testing across devices and browsers, with opportunities for your feedback and revisions."
        },
        {
          title: "Launch & Training",
          description: "Deploying your website and providing training on how to manage and update content."
        },
        {
          title: "Ongoing Support",
          description: "Continued technical support, maintenance, and updates as needed."
        }
      ]
    },
    technologies: {
      title: "Technologies Used",
      items: ["HTML5", "CSS3", "JavaScript", "WordPress", "WooCommerce", "PHP", "MySQL", "Responsive Design", "Bootstrap", "SEO Tools"]
    },
    contact: {
      title: "Interested in Working Together?",
      content: "Contact me to discuss how I can help create the perfect web presence for your small business.",
      button: "Get in Touch"
    }
  }
};
const projectsIt = {
  title: "Progetti",
  subtitle: "Una selezione dei miei progetti di sviluppo web ed elettronica",
  filterAll: "Tutti",
  filterWeb: "Web",
  filterElectronics: "Elettronica",
  filterOther: "Altri",
  viewProject: "Vedi Progetto",
  visitSite: "Visita Sito",
  common: {
    visitSite: "Visita il Sito",
    sourceCode: "Codice Sorgente",
    caseStudy: "Case Study"
  },
  txcw: {
    title: "Trasmettitore QRP CW",
    description: "Un trasmettitore morse a bassa potenza per comunicazioni radio amatoriali, costruito con microcontrollore PIC e DDS (Direct Digital Synthesis).",
    intro: {
      title: "Introduzione",
      content: "Oggi è possibile acquistare per pochi euro un chip in grado di generare segnali manenendo le caratteristiche d'onda costanti nel tempo. Il metodo in questione è il DDS (Direct Digital Synthesis) e in questo articolo non mi soffermerò su come funziona il tutto, bensì su una possibile applicazione: Un trasmettitore in alta frequenza per codice morse."
    },
    design: {
      title: "Materiali e Design",
      content: "Per la realizzazione del trasmettitore è necessario anzitutto un chip DDS, io ne ho utilizzato uno prodotto dalla Analog Device (AD9850) già montato su una schedina di sviluppo. È necessario comunicare con il nostro DDS, per cui abbiamo bisogno di un'interfaccia di comunicazione. Nel mio caso un PIC18F4550 è stato più che sufficiente; il PIC si occupa della gestione degli input (encoder, pulsanti e tasto di manipolazione), del display e della programmazione del DDS."
    },
    specs: {
      title: "Specifiche Tecniche",
      frequency: {
        title: "Range di Frequenza",
        value: "1-40 MHz (14.050 MHz usati nella demo)"
      },
      power: {
        title: "Potenza di Uscita",
        value: "0.5 Watt"
      },
      supply: {
        title: "Alimentazione",
        value: "12V DC"
      },
      microcontroller: {
        title: "Microcontrollore",
        value: "PIC18F4550"
      },
      dds: {
        title: "Chip DDS",
        value: "Analog Devices AD9850"
      }
    },
    circuit: {
      caption: "Schema circuitale del trasmettitore QRP CW"
    },
    blockdiagram: {
      title: "Schema a Blocchi",
      caption: "Schema a blocchi che mostra i componenti principali e le loro interconnessioni"
    },
    features: {
      title: "Come Funziona",
      items: [
        "Controllo digitale della frequenza con encoder",
        "Frequenza memorizzata nella ROM, mantenuta quando il dispositivo è spento",
        "L'encoder permette di cambiare le cifre da 0 a 9",
        "Due tasti per spostare il cursore sulla cifra da modificare",
        "Amplificatore da 0.5W realizzato con un semplice transistor per radio",
        "Manipolazione fluida con circuito anti-click",
        "Display LCD che mostra la frequenza"
      ]
    },
    anticlick: {
      title: "Miglioramento Anti-Click da Manipolazione",
      content: `Rispetto ad un semplice trasmettitore per codice morse, questo è dotato di una funzionalità anti click da manipolazione. Quando vi è una brusca variazione di corrente, si genera un impulso che "sporca" il segnale portante; questo può dar fastidio a chi ci ascolta. Per ovviare a tale problema l'ampiezza d'uscita del segnale del DDS è stata modulata (tramite un transistor) in maniera da avere una rampa di salita più morbida. Utilizzando una rete R-2-R, un registro I/O ad 8 bit è stato configurato come DAC per ottenere 256 livelli di ampiezza. La progressione dell'ampiezza segue una funzione di errore per rendere la forma d'onda più naturale.`,
      code_title: "Codice per generare i valori della funzione di errore",
      image_caption: "Screenshot dell'oscilloscopio che mostra la forma d'onda della rampa di salita"
    },
    transformer: {
      title: "Trasformatore d'Impedenza",
      content: "L'impedenza d'uscita è stata poi adattata tramite un piccolo trasformatore d'impedenza.",
      caption: "Dettaglio del trasformatore d'impedenza"
    },
    video: {
      title: "All'Opera!",
      description: "Nel video viene eseguita una prova di trasmissione. L'audio che si ascolta è quello che viene fuori da un ricevitore sintonizzato sulla frequenza di trasmissione (14,050MHz). Un pulsante permette commutare la posizione del relè (e quindi dell'antenna) da trasmissione a ricezione attivando l'amplificatore e segnalandola accendendo un led rosso. È tutto molto spartano ma è perfettamente funzionante!"
    },
    components: {
      title: "Componenti Principali",
      items: [
        {
          title: "Modulo DDS",
          description: "Il modulo DDS AD9850 genera un segnale pulito da 1-40 MHz con eccellente stabilità e basso rumore di fase."
        },
        {
          title: "PIC18F4550",
          description: "Gestisce tutte le funzioni digitali inclusa la programmazione della frequenza, la gestione del display e il sistema anti-click."
        },
        {
          title: "Display LCD",
          description: "Un display LCD 16x2 mostra la frequenza corrente e lo stato operativo."
        },
        {
          title: "Amplificatore RF",
          description: "Un semplice amplificatore a transistor aumenta il segnale a una potenza di uscita di 0.5W."
        },
        {
          title: "Filtro Passa-Basso",
          description: "Un filtro passa-basso da 30MHz assicura un'uscita pulita con armoniche minime."
        }
      ]
    },
    conclusion: {
      title: "Conclusione",
      content: "Questo progetto di trasmettitore QRP CW dimostra come la moderna tecnologia digitale possa essere applicata alle classiche applicazioni radio. Il sistema anti-click fornisce una trasmissione pulita che offre una migliore esperienza di ascolto, e l'intero progetto è costruito con componenti facilmente reperibili."
    }
  },
  electricfence: {
    title: "Recinto Elettrico",
    description: "Un controller per recinto elettrico alimentato a energia solare per la gestione della fauna selvatica, con design a basso consumo energetico e capacità di monitoraggio remoto.",
    intro: {
      title: "Introduzione",
      content: "Il progetto del Recinto Elettrico è nato da una reale necessità di proteggere le aree agricole dai cinghiali. Nel 2020, oltre alla pandemia, c'era un problema significativo con i cinghiali invasivi che si riproducevano più velocemente delle specie native. I predatori naturali non erano in grado di controllarne la crescita, portando a un'invasione. I problemi più gravi erano il rischio di collisione con i veicoli e i danni ai campi coltivati."
    },
    idea: {
      title: "L'idea",
      content: "Sebbene siano disponibili kit commerciali per recinzioni elettriche, ho deciso di costruirne uno utilizzando i transistor che avevo a disposizione per risparmiare denaro. L'obiettivo era riutilizzare batterie parzialmente scariche che potevano ancora mantenere un po' di carica. Il sistema doveva essere sicuro per esseri umani e animali, a prova di furto e consumare energia minima per evitare frequenti ricariche della batteria."
    },
    blockDiagram: {
      title: "Schema a Blocchi",
      content: "Il controller del recinto elettrico include un diodo per la protezione dall'inversione di polarità poiché il circuito sarà collegato alla batteria tramite terminali. C'è un timer che attiva un segnale audio e visivo per circa 10 secondi prima di attivare il circuito ad alta tensione. Include anche un indicatore della tensione della batteria, un localizzatore GPS con sensore di batteria scarica e un generatore di impulsi ad alta tensione."
    },
    circuit: {
      caption: "Schema in blocchi del controller per recinto elettrico"
    },
    components: {
      title: "Componenti",
      details: "Puoi trovare gli schemi su circuitmaker.com o scaricandoli direttamente cliccando i links:",
      protection: {
        title: "Protezione da polarità inversa",
        content: "Un diodo è la scelta più semplice ma non sempre la migliore in quanto la resistenza interna può essere tale da far diventare molto inefficiente il circuito, nel mio caso con un assorbimento medio di circa 50mA non ci sono problemi nell'usare un semplice diodo [1]."
      },
      gps: {
        title: "GPS",
        content: "Ho scelto il modello Sinotrack ST-901 in quanto era l'opzione più economica e versatile. È progettato per l'uso nei veicoli ma aveva caratteristiche perfette per la mia applicazione. Senza modifiche, il localizzatore è dotato di una batteria di backup che gli consente di funzionare per ore dopo la disconnessione dalla batteria principale. Ha anche un input (ACC) progettato per informare il proprietario quando l'accensione del veicolo è attivata, che userò per indicare un basso livello della batteria."
      },
      timer: {
        title: "Timer con Avviso Visivo/Acustico",
        content: "Questo circuito attende semplicemente che un condensatore si carichi prima di alimentare il circuito ad alta tensione. Mentre il circuito ad alta tensione è spento, un cicalino da 12V e un LED multicolore rimangono attivi per segnalarne l'imminente attivazione."
      },
      batteryIndicator: {
        title: "Indicatore Livello Batteria",
        content: "Per ridurre al minimo il consumo energetico, un piccolo pulsante controlla un voltmetro che indica la tensione della batteria."
      },
      generator: {
        title: "Generatore di Alta Tensione",
        content: "Questo componente crea gli impulsi ad alta tensione necessari per dissuadere gli animali dall'attraversare la recinzione. È progettato per essere sicuro pur fornendo un deterrente efficace."
      },
      neonLight: {
        title: "Indicatore al Neon",
        content: "Per fornire un indicatore che mostri la presenza di alta tensione sui fili della recinzione, ho utilizzato una lampadina al neon con due elettrodi che fungono da spinterometro, collegati in parallelo all'uscita dell'alta tensione. Questa configurazione consente la regolazione della tensione di soglia per l'indicatore al neon variando la distanza tra gli elettrodi."
      }
    },
    references: {
      title: "Riferimenti",
      items: [
        { text: "[1] Infineon - protezione batteria inversa. Application Note, 2.0, Giugno 2009", url: "https://www.infineon.com/dgdl/Reverse-Batery-Protection-Rev2.pdf?fileId=db3a304412b407950112b41887722615" },
        { text: '[2] M. W. Kroll, et al., "Sicurezza di un energizzatore per recinzioni elettriche ad alta efficienza," 2020 42a Conferenza Internazionale Annuale della IEEE Engineering in Medicine & Biology Society', url: "https://ieeexplore.ieee.org/document/9176351" },
        { text: "[3] Vittorio Crapella, GENERATORE DI ALTA TENSIONE - scossa 2", url: "https://sites.google.com/view/elettronica-di-vittorio-i2viu/elettronica/miscdellanea/alta-tensione-con-eat" },
        { text: "[4] Ferdous, A.H.M & Faisal, Arif & Mahbub, Shahriar & Abdussami, Rafiul & Hashmey, Syed. (2016). Design And Development Of An External Cardiac Defibrillator Using The Fly Back Transformer.", url: "http://www.jmest.org/wp-content/uploads/JMESTN42351519.pdf" },
        { text: `[5] Stefano Cassetta (2016), Master's Thesis, "Generatori di alte tensioni impulsive per il controllo di animali e persone."`, url: "http://tesi.cab.unipd.it/51558/1/Casetta_Stefano_307267.pdf" },
        { text: "[6] Federal Mogul (2013), All about ignition coils", url: "https://www.championpowersports.eu/assets/Beru/ti-07-ignition-coils-gb-2013-lowres-0.pdf" },
        { text: "[7] Ruhmkorff coil on Wikipedia", url: "https://en.wikipedia.org/wiki/Induction_coil" },
        { text: "[8] Jeff Falin(2003), Reverse Current/Battery Protection Circuits", url: "https://www.ti.com/lit/an/slva139/slva139.pdf?ts=1614792323751&ref_url=https%253A%252F%252Fwww.google.com%252F" }
      ]
    }
  },
  giuliaselvino: {
    title: "Sito Web per Giulia Selvino",
    description: null,
    link: "https://giuliaselvino.it",
    overview: {
      title: "Panoramica del Progetto",
      content: "Questo progetto ha comportato la creazione di un sito web professionale per Giulia Selvino, un'educatrice italiana. Il sito doveva mostrare la sua visione e il suo modo di lavorare"
    },
    image: {
      caption: "Homepage del sito web di Giulia Selvino"
    },
    features: {
      title: "Caratteristiche Principali",
      items: [
        "Design responsive ottimizzato per tutti i formati di dispositivi",
        "Layout focalizzato sulle immagini che evidenzia la fotografia architettonica",
        "Modulo di contatto con validazione personalizzata",
        "Prestazioni ottimizzate per tempi di caricamento rapidi",
        "Struttura SEO-friendly per una migliore visibilità online"
      ]
    },
    technologies: {
      title: "Tecnologie Utilizzate",
      items: ["HTML5", "CSS3", "JavaScript", "Design Responsive", "CSS Grid", "PHP"]
    },
    challenges: {
      title: "Sfide & Soluzioni",
      content: "La sfida principale è stata quella di creare un sito web che mantenesse l'impatto visivo della fotografia architettonica ad alta risoluzione, garantendo al contempo tempi di caricamento rapidi. Questo è stato risolto implementando tecniche di caricamento e ottimizzazione delle immagini responsive che forniscono dimensioni di immagini appropriate in base al dispositivo dell'utente."
    },
    outcomes: {
      title: "Risultati",
      content: "Il sito web finito presenta con successo il profilo di Giulia in un'interfaccia elegante e user-friendly. Il sito l'ha aiutata ad attirare nuovi clienti e a mostrare il suo lavoro a un pubblico più ampio. Il design responsive garantisce che il suo lavoro appaia eccellente su qualsiasi dispositivo, dagli smartphone ai grandi schermi desktop."
    }
  },
  ilariaMelchioni: {
    title: "Sito Web per Ilaria Melchioni",
    description: null,
    link: "https://ilariamelchioni.github.io",
    overview: {
      title: "Panoramica del Progetto",
      content: "Questo progetto ha comportato la creazione di un sito web accademico professionale per Ilaria Melchioni, un'oceanografa. Il sito doveva presentare la sua ricerca, le pubblicazioni e le informazioni professionali in un formato strutturato e accessibile, adatto a un pubblico accademico e di ricerca."
    },
    image: {
      caption: "Homepage del sito web accademico di Ilaria Melchioni"
    },
    features: {
      title: "Caratteristiche Principali",
      items: [
        "Design pulito e focalizzato sull'ambito accademico",
        "Elenco di pubblicazioni con informazioni sulle citazioni e link",
        "Presentazione di progetti di ricerca con descrizioni dettagliate",
        "Sezione CV/Resume con opzione di download PDF",
        "Informazioni di contatto e affiliazioni accademiche",
        "Layout mobile-responsive per l'accessibilità su tutti i dispositivi"
      ]
    },
    technologies: {
      title: "Tecnologie Utilizzate",
      items: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GitHub Pages", "Jekyll"]
    },
    challenges: {
      title: "Sfide & Soluzioni",
      content: "La sfida principale è stata quella di organizzare informazioni accademiche complesse in modo che fossero sia complete che user-friendly. Ho implementato un'architettura dell'informazione logica con schemi di navigazione chiari per aiutare i visitatori a trovare rapidamente le informazioni di cui avevano bisogno, che fossero colleghi, potenziali collaboratori o studenti."
    },
    outcomes: {
      title: "Risultati",
      content: "Il sito web presenta con successo le credenziali accademiche e la ricerca di Ilaria in un formato professionale. Ha migliorato la sua presenza online nella comunità accademica e ha fornito una piattaforma accessibile per condividere il suo lavoro. Il sito è facilmente aggiornabile, permettendole di aggiungere nuove pubblicazioni e progetti di ricerca man mano che la sua carriera progredisce."
    }
  },
  lucamautone: {
    title: "Luca Mautone Website",
    description: null,
    link: "https://lucamautone.it",
    overview: {
      title: "Project Overview",
      content: ""
    },
    image: {
      caption: "Homepage of Luca Mautone website"
    }
  },
  smallbusiness: {
    title: "Web Design per Piccole Imprese",
    description: "Servizi specializzati di web design e sviluppo su misura per piccole imprese e imprenditori locali.",
    overview: {
      title: "Panoramica del Servizio",
      content: "Questo servizio fornisce soluzioni di web design e sviluppo a costi accessibili e di alta qualità, specificamente su misura per piccole imprese. Lavoro a stretto contatto con i proprietari di attività per creare siti web che rappresentino efficacemente il loro marchio, raggiungano il loro pubblico target e raggiungano i loro obiettivi aziendali, il tutto rimanendo entro i vincoli di budget."
    },
    image: {
      caption: "Esempio di design di sito web per piccole imprese che mostra layout responsive"
    },
    services: {
      title: "Servizi Offerti",
      items: [
        {
          title: "Design di Siti Web Personalizzati",
          description: "Design unici creati specificamente per il marchio della tua attività e il pubblico target.",
          icon: "fas fa-paint-brush"
        },
        {
          title: "Responsività Mobile",
          description: "Siti web che hanno un aspetto e funzionano perfettamente su tutti i dispositivi, dagli smartphone ai desktop.",
          icon: "fas fa-mobile-alt"
        },
        {
          title: "Soluzioni E-commerce",
          description: "Negozi online con elaborazione sicura dei pagamenti, gestione dell'inventario e tracciamento degli ordini.",
          icon: "fas fa-shopping-cart"
        },
        {
          title: "Ottimizzazione SEO",
          description: "Implementazione tecnica SEO per aiutare la tua attività a posizionarsi più in alto nei risultati dei motori di ricerca.",
          icon: "fas fa-search"
        },
        {
          title: "Gestione dei Contenuti",
          description: "Sistemi user-friendly che ti permettono di aggiornare i contenuti del tuo sito web senza conoscenze tecniche.",
          icon: "fas fa-edit"
        },
        {
          title: "Manutenzione & Supporto",
          description: "Supporto tecnico, aggiornamenti e manutenzione continui per mantenere il tuo sito web sicuro e funzionante senza problemi.",
          icon: "fas fa-wrench"
        }
      ]
    },
    approach: {
      title: "Il Mio Approccio",
      content: "Credo che le piccole imprese meritino la stessa qualità di presenza web delle aziende più grandi, ma con soluzioni che rispettino i loro vincoli di budget. Il mio approccio si concentra sulla comprensione delle tue specifiche esigenze aziendali e sulla creazione di soluzioni su misura che massimizzino la tua efficacia online riducendo al minimo le spese non necessarie."
    },
    process: {
      title: "Processo di Lavoro",
      steps: [
        {
          title: "Analisi",
          description: "Discussione approfondita per comprendere la tua attività, il pubblico target, gli obiettivi e i requisiti."
        },
        {
          title: "Pianificazione & Design",
          description: "Creazione dell'architettura del sito, wireframe e design visivi basati sulla tua identità di marca."
        },
        {
          title: "Sviluppo",
          description: "Costruzione di un sito web completamente funzionale con tutte le caratteristiche e ottimizzazioni richieste."
        },
        {
          title: "Test & Revisione",
          description: "Test approfonditi su vari dispositivi e browser, con opportunità per il tuo feedback e revisioni."
        },
        {
          title: "Lancio & Formazione",
          description: "Pubblicazione del tuo sito web e fornitura di formazione su come gestire e aggiornare i contenuti."
        },
        {
          title: "Supporto Continuo",
          description: "Supporto tecnico, manutenzione e aggiornamenti continuativi in base alle necessità."
        }
      ]
    },
    technologies: {
      title: "Tecnologie Utilizzate",
      items: ["HTML5", "CSS3", "JavaScript", "WordPress", "WooCommerce", "PHP", "MySQL", "Design Responsive", "Bootstrap", "Strumenti SEO"]
    },
    contact: {
      title: "Interessato a Collaborare?",
      content: "Contattami per discutere di come posso aiutarti a creare la perfetta presenza web per la tua piccola impresa.",
      button: "Mettiti in Contatto"
    }
  }
};
const defaultLocale = typeof window !== "undefined" ? localStorage.getItem("language") || "it" : "it";
en.projects = { ...en.projects, ...projectsEn };
it.projects = { ...it.projects, ...projectsIt };
const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages: {
    en,
    it
  },
  globalInjection: true
});
ViteSSG(
  App,
  {
    routes,
    // Passa la configurazione delle rotte da router.js
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.hash) {
        return {
          el: to.hash,
          behavior: "smooth",
          top: 80
          // Offset per header fisso
        };
      }
      return { top: 0, behavior: "smooth" };
    }
  },
  ({ app, router, isClient }) => {
    app.use(store);
    app.use(i18n);
    app.use(router);
  }
);
