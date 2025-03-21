import DesignPreview from "@/components/DesignPreview";
import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Preview({ searchParams }: PageProps) {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();
  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) return notFound();

  return <DesignPreview configuration={configuration} />;
}
