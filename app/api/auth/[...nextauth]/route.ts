import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

// Spotify API scopes
const scopes = [
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-top-read",
].join(" ");

// NextAuth configuration
export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

// Export handlers for GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };