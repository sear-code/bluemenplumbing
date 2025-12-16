import * as React from "react";
import { cn } from "@/lib/utils";

// Import light logo variations only
import logoLight from "@/assets/logos/bmp-logo.png";
import logoLight2x from "@/assets/logos/bmp-logo@2x.png";
import logoLight3x from "@/assets/logos/bmp-logo@3x.png";
import fullLogoLight from "@/assets/logos/bmp-light.png";
import fullLogoLight2x from "@/assets/logos/bmp-light@2x.png";
import fullLogoLight3x from "@/assets/logos/bmp-light@3x.png";

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

    // Get light theme logo sources only
    const getLogoSources = () => {
      if (variant === "mark") {
        return {
          src: logoLight,
          srcSet: `${logoLight} 1x, ${logoLight2x} 2x, ${logoLight3x} 3x`
        };
      } else {
        return {
          src: fullLogoLight,
          srcSet: `${fullLogoLight} 1x, ${fullLogoLight2x} 2x, ${fullLogoLight3x} 3x`
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