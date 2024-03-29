import { ChangeEvent } from "react";
import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";
import { v4 as uuidv4 } from "uuid";

interface Props extends InputProps {
  setFinalImageUrl: (id: string) => void;
}

/*
  1. generate file path uuid -- 
  2. get presigned --
  3. upload file --
  4. save file url with uuid within form
  5. create cool loading animation
  6. image preview
*/

export default function S3FileUploadInput({
  setFinalImageUrl,
  ...rest
}: Props) {
  async function uploadFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    let fileId = uuidv4();
    const fileUrl = process.env.NEXT_PUBLIC_AWS_S3_URL + fileId;

    try {
      const res = await fetch(`/api/documents?file=${fileId}`);
      const {
        presignedUrl,
      }: {
        presignedUrl: string;
      } = await res.json();

      const fileUploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: e.target.files[0],
      });

      if (!fileUploadResponse.ok) {
        console.log("file upload error");
        return;
      }

      setFinalImageUrl(fileUrl);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="space-y-2">
      <Label>Thumbnail</Label>
      <Input {...rest} type="file" accept="image/*" onChange={uploadFile} />
    </div>
  );
}
