import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";
import { S3C } from "./get-presigned";

export async function GET(r: NextRequest) {
  const { searchParams } = r.nextUrl;

  const file = searchParams.get("file");

  if (!file) {
    return Response.json(
      { error: "File query parameter is required" },
      { status: 400 },
    );
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file,
  });

  const url = await getSignedUrl(S3C, command, { expiresIn: 60 });

  return Response.json({ presignedUrl: url });
}
