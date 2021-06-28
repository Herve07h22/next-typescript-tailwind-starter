// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { IncomingMessage } from 'http';
import { NextApiRequest, NextApiResponse, GetServerSideProps } from 'next';
import { withIronSession, Session } from 'next-iron-session';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';
type NextIronRequest = IncomingMessage & { cookies: NextApiRequestCookies } & NextApiRequest & {
    session: Session;
  };
export type ContextWithSession = { req: NextIronRequest; res: NextApiResponse };

export function withSession(handler: any): GetServerSideProps {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD || 'Private_key_used_to_encrypt_the_cookie',
    cookieName: 'iron-session',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  });
}

export function getUserOrRedirect(context: ContextWithSession): {
  user?: any;
  redirect?: { destination: string; permanent: boolean };
} {
  const user = context.req.session.get('user');
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      user: null,
    };
  }
  return { user };
}
