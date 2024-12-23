import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import { S3C } from "./get-presigned";
import apiError from "@/lib/utils/error";

export async function GET(r: NextRequest) {
  const { searchParams } = r.nextUrl;

  const file = searchParams.get("file");

  if (!file) {
    return apiError("File query parameter is required", 400);
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file,
  });

  const url = await getSignedUrl(S3C, command, { expiresIn: 60 });

  return Response.json({ presignedUrl: url });
}
