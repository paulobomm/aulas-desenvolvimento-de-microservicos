import "dotenv/config";

export default {
  schema: "./src/modules/**/infra/schemas/*.ts",
  out: "./src/shared/infra/database/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
