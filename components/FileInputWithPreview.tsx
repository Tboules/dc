import React from "react";
import { Input, InputProps } from "./ui/input";
import { Image } from "lucide-react";

interface Props extends InputProps {}

const FileInputWithPreview = React.forwardRef<HTMLInputElement, Props>(
  ({ ...rest }: Props, ref) => {
    return (
      <div className="space-y-2">
        <Input className="" ref={ref} {...rest} type="file" accept="image/*" />
        <div className=" border border-border rounded h-72 flex flex-col justify-center items-center">
          <Image strokeWidth={1} height={64} width={64} />
          <h4 className="font-medium text-lg">Image Preview</h4>
        </div>
      </div>
    );
  },
);

export default FileInputWithPreview;
