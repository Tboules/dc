import React, { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { v4 as uuidv4 } from "uuid";
import { ObjectValues } from "@/lib/enums";
import Lottie from "react-lottie-player";
import lottieAnimation from "@/assets/loading.json";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  setFinalImageUrl: (id: string) => void;
}

/*
  1. generate file path uuid -- 
  2. get presigned --
  3. upload file --
  4. save file url with uuid within form -- 
  5. create cool loading animation -- 
  6. image preview

  potential issues with this implementation
  -- What happens if a user uploads an image but doesn't completely submit the form. Then we have bloat in our S3 bucket.
*/

const S3_FILE_UPLOAD_STATUS = {
  init: "init",
  loading: "loading",
  error: "error",
  success: "success",
} as const;

type S3fileUploadStatus = ObjectValues<typeof S3_FILE_UPLOAD_STATUS>;

export default function S3FileUploadInput({
  setFinalImageUrl,
  ...rest
}: Props) {
  const [status, setStatus] = React.useState<S3fileUploadStatus>(
    S3_FILE_UPLOAD_STATUS.init,
  );

  async function uploadFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setStatus("loading");
    let fileId = uuidv4();
    const fileUrl = process.env.NEXT_PUBLIC_AWS_S3_URL + fileId;

    try {
      const res = await fetch(`/api/documents?file=${fileId}`);
      const {
        presignedUrl,
      }: {
        presignedUrl: string;
      } = await res.json();

      const file = e.target.files[0];

      const fileUploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
      });

      if (!fileUploadResponse.ok) {
        console.log("file upload error");
        setStatus("error");
        return;
      }

      setFinalImageUrl(fileUrl);
      setStatus("success");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  }

  return (
    <div className="space-y-2">
      <Label>Thumbnail</Label>
      {status == "loading" && (
        <div className="h-10 border border-border rounded relative overflow-clip">
          <Lottie
            className="absolute bottom-0 -left-12 -right-12"
            loop
            animationData={lottieAnimation}
            play
          />
        </div>
      )}
      <Input
        {...rest}
        type="file"
        accept="image/*"
        className={status == "loading" ? "hidden" : ""}
        onChange={uploadFile}
      />
    </div>
  );
}
