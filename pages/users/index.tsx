import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { parseBody } from 'next/dist/next-server/server/api-utils';
import { getUserOrRedirect, withSession, ContextWithSession } from '../../interface/session';

import { User } from '../../domain/users/entities/Users';
import Layout from '../../components/Layout';
import List from '../../components/List';
import AddItem from '../../components/AddItem';
import { dependencies } from '../../interface/depedencies';
import { countFirstNames } from '../../domain/users/use-cases/countFirstNames';

type Props = {
  users: User[];
  frequencies: Array<{ name: string; occurences: number }>;
  user: User;
};

const Users = ({ users, frequencies, user }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example" user={user}>
    <h1 className="text-2xl mb-4 font-bold">Users List</h1>
    <p>
      Example fetching data from inside <code>getServerSideProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={users} />
    <p className="mt-4">
      {frequencies.length
        ? frequencies
            .map((f) => `${f.occurences} ${f.name}${f.occurences > 1 ? 's' : ''}`)
            .join(', ')
        : 'No one here...'}
    </p>
    <AddItem />
    <p className="mt-4">
      <Link href="/">
        <a className="text-gray-400">Go home ⏭</a>
      </Link>
    </p>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: ContextWithSession) => {
    const { user, redirect } = getUserOrRedirect(context);
    if (redirect) return { redirect };

    if (context.req.method == 'POST') {
      const { username, remove } = await parseBody(context.req, '1mb');
      username && (await dependencies.userRepository.save({ name: username }));
      remove && (await dependencies.userRepository.remove(parseInt(remove)));
    }
    const users = await dependencies.userRepository.list();
    const frequencies = await countFirstNames(dependencies.userRepository);
    return { props: { users, frequencies, user } };
  }
);

export default Users;
