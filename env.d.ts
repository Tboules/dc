namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    AWS_S3_ACCESS_KEY: string;
    AWS_S3_SECRET_KEY: string;
    AWS_S3_BUCKET_NAME: string;
    AWS_S3_REGION: string;
    NEXT_PUBLIC_AWS_S3_URL: string;
  }
}
