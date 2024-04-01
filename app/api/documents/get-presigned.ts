import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "./route";

export async function getPresignedUrl(name: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: name,
  });
  try {
    return await getSignedUrl(s3Client, command, { expiresIn: 60 });
  } catch (error) {
    console.log(error);
  }
}
