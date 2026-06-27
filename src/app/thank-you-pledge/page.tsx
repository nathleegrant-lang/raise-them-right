export default function ThankYouPledgePage() {
  return (
    <main className="thankyou-page">
      <section className="thankyou-card">
        <p className="eyebrow">Thank You</p>
        <h1>You have taken the #RaiseThemRight pledge.</h1>
        <p>
          Thank you for committing to support parents, encourage children,
          strengthen communities, and help raise the next generation well.
        </p>

        <div className="thankyou-actions">
          <a href="/join" className="button primary">Become a Community Partner</a>
          <a href="/" className="button secondary">Return Home</a>
        </div>
      </section>
    </main>
  );
}
