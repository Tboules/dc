"use client";

import { ObjectValues } from "@/lib/enums";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const S3_FILE_UPLOAD_STATUS = {
  init: "init",
  loading: "loading",
  error: "error",
  success: "success",
} as const;

type S3fileUploadStatus = ObjectValues<typeof S3_FILE_UPLOAD_STATUS>;

export default function useS3UploadFile() {
  const [file, setFile] = React.useState<File>();
  const [signedUrl, setSignedUrl] = React.useState<string>();
  const [uploadStatus, setUploadStatus] = React.useState<S3fileUploadStatus>(
    S3_FILE_UPLOAD_STATUS.init,
  );

  async function getPresignedUrl(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setUploadStatus("loading");
    let fileId = uuidv4();

    try {
      const res = await fetch(`/api/documents?file=${fileId}`);
      const {
        presignedUrl,
      }: {
        presignedUrl: string;
      } = await res.json();

      const file = e.target.files[0];
      setFile(file);
      setSignedUrl(presignedUrl);

      setUploadStatus("success");
    } catch (error) {
      console.log(error);
      setUploadStatus("error");
    }
  }

  return {
    file,
    signedUrl,
    uploadStatus,
    getPresignedUrl,
  };
}
