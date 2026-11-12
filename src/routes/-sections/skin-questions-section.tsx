const defaultPhone = "+255713106778";
const configuredPhone = import.meta.env.VITE_MANDEVU_PHONE?.trim();
const phone = /^\+[1-9]\d{7,14}$/.test(configuredPhone ?? "")
  ? configuredPhone
  : defaultPhone;
const configuredWhatsApp =
  import.meta.env.VITE_MANDEVU_WHATSAPP?.trim().replace(/^\+/, "");
const whatsapp = /^[1-9]\d{7,14}$/.test(configuredWhatsApp ?? "")
  ? configuredWhatsApp
  : phone.slice(1);
const instagram = import.meta.env.VITE_MANDEVU_INSTAGRAM?.trim().replace(
  /^@/,
  "",
);

export function SkinQuestionsSection() {
  const instagramLabel = (
    <>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" strokeLinecap="round" />
      </svg>
      Follow on Instagram
    </>
  );

  return (
    <section
      className="skin-help"
      id="skin-help"
      aria-labelledby="skin-help-title"
    >
      <div className="shop-shell">
        <h2 className="big" id="skin-help-title">
          Questions about your skin?
        </h2>
        <p>
          Message us on WhatsApp or call{" "}
          <a href={`tel:${phone}`}>
            {phone === defaultPhone ? "0713 106 778" : phone}
          </a>
          .
        </p>
        <div className="skin-help-actions">
          <a className="btn" href={`https://wa.me/${whatsapp}`}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a9 9 0 0 1-13.3 8L3 21l1.5-4.7A9 9 0 1 1 21 11.5Z" />
              <path d="M8.5 8c0 4 3.5 7.5 7.5 7.5l1-2-2.5-1-1 1a7 7 0 0 1-3-3l1-1-1-2.5-2 1Z" />
            </svg>
            Chat on WhatsApp
          </a>
          {instagram && /^[\w.]{1,30}$/.test(instagram) ? (
            <a
              className="btn btn-outline"
              href={`https://www.instagram.com/${instagram}/`}
            >
              {instagramLabel}
            </a>
          ) : (
            <button className="btn btn-outline" type="button" disabled>
              {instagramLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
