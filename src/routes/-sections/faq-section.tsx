const questions = [
  [
    "Where should I start with a skincare routine?",
    "Start simply with a cleanser, moisturiser and daytime sunscreen. Introduce one new product at a time so you can see how your skin responds.",
  ],
  [
    "How do I choose a product for my skin?",
    "Start with what you want from your routine, then read the product label and directions. If your skin is sensitive, patch test before using a new product more widely.",
  ],
  [
    "What does Mandevu focus on?",
    "Mandevu brings together skincare, hair care, makeup and body care, with a focus on melanin-rich skin and different hair textures.",
  ],
  [
    "Can I order from the site yet?",
    "You can browse the featured collection here. Ordering, final prices can be done on whatsApp for now via 0713 106 778. We will be adding an online store soon.",
  ],
  [
    "Where can I ask a question?",
    "Check the Questions about your skin section or dm us on whatsApp via 0713 106 778. And we will be more than happy to assist you with your skincare and haircare needs.",
  ],
];

export function FaqSection() {
  return (
    <section className="shop-faq" id="faq" aria-labelledby="faq-title">
      <div className="shop-shell faq-layout">
        <div>
          <p className="portrait-kicker">Help centre</p>
          <h2 className="big" id="faq-title">
            Frequently asked questions
          </h2>
          <p>Quick answers about skincare and the Mandevu collection.</p>
        </div>
        <div className="faq-list">
          {questions.map(([question, answer]) => (
            <details key={question} name="mandevu-faq">
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
