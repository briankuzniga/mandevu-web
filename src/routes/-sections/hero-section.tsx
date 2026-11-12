import type { CSSProperties } from "react";

const products = [
  {
    kind: "t-tube",
    src: "/assets/cream-tube.webp",
    alt: "A white Mandevu cream tube standing upright",
  },
  {
    kind: "t-serum",
    src: "/assets/serum-bottle.webp",
    alt: "An amber Mandevu dropper bottle with a cream label",
  },
  {
    kind: "t-jar",
    src: "/assets/cream-jar.webp",
    alt: "A Mandevu cream jar beside its kraft box",
  },
  {
    kind: "t-bag",
    src: "/assets/shopping-bag.webp",
    alt: "A kraft paper Mandevu shopping bag",
  },
];
const depthLayers = Array.from({ length: 12 }, (_, index) => index + 1);

export function HeroSection() {
  return (
    <section className="stage" id="stage" aria-label="Mandevu products">
      <div className="pin">
        <p className="word hero" aria-hidden="true">
          The Mandevu collection.
        </p>
        <p className="word" aria-hidden="true">
          Skincare
        </p>
        <p className="word" aria-hidden="true">
          Hair care
        </p>
        <p className="word" aria-hidden="true">
          Karibu
        </p>

        <div className="scene">
          <div className="halo" aria-hidden="true"></div>
          {products.map(({ kind, src, alt }) => (
            <div className={`item ${kind}`} key={src}>
              <figure className="product-volume">
                {depthLayers.map((depth) => (
                  <img
                    className="product-layer"
                    key={depth}
                    src={src}
                    alt=""
                    aria-hidden="true"
                    style={{ "--layer": depth } as CSSProperties}
                  />
                ))}
                <img className="product-front" src={src} alt={alt} />
              </figure>
            </div>
          ))}
        </div>

        <div className="caps">
          <div className="cap">
            <h2>Body care that feels like a welcome</h2>
            <p>Creams made for melanin-rich skin, from head to toe.</p>
          </div>
          <div className="cap">
            <h2>Skincare that starts with advice</h2>
            <p>Tell us your skin type and we will help you choose.</p>
            <p className="sw" lang="sw">
              Tuambie aina ya ngozi yako.
            </p>
          </div>
          <div className="cap">
            <h2>Hair care for every texture</h2>
            <p>Natural ingredients for curls, coils and waves.</p>
          </div>
          <div className="cap">
            <h2>Take it home</h2>
            <p>Free advice, every day. Ask us anything.</p>
            <a className="btn" href="#portraits">
              Explore the portraits
            </a>
          </div>
        </div>

        <nav className="rail" aria-label="Products">
          <button type="button" aria-label="Body care">
            <span>Body care</span>
            <i aria-hidden="true" />
          </button>
          <button type="button" aria-label="Skincare">
            <span>Skincare</span>
            <i aria-hidden="true" />
          </button>
          <button type="button" aria-label="Hair care">
            <span>Hair care</span>
            <i aria-hidden="true" />
          </button>
          <button type="button" aria-label="Take it home">
            <span>Take it home</span>
            <i aria-hidden="true" />
          </button>
        </nav>
        <p className="cue" aria-hidden="true">
          Scroll to pick it up
        </p>
      </div>
    </section>
  );
}
