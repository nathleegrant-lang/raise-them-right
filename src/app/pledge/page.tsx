export default function PledgePage() {
  return (
    <main className="pledge-page">
      <section className="pledge-hero">
        <p className="eyebrow">#RaiseThemRight</p>
        <h1>The Pledge</h1>
        <p>
          Every child deserves adults who lead with love, character,
          responsibility, faith, and example.
        </p>
      </section>

      <section className="pledge-card">
        <h2>I commit to:</h2>

        <ul>
          <li>Supporting parents.</li>
          <li>Encouraging children.</li>
          <li>Being a positive example.</li>
          <li>Strengthening my community.</li>
          <li>Helping raise the next generation well.</li>
          <li>Playing my part in building strong homes, strong children, and a strong nation.</li>
        </ul>

        <form className="pledge-form">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Country" />
          <input type="text" placeholder="Parish / State (Optional)" />

          <button type="submit" className="button primary">
            I Take The Pledge
          </button>
        </form>
      </section>
    </main>
  );
}
