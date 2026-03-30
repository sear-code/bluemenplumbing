import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LogoProps {
  variant?: "full" | "mark";
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
  className?: string;
  alt?: string;
}

const sizeClasses = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
  xl: "h-16",
} as const;

const sizeDimensions = {
  sm: { height: 32, width: 120 },
  md: { height: 40, width: 150 },
  lg: { height: 48, width: 180 },
  xl: { height: 64, width: 240 },
} as const;

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ className, variant = "full", size = "md", priority = false, alt = "Blue Men Plumbing" }, ref) => {
    const src = variant === "mark"
      ? "/assets/logos/bmp-logo.png"
      : "/assets/logos/bmp-light.png";

    const { width, height } = sizeDimensions[size];

    return (
      <div ref={ref} className={cn("inline-block", sizeClasses[size], className)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-auto h-full object-contain"
          sizes={`${width}px`}
        />
      </div>
    );
  }
);

Logo.displayName = "Logo";

export { Logo }; 