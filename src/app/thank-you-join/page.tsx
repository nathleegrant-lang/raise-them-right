export default function ThankYouJoinPage() {
  return (
    <main className="thankyou-page">
      <section className="thankyou-card">
        <p className="eyebrow">Thank You</p>
        <h1>Thank you for joining the movement.</h1>
        <p>
          Your willingness to serve matters. Together, we can strengthen homes,
          support families, and invest in the next generation.
        </p>

        <div className="thankyou-actions">
          <a href="/resources" className="button primary">Access Resources</a>
          <a href="/" className="button secondary">Return Home</a>
        </div>
      </section>
    </main>
  );
}
