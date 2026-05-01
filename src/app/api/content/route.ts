import { getStoredContent, setStoredContent } from "@/lib/server-storage";

export async function GET() {
  const content = await getStoredContent();
  return new Response(JSON.stringify(content), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  if (typeof payload !== "object" || payload === null) {
    return new Response(JSON.stringify({ error: "Content payload must be an object." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await setStoredContent(payload);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
