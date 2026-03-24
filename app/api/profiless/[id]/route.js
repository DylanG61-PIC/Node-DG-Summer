// /app/api/profiles/[id]/route.js
import { NextResponse } from "next/server";

// Same in-memory profiles
let profiles = [
  { id: 1, name: "Ava Lee", major: "CS", year: 2, gpa: 3.6 },
  { id: 2, name: "Ben Park", major: "CGT", year: 3, gpa: 3.2 },
];

// GET by ID
export async function GET(request, { params }) {
  const { id } = params;
  const profile = profiles.find((p) => p.id === Number(id));

  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  return NextResponse.json(profile, { status: 200 });
}

// PATCH update by ID
export async function PATCH(request, { params }) {
  const { id } = params;
  const index = profiles.findIndex((p) => p.id === Number(id));

  if (index === -1)
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const updates = await request.json();

  if (updates.year && (updates.year < 1 || updates.year > 4))
    return NextResponse.json({ error: "Invalid year" }, { status: 400 });
  if (updates.gpa && (updates.gpa < 0 || updates.gpa > 4))
    return NextResponse.json({ error: "Invalid GPA" }, { status: 400 });

  profiles[index] = { ...profiles[index], ...updates, id: profiles[index].id };
  return NextResponse.json(profiles[index], { status: 200 });
}