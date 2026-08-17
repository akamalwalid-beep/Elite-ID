// D:\Elite-ID\frontend\app\api\login\route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const username =
      typeof body.username === "string"
        ? body.username.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Username and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        passwordHash: true,
        role: true,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        {
          status: 401,
        }
      );
    }

    if (
      admin.role !== "ADMIN" &&
      admin.role !== "OWNER"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied.",
        },
        {
          status: 403,
        }
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        admin.passwordHash
      );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        {
          status: 401,
        }
      );
    }

    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });

    response.cookies.set({
      name: "elite-admin",
      value: String(admin.id),
      httpOnly: true,
      sameSite: "lax",
      secure:
        process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error(
      "ADMIN LOGIN ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Login failed.",
      },
      {
        status: 500,
      }
    );
  }
}