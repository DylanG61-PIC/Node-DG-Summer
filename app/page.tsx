// /app/page.tsx
interface SearchParams {
  search?: string;
}

interface User {
  id: number;
  name: string;
  major: string;
  year: number;
  gpa: number;
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const search = searchParams?.search || "";

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/profiles${search ? `?name=${search}` : ""}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return <p>Failed to load profiles.</p>;

  const data: User[] = await res.json();

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Developer Profiles</h1>

      <form method="get" style={{ marginBottom: "1rem" }}>
        <input
          name="search"
          placeholder="Search name"
          defaultValue={search}
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Filter
        </button>
      </form>

      {data.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.map((user) => (
            <li key={user.id} style={{ marginBottom: "0.5rem" }}>
              <a
                href={`/profiles/${user.id}`}
                style={{ color: "blue", textDecoration: "none" }}
              >
                {user.name} — {user.major}, Year {user.year}, GPA: {user.gpa}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}