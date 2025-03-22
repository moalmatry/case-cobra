import DesignConfigurator from "@/components/DesignConfigurator";
import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Design({ searchParams }: PageProps) {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();
  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) return notFound();

  const { imageUrl, width, height } = configuration;
  return (
    <DesignConfigurator
      key={1}
      configId={configuration.id}
      imageDimensions={{ height, width }}
      imageUrl={imageUrl}
    />
  );
}
