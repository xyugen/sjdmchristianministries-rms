import { getLegalDocumentFileById } from "@/lib/api/administrative/query";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse("Missing id", { status: 400 });
  }

  try {
    const result = await getLegalDocumentFileById(id);

    if (!result) {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileBytes = new Uint8Array(result.file);

    return new NextResponse(fileBytes, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${result.fileName}"`,
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to download the legal document file.", {
      status: 500,
    });
  }
};
