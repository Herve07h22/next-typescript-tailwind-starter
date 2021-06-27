import Link from 'next/link';
import Layout from '../components/Layout';
import { parseBody } from 'next/dist/next-server/server/api-utils';
import { getUserOrRedirect, withSession } from '../authentication/session';

const AboutPage = ({ body, user }) => (
  <Layout title="About | Next.js + TypeScript Example" user={user}>
    <h1 className="text-2xl font-bold">About</h1>
    <p className="text-gray-400 mb-4">This is the about page</p>
    <p>Received email form : {body.email || 'no email'}</p>
    <p className="mt-4">
      <Link href="/">
        <a className="text-gray-400">Go home ⏭</a>
      </Link>
    </p>
  </Layout>
);

export const getServerSideProps = withSession(async (context) => {
  const { user, redirect } = getUserOrRedirect(context);
  var body = {};
  if (context.req.method == 'POST') {
    body = await parseBody(context.req, '1mb');
  }
  return { props: { body, user } };
});

export default AboutPage;
