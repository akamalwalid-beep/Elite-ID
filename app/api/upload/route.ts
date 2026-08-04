import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const uploadPath = path.join(
      process.cwd(),
      "public",
      "images",
      "products",
      fileName
    );

    await writeFile(uploadPath, buffer);

    return NextResponse.json({
      url: `/images/products/${fileName}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Upload failed." },
      { status: 500 }
    );
  }
}