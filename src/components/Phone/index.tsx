/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}
const Phone = ({ className, dark = false, imgSrc, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        className="pointer-events-none z-50 select-none"
        src={
          dark
            ? "/phone-template-dark.edges.png"
            : "/phone-template-white-edges.png"
        }
        alt="phone image"
      />
      <div className="absolute -z-10 inset-0">
        <img
          alt="overlaying phone"
          className="object-cover min-w-full min-h-full"
          src={imgSrc}
        />
      </div>
    </div>
  );
};

export default Phone;
