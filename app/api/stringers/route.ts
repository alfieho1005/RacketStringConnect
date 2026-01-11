import { NextResponse } from "next/server";
import { stringerRepository } from "@/lib/stringers/memoryRepository";
import type { StringerPayload } from "@/lib/stringers/types";

const visibilities = ["active", "inactive"] as const;

type Visibility = (typeof visibilities)[number];

const isValidVisibility = (value: unknown): value is Visibility =>
  typeof value === "string" && visibilities.includes(value as Visibility);

export async function GET() {
  const stringers = await stringerRepository.list();
  return NextResponse.json({ stringers });
}

export async function POST(request: Request) {
  const body: Partial<StringerPayload> = await request.json();

  if (!body.name || !body.description) {
    return NextResponse.json(
      { error: "Name and description are required." },
      { status: 400 }
    );
  }

  if (!Array.isArray(body.sports) || body.sports.length === 0) {
    return NextResponse.json(
      { error: "Select at least one supported sport." },
      { status: 400 }
    );
  }

  if (!body.area) {
    return NextResponse.json(
      { error: "Area missing." },
      { status: 400 }
    );
  }

  if (!isValidVisibility(body.visibility)) {
    return NextResponse.json(
      { error: "Visibility must be active or inactive." },
      { status: 400 }
    );
  }

  const payload: StringerPayload = {
    name: body.name,
    description: body.description,
    sports: body.sports,
    area: body.area,
    pricing: body.pricing,
    contact: body.contact ?? {},
    visibility: body.visibility,
    slug: body.slug,
  };

  const stringer = await stringerRepository.upsert(payload);
  return NextResponse.json({ stringer });
}
