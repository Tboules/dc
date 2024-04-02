"use client";

import React from "react";
import { Input, InputProps } from "./ui/input";
import { Image as ImageIcon } from "lucide-react";

interface Props extends InputProps {}

const FileInputWithPreview = React.forwardRef<HTMLInputElement, Props>(
  ({ ...rest }: Props, ref) => {
    const [imageUrl, setImageUrl] = React.useState<string>();

    return (
      <div className="space-y-2">
        <Input
          className=""
          ref={ref}
          {...rest}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length) {
              if (imageUrl) URL.revokeObjectURL(imageUrl);

              const url = URL.createObjectURL(e.target.files[0]);
              setImageUrl(url);
            }
          }}
        />
        <div className="border border-border rounded h-72 flex flex-col justify-center items-center overflow-clip">
          {imageUrl ? (
            <img className="w-full h-full object-cover" src={imageUrl} />
          ) : (
            <>
              <ImageIcon strokeWidth={1} height={64} width={64} />
              <h4 className="font-medium text-lg">Image Preview</h4>
            </>
          )}
        </div>
      </div>
    );
  },
);

FileInputWithPreview.displayName = "FileInputWithPreview";

export default FileInputWithPreview;
