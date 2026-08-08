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

    const fileName = file.name.toLowerCase();

    const isImage = file.type.startsWith("image/");

    const isXlsx =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileName.endsWith(".xlsx");

    const isCsv =
      file.type === "text/csv" ||
      file.type === "application/csv" ||
      fileName.endsWith(".csv");

    if (!isImage && !isXlsx && !isCsv) {
      return NextResponse.json(
        {
          message: "Only images, XLSX and CSV files are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    const folder = isImage ? "products" : "product-files";

    const safeFileName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const filePath = `${folder}/${Date.now()}-${safeFileName}`;

    const blob = await put(filePath, file, {
      access: "public",
    });

    return NextResponse.json({
      url: blob.url,
      fileName: file.name,
      fileType: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        message: "Upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}