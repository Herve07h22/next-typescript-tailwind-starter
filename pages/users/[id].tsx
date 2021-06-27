import { User } from '../../domain/users/entities/Users';
import Layout from '../../components/Layout';
import ListDetail from '../../components/ListDetail';
import { dependencies } from '../../interface/depedencies';

type Props = {
  user?: User;
  errors?: string;
};

const UserDetail = ({ user, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={`${user ? user.name : 'User Detail'} | Next.js + TypeScript Example`}>
      {user && <ListDetail item={user} />}
    </Layout>
  );
};

export default UserDetail;

export async function getServerSideProps(context) {
  const id = context.params?.id;
  const user = id && (await dependencies.userRepository.get(parseInt(id)));
  return user ? { props: { user } } : { notFound: true };
}
