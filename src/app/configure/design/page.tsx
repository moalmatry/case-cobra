import DesignConfigurator from "@/components/DesignConfigurator";
import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  // Ensuring searchParams is a Promise resolves the type error.
  searchParams: Promise<{ id?: string }>;
}

export default async function Design({ searchParams }: PageProps) {
  const { id } = await Promise.resolve(searchParams);
  if (!id || typeof id !== "string") return notFound();
  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) return notFound();

  const { imageUrl, width, height } = configuration;
  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ height, width }}
      imageUrl={imageUrl}
    />
  );
}
