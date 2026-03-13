interface ProfileParams {
  params: {
    id: string; // always string from URL
  };
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

export default async function ProfilePage({ params }: ProfileParams) {
  const res = await fetch(`https://dummyjson.com/users/${params.id}`, {
    next: { revalidate: 0 }, // ensures server-side fetch
  });

  const user: User = await res.json();

  return (
    <main>
      <h1>
        {user.firstName} {user.lastName}
      </h1>

      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company.name}</p>
    </main>
  );
}