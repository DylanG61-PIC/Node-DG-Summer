export default async function Home({ searchParams }: any) {

  const search = searchParams?.search || "";
  const title = searchParams?.title || "";

  const res = await fetch(`https://dummyjson.com/users/search?q=${search}`);
  const data = await res.json();

  return (
    <main>

      <h1>Developer Profiles</h1>

      <form>

        <input
          name="search"
          placeholder="Search name"
          defaultValue={search}
        />

        <select name="title" defaultValue={title}>
          <option value="">All Titles</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
        </select>

        <button type="submit">Filter</button>

      </form>

      <ul>
        {data.users.map((user:any) => (
          <li key={user.id}>
            <a href={`/profiles/${user.id}`}>
              {user.firstName} {user.lastName}
            </a>
          </li>
        ))}
      </ul>

    </main>
  );
}