export function SiteHeader() {
  return (
    <header className="top" id="top">
      <a href="#welcome" aria-label="Mandevu Beauty Shop home">
        <img
          className="lg-l"
          src="/assets/mandevu-horizontal-light.svg"
          alt="Mandevu Beauty Shop"
        />
        <img
          className="lg-d"
          src="/assets/mandevu-horizontal-dark.svg"
          alt=""
          aria-hidden="true"
        />
      </a>
      <nav aria-label="Main">
        <a href="#stage">Products</a>
        <a href="#skin-help">Contact Us</a>
        <a href="#portraits">Portraits</a>
      </nav>
    </header>
  );
}
