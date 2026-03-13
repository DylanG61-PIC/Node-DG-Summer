export default async function ProfilePage({ params }) {

  const res = await fetch(
    `https://dummyjson.com/users/${params.id}`
  )

  const user = await res.json()

  return (
    <main>

      <h1>{user.firstName} {user.lastName}</h1>

      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company.name}</p>

    </main>
  )
}