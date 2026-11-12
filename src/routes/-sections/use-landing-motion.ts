const palette = [
  [
    [238, 217, 208],
    [113, 25, 35],
  ],
  [
    [113, 25, 35],
    [251, 245, 241],
  ],
  [
    [231, 168, 144],
    [78, 15, 23],
  ],
  [
    [78, 15, 23],
    [251, 245, 241],
  ],
];

const clamp = (value: number, max = 1) => Math.min(max, Math.max(0, value));
const ease = (value: number) => value * value * (3 - 2 * value);
const mix = (from: number[], to: number[], amount: number) =>
  from.map((value, index) => Math.round(value + (to[index] - value) * amount));

export function mountLandingMotion() {
  const stage = document.querySelector<HTMLElement>("#stage");
  const header = document.querySelector<HTMLElement>("#top");
  const pin = stage?.querySelector<HTMLElement>(".pin");
  const halo = stage?.querySelector<HTMLElement>(".halo");
  const cue = stage?.querySelector<HTMLElement>(".cue");
  if (!stage || !header || !pin || !halo || !cue) return;

  const root = document.documentElement;
  const items = stage.querySelectorAll<HTMLElement>(".item");
  const words = stage.querySelectorAll<HTMLElement>(".word");
  const captions = stage.querySelectorAll<HTMLElement>(".cap");
  const buttons = stage.querySelectorAll<HTMLButtonElement>(".rail button");
  const last = palette.length - 1;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  const shop = document.querySelector<HTMLElement>("#shop-products");
  if (shop) {
    const cards = [...shop.querySelectorAll<HTMLButtonElement>(".shop-card")];
    const center = (card: HTMLButtonElement) =>
      card.offsetLeft + (card.offsetWidth - shop.clientWidth) / 2;
    let current = 0;
    const updateFeaturedCard = () => {
      const position = shop.scrollLeft;
      const index = cards.reduce(
        (closest, card, index) =>
          Math.abs(center(card) - position) <
          Math.abs(center(cards[closest]) - position)
            ? index
            : closest,
        0,
      );
      if (index === current) return;
      cards[current].removeAttribute("aria-current");
      cards[index].setAttribute("aria-current", "true");
      current = index;
    };
    const showCard = (index: number) => {
      const card = cards[Math.max(0, Math.min(index, cards.length - 1))];
      if (card)
        shop.scrollTo({
          left: center(card),
          behavior: motion.matches ? "instant" : "smooth",
        });
    };
    cards.forEach((card, index) =>
      card.addEventListener("click", () => showCard(index), options),
    );
    shop.addEventListener("scroll", updateFeaturedCard, {
      ...options,
      passive: true,
    });
    shop.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        showCard(current + (event.key === "ArrowLeft" ? -1 : 1));
      },
      options,
    );
    window.addEventListener("resize", updateFeaturedCard, options);
    updateFeaturedCard();
    document
      .querySelectorAll<HTMLButtonElement>("[data-shop-step]")
      .forEach((button) => {
        button.addEventListener(
          "click",
          () => showCard(current + Number(button.dataset.shopStep)),
          options,
        );
      });
  }
  const span = () => Math.max(1, stage.offsetHeight - pin.offsetHeight);
  let progress = clamp(
    (-stage.getBoundingClientRect().top / span()) * last,
    last,
  );
  let active = -1;
  let pointerX = 0;
  let pointerY = 0;
  let tiltX = 0;
  let tiltY = 0;
  let frameId = 0;

  root.classList.add("js");
  buttons.forEach((button, index) => {
    button.addEventListener(
      "click",
      () => {
        window.scrollTo({
          top:
            stage.getBoundingClientRect().top +
            window.scrollY +
            (index * span()) / last,
          behavior: motion.matches ? "auto" : "smooth",
        });
      },
      options,
    );
  });
  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse" || motion.matches) return;
      pointerX = (event.clientX / innerWidth) * 2 - 1;
      pointerY = (event.clientY / innerHeight) * 2 - 1;
      schedule();
    },
    { ...options, passive: true },
  );

  function schedule() {
    if (!frameId) frameId = requestAnimationFrame(render);
  }

  function render() {
    frameId = 0;
    if (!stage || !header || !halo || !cue) return;
    const bounds = stage.getBoundingClientRect();
    const solid = bounds.top > 0 || bounds.bottom < 80;
    header.classList.toggle("solid", solid);
    if (solid) header.style.color = "";
    if (bounds.bottom <= -50 || bounds.top >= innerHeight) return;

    const reduce = motion.matches;
    const target = clamp((-bounds.top / span()) * last, last);
    const wide = innerWidth >= 768;
    progress = reduce
      ? Math.round(target)
      : progress + (target - progress) * 0.14;
    if (Math.abs(target - progress) < 0.0008) progress = target;
    tiltX += (pointerX - tiltX) * 0.06;
    tiltY += (pointerY - tiltY) * 0.06;

    const step = Math.floor(progress);
    const blend = ease(clamp((progress - step - 0.25) / 0.5));
    const [background, foreground] = palette[step];
    const [nextBackground, nextForeground] = palette[Math.min(last, step + 1)];
    const ink = mix(foreground, nextForeground, blend);
    stage.style.setProperty(
      "--bg",
      `rgb(${mix(background, nextBackground, blend)})`,
    );
    stage.style.setProperty("--fg", `rgb(${ink})`);
    root.dataset.tone = ink[0] > 200 ? "dark" : "light";
    if (!solid) header.style.color = `rgb(${ink})`;

    const hold = wide ? 1 : 0.6;
    items.forEach((item, index) => {
      const offset = progress - index;
      const distance = Math.abs(offset);
      const sway = Math.sin(scrollY / 170 + index * 2) * 3.2;
      const turn = Math.max(
        -48,
        Math.min(48, 14 + offset * 32 + sway + tiltX * 7 * hold),
      );
      const lift = -offset * 29;
      const scale = 1 - clamp(distance) * 0.2;
      item.style.setProperty(
        "--product-tilt",
        reduce ? "0deg" : `${-8 - offset * 10 - tiltY * 5 * hold}deg`,
      );
      item.style.setProperty("--product-turn", reduce ? "14deg" : `${turn}deg`);
      item.style.opacity = String(1 - ease(clamp((distance - 0.4) / 0.6)));
      item.style.transform = reduce
        ? "translateY(-50%)"
        : `translateY(-50%) translateY(${lift}vh) scale(${scale})`;
      item.style.zIndex = String(Math.round((1 - distance) * 10));
      item.setAttribute("aria-hidden", String(distance >= 0.5));
    });
    words.forEach((word, index) => {
      const offset = progress - index;
      word.style.opacity = String(
        1 - ease(clamp((Math.abs(offset) - 0.3) / 0.5)),
      );
      const transforms = [
        wide ? "translateY(-50%)" : "",
        reduce ? "" : `translateX(${-offset * 26}vw)`,
      ];
      word.style.transform = transforms.join(" ").trim() || "none";
    });
    captions.forEach((caption, index) => {
      const offset = progress - index;
      const opacity = clamp(1 - (Math.abs(offset) - 0.12) / 0.3);
      caption.style.opacity = String(opacity);
      caption.style.transform = reduce
        ? "none"
        : `translateY(${offset * 28}px)`;
      caption.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
      caption.inert = opacity <= 0.6;
    });
    halo.style.transform = reduce
      ? ""
      : `translateY(-50%) rotate(${progress * 38}deg) scale(${1 + Math.sin(progress * 3.1) * 0.06})`;
    const current = Math.round(progress);
    if (current !== active) {
      buttons.forEach((button, index) =>
        button.setAttribute("aria-current", String(index === current)),
      );
      active = current;
    }
    cue.style.opacity = String(clamp(1 - progress * 6));

    if (
      !reduce &&
      (progress !== target ||
        Math.abs(pointerX - tiltX) + Math.abs(pointerY - tiltY) > 0.001)
    )
      schedule();
  }

  window.addEventListener("scroll", schedule, { ...options, passive: true });
  window.addEventListener("resize", schedule, options);
  motion.addEventListener("change", schedule, options);
  const reveals = document.querySelectorAll(
    ".cats, .shop-heading, .shop-grid, .portrait-gallery-copy, .portrait-grid figure, .skin-help .shop-shell, .faq-layout > *, footer",
  );
  const revealObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver((entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            if (!motion.matches && !entry.target.matches(":focus-within")) {
              entry.target.classList.add("is-revealing");
            }
            observer.unobserve(entry.target);
          }
        })
      : undefined;
  for (const element of reveals) {
    if (element.getBoundingClientRect().top >= innerHeight) {
      revealObserver?.observe(element);
    }
  }
  schedule();

  return () => {
    revealObserver?.disconnect();
    reveals.forEach((element) => element.classList.remove("is-revealing"));
    listeners.abort();
    cancelAnimationFrame(frameId);
    root.classList.remove("js");
    delete root.dataset.tone;
  };
}
