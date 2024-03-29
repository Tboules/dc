import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

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

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return Response.json({ presignedUrl: url });
}
