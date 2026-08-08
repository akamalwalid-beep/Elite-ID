import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed." },
        { status: 400 }
      );
    }

    const fileName = `products/${Date.now()}-${file.name.replace(
      /\s+/g,
      "-"
    )}`;

    const blob = await put(fileName, file, {
      access: "public",
    });

    return NextResponse.json({
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { message: "Upload failed." },
      { status: 500 }
    );
  }
}