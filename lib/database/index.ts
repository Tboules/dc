import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const db = drizzle(process.env.DATABASE_URL!, { logger: true, schema });

export default db;
