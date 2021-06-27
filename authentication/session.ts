// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session';

export function withSession(handler) {
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

export function getUserOrRedirect(context): {
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
