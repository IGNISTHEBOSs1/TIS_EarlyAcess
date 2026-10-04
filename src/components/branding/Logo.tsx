import { useTheme } from "../../hooks/useTheme";
import logoMicro from "../../assets/branding/logo-micro.svg";
import logoMicroDark from "../../assets/branding/logo-micro-dark-mode.svg";

/**
 * Kinetic Canonical brand mark.
 * Uses theme-aware micro vector marks for crisp, high-contrast display
 * in both SOLAR and LUNAR modes.
 */
export const KineticLogo = ({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) => {
  const { isDark } = useTheme();
  const src = isDark ? logoMicroDark : logoMicro;

  return (
    <img
      src={src}
      alt="Kinetic brand mark"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
};

export const SystemLogo = KineticLogo;
