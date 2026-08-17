// D:\Elite-ID\frontend\app\api\products\[id]\route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (
      !Number.isInteger(productId) ||
      productId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        {
          status: 400,
        }
      );
    }

    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    console.error(
      "GET PRODUCT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to fetch product.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (
      !Number.isInteger(productId) ||
      productId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        {
          status: 400,
        }
      );
    }

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

    const image =
      typeof body.image === "string"
        ? body.image.trim()
        : "";

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product title is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!country) {
      return NextResponse.json(
        {
          success: false,
          message: "Country is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product image is required.",
        },
        {
          status: 400,
        }
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
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product stock.",
        },
        {
          status: 400,
        }
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
          message:
            "Rating must be between 0 and 5.",
        },
        {
          status: 400,
        }
      );
    }

    const features = Array.isArray(body.features)
      ? body.features.filter(
          (feature: unknown): feature is string =>
            typeof feature === "string"
        )
      : [];

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

    /*
     * Keep the product slug stable when editing.
     * This prevents existing product URLs from changing.
     */
    const existingProduct =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          id: true,
        },
      });

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    const product =
      await prisma.product.update({
        where: {
          id: productId,
        },

        data: {
          title,
          country,
          price,
          currency: currency || "USDT",
          rating,
          stock,
          image,
          description: description || null,

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

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error: any) {
    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    if (error?.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to update product.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (
      !Number.isInteger(productId) ||
      productId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        {
          status: 400,
        }
      );
    }

    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          id: true,
        },
      });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * OrderItem has a required Product relation.
     * Delete related order items first.
     */
    await prisma.orderItem.deleteMany({
      where: {
        productId,
      },
    });

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error: any) {
    console.error(
      "DELETE PRODUCT ERROR:",
      error
    );

    if (error?.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to delete product.",
      },
      {
        status: 500,
      }
    );
  }
}