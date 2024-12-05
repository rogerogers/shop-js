import { authSigninAllowed, login } from '@/data/auth-server';
import { SignInError } from '@auth/core/errors';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const res = await authSigninAllowed({ email: user.email });
      if (res?.data?.allowed) {
        return true;
      }
      return false;
    },
    jwt({ token, user, account, profile, trigger, session }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    {
      userinfo: {
        url: 'https://open.feishu.cn/open-apis/authen/v1/user_info',
        async request({ tokens, provider }: any) {
          return await fetch(provider.userinfo?.url as URL, {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          }).then(async (res) => {
            const resJson = await res.json();
            return resJson?.data;
          });
        },
      },
      authorization: {
        url: 'https://accounts.feishu.cn/open-apis/authen/v1/authorize',
        params: {
          scope: '',
        },
      },
      token: 'https://open.feishu.cn/open-apis/authen/v2/oauth/token',
      style: {
        logo: 'https://p1-hera.feishucdn.com/tos-cn-i-jbbdkfciu3/84a9f036fe2b44f99b899fff4beeb963~tplv-jbbdkfciu3-image:0:0.image',
      },
      profile(profile) {
        return {
          id: profile.user_id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_thumb,
        };
      },
      id: 'feishu',
      name: 'feishu',
      type: 'oauth',
      clientId: process.env.AUTH_FEISHU_CLIENT_ID,
      clientSecret: process.env.AUTH_FEISHU_CLIENT_SECRET,
    },
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: '',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const respData = await login(credentials);
          if (respData?.success === true) {
            const { user } = respData.data;
            return user;
          } else {
            throw new SignInError(respData?.error);
          }
        } catch (error) {
          const e = error as Error;
          throw new SignInError(e.message);
        }
      },
    }),
  ],
  session: {
    maxAge: 30 * 7 * 60 * 60,
    strategy: 'jwt',
  },
});
