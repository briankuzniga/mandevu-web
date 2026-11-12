const shopPhotos = [
  [9548, "Vaseline Gluta-Hya", "Body lotion"],
  [9549, "Fragrance selection", "Fragrance"],
  [9550, "Roll-on selection", "Personal care"],
  [9551, "Body care selection", "Body care"],
  [9552, "Pretty Be Massage Oil", "Body oil"],
  [9554, "RDL Papaya Cream", "Skincare"],
  [9556, "RDL Papaya Soap", "Soap"],
  [9557, "Dove Deodorant Sprays", "Personal care"],
  [9558, "Bellagio Roll-ons", "Personal care"],
  [9559, "Dove Beauty Bars", "Soap"],
  [9560, "Originals Cocoa Butter", "Body care"],
  [9562, "Eco Style Styling Gel", "Hair care"],
  [9563, "Blue Magic Hair Care", "Hair care"],
  [9564, "RDL Papaya Set", "Skincare"],
  [9565, "RDL Papaya Lotion", "Body lotion"],
  [9566, "RDL Lotion Selection", "Body lotion"],
  [93, "Roushun Egg Shampoo (1,000 mL)", "Hair care"],
  [94, "Roushun Egg Shampoo (500 mL)", "Hair care"],
] as const;

export function BestSellersSection() {
  return (
    <section
      className="shop-panel"
      id="best-sellers"
      aria-labelledby="best-sellers-title"
    >
      <div className="shop-shell">
        <div className="shop-heading">
          <p className="portrait-kicker">Shop Mandevu</p>
          <h2 className="big" id="best-sellers-title">
            Best sellers
          </h2>
          <p>
            Preview our featured collection. Prices and availability will be
            confirmed before ordering opens.
          </p>
        </div>
        <div className="shop-toolbar">
          <p id="shop-scroll-hint">
            Swipe or use the arrows to explore the collection.
          </p>
          <div className="shop-controls">
            <button
              type="button"
              data-shop-step="-1"
              aria-controls="shop-products"
              aria-label="Previous products"
            >
              ←
            </button>
            <button
              type="button"
              data-shop-step="1"
              aria-controls="shop-products"
              aria-label="Next products"
            >
              →
            </button>
          </div>
        </div>
        <div
          className="shop-grid"
          id="shop-products"
          tabIndex={0}
          role="region"
          aria-label="Featured products"
          aria-describedby="shop-scroll-hint"
        >
          {shopPhotos.map(([id, name, category], index) => (
            <button
              className="shop-card"
              type="button"
              key={id}
              aria-current={index === 0 ? "true" : undefined}
            >
              <span className="shop-card-image">
                <img src={`/assets/shop-${id}.jpg`} alt="" loading="lazy" />
              </span>
              <span className="shop-card-body">
                <span className="portrait-kicker">{category}</span>
                <span className="shop-card-title">{name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
