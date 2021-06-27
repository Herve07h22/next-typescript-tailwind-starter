import Link from 'next/link';
import { withSession, getUserOrRedirect } from '../authentication/session';
import Layout from '../components/Layout';

const IndexPage = ({ user }) => (
  <Layout title="Home | Next.js + TypeScript Example" user={user}>
    <h1>Hello Next.js </h1>

    <form method="post" action="/about" className="m-4 flex">
      <input
        className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        placeholder="your@mail.com"
        name="email"
      />
      <button
        type="submit"
        className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r"
      >
        Subscribe
      </button>
    </form>

    <p className="mt-4">
      <Link href="/about">
        <a className="text-gray-400">About ⏭</a>
      </Link>
    </p>
  </Layout>
);

export const getServerSideProps = withSession(async (context) => {
  const { user, redirect } = getUserOrRedirect(context);
  return { props: { user } };
});

export default IndexPage;
