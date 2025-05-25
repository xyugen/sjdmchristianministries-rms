import { getLegalDocumentFileById } from "@/lib/api/administrative/query";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const result = await getLegalDocumentFileById(id);

  if (!result) {
    return new Response("File not found", { status: 404 });
  }

  const fileBytes = new Uint8Array(result.file);

  return new NextResponse(fileBytes, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${result.fileName}"`,
    },
  });
}