"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  // NOTE: find if the case id is already exists in the database or not
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });
  if (!configuration) throw new Error("Configuration not found");

  // NOTE: Check if the user already exists or not
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("You need to be logged in");

  // NOTE: Calculate the price of the case
  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  // NOTE: Check if the order already exists or not (if not create a new one)
  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configId,
    },
  });

  if (existingOrder) order = existingOrder;
  else
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });

  // NOTE: Create a new product in the stripe
  const product = await stripe.products.create({
    name: "Custom Iphone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  // NOTE: Create a new checkout session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "EG", "UA"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripeSession.url };
};
