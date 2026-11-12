export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <img src="/assets/mandevu-footer.svg" alt="Mandevu Beauty Shop" />
        <p>Natural beauty, made for you.</p>
      </div>
      <section className="footer-visit" aria-labelledby="footer-visit-title">
        <h2 id="footer-visit-title">Visit us</h2>
        <address>
          <p>Kariakoo, Dar es Salaam</p>
          <p>
            <a href="tel:+255713106778">+255 713 106 778</a>
          </p>
          <p>
            <a href="mailto:mandevubeautyshop@gmail.com">
              mandevubeautyshop@gmail.com
            </a>
          </p>
        </address>
        <p>Mon to Sat, 7:00 to 18:00</p>
      </section>
      <div className="footer-credit">
        <a href="https://www.ipfsoftwares.com/">
          <span>Made by</span>
          <svg viewBox="75 99 310 266" role="img" aria-label="iPF Softwares">
            <defs>
              <filter id="ipf-logo-alpha" colorInterpolationFilters="sRGB">
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1
                        0 0 0 0 1
                        0 0 0 0 1
                        1.4 0 0 0 -0.4"
                />
              </filter>
              <mask
                id="ipf-logo-mask"
                maskUnits="userSpaceOnUse"
                x="75"
                y="99"
                width="310"
                height="266"
              >
                <image
                  href="/assets/ipf-softwares.png"
                  width="447"
                  height="447"
                  filter="url(#ipf-logo-alpha)"
                />
              </mask>
              <linearGradient id="ipf-engraving" x2="0" y2="1">
                <stop stopColor="#c99489" />
                <stop offset="1" stopColor="#ae7169" />
              </linearGradient>
              <linearGradient id="ipf-glint">
                <stop stopColor="#fff5df" stopOpacity="0" />
                <stop offset=".5" stopColor="#fff5df" stopOpacity=".9" />
                <stop offset="1" stopColor="#fff5df" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g mask="url(#ipf-logo-mask)">
              <rect
                x="75"
                y="99"
                width="310"
                height="266"
                fill="url(#ipf-engraving)"
              />
              <rect
                className="footer-credit-glint"
                x="75"
                y="99"
                width="100"
                height="266"
                fill="url(#ipf-glint)"
              />
            </g>
          </svg>
        </a>
      </div>
    </footer>
  );
}
