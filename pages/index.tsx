import { GetServerSideProps } from 'next';
import { withSession, getUserOrRedirect, ContextWithSession } from '../interface/session';
import Layout from '../components/Layout';
import { User } from '../domain/users/entities/Users';

type Props = {
  user: User;
};

const IndexPage = ({ user }: Props) => (
  <Layout title="Home | Next.js + TypeScript Example" user={user}>
    <main className="flex justify-between mt-10 mx-auto  px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left px-8">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Turn your idea into </span>
          <span className="block text-indigo-600 xl:inline">online software</span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
          Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <form method="post" action="/about" className="mr-4 flex ">
            <input
              className="w-64 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
              placeholder="your@mail.com"
              name="email"
            />
            <button
              type="submit"
              className="px-8 rounded-r-lg bg-blue-400  text-white font-bold p-4 uppercase border-blue-500 border-t border-b border-r"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div>
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>
    </main>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: ContextWithSession) => {
    const { user, redirect } = getUserOrRedirect(context);
    return { props: { user } };
  }
);

export default IndexPage;
