import * as React from "react";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: "full" | "mark";
  size?: "sm" | "md" | "lg" | "xl";
}

const Logo = React.forwardRef<HTMLImageElement, LogoProps>(
  ({ className, variant = "full", size = "md", alt = "Blue Men Plumbing", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
      xl: "h-16"
    };

    // Get light theme logo sources from public directory
    const getLogoSources = () => {
      if (variant === "mark") {
        return {
          src: "/assets/logos/bmp-logo.png",
          srcSet: "/assets/logos/bmp-logo.png 1x, /assets/logos/bmp-logo@2x.png 2x, /assets/logos/bmp-logo@3x.png 3x"
        };
      } else {
        return {
          src: "/assets/logos/bmp-light.png",
          srcSet: "/assets/logos/bmp-light.png 1x, /assets/logos/bmp-light@2x.png 2x, /assets/logos/bmp-light@3x.png 3x"
        };
      }
    };

    const logoSources = getLogoSources();

    return (
      <img
        ref={ref}
        src={logoSources.src}
        srcSet={logoSources.srcSet}
        alt={alt}
        className={cn("w-auto object-contain inline-block", sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

Logo.displayName = "Logo";

export { Logo }; 