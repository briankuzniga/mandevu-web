export function PortraitIntro() {
  return (
    <section
      className="portrait-intro"
      id="welcome"
      aria-labelledby="welcome-title"
    >
      <div className="portrait-intro-copy">
        <p className="portrait-kicker" lang="sw">
          Karibu Mandevu
        </p>
        <h1 id="welcome-title">
          Natural beauty, <em>made for you.</em>
        </h1>
        <p>Beauty essentials for melanin-rich skin and every hair texture.</p>
        <div className="portrait-actions">
          <a className="btn" href="#stage">
            Explore products <span aria-hidden="true">↓</span>
          </a>
          <a className="btn btn-outline" href="#portraits">
            See the portraits
          </a>
        </div>
      </div>
      <figure>
        <img
          className="portrait-intro-photo"
          src="/assets/portrait-afro.jpg"
          alt="Woman with an afro framing her face with her hands"
          fetchPriority="high"
        />
        <div className="portrait-feature">
          <img src="/assets/serum-bottle.webp" alt="" />
          <div>
            <p className="portrait-kicker">Featured</p>
            <p className="portrait-feature-name">Glow Face Serum</p>
          </div>
        </div>
        <div className="portrait-brand-mark">
          <img src="/assets/mandevu-symbol-on-dark.svg" alt="" />
        </div>
      </figure>
    </section>
  );
}
