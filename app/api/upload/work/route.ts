import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  "csv",
  "xls",
  "xlsx",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No work file uploaded.",
        },
        { status: 400 }
      );
    }

    const extension =
      file.name
        .toLowerCase()
        .split(".")
        .pop() || "";

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only CSV, XLS, and XLSX files are allowed.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Work file size must be 25MB or less.",
        },
        { status: 400 }
      );
    }

    const token =
      process.env.BLOB_READ_WRITE_TOKEN;

    const storeId =
      process.env.BLOB_STORE_ID;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "BLOB_READ_WRITE_TOKEN is missing.",
        },
        { status: 500 }
      );
    }

    if (!storeId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "BLOB_STORE_ID is missing.",
        },
        { status: 500 }
      );
    }

    /*
     * Never send the original filename directly
     * to Blob because it may contain Unicode characters.
     */

    const fileName =
      `work-files/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    /*
     * Work files are PRIVATE.
     *
     * Images use the public image store.
     * Work files use the private main Blob store.
     */

    const blob = await put(
      fileName,
      buffer,
      {
        access: "private",
        token,
        storeId,
        contentType:
          file.type ||
          "application/octet-stream",
        addRandomSuffix: false,
      }
    );

    console.log(
      "WORK FILE UPLOAD SUCCESS"
    );

    console.log(
      "Store:",
      storeId
    );

    console.log(
      "File:",
      fileName
    );

    return NextResponse.json(
      {
        success: true,
        url: blob.url,
        fileName: file.name,
        fileType: extension,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "=============================="
    );

    console.error(
      "WORK FILE UPLOAD ERROR"
    );

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      "Name:",
      error?.name
    );

    console.error(
      "Stack:",
      error?.stack
    );

    console.error(
      "=============================="
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Work file upload failed.",
      },
      { status: 500 }
    );
  }
}