import * as React from "react";

interface LogoIconProps {
  size?: number;
  className?: string;
}

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
  variant?: "full" | "icon" | "horizontal";
}

function LogoIcon({ size = 48, className }: LogoIconProps) {
  return (
    <img
      src="/images/logo-icon.png"
      alt="Radiance Wellness Spa"
      width={size}
      height={Math.round(size * 0.57)}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}

function Logo({
  className,
  size = 48,
  showText = true,
  textClassName,
  variant = "full",
}: LogoProps) {
  if (variant === "icon") {
    return <LogoIcon size={size} className={className} />;
  }

  if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-2 ${className || ""}`}>
        <LogoIcon size={size} />
        {showText && (
          <span className={`font-display font-semibold ${textClassName || "text-primary-700"}`} style={{ fontSize: size * 0.4 }}>
            Radiance
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className || ""}`}>
      <img
        src="/images/logo-full.png"
        alt="Radiance Wellness Spa"
        width={size * 2}
        height={Math.round(size * 2 * 0.59)}
        className={className}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

export { Logo, LogoIcon };
