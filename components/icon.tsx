import { Image, LucideProps, Quote, SquareUser } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export type IconName = keyof typeof dynamicIconImports;

interface IconProps extends LucideProps {
  name: IconName;
}

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
