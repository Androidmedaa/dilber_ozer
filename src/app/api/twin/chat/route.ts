import { NextResponse } from "next/server";

const backendUrl = process.env.TWIN_BACKEND_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/api/v1/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120_000),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.detail ?? "Twin backend error." },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        error:
          "AI backend is not reachable. Start FastAPI on port 8000 and set TWIN_BACKEND_URL in .env.local.",
        fallback: true,
      },
      { status: 503 },
    );
  }
}
