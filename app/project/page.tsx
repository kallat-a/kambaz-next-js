import Link from "next/link";

export default function ProjectLandingPage() {
  return (
    <main
      className="container py-5"
      style={{ maxWidth: "640px" }}
      id="wd-project-landing"
    >
      <h1 className="h3 mb-4">Kambaz — course project</h1>
      <section className="mb-4">
        <h2 className="h5">Team</h2>
        <p className="mb-0">
          <strong>Ahaan Kallat</strong> — completed individually (add your
          section here if required, e.g. CS 4550 Section 01).
        </p>
      </section>
      <section className="mb-4">
        <h2 className="h5">Repositories</h2>
        <ul className="text-muted">
          <li>Front end (GitHub): add your repository URL here.</li>
          <li>Server (GitHub): add your repository URL here.</li>
        </ul>
      </section>
      <p className="small text-muted mb-3">
        Replace the placeholder links above before submitting. Deploy the app
        to Netlify (or similar) and point your assignment submission to this
        page&apos;s URL.
      </p>
      <Link href="/account/signin" className="btn btn-primary">
        Open Kambaz (sign in)
      </Link>
    </main>
  );
}
