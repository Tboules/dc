export default function apiError(message: string, code: number) {
  return Response.json(
    {
      error: message,
    },
    {
      status: code,
    },
  );
}
