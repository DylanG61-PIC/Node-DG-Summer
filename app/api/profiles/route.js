// /app/api/profiles/route.js
import { NextResponse } from "next/server";

// In-memory profiles data
let profiles = [
  { id: 1, name: "Ava Lee", major: "CS", year: 2, gpa: 3.6 },
  { id: 2, name: "Ben Park", major: "CGT", year: 3, gpa: 3.2 },
];

// GET all profiles + optional filters: ?name=, ?major=, ?year=
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  let filtered = [...profiles];

  const name = searchParams.get("name");
  const major = searchParams.get("major");
  const year = searchParams.get("year");

  if (name) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (major) {
    filtered = filtered.filter((p) => p.major.toLowerCase() === major.toLowerCase());
  }

  if (year) {
    filtered = filtered.filter((p) => p.year === Number(year));
  }

  return NextResponse.json(filtered, { status: 200 });
}

// POST create new profile
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name || typeof data.name !== "string")
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    if (!data.major || typeof data.major !== "string")
      return NextResponse.json({ error: "Invalid major" }, { status: 400 });
    if (data.year < 1 || data.year > 4)
      return NextResponse.json({ error: "Invalid year" }, { status: 400 });
    if (data.gpa < 0 || data.gpa > 4)
      return NextResponse.json({ error: "Invalid GPA" }, { status: 400 });

    const newProfile = {
      id: Date.now(),
      name: data.name.trim(),
      major: data.major,
      year: Number(data.year),
      gpa: Number(data.gpa),
    };

    profiles.push(newProfile);
    return NextResponse.json(newProfile, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

// DELETE by ?id=
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  const index = profiles.findIndex((p) => p.id === Number(id));

  if (index === -1)
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  profiles.splice(index, 1);
  return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
}