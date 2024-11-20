import NextAuth, {
  Account,
  NextAuthConfig,
  Profile,
  Session,
  User,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import { storeOrUpdateUserInDynamoDB } from "./actions/users";

export const config = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User; account: Account }) {
      if (!user.email) {
        return false;
      }
      return true;
    },

    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account: Account;
      profile?: Profile;
    }) {
      try {
        if (account && profile) {
          const { userId, username } = await storeOrUpdateUserInDynamoDB({
            email: token.email as string,
            name: token.name as string,
            image: token.picture as string,
            username: profile?.login as string,
            provider: account.provider as string,
          });

          token.accessToken = account.access_token;
          token.userId = userId;
          token.username = username;
        }
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        return token;
      }
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      session.userId = token.userId;
      session.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  trustHost: true,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        domain: process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : undefined
      }
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: true
      }
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true
      }
    }
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth(
  config as NextAuthConfig
);
