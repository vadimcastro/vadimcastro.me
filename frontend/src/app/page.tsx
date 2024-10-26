// src/app/page.tsx
export default function Home() {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">Welcome to My Digital Space</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <section className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <p>Explore my latest coding projects and experiments.</p>
          </section>
          <section className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Cloud Storage</h2>
            <p>Access and manage your personal files securely.</p>
          </section>
          <section className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Work Catalog</h2>
            <p>Browse through my professional portfolio and achievements.</p>
          </section>
        </div>
      </div>
    )
  }
  