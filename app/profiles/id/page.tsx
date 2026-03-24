// /app/profiles/[id]/page.tsx
interface ProfileParams {
  params: { id: string };
}

interface User {
  id: number;
  name: string;
  major: string;
  year: number;
  gpa: number;
}

export default async function ProfilePage({ params }: ProfileParams) {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/profiles/${params.id}`, { next: { revalidate: 0 } });

  if (!res.ok) return <p>Profile not found</p>;

  const user: User = await res.json();

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>{user.name}</h1>
      <p>Major: {user.major}</p>
      <p>Year: {user.year}</p>
      <p>GPA: {user.gpa}</p>
    </main>
  );
}