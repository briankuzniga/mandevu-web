const portraits = [
  {
    file: "portrait-curly-1.jpg",
    alt: "Portrait of a woman with natural curls",
  },
  {
    file: "portrait-profile.jpg",
    alt: "Side profile of a woman with a long braid",
  },
  {
    file: "portrait-curly-2.jpg",
    alt: "Portrait of a woman with textured curls",
  },
  {
    file: "portrait-cream.jpg",
    alt: "A smiling woman applying cream to her cheek",
  },
];

export function AboutSection() {
  return (
    <section
      className="portrait-gallery"
      id="portraits"
      aria-labelledby="about-title"
    >
      <div className="portrait-gallery-copy">
        <p className="portrait-kicker">The Mandevu portraits</p>
        <h2 className="big" id="about-title">
          Beauty care that feels personal.
        </h2>
        <p>
          Mandevu Beauty Shop brings together beauty essentials and personal
          advice. Our aim is to make quality beauty simple, personal and within
          reach.
        </p>
        <p className="portrait-line" lang="sw">
          Ngozi yako, mng’ao wako.
        </p>
      </div>
      <div className="portrait-grid">
        {portraits.map(({ file, alt }) => (
          <figure key={file}>
            <img src={`/assets/${file}`} alt={alt} loading="lazy" />
          </figure>
        ))}
      </div>
      <a className="btn" href="#stage">
        Back to the products <span aria-hidden="true">↑</span>
      </a>
    </section>
  );
}
