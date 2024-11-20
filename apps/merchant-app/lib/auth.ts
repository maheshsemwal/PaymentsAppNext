import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import db from "@repo/db/client";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !user.email || !account) {
        return false;
      }

      const authType = account.provider === "google" ? "Google" : "Github";

      await db.merchant.upsert({
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name || "",
          auth_type: authType,
        },
        update: {
          name: user.name || "",
          auth_type: authType,
        },
        select: {
          id: true,
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
