"use strict";

(() => {
  document.documentElement.classList.replace("no-js", "js");
  const desktopQuery = window.matchMedia("(min-width: 70rem)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.getElementById("site-header");
  const heroSection = document.querySelector("[data-header-boundary], .hero");
  const heroCopyAnchor = heroSection?.querySelector(".hero__center");
  const headerIntroCandidates = [
    header?.querySelector(".wordmark"),
    ...(header ? header.querySelectorAll(".primary-nav > .nav-dropdown > .nav-trigger, .primary-nav > .nav-link") : []),
    header?.querySelector(".header-cta"),
    header?.querySelector(".mobile-menu-button")
  ].filter(Boolean);
  const heroTitle = document.querySelector(".hero__center > h1");
  const heroEyebrow = document.querySelector(".hero-intro");
  const heroSupportCandidates = Array.from(document.querySelectorAll(".hero-offer, .hero-note"));
  const heroCta = document.querySelector(".hero-actions .button");
  const heroCue = document.querySelector(".scroll-cue");
  const proofRail = document.querySelector("[data-quote-rail]");
  let initialHashTarget = null;
  if (window.location.hash) {
    try {
      initialHashTarget = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    } catch {
      initialHashTarget = null;
    }
  }
  const deferHeroIntroForDeepLink = Boolean(
    heroSection &&
    initialHashTarget &&
    !heroSection.contains(initialHashTarget) &&
    !initialHashTarget.contains(heroSection) &&
    (heroSection.compareDocumentPosition(initialHashTarget) & Node.DOCUMENT_POSITION_FOLLOWING)
  );
  const storyMotionCard = document.querySelector(".story-video-card");
  const storyMotionSection = storyMotionCard?.closest(".about-story");
  const storyMotionFrame = storyMotionCard?.closest(".about-story__frame");
  const storyMotionQuery = window.matchMedia("(min-width: 821px)");
  const helpMotionHeading = document.querySelector(".help-heading");
  const helpMotionSection = helpMotionHeading?.closest(".help");
  const helpMotionVisual = helpMotionHeading?.querySelector(".help-heading__visual");
  const helpMotionLabel = helpMotionHeading?.querySelector(":scope > .section-label");
  const contactMotionSection = document.querySelector(".contact-intake");
  const contactMotionCard = contactMotionSection?.querySelector(".intake-card");
  const dropdownRoots = Array.from(document.querySelectorAll("[data-dropdown]"));
  const dropdownState = new WeakMap();
  let activeDropdown = null;
  let previousDesktopState = desktopQuery.matches;
  // Filled by the centralized below-fold text system after the document's
  // interactive surfaces have been wired. Keeping these as no-ops until then
  // lets dropdowns, the drawer, and dialogs share one activation API without
  // ever making their default/no-JS text invisible.
  let activateTextSurface = () => {};
  let revealTextWithin = () => {};

  /*
   * Keep the load sequence role-specific: navigation resolves first, followed
   * by the coaching label, H1 lines, support copy, and CTA. The proof rail owns
   * its own entrance and does not move until it reaches the reading viewport.
   */
  if (header && !reducedMotionQuery.matches) {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const centerX = viewportWidth / 2;
    const isInFirstViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < viewportWidth && rect.bottom > 0 && rect.top < viewportHeight;
    };
    const visibleHeaderTargets = headerIntroCandidates.filter(isInFirstViewport);

    visibleHeaderTargets.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.left + (rect.width / 2);
      const rawOffset = (centerX - elementCenter) * 0.1;
      const offset = Math.max(-40, Math.min(40, rawOffset));
      element.classList.add("header-intro-target");
      element.style.setProperty("--header-intro-x", String(offset) + "px");
    });

    const visibleHeroTitle = !deferHeroIntroForDeepLink && heroTitle && isInFirstViewport(heroTitle) ? heroTitle : null;
    const visibleHeroEyebrow = !deferHeroIntroForDeepLink && heroEyebrow && isInFirstViewport(heroEyebrow) ? heroEyebrow : null;
    const visibleHeroSupport = deferHeroIntroForDeepLink ? [] : heroSupportCandidates.filter(isInFirstViewport);
    const visibleHeroCta = !deferHeroIntroForDeepLink && heroCta && isInFirstViewport(heroCta) ? heroCta : null;
    const visibleHeroCue = !deferHeroIntroForDeepLink && heroCue && isInFirstViewport(heroCue) ? heroCue : null;
    const visibleProofRail = proofRail && isInFirstViewport(proofRail) ? proofRail : null;
    visibleHeroTitle?.classList.add("hero-title-intro-target");
    visibleHeroEyebrow?.classList.add("hero-eyebrow-intro-target");
    visibleHeroSupport.forEach((element) => element.classList.add("hero-support-intro-target"));
    visibleHeroCta?.classList.add("hero-cta-intro-target");
    visibleHeroCue?.classList.add("hero-cue-intro-target");
    visibleProofRail?.classList.add("proof-rail-intro-target");

    const introTargets = [
      ...visibleHeaderTargets,
      ...(visibleHeroTitle ? [visibleHeroTitle] : []),
      ...(visibleHeroEyebrow ? [visibleHeroEyebrow] : []),
      ...visibleHeroSupport,
      ...(visibleHeroCta ? [visibleHeroCta] : []),
      ...(visibleHeroCue ? [visibleHeroCue] : []),
      ...(visibleProofRail ? [visibleProofRail] : [])
    ];

    if (introTargets.length) {
      document.documentElement.dataset.pageIntro = "ready";

      const completePageIntro = () => {
        if (document.documentElement.dataset.pageIntro !== "ready") return;
        document.documentElement.dataset.pageIntro = "complete";
        introTargets.forEach((element) => {
          element.classList.remove(
            "header-intro-target",
            "hero-title-intro-target",
            "hero-eyebrow-intro-target",
            "hero-support-intro-target",
            "hero-cta-intro-target",
            "hero-cue-intro-target",
            "proof-rail-intro-target"
          );
          element.style.removeProperty("--header-intro-x");
        });
        document.removeEventListener("focusin", completePageIntro);
      };

      const introLeader = visibleProofRail || visibleHeroCue || visibleHeroSupport.at(-1) || visibleHeroCta || visibleHeaderTargets[0];
      const onPageIntroEnd = (event) => {
        const expectedAnimation = (visibleProofRail || visibleHeroCue)
          ? "route-detail-resolve"
          : (visibleHeroSupport.length ? "hero-support-resolve" : (visibleHeroCta ? "hero-cta-resolve" : "header-center-bloom"));
        if (event.animationName !== expectedAnimation) return;
        introLeader?.removeEventListener("animationend", onPageIntroEnd);
        completePageIntro();
      };

      introLeader?.addEventListener("animationend", onPageIntroEnd);
      document.addEventListener("focusin", completePageIntro);
      window.setTimeout(completePageIntro, 3200);
    }
  }

  const stateFor = (root) => {
    if (!dropdownState.has(root)) {
      dropdownState.set(root, {
        openTimer: 0,
        closeTimer: 0,
        hideTimer: 0,
        suppressFocusOpen: false
      });
    }
    return dropdownState.get(root);
  };

  const setInert = (element, value) => {
    if (!element) return;
    element.inert = value;
    if (value) element.setAttribute("inert", "");
    else element.removeAttribute("inert");
  };

  const clearTimer = (state, name) => {
    window.clearTimeout(state[name]);
    state[name] = 0;
  };

  const clearDropdownTimers = (root) => {
    const state = stateFor(root);
    clearTimer(state, "openTimer");
    clearTimer(state, "closeTimer");
    clearTimer(state, "hideTimer");
  };

  const syncPanelPosition = () => {
    if (!header) return;
    const panelTop = Math.max(0, Math.round(header.getBoundingClientRect().bottom - 27));
    document.documentElement.style.setProperty("--desktop-panel-top", `${panelTop}px`);
  };

  const focusableItems = (container) => Array.from(
    container.querySelectorAll("a[href], button:not([disabled]), summary, [tabindex]:not([tabindex='-1'])")
  ).filter((element) => !element.hidden && !element.closest("[hidden]") && !element.closest("[inert]"));

  const revealHeader = () => {
    header?.classList.remove("is-hidden");
  };

  const closeDropdown = (root, options = {}) => {
    if (!root) return;
    const { restoreFocus = false, immediate = false } = options;
    const trigger = root.querySelector(".nav-trigger");
    const panel = root.querySelector(".dropdown-panel");
    const state = stateFor(root);
    clearDropdownTimers(root);

    trigger.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    setInert(panel, true);

    if (immediate || panel.hidden) {
      panel.classList.remove("is-closing");
      panel.hidden = true;
    } else {
      panel.classList.add("is-closing");
      const delay = reducedMotionQuery.matches ? 1 : 185;
      state.hideTimer = window.setTimeout(() => {
        panel.classList.remove("is-closing");
        panel.hidden = true;
        state.hideTimer = 0;
      }, delay);
    }

    if (activeDropdown === root) activeDropdown = null;
    maybeShowTrainingBanner();

    if (restoreFocus) {
      state.suppressFocusOpen = true;
      trigger.focus();
      window.setTimeout(() => {
        state.suppressFocusOpen = false;
      }, 0);
    }
  };

  const openDropdown = (root, focusPosition = null) => {
    if (!desktopQuery.matches) return;
    if (activeDropdown && activeDropdown !== root) {
      closeDropdown(activeDropdown, { immediate: true });
    }

    const trigger = root.querySelector(".nav-trigger");
    const panel = root.querySelector(".dropdown-panel");
    clearDropdownTimers(root);
    revealHeader();
    syncPanelPosition();
    panel.hidden = false;
    setInert(panel, false);
    activateTextSurface(panel);
    panel.classList.remove("is-closing");
    trigger.setAttribute("aria-expanded", "true");
    activeDropdown = root;

    window.requestAnimationFrame(() => {
      panel.classList.add("is-open");
      revealTextWithin(panel);
      if (focusPosition) {
        const items = focusableItems(panel);
        const target = focusPosition === "last" ? items[items.length - 1] : items[0];
        target?.focus();
      }
    });
  };

  dropdownRoots.forEach((root) => {
    const trigger = root.querySelector(".nav-trigger");
    const panel = root.querySelector(".dropdown-panel");
    let pointerActivatingTrigger = false;

    trigger.addEventListener("pointerdown", (event) => {
      if (event.button === 0) pointerActivatingTrigger = true;
    });

    const endPointerActivation = () => {
      window.setTimeout(() => {
        pointerActivatingTrigger = false;
      }, 0);
    };

    trigger.addEventListener("pointerup", endPointerActivation);
    trigger.addEventListener("pointercancel", endPointerActivation);

    root.addEventListener("pointerenter", () => {
      if (!desktopQuery.matches) return;
      const state = stateFor(root);
      clearTimer(state, "closeTimer");
      if (activeDropdown === root) return;
      state.openTimer = window.setTimeout(() => openDropdown(root), 200);
    });

    root.addEventListener("pointerleave", () => {
      if (!desktopQuery.matches) return;
      const state = stateFor(root);
      clearTimer(state, "openTimer");
      state.closeTimer = window.setTimeout(() => {
        if (!root.contains(document.activeElement)) closeDropdown(root);
      }, 210);
    });

    root.addEventListener("focusin", (event) => {
      const state = stateFor(root);
      if (state.suppressFocusOpen) {
        state.suppressFocusOpen = false;
        return;
      }
      if (event.target === trigger && pointerActivatingTrigger) return;
      if (desktopQuery.matches) openDropdown(root);
    });

    root.addEventListener("focusout", () => {
      if (!desktopQuery.matches) return;
      window.setTimeout(() => {
        if (!root.contains(document.activeElement)) closeDropdown(root);
      }, 0);
    });

    trigger.addEventListener("click", () => {
      if (!desktopQuery.matches) return;
      if (trigger.getAttribute("aria-expanded") === "true") {
        closeDropdown(root, { restoreFocus: true });
      } else {
        openDropdown(root);
      }
    });

    trigger.addEventListener("keydown", (event) => {
      if (!desktopQuery.matches) return;
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        openDropdown(root, event.key === "ArrowUp" ? "last" : "first");
      } else if (event.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
        event.preventDefault();
        closeDropdown(root, { restoreFocus: true });
      }
    });

    panel.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDropdown(root, { restoreFocus: true });
      }
    });

    panel.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", () => closeDropdown(root, { immediate: true }));
    });
  });

  document.addEventListener("pointerdown", (event) => {
    if (activeDropdown && !activeDropdown.contains(event.target)) {
      closeDropdown(activeDropdown);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !activeDropdown) return;
    event.preventDefault();
    closeDropdown(activeDropdown, { restoreFocus: true });
  });

  const menuButton = document.querySelector(".mobile-menu-button");
  const drawer = document.getElementById("mobile-drawer");
  const drawerClose = drawer?.querySelector(".drawer-close");
  const headerShell = header?.querySelector(".header-shell");
  const pageRegions = [document.getElementById("main-content"), document.querySelector(".site-footer")].filter(Boolean);
  const trainingBanner = document.querySelector(".training-banner");
  const trainingBannerClose = trainingBanner?.querySelector(".training-banner__close");
  let drawerOpen = false;
  let drawerHideTimer = 0;
  let trainingBannerEligible = false;
  let trainingBannerShown = false;
  let trainingBannerSuspended = false;
  const trainingBannerStorageKey = "missionaryMediaTrainingPromptDismissed";

  const trainingBannerWasDismissed = () => {
    try {
      return window.sessionStorage.getItem(trainingBannerStorageKey) === "true";
    } catch {
      return false;
    }
  };

  const rememberTrainingBannerDismissal = () => {
    try {
      window.sessionStorage.setItem(trainingBannerStorageKey, "true");
    } catch {
      // The prompt still works if browser storage is unavailable.
    }
  };

  function maybeShowTrainingBanner() {
    if (
      !trainingBanner ||
      trainingBannerShown ||
      !trainingBannerEligible ||
      drawerOpen ||
      activeDropdown ||
      trainingBannerSuspended
    ) return;

    trainingBannerShown = true;
    trainingBanner.hidden = false;
    setInert(trainingBanner, false);
    trainingBanner.removeAttribute("aria-hidden");
    activateTextSurface(trainingBanner);
    window.requestAnimationFrame(() => {
      document.documentElement.classList.add("training-banner-visible");
      revealTextWithin(trainingBanner);
      syncPanelPosition();
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeaderForScroll);
    });
  }

  const hideTrainingBanner = () => {
    if (!trainingBanner || trainingBanner.hidden) return;
    rememberTrainingBannerDismissal();
    document.documentElement.classList.remove("training-banner-visible");
    window.setTimeout(() => {
      trainingBanner.hidden = true;
      setInert(trainingBanner, true);
      syncPanelPosition();
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeaderForScroll);
    }, reducedMotionQuery.matches ? 1 : 230);
  };

  const closeAccordion = (accordion) => {
    const button = accordion.querySelector(":scope > button");
    const panel = accordion.querySelector(":scope > div");
    button.setAttribute("aria-expanded", "false");
    setInert(panel, true);
    panel.hidden = true;
  };

  const finishDrawerClose = () => {
    drawer.classList.remove("is-open", "is-closing");
    setInert(drawer, true);
    drawer.hidden = true;
    drawerHideTimer = 0;
    maybeShowTrainingBanner();
  };

  const closeDrawer = (options = {}) => {
    const { restoreFocus = true, immediate = false } = options;
    if (!drawerOpen) return;
    drawerOpen = false;
    window.clearTimeout(drawerHideTimer);
    menuButton.setAttribute("aria-expanded", "false");
    drawer.classList.remove("is-open");
    drawer.classList.add("is-closing");
    document.body.classList.remove("drawer-open");
    document.documentElement.style.removeProperty("--scrollbar-compensation");
    setInert(headerShell, false);
    pageRegions.forEach((region) => setInert(region, false));
    drawer.querySelectorAll(".mobile-accordion").forEach(closeAccordion);

    if (immediate || reducedMotionQuery.matches) finishDrawerClose();
    else drawerHideTimer = window.setTimeout(finishDrawerClose, desktopQuery.matches ? 225 : 460);

    if (restoreFocus) menuButton.focus();
  };

  const openDrawer = () => {
    if (drawerOpen) return;
    drawerOpen = true;
    revealHeader();
    if (activeDropdown) closeDropdown(activeDropdown, { immediate: true });
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    document.documentElement.style.setProperty("--scrollbar-compensation", `${scrollbarWidth}px`);
    drawer.hidden = false;
    setInert(drawer, false);
    activateTextSurface(drawer);
    menuButton.setAttribute("aria-expanded", "true");
    setInert(headerShell, true);
    pageRegions.forEach((region) => setInert(region, true));
    document.body.classList.add("drawer-open");
    window.requestAnimationFrame(() => {
      drawer.classList.add("is-open");
      revealTextWithin(drawer);
      drawerClose.focus();
    });
  };

  menuButton?.addEventListener("click", () => {
    if (drawerOpen) closeDrawer();
    else openDrawer();
  });

  drawerClose?.addEventListener("click", () => closeDrawer());

  drawer?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDrawer();
      return;
    }

    if (event.key !== "Tab") return;
    const items = focusableItems(drawer);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  drawer?.querySelectorAll(".mobile-accordion").forEach((accordion) => {
    const button = accordion.querySelector(":scope > button");
    const panel = accordion.querySelector(":scope > div");
    button.addEventListener("click", () => {
      const willOpen = button.getAttribute("aria-expanded") !== "true";
      drawer.querySelectorAll(".mobile-accordion").forEach((other) => {
        if (other !== accordion) closeAccordion(other);
      });
      if (!willOpen) {
        closeAccordion(accordion);
        return;
      }
      button.setAttribute("aria-expanded", "true");
      panel.hidden = false;
      setInert(panel, false);
      activateTextSurface(panel);
      window.requestAnimationFrame(() => revealTextWithin(panel));
    });
  });

  drawer?.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", () => closeDrawer({ restoreFocus: false }));
  });

  trainingBannerClose?.addEventListener("click", hideTrainingBanner);

  if (trainingBanner && !trainingBannerWasDismissed()) {
    /*
     * Depth, not a stopwatch. The old 10s timer dropped a full-width bar over
     * whatever the visitor happened to be reading and re-anchored the sticky
     * header while they read it. Wait until they have moved past the hero and the
     * voices rail, which is also the point where live training is the next thing
     * on offer.
     */
    const bannerGate = document.getElementById("how-we-help");
    const bannerDepthReached = () => {
      const gateTop = bannerGate
        ? bannerGate.getBoundingClientRect().top + window.scrollY
        : window.innerHeight * 1.6;
      return window.scrollY + (window.innerHeight * 0.5) >= gateTop;
    };
    const checkBannerDepth = () => {
      if (!bannerDepthReached()) return;
      window.removeEventListener("scroll", checkBannerDepth);
      trainingBannerEligible = true;
      maybeShowTrainingBanner();
    };
    window.addEventListener("scroll", checkBannerDepth, { passive: true });
    checkBannerDepth();
  }

  if (trainingBanner) {
    const yieldTargets = [
      document.querySelector(".about-story"),
      document.querySelector(".home-connection"),
      document.querySelector(".contact-intake"),
      document.querySelector(".site-footer")
    ].filter(Boolean);

    const syncTrainingBannerSuspension = () => {
      const shouldSuspend = yieldTargets.some((target) => {
        const rect = target.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      if (shouldSuspend === trainingBannerSuspended) return;

      trainingBannerSuspended = shouldSuspend;
      document.documentElement.classList.toggle("training-banner-suspended", shouldSuspend);
      if (shouldSuspend) {
        setInert(trainingBanner, true);
        trainingBanner.setAttribute("aria-hidden", "true");
      } else {
        trainingBanner.removeAttribute("aria-hidden");
        if (!trainingBanner.hidden) setInert(trainingBanner, false);
        maybeShowTrainingBanner();
      }
      syncPanelPosition();
    };

    if ("IntersectionObserver" in window) {
      const yieldObserver = new IntersectionObserver(syncTrainingBannerSuspension, { threshold: 0 });
      yieldTargets.forEach((target) => yieldObserver.observe(target));
    } else {
      window.addEventListener("scroll", syncTrainingBannerSuspension, { passive: true });
      window.addEventListener("resize", syncTrainingBannerSuspension, { passive: true });
    }
    syncTrainingBannerSuspension();
  }

  const faqItems = Array.from(document.querySelectorAll(".faq-list details"));
  if (faqItems.length) {
    const faqRuns = new WeakMap();

    const settleFaq = (item, shouldOpen) => {
      const previousRun = faqRuns.get(item);
      if (previousRun) {
        previousRun.height.onfinish = null;
        faqRuns.delete(item);
      }
      item.open = shouldOpen;
      item.removeAttribute("data-faq-animating");
      // Hold the measured end height until the native open state is final, then
      // release it. This avoids a one-frame jump back to the old natural height.
      previousRun?.height.cancel();
    };

    const animateFaq = (item, shouldOpen) => {
      const summary = item.querySelector(":scope > summary");
      const answer = item.querySelector(":scope > div");
      if (!summary || !answer) return;

      if (shouldOpen) {
        // The answer is prepared only when it can be read. Its word opacity does
        // not change layout, so the existing 280ms height measurement remains the
        // sole owner of accordion geometry.
        item.open = true;
        activateTextSurface(answer);
      }

      if (reducedMotionQuery.matches || typeof item.animate !== "function") {
        settleFaq(item, shouldOpen);
        if (shouldOpen) revealTextWithin(answer);
        return;
      }

      const startHeight = item.getBoundingClientRect().height;
      const previousRun = faqRuns.get(item);
      if (previousRun) {
        previousRun.height.onfinish = null;
        previousRun.height.cancel();
      }

      item.dataset.faqAnimating = shouldOpen ? "opening" : "closing";
      const borderHeight = item.offsetHeight - item.clientHeight;
      const endHeight = shouldOpen
        ? summary.getBoundingClientRect().height + answer.getBoundingClientRect().height + borderHeight
        : summary.getBoundingClientRect().height + borderHeight;

      const height = item.animate(
        [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
        { duration: 280, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
      );

      faqRuns.set(item, { height });
      if (shouldOpen) window.requestAnimationFrame(() => revealTextWithin(answer));
      height.onfinish = () => settleFaq(item, shouldOpen);
    };

    const toggleFaq = (item) => {
      const visuallyOpen = item.open && item.dataset.faqAnimating !== "closing";
      const shouldOpen = !visuallyOpen;
      if (shouldOpen) {
        faqItems.forEach((other) => {
          if (other !== item && (other.open || faqRuns.has(other))) animateFaq(other, false);
        });
      }
      animateFaq(item, shouldOpen);
    };

    faqItems.forEach((item) => {
      // Retain the native named-details behavior in the HTML as a no-JS fallback;
      // JavaScript owns exclusivity while it coordinates the two height changes.
      item.removeAttribute("name");
      const summary = item.querySelector(":scope > summary");
      if (!summary) return;

      let suppressSyntheticClick = false;
      summary.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        suppressSyntheticClick = true;
        toggleFaq(item);
        window.setTimeout(() => {
          suppressSyntheticClick = false;
        }, 0);
      });
      summary.addEventListener("click", (event) => {
        event.preventDefault();
        if (suppressSyntheticClick) return;
        toggleFaq(item);
      });
    });
  }

  const intakeForm = document.querySelector(".intake-form");
  if (intakeForm) {
    const intakeQuestion = intakeForm.querySelector("#intake-question");

    const selectedLabel = (input) => input
      ?.closest(".choice-chip")
      ?.querySelector("span")
      ?.textContent
      ?.trim() || "Not selected";

    const syncCalendlyNotes = () => {
      if (!intakeQuestion) return "";
      const stage = selectedLabel(intakeForm.querySelector("input[name='stage']:checked"));
      const focus = Array.from(intakeForm.querySelectorAll("input[name='focus']:checked"))
        .map(selectedLabel);
      return [
        `Missionary stage: ${stage}`,
        `Working on: ${focus.length ? focus.join(", ") : "Not selected"}`,
        `Question: ${intakeQuestion.value.trim()}`
      ].join("\n");
    };

    intakeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!intakeForm.checkValidity()) {
        intakeForm.reportValidity();
        return;
      }

      const destination = new URL(intakeForm.action, window.location.href);
      destination.search = "";
      destination.searchParams.set("a1", syncCalendlyNotes());
      window.location.assign(destination.href);
    });
  }

  /*
   * A transformed ancestor participates in an anchor target's measured position.
   * Lock the intake card before the browser calculates a #start jump, otherwise
   * the card's remaining 84px scroll offset resolves after the jump and pulls the
   * form underneath the fixed header.
   */
  const syncIntakeAnchorLock = () => {
    document.documentElement.classList.toggle("intake-anchor-locked", window.location.hash === "#start");
  };

  document.addEventListener("click", (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href="#start"]') : null;
    if (link) document.documentElement.classList.add("intake-anchor-locked");
  }, true);
  window.addEventListener("hashchange", syncIntakeAnchorLock);
  syncIntakeAnchorLock();

  let lastScrollY = window.scrollY;
  let scrollFrame = 0;
  let helpImageScrollOffset = 0;
  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const smootherStep = (value) => value * value * value * (value * ((value * 6) - 15) + 10);

  const updateStoryCardForScroll = () => {
    if (!storyMotionCard || !storyMotionSection || !storyMotionFrame) return;

    const frameMotionAllowed = !reducedMotionQuery.matches;
    storyMotionFrame.classList.toggle("is-scroll-linked", frameMotionAllowed);
    if (!frameMotionAllowed) {
      storyMotionFrame.style.setProperty("--story-frame-scroll-y", "0px");
      return;
    }

    const sectionRect = storyMotionSection.getBoundingClientRect();
    const frameTop = sectionRect.top + storyMotionFrame.offsetTop;
    const frameStart = window.innerHeight * 0.98;
    const frameEnd = window.innerHeight * 0.36;
    const frameRawProgress = (frameStart - frameTop) / Math.max(1, frameStart - frameEnd);
    const frameProgress = smootherStep(clamp01(frameRawProgress));
    const frameOffset = 84 * (1 - frameProgress);
    storyMotionFrame.style.setProperty("--story-frame-scroll-y", `${frameOffset.toFixed(2)}px`);
  };

  const updateContactForScroll = () => {
    if (!contactMotionSection || !contactMotionCard) return;

    const motionAllowed = !reducedMotionQuery.matches;
    contactMotionSection.classList.toggle("is-scroll-linked", motionAllowed);
    contactMotionCard.classList.toggle("is-scroll-linked", motionAllowed);
    if (!motionAllowed) {
      contactMotionSection.style.setProperty("--contact-bg-scroll-y", "0px");
      contactMotionCard.style.setProperty("--contact-card-scroll-y", "0px");
      return;
    }

    const sectionTop = contactMotionSection.getBoundingClientRect().top;
    const motionStart = window.innerHeight * 0.98;
    const motionEnd = window.innerHeight * 0.36;
    const rawProgress = (motionStart - sectionTop) / Math.max(1, motionStart - motionEnd);
    const progress = smootherStep(clamp01(rawProgress));
    contactMotionSection.style.setProperty("--contact-bg-scroll-y", `${(112 * (1 - progress)).toFixed(2)}px`);
    contactMotionCard.style.setProperty("--contact-card-scroll-y", `${(84 * (1 - progress)).toFixed(2)}px`);
  };

  const updateHelpSectionForScroll = () => {
    if (!helpMotionHeading || !helpMotionSection || !helpMotionVisual || !helpMotionLabel) return;

    const motionAllowed = storyMotionQuery.matches && !reducedMotionQuery.matches;
    helpMotionHeading.classList.toggle("is-scroll-linked", motionAllowed);
    if (!motionAllowed) {
      helpImageScrollOffset = 0;
      helpMotionHeading.style.setProperty("--help-image-scroll-y", "0px");
      helpMotionHeading.style.setProperty("--help-label-opacity", "1");
      return;
    }

    const sectionRect = helpMotionSection.getBoundingClientRect();
    const motionStart = window.innerHeight * 0.94;
    const motionEnd = window.innerHeight * 0.06;
    const rawProgress = (motionStart - sectionRect.top) / Math.max(1, motionStart - motionEnd);
    const progress = smootherStep(clamp01(rawProgress));
    const nextOffset = 64 - (120 * progress);

    const visualRect = helpMotionVisual.getBoundingClientRect();
    const labelRect = helpMotionLabel.getBoundingClientRect();
    const untransformedVisualTop = visualRect.top - helpImageScrollOffset;
    const perceivedImageTop = untransformedVisualTop + nextOffset + (visualRect.height * 0.07);
    const imageToLabelGap = perceivedImageTop - labelRect.bottom;
    const fadeStartGap = Math.min(132, Math.max(108, visualRect.height * 0.2));
    const fadeEndGap = 28;
    const fadeProgress = smootherStep(clamp01(
      (fadeStartGap - imageToLabelGap) / Math.max(1, fadeStartGap - fadeEndGap)
    ));

    helpImageScrollOffset = nextOffset;
    helpMotionHeading.style.setProperty("--help-image-scroll-y", `${nextOffset.toFixed(2)}px`);
    helpMotionHeading.style.setProperty("--help-label-opacity", (1 - fadeProgress).toFixed(3));
  };

  const updateHeaderForScroll = () => {
    scrollFrame = 0;
    if (!header) return;
    const currentY = Math.max(0, window.scrollY);
    const delta = currentY - lastScrollY;
    if (currentY > 18) {
      header.classList.add("is-scrolled");
    } else if (currentY < 3) {
      header.classList.remove("is-scrolled");
    }

    if (desktopQuery.matches) {
      const bannerOffset = Number.parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue("--banner-offset")
      ) || 0;
      const heroBottom = heroSection?.getBoundingClientRect().bottom ?? Number.POSITIVE_INFINITY;
      const heroHasClearedHeader = heroBottom <= bannerOffset + header.offsetHeight;
      const headerHasKeyboardFocus = header.matches(":focus-within");

      /*
       * Hiding on hero-clear alone left desktop with no nav and no CTA for the
       * remaining ~9000px of the page, with no way back except scrolling to the top.
       * Upward intent is a request for the nav, so honour it at any depth - and hold
       * that state until a real downward move, or a trailing zero-delta scroll event
       * re-hides the header a frame after it appears.
       */
      if (!heroHasClearedHeader || headerHasKeyboardFocus) {
        header.classList.remove("is-hidden");
      } else if (delta < -6) {
        header.classList.remove("is-hidden");
      } else if (delta > 8) {
        if (activeDropdown) closeDropdown(activeDropdown, { immediate: true });
        header.classList.add("is-hidden");
      }
    } else {
      const headerInUse = Boolean(activeDropdown || drawerOpen || header.matches(":focus-within"));
      if (currentY < 120 || delta < -6 || headerInUse) {
        header.classList.remove("is-hidden");
      } else if (delta > 8 && currentY > 180) {
        header.classList.add("is-hidden");
      }
    }

    lastScrollY = currentY;
    updateStoryCardForScroll();
    updateHelpSectionForScroll();
    updateContactForScroll();
  };

  window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeaderForScroll);
  }, { passive: true });

  const quoteRail = document.querySelector("[data-quote-rail]");
  const quoteTrack = quoteRail?.querySelector("[data-quote-track]");
  const quoteToggle = quoteRail?.querySelector(".quote-toggle");

  if (quoteRail && quoteTrack && quoteToggle) {
    const quoteViewport = quoteRail.querySelector(".quote-viewport");
    Array.from(quoteTrack.children).forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a, button, [tabindex]").forEach((item) => item.setAttribute("tabindex", "-1"));
      quoteTrack.appendChild(clone);
    });
    quoteTrack.classList.add("is-ready");

    if ("IntersectionObserver" in window) {
      const quoteRailObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => quoteRail.classList.toggle("is-in-view", entry.isIntersecting));
      }, { rootMargin: "-15% 0px -20% 0px", threshold: 0.35 });
      quoteRailObserver.observe(quoteRail);
    } else {
      quoteRail.classList.add("is-in-view");
    }

    quoteToggle.addEventListener("click", () => {
      const paused = quoteRail.classList.toggle("is-paused");
      quoteToggle.setAttribute("aria-pressed", String(paused));
      quoteToggle.querySelector("span").textContent = paused ? "Play quotes" : "Pause quotes";
    });

    quoteViewport?.addEventListener("keydown", (event) => {
      const card = quoteTrack.querySelector(".quote-card");
      const step = card ? card.getBoundingClientRect().width : quoteViewport.clientWidth * 0.8;
      const behavior = reducedMotionQuery.matches ? "auto" : "smooth";
      const trackAnimation = storyMotionQuery.matches && !reducedMotionQuery.matches
        ? quoteTrack.getAnimations().find((animation) => animation.animationName === "quote-rail-move")
        : null;
      const nudgeAnimatedTrack = (direction) => {
        if (!trackAnimation) return false;
        const duration = Number(trackAnimation.effect?.getTiming().duration) || 68000;
        const loopDistance = Math.max(1, quoteTrack.scrollWidth / 2);
        const timeStep = (step / loopDistance) * duration;
        const startTime = 370;
        const endTime = startTime + duration;
        const currentTime = Number(trackAnimation.currentTime) || startTime;
        if (direction === "home") trackAnimation.currentTime = startTime;
        else if (direction === "end") trackAnimation.currentTime = endTime - timeStep;
        else trackAnimation.currentTime = Math.min(endTime, Math.max(startTime, currentTime + (direction * timeStep)));
        return true;
      };
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        if (!nudgeAnimatedTrack(1)) quoteViewport.scrollBy({ left: step, behavior });
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        if (!nudgeAnimatedTrack(-1)) quoteViewport.scrollBy({ left: -step, behavior });
      } else if (event.key === "Home") {
        event.preventDefault();
        if (!nudgeAnimatedTrack("home")) quoteViewport.scrollTo({ left: 0, behavior });
      } else if (event.key === "End") {
        event.preventDefault();
        if (!nudgeAnimatedTrack("end")) quoteViewport.scrollTo({ left: quoteViewport.scrollWidth, behavior });
      }
    });
  }

  const storyTrigger = document.querySelector("[data-story-open]");
  const storyDialog = document.getElementById("story-video-dialog");
  const storyDialogSurface = storyDialog?.querySelector(".story-video-modal__surface");
  const storyClose = storyDialog?.querySelector("[data-story-close]");
  const storyFrame = storyDialog?.querySelector("[data-story-frame]");

  const clearStoryVideo = () => {
    document.body.classList.remove("story-video-open");
    storyFrame?.removeAttribute("src");
  };

  const closeStoryVideo = () => {
    if (storyDialog?.open) storyDialog.close();
  };

  if (storyTrigger && storyDialog && storyFrame && typeof storyDialog.showModal === "function") {
    storyTrigger.addEventListener("click", (event) => {
      event.preventDefault();
      if (drawerOpen) closeDrawer({ restoreFocus: false, immediate: true });
      if (activeDropdown) closeDropdown(activeDropdown, { immediate: true });
      const storySource = new URL(storyFrame.dataset.src);
      storySource.searchParams.set("origin", window.location.origin);
      storyFrame.src = storySource.toString();
      document.body.classList.add("story-video-open");
      storyDialog.showModal();
      activateTextSurface(storyDialog);
      window.requestAnimationFrame(() => {
        revealTextWithin(storyDialog);
        storyClose?.focus();
      });
    });

    storyClose?.addEventListener("click", closeStoryVideo);
    storyDialog.addEventListener("close", clearStoryVideo);
    storyDialog.addEventListener("click", (event) => {
      if (event.target === storyDialog && storyDialogSurface) closeStoryVideo();
    });
  }

  /*
   * One measured Eloqwnt-style text system owns every post-hero reading surface.
   * It deliberately uses an explicit registry instead of a broad p/span selector:
   * headings can be line-masked, plain supporting copy can be word-faded, and
   * mixed or interactive structures can move as intact accessible units.
   */
  const setupEloqwntTextMotion = () => {
    if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) return;

    const groups = [];
    const groupByAnchor = new WeakMap();
    const groupByUnit = new WeakMap();
    const dynamicGroupsByRoot = new WeakMap();
    const activatedDynamicRoots = new WeakSet();
    const preparedUnits = new WeakSet();
    const revealedUnits = new WeakSet();
    const lineUnitByElement = new WeakMap();
    const lineUnits = new Set();
    let disabled = false;
    let checkFrame = 0;
    let resizeFrame = 0;

    const rootIsUnavailable = (root) => Boolean(
      !root ||
      root.matches("[hidden], [inert]") ||
      root.closest("[hidden], [inert], [aria-hidden='true']")
    );

    const containsStructuredContent = (element) => Boolean(
      element.querySelector("a, strong, em, input, button, textarea, select, label")
    );

    const sourceText = (element) => element.textContent.replace(/\s+/g, " ").trim();

    const buildLineUnit = (unit) => {
      const { element } = unit;
      const words = unit.source.split(" ").filter(Boolean);
      if (!words.length) return;

      unit.lastWidth = element.getBoundingClientRect().width;
      element.textContent = "";
      const probes = words.map((word, index) => {
        const probe = document.createElement("span");
        probe.textContent = word;
        element.append(probe);
        if (index < words.length - 1) element.append(document.createTextNode(" "));
        return probe;
      });

      const lines = [];
      let currentTop = null;
      probes.forEach((probe) => {
        const top = probe.offsetTop;
        if (currentTop === null || Math.abs(top - currentTop) > 1) {
          lines.push([]);
          currentTop = top;
        }
        lines[lines.length - 1].push(probe.textContent);
      });

      element.textContent = "";
      lines.forEach((lineWords, index) => {
        const mask = document.createElement("span");
        mask.className = "text-intro-line";
        const inner = document.createElement("span");
        inner.textContent = lineWords.join(" ");
        inner.style.setProperty("--text-intro-line-delay", `${unit.delay + (index * 50)}ms`);
        mask.append(inner);
        element.append(mask);
        // Real whitespace keeps extracted and copied text from joining at the
        // visual line boundary while the masks remain block-level.
        if (index < lines.length - 1) element.append(document.createTextNode(" "));
      });
    };

    const buildWordUnit = (unit) => {
      const { element } = unit;
      const words = unit.source.split(" ").filter(Boolean);
      element.textContent = "";
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "text-intro-word";
        span.textContent = word;
        // Preserve the measured 20ms rhythm without making a long paragraph
        // wait behind a page-length domino chain.
        span.style.setProperty("--text-intro-word-delay", `${Math.min(360, unit.delay + (index * 20))}ms`);
        element.append(span);
        if (index < words.length - 1) element.append(document.createTextNode(" "));
      });
    };

    let resizeObserver = null;

    const prepareUnit = (group, unit) => {
      const { element } = unit;
      if (!element || preparedUnits.has(element)) return false;
      if (element.closest("noscript, .noscript-nav") || element.classList.contains("skip-link")) return false;

      unit.source = sourceText(element);
      if (!unit.source) return false;
      if ((unit.kind === "lines" || unit.kind === "words") && containsStructuredContent(element)) {
        unit.kind = "rise";
      }

      if (unit.kind === "lines") {
        element.classList.add("text-intro-lines");
        buildLineUnit(unit);
        lineUnits.add(unit);
        lineUnitByElement.set(element, unit);
        resizeObserver?.observe(element);
      } else if (unit.kind === "words") {
        element.classList.add("text-intro-words");
        buildWordUnit(unit);
      } else {
        element.classList.add(unit.kind === "scroll-rise" ? "text-intro-scroll-rise" : "text-intro-rise");
        element.style.setProperty("--text-intro-delay", `${unit.delay}ms`);
      }

      element.classList.remove("is-revealed");
      element.classList.add("is-armed");
      preparedUnits.add(element);
      groupByUnit.set(element, group);
      return true;
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = groupByAnchor.get(entry.target);
        if (group) maybeRevealGroup(group);
      });
    }, { rootMargin: "0px 0px -20% 0px", threshold: 0.01 });

    const armGroup = (group) => {
      if (disabled || group.armed || group.revealed || rootIsUnavailable(group.root)) return false;
      group.units = group.units.filter((unit) => prepareUnit(group, unit));
      if (!group.units.length) return false;
      group.armed = true;
      observer.observe(group.anchor);
      return true;
    };

    function revealGroup(group) {
      if (disabled || group.revealed) return;
      if (!group.armed && !armGroup(group)) return;
      group.revealed = true;
      group.units.forEach(({ element }) => {
        element.classList.remove("is-armed");
        element.classList.add("is-revealed");
        revealedUnits.add(element);
      });
      observer.unobserve(group.anchor);
      // Intro classes own transform/transition only for the entrance window.
      // Afterwards native card/link/button hover and focus transitions regain
      // full ownership, while group.revealed keeps the entrance play-once.
      group.cleanupTimer = window.setTimeout(() => {
        group.cleanupTimer = 0;
        group.armed = false;
        group.settled = true;
        group.units.forEach(({ element }) => {
          element.classList.remove("is-armed", "is-revealed", "text-intro-focus-safe");
        });
      }, 1100);
    }

    const addGroup = (anchor, rawUnits, options = {}) => {
      if (!anchor || groupByAnchor.has(anchor)) return groupByAnchor.get(anchor) || null;
      const eligible = rawUnits.filter(({ element }) => (
        element &&
        !preparedUnits.has(element) &&
        !element.closest("[aria-hidden='true']")
      ));
      if (!eligible.length) return null;

      const maxDelay = options.maxDelay ?? Math.min(300, Math.max(0, (eligible.length - 1) * 70));
      const finalIndex = Math.max(1, eligible.length - 1);
      const units = eligible.map((unit, index) => ({
        ...unit,
        delay: unit.delay ?? Math.round((maxDelay * index) / finalIndex)
      }));
      const group = {
        anchor,
        root: options.root || anchor,
        units,
        armed: false,
        revealed: false,
        settled: false,
        horizontal: Boolean(options.horizontal),
        deferUntilReturn: Boolean(options.deferUntilReturn),
        returnReady: !options.deferUntilReturn,
        cleanupTimer: 0
      };
      groups.push(group);
      groupByAnchor.set(anchor, group);
      if (options.dynamicRoot) {
        const owned = dynamicGroupsByRoot.get(options.dynamicRoot) || [];
        owned.push(group);
        dynamicGroupsByRoot.set(options.dynamicRoot, owned);
      }
      if (options.arm !== false) armGroup(group);
      return group;
    };

    const elementsFor = (root, selector, all = false) => {
      if (!root) return [];
      return all
        ? Array.from(root.querySelectorAll(selector))
        : [root.querySelector(selector)].filter(Boolean);
    };

    const addSelectorGroup = (anchorSelector, descriptors, options = {}) => {
      const anchor = typeof anchorSelector === "string"
        ? document.querySelector(anchorSelector)
        : anchorSelector;
      if (!anchor) return null;
      const units = descriptors.flatMap((descriptor) => (
        elementsFor(anchor, descriptor.selector, descriptor.all).map((element) => ({
          element,
          kind: descriptor.kind,
          delay: descriptor.delay
        }))
      ));
      return addGroup(anchor, units, options);
    };

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver((entries) => {
        if (disabled) return;
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => {
          entries.forEach((entry) => {
            const unit = lineUnitByElement.get(entry.target);
            if (!unit) return;
            const width = entry.target.getBoundingClientRect().width;
            if (Math.abs(width - unit.lastWidth) >= 1) buildLineUnit(unit);
          });
        });
      });
    }

    if (deferHeroIntroForDeepLink && heroCopyAnchor) {
      addGroup(heroCopyAnchor, [
        { element: heroEyebrow, kind: "rise" },
        ...Array.from(heroTitle?.querySelectorAll(".hero-title-line > span") || [])
          .map((element) => ({ element, kind: "rise" })),
        { element: document.querySelector(".hero-offer"), kind: "rise" },
        { element: heroCta, kind: "rise" },
        { element: document.querySelector(".hero-note"), kind: "rise" }
      ], {
        maxDelay: 300,
        deferUntilReturn: true
      });
    }

    // The header and hero keep their bespoke load choreography. The voices rail
    // uses that same choreography only when it was actually in the first viewport;
    // otherwise its label and quote viewport enter as two intact blocks here.
    if (proofRail && !proofRail.classList.contains("proof-rail-intro-target")) {
      addSelectorGroup(proofRail, [
        { selector: ":scope > .voices-rail__top", kind: "rise" },
        { selector: ":scope > .quote-viewport", kind: "rise" }
      ], { maxDelay: 80 });
    }

    addSelectorGroup(".about-story__bar", [
      { selector: ":scope > .about-story__label", kind: "rise" },
      { selector: ":scope > h2", kind: "lines" }
    ], { maxDelay: 60 });

    addSelectorGroup(".about-story__frame", [
      { selector: ":scope .story-video-card", kind: "rise" },
      { selector: ":scope > .about-story__copy > .about-story__eyebrow", kind: "words" },
      { selector: ":scope > .about-story__copy > .about-story__lead", kind: "words" },
      { selector: ":scope > .about-story__copy > p:not(.about-story__eyebrow):not(.about-story__lead)", kind: "words", all: true },
      { selector: ":scope > .about-story__copy > .about-story__channels", kind: "rise" },
      { selector: ":scope > .about-story__copy > .about-story__cta", kind: "rise" }
    ], { maxDelay: 300 });

    addSelectorGroup(".help-heading", [
      { selector: ":scope > .section-label", kind: "scroll-rise" },
      { selector: ":scope > .help-heading__copy > h2", kind: "lines" },
      { selector: ":scope > .help-heading__copy > .section-lead", kind: "words" }
    ], { maxDelay: 100 });

    document.querySelectorAll(".service-row").forEach((row) => {
      addSelectorGroup(row, [
        { selector: ":scope > .service-number", kind: "rise" },
        { selector: ":scope > div", kind: "rise" },
        { selector: ":scope > p", kind: "words" }
      ], { maxDelay: 140 });
    });

    addSelectorGroup("#how-it-works .split-heading", [
      { selector: ":scope > .section-label", kind: "rise" },
      { selector: ":scope h2", kind: "lines" }
    ], { maxDelay: 60 });

    addSelectorGroup(".home-connection__copy", [
      { selector: ":scope > .state-line", kind: "rise" },
      { selector: ":scope > .section-label", kind: "rise" },
      { selector: ":scope > h2", kind: "lines" },
      { selector: ":scope > .home-connection__spotlight-label", kind: "rise" },
      { selector: ":scope > .home-connection__lead", kind: "words" },
      { selector: ":scope > p:not(.state-line):not(.section-label):not(.home-connection__spotlight-label):not(.home-connection__lead)", kind: "words", all: true }
    ], { maxDelay: 220 });

    addSelectorGroup(".partner-showcase", [
      { selector: ":scope > .partner-card", kind: "rise" }
    ], { maxDelay: 160 });

    // Compatibility registry for the review worktree's previous content model.
    // These selectors no-op in the current source, while allowing the same
    // centralized motion file to cover its three-step and interview-field rows.
    addSelectorGroup(".process-list", [
      { selector: ":scope > li", kind: "rise", all: true }
    ], { maxDelay: 180 });

    addSelectorGroup(".fields__heading", [
      { selector: ":scope > .section-label", kind: "rise" },
      { selector: ":scope > h2", kind: "lines" },
      { selector: ":scope > .section-lead", kind: "words" }
    ], { maxDelay: 100 });

    addSelectorGroup(".fields__list", [
      { selector: ":scope > li", kind: "rise", all: true }
    ], { maxDelay: 300 });

    document.querySelectorAll(".does-list > .does-row").forEach((row) => {
      // Each comparison contains two semantic columns; moving the intact row
      // preserves that relationship and avoids a 15-block waterfall.
      addGroup(row, [{ element: row, kind: "rise" }], { maxDelay: 0 });
    });

    const doesListFoot = document.querySelector(".does-list__foot");
    if (doesListFoot) {
      addGroup(doesListFoot, [{ element: doesListFoot, kind: "rise" }], { maxDelay: 0 });
    }

    addSelectorGroup(".podcast-band__head", [
      { selector: ":scope .section-label", kind: "rise" },
      { selector: ":scope h2", kind: "lines" },
      { selector: ":scope > .section-lead", kind: "words" }
    ], { maxDelay: 100 });

    // Keep cards static inside the native scrollport. A transform-based card
    // entrance makes keyboard focus vertically scroll the taller image cards,
    // clipping both the thumbnail and its focus ring. The rail itself already
    // owns the section-level settle gesture.

    const podcastFoot = document.querySelector(".podcast-band__foot");
    if (podcastFoot) {
      addGroup(podcastFoot, [{ element: podcastFoot, kind: "rise" }], { maxDelay: 0 });
    }

    addSelectorGroup(".intake-card__intro", [
      { selector: ":scope > .section-label", kind: "rise" },
      { selector: ":scope > h2", kind: "lines" },
      { selector: ":scope > p:not(.section-label)", kind: "words" },
      { selector: ":scope > .intake-assurances", kind: "rise" }
    ], { maxDelay: 180 });

    document.querySelectorAll(".intake-form > *").forEach((child) => {
      addGroup(child, [{ element: child, kind: "rise" }], { maxDelay: 0 });
    });

    addSelectorGroup(".footer-grid", [
      { selector: ":scope > *", kind: "rise", all: true }
    ], { maxDelay: 240 });

    const footerBottom = document.querySelector(".footer-bottom");
    if (footerBottom) {
      addGroup(footerBottom, [{ element: footerBottom, kind: "rise" }], { maxDelay: 0 });
    }

    const registerDynamicRoot = (root) => {
      if (!root || activatedDynamicRoots.has(root)) return dynamicGroupsByRoot.get(root) || [];
      activatedDynamicRoots.add(root);
      let units = [];

      if (root.matches(".dropdown-panel")) {
        units = [
          ...elementsFor(root, ".offer-nav-heading", true),
          ...elementsFor(root, ".menu-list > a", true),
          ...elementsFor(root, ".resource-menu__row", true),
          ...elementsFor(root, ".resource-form", true),
          ...elementsFor(root, ".resource-menu__feature", true)
        ].map((element) => ({ element, kind: "rise" }));
      } else if (root.matches(".mobile-drawer")) {
        units = [
          ...elementsFor(root, ".mobile-drawer__top > *", true),
          ...elementsFor(root, ".mobile-section-label", true),
          ...elementsFor(root, ".mobile-offer-list > a", true),
          ...elementsFor(root, ".mobile-direct-links > *", true),
          ...elementsFor(root, ".mobile-resource-block", true),
          ...elementsFor(root, ".mobile-primary-action", true),
          ...elementsFor(root, ".mobile-accordion > button", true)
        ].map((element) => ({ element, kind: "rise" }));
      } else if (root.matches(".training-banner")) {
        units = elementsFor(root, ":scope .training-banner__tag, :scope .training-banner__copy, :scope .training-banner__link", true)
          .map((element) => ({ element, kind: "rise" }));
      } else if (root.matches(".story-video-modal")) {
        units = [
          ...elementsFor(root, ".story-video-modal__topline > div", true),
          ...elementsFor(root, ".story-video-modal__close", true),
          ...elementsFor(root, ".story-video-modal__footer > *", true)
        ].map((element) => ({ element, kind: "rise" }));
      } else if (root.matches(".faq-list details > div")) {
        units = elementsFor(root, ":scope > p", true)
          .map((element) => ({ element, kind: "words" }));
      } else if (root.matches(".mobile-accordion > div")) {
        units = elementsFor(root, ":scope > a", true)
          .map((element) => ({ element, kind: "rise" }));
      }

      if (units.length) {
        addGroup(root, units, {
          root,
          dynamicRoot: root,
          maxDelay: Math.min(300, Math.max(0, (units.length - 1) * 55)),
          arm: false
        });
      }
      return dynamicGroupsByRoot.get(root) || [];
    };

    activateTextSurface = (root) => {
      if (disabled || !root) return;
      const ownedGroups = registerDynamicRoot(root);
      ownedGroups.forEach(armGroup);
      // Hidden-to-open surfaces are infrequent and user initiated. One local
      // style flush guarantees the armed state is painted before the caller's
      // next-frame reveal, instead of letting both states coalesce.
      if (ownedGroups.some((group) => group.armed && !group.revealed)) {
        root.getBoundingClientRect();
      }
    };

    revealTextWithin = (root) => {
      if (disabled || !root) return;
      registerDynamicRoot(root).forEach(armGroup);
      groups.forEach((group) => {
        const rect = group.horizontal ? group.anchor.getBoundingClientRect() : null;
        const horizontallyVisible = !rect || (rect.left < window.innerWidth && rect.right > 0);
        if (
          horizontallyVisible &&
          (root === group.root || root.contains(group.anchor) || group.anchor.contains(root))
        ) {
          revealGroup(group);
        }
      });
    };

    const maybeRevealGroup = (group) => {
      if (group.revealed || rootIsUnavailable(group.root)) return;
      const rect = group.anchor.getBoundingClientRect();
      const coveredTop = header?.getBoundingClientRect().bottom || 0;
      if (!group.returnReady) {
        if (rect.bottom <= coveredTop + 1) group.returnReady = true;
        return;
      }
      if (group.deferUntilReturn) {
        const visibleTop = Math.max(coveredTop, rect.top);
        const visibleBottom = Math.min(window.innerHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const materialHeight = Math.min(96, rect.height * 0.25);
        const leadingCopyVisible = rect.top >= coveredTop - 1;
        if (!leadingCopyVisible || visibleHeight < materialHeight) return;
      }
      if (group.horizontal && !(rect.left < window.innerWidth && rect.right > 0)) return;
      const reachedPageEnd = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2;
      if (
        rect.top <= window.innerHeight * 0.8 ||
        (reachedPageEnd && rect.top < window.innerHeight && rect.bottom > 0)
      ) {
        revealGroup(group);
      }
    };

    const checkAll = () => {
      checkFrame = 0;
      if (disabled) return;
      groups.forEach(maybeRevealGroup);
    };

    const scheduleCheck = () => {
      if (disabled || checkFrame) return;
      checkFrame = window.requestAnimationFrame(checkAll);
    };

    const revealHashTarget = () => {
      if (!window.location.hash) return;
      let target = null;
      try {
        target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      } catch {
        target = document.querySelector(window.location.hash);
      }
      if (!target) return;
      if (window.location.hash === "#start") {
        revealTextWithin(target.closest(".intake-card") || target);
      } else {
        revealTextWithin(target);
      }
    };

    const revealOwningGroup = (event) => {
      let node = event.target instanceof Element ? event.target : null;
      while (node) {
        const unitGroup = groupByUnit.get(node);
        const group = unitGroup || groupByAnchor.get(node);
        if (group) {
          revealGroup(group);
          if (unitGroup && !group.settled) {
            // Keyboard focus must never land on text that is still halfway
            // through opacity/transform interpolation. Snap only the owned unit
            // being focused; sibling units keep their intended local cascade.
            node.classList.add("text-intro-focus-safe");
          }
          return;
        }
        node = node.parentElement;
      }
    };

    const disableMotion = () => {
      if (disabled) return;
      disabled = true;
      observer.disconnect();
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(checkFrame);
      window.cancelAnimationFrame(resizeFrame);
      groups.forEach((group) => {
        group.revealed = true;
        group.armed = false;
        group.settled = true;
        window.clearTimeout(group.cleanupTimer);
        group.cleanupTimer = 0;
        group.units.forEach(({ element }) => {
          element.classList.remove("is-armed", "is-revealed", "text-intro-focus-safe");
        });
      });
      activateTextSurface = () => {};
      revealTextWithin = () => {};
    };

    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("load", scheduleCheck);
    window.addEventListener("pageshow", scheduleCheck);
    window.addEventListener("hashchange", () => {
      revealHashTarget();
      scheduleCheck();
    });
    document.addEventListener("focusin", revealOwningGroup);
    document.addEventListener("invalid", revealOwningGroup, true);
    reducedMotionQuery.addEventListener("change", (event) => {
      if (event.matches) disableMotion();
    });

    document.querySelectorAll(".faq-list > details[open] > div").forEach((answer) => {
      activateTextSurface(answer);
    });
    if (trainingBanner && !trainingBanner.hidden && !trainingBanner.hasAttribute("inert")) {
      activateTextSurface(trainingBanner);
      revealTextWithin(trainingBanner);
    }

    revealHashTarget();
    scheduleCheck();

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (disabled) return;
        lineUnits.forEach(buildLineUnit);
        scheduleCheck();
      }).catch(() => {});
    }
  };

  const handleViewportChange = () => {
    revealHeader();
    syncPanelPosition();
    updateStoryCardForScroll();
    updateHelpSectionForScroll();
    updateContactForScroll();
    const breakpointChanged = previousDesktopState !== desktopQuery.matches;
    previousDesktopState = desktopQuery.matches;
    if (breakpointChanged && drawerOpen) {
      const drawerWasOpen = drawerOpen;
      closeDrawer({ restoreFocus: false, immediate: true });
      if (drawerWasOpen) {
        window.requestAnimationFrame(() => menuButton?.focus());
      }
    }
    if (!desktopQuery.matches && activeDropdown) {
      closeDropdown(activeDropdown, { immediate: true });
    }
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeaderForScroll);
  };

  /*
   * Container settle: a whole container resolves from slightly-too-big, or
   * slightly-too-low, into its resting layout. Fires once per container when it
   * enters view, then the classes come off so nothing keeps a live transform.
   *
   * Deliberately separate from setupEloqwntTextMotion. That registry owns text
   * units and the is-armed/is-revealed pair; this owns containers and uses
   * is-settle-* names, so a stalled unit in one system cannot leave the other
   * invisible.
   */
  const setupContainerSettle = () => {
    const targets = Array.from(document.querySelectorAll("[data-settle]"));
    if (!targets.length) return;

    const finish = (element) => {
      element.classList.remove("is-settle-armed", "is-settled");
      element.classList.add("is-settle-done");
    };

    if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
      targets.forEach(finish);
      return;
    }

    /*
     * A transformed ancestor participates in an anchor target's measured
     * position — the same fact that .intake-anchor-locked exists for. A
     * container that is, or contains, the element the page was asked to jump to
     * skips the entrance rather than moving the landing spot underneath it.
     */
    let hashTarget = null;
    if (window.location.hash.length > 1) {
      try {
        hashTarget = document.querySelector(window.location.hash);
      } catch (error) {
        hashTarget = null;
      }
    }

    const armed = [];
    targets.forEach((element) => {
      if (hashTarget && (element === hashTarget || element.contains(hashTarget))) {
        finish(element);
        return;
      }
      element.classList.add("is-settle-armed");
      armed.push(element);
    });
    if (!armed.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        observer.unobserve(element);
        element.classList.add("is-settled");

        let settled = false;
        let guard = 0;
        const complete = (event) => {
          // Child transitions bubble; only this container's transform ends it.
          if (event && (event.target !== element || event.propertyName !== "transform")) return;
          if (settled) return;
          settled = true;
          window.clearTimeout(guard);
          element.removeEventListener("transitionend", complete);
          finish(element);
        };

        element.addEventListener("transitionend", complete);
        // transitionend never fires for a container that was already at rest,
        // or in a background tab where the transition is skipped outright.
        guard = window.setTimeout(complete, 1600);
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

    armed.forEach((element) => observer.observe(element));

    /*
     * A hash jump can carry the viewport clean over a container: its
     * intersection ratio never leaves 0, so the observer reports nothing and the
     * container would sit armed at opacity 0 above the reader. Sweep anything
     * the page has already scrolled past to its rest state instead. The sweep
     * detaches itself once every container has landed.
     */
    let lastSweep = 0;
    const sweepPassed = () => {
      lastSweep = Date.now();
      for (let index = armed.length - 1; index >= 0; index -= 1) {
        const element = armed[index];
        if (element.classList.contains("is-settle-done") || element.classList.contains("is-settled")) {
          armed.splice(index, 1);
          continue;
        }
        if (element.getBoundingClientRect().bottom >= 0) continue;
        observer.unobserve(element);
        finish(element);
        armed.splice(index, 1);
      }
      if (armed.length) return;
      window.removeEventListener("scroll", requestSweep);
      window.removeEventListener("scrollend", sweepPassed);
      window.removeEventListener("hashchange", sweepPassed);
    };
    /*
     * Time-throttled rather than rAF-throttled on purpose: a backgrounded tab
     * pauses animation frames, which would strand this sweep exactly when a
     * restored session scrolls to a saved position.
     */
    const requestSweep = () => {
      if (Date.now() - lastSweep < 100) return;
      sweepPassed();
    };

    window.addEventListener("scroll", requestSweep, { passive: true });
    window.addEventListener("scrollend", sweepPassed);
    window.addEventListener("hashchange", sweepPassed);
    window.addEventListener("load", sweepPassed, { once: true });
    sweepPassed();
    // The browser's own jump to a hash target lands after this module runs, and
    // a smooth jump keeps moving for a few hundred milliseconds after that.
    window.setTimeout(sweepPassed, 0);
    window.setTimeout(sweepPassed, 400);
    window.setTimeout(sweepPassed, 1200);

    // Turning reduced motion on mid-session lands everything immediately.
    reducedMotionQuery.addEventListener("change", (event) => {
      if (!event.matches) return;
      observer.disconnect();
      targets.forEach(finish);
    });
  };

  /*
   * Our process: the four-step card.
   *
   * The card's entrance is the shared [data-settle] system. Local to this
   * section are two things CSS cannot do on its own: reflecting the open state
   * in aria-expanded, and the scroll-scrubbed progression that lights each step
   * in turn. Hover and focus states are pure CSS.
   *
   * Progression keyframes, as a percentage of the section's scroll range, are
   * the measured reference values:
   *   step 1  20-25    step 2  34-35    step 3  44-45    step 4  54-55
   *   connectors  25-35, 35-45, 45-55
   */
  const setupProcessSteps = () => {
    const steps = Array.from(document.querySelectorAll(".ps-step"));
    if (!steps.length) return;
    const card = document.querySelector(".ps-card");
    const timelineQuery = window.matchMedia("(max-width: 56.25rem)");

    steps.forEach((step) => {
      const syncTimeline = () => {
        if (timelineQuery.matches) step.setAttribute("aria-expanded", "true");
        else if (!step.classList.contains("is-open")) step.setAttribute("aria-expanded", "false");
      };
      timelineQuery.addEventListener("change", syncTimeline);
      syncTimeline();

      step.addEventListener("mouseenter", () => {
        if (!timelineQuery.matches) step.setAttribute("aria-expanded", "true");
      });
      step.addEventListener("mouseleave", () => {
        if (!timelineQuery.matches && !step.classList.contains("is-open")) step.setAttribute("aria-expanded", "false");
      });
      step.addEventListener("focus", () => {
        if (!timelineQuery.matches) step.setAttribute("aria-expanded", "true");
      });
      step.addEventListener("blur", () => {
        if (!timelineQuery.matches && !step.classList.contains("is-open")) step.setAttribute("aria-expanded", "false");
      });
      // Touch has no hover, so a tap holds the step open. Panels are
      // independent on the reference, so one opening does not close its neighbours.
      step.addEventListener("click", () => {
        if (timelineQuery.matches) return;
        const open = !step.classList.contains("is-open");
        step.classList.toggle("is-open", open);
        step.setAttribute("aria-expanded", String(open));
      });
    });

    if (reducedMotionQuery.matches) {
      document.documentElement.classList.add("ps-no-progress");
      return;
    }

    const LIT = [[20, 25], [34, 35], [44, 45], [54, 55]];
    const FILL = [[25, 35], [35, 45], [45, 55]];
    const rampBetween = (value, bounds) => clamp01((value - bounds[0]) / (bounds[1] - bounds[0]));
    let smoothed = null;
    let lastPaint = 0;
    let inView = false;

    const paintProgress = () => {
      lastPaint = Date.now();
      const rect = card.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      /*
       * Progress runs across the card's whole travel: 0 when its top edge
       * reaches the bottom of the viewport, 1 when its bottom leaves the top.
       * Compressing that range made all four steps light almost together.
       */
      const target = clamp01((viewport - rect.top) / (rect.height + viewport)) * 100;
      // stands in for the reference's smoothing
      smoothed = smoothed === null ? target : smoothed + ((target - smoothed) * 0.18);

      steps.forEach((step, index) => {
        step.style.setProperty("--ps-lit", rampBetween(smoothed, LIT[index]).toFixed(3));
        if (index >= FILL.length) return;
        const line = step.querySelector(".ps-step__line");
        if (line) line.style.setProperty("--ps-fill", rampBetween(smoothed, FILL[index]).toFixed(3));
      });

      if (inView && Math.abs(target - smoothed) > 0.05) window.requestAnimationFrame(paintProgress);
    };

    /*
     * Time-throttled rather than rAF-throttled at the entry point: a
     * backgrounded tab pauses animation frames, and a restored session that
     * lands mid-section would otherwise never paint its first frame.
     */
    const requestProgress = () => {
      if (Date.now() - lastPaint < 16) return;
      paintProgress();
    };

    if ("IntersectionObserver" in window) {
      const progressObserver = new IntersectionObserver((entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        if (inView) requestProgress();
      }, { threshold: 0 });
      progressObserver.observe(card);
    } else {
      inView = true;
    }

    window.addEventListener("scroll", requestProgress, { passive: true });
    window.addEventListener("resize", requestProgress, { passive: true });
    requestProgress();
    window.setTimeout(requestProgress, 400);

    reducedMotionQuery.addEventListener("change", (event) => {
      if (!event.matches) return;
      document.documentElement.classList.add("ps-no-progress");
      steps.forEach((step) => step.style.removeProperty("--ps-lit"));
    });
  };

  desktopQuery.addEventListener("change", handleViewportChange);
  storyMotionQuery.addEventListener("change", handleViewportChange);
  reducedMotionQuery.addEventListener("change", handleViewportChange);
  window.addEventListener("resize", handleViewportChange, { passive: true });
  handleViewportChange();
  setupEloqwntTextMotion();
  setupContainerSettle();
  setupProcessSteps();
  updateHeaderForScroll();
})();
