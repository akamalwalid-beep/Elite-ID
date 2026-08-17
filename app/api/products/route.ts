import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [
        {
          featured: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : "";

    const country =
      typeof body.country === "string"
        ? body.country.trim()
        : "";

    const currency =
      typeof body.currency === "string"
        ? body.currency.trim()
        : "USDT";

    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Product title is required.",
        },
        { status: 400 }
      );
    }

    if (!country) {
      return NextResponse.json(
        {
          success: false,
          message: "Country is required.",
        },
        { status: 400 }
      );
    }

    const price = Number(body.price);
    const stock = Number(body.stock);

    const rating =
      body.rating === undefined ||
      body.rating === null ||
      body.rating === ""
        ? 5
        : Number(body.rating);

    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product price.",
        },
        { status: 400 }
      );
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product stock.",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 5
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be between 0 and 5.",
        },
        { status: 400 }
      );
    }

    const image =
      typeof body.image === "string"
        ? body.image.trim()
        : "";

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Product image is required.",
        },
        { status: 400 }
      );
    }

    const workFileUrl =
      typeof body.workFileUrl === "string" &&
      body.workFileUrl.trim()
        ? body.workFileUrl.trim()
        : null;

    const workFileName =
      typeof body.workFileName === "string" &&
      body.workFileName.trim()
        ? body.workFileName.trim()
        : null;

    const workFileType =
      typeof body.workFileType === "string" &&
      body.workFileType.trim()
        ? body.workFileType.trim()
        : null;

    const features = Array.isArray(body.features)
      ? body.features.filter(
          (feature: unknown): feature is string =>
            typeof feature === "string"
        )
      : [];

    let baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!baseSlug) {
      baseSlug = `product-${Date.now()}`;
    }

    let slug = baseSlug;
    let counter = 1;

    while (
      await prisma.product.findUnique({
        where: {
          slug,
        },
        select: {
          id: true,
        },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        country,
        price,
        currency: currency || "USDT",
        image,
        description: description || null,
        stock,
        views: 0,
        rating,
        featured: Boolean(body.featured),
        topRated: Boolean(body.topRated),
        bestSeller: Boolean(body.bestSeller),
        rare: Boolean(body.rare),
        features,
        workFileUrl,
        workFileName,
        workFileType,
      },
    });

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("CREATE PRODUCT ERROR:", error);

    if (error?.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message:
            "A product with this information already exists.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to create product.",
      },
      { status: 500 }
    );
  }
}