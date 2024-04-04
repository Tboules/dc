import dynamic from "next/dynamic";
import { Image, LucideProps, Quote, SquareUser } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export type IconName = keyof typeof dynamicIconImports;

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon {...props} />;
};

export const NavIconSwitcher = ({ name, ...props }: IconProps) => {
  if (name == "quote") {
    return <Quote {...props} />;
  }

  if (name == "user") {
    return <SquareUser {...props} />;
  }

  if (name == "image") {
    return <Image {...props} />;
  }

  return <></>;
};
