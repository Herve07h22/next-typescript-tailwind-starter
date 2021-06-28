import { GetServerSideProps } from 'next';
import { parseBody } from 'next/dist/next-server/server/api-utils';
import { withSession, ContextWithSession } from '../interface/session';
import Layout from '../components/Layout';

type Props = {
  errorMsg: string;
};

const Logout = ({ errorMsg }: Props) => {
  return (
    <Layout>
      <p>Logging out...</p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: ContextWithSession) => {
    context.req.session.unset('user');
    await context.req.session.save();
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
);

export default Logout;
