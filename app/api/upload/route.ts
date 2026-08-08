import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          message: "No file uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          message: "Only image files are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    const fileName = `products/${Date.now()}-${file.name.replace(
      /\s+/g,
      "-"
    )}`;

    const token = process.env.IMG_BLOB_READ_WRITE_TOKEN;

    if (!token) {
      console.error("IMG_BLOB_READ_WRITE_TOKEN is missing");

      return NextResponse.json(
        {
          message: "Blob storage is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const blob = await put(fileName, file, {
      access: "public",
      token,
    });

    return NextResponse.json({
      url: blob.url,
    });
  } catch (error) {
    console.error("IMAGE UPLOAD ERROR:", error);

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