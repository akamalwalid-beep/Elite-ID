// app/api/upload-work/route.ts

import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "No file uploaded." },
        { status: 400 }
      );
    }

    const extension =
      file.name.toLowerCase().split(".").pop() || "";

    const allowedExtensions = ["csv", "xls", "xlsx"];

    if (!allowedExtensions.includes(extension)) {
      return NextResponse.json(
        {
          message:
            "Only CSV, XLS, and XLSX files are allowed.",
        },
        { status: 400 }
      );
    }

    // Token الخاص بـ elite-id-files
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
      console.error(
        "BLOB_READ_WRITE_TOKEN is missing."
      );

      return NextResponse.json(
        {
          message:
            "BLOB_READ_WRITE_TOKEN is missing. Please connect elite-id-files to the project and pull the environment variables.",
        },
        { status: 500 }
      );
    }

    const safeFileName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const fileName =
      `product-work/${Date.now()}-${safeFileName}`;

    const blob = await put(fileName, file, {
      access: "private",
      token,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      fileName: file.name,
      fileType: extension,
    });
  } catch (error: any) {
    console.error(
      "WORK FILE UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          error?.message ||
          "Work file upload failed.",
      },
      { status: 500 }
    );
  }
}