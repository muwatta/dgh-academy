import { getStoredGallery, setStoredGallery } from "@/lib/server-storage";

export async function GET() {
  const gallery = await getStoredGallery();
  return new Response(JSON.stringify(gallery), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  if (!Array.isArray(payload)) {
    return new Response(JSON.stringify({ error: "Gallery payload must be an array." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await setStoredGallery(payload);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
