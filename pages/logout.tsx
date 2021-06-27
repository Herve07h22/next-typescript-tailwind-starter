import React from 'react';
import Layout from '../components/Layout';
import { withSession } from '../authentication/session';

const Logout = ({ errorMsg }) => {
  return (
    <Layout>
      <p>Logging out...</p>
    </Layout>
  );
};

export const getServerSideProps = withSession(async (context) => {
  context.req.session.unset('user');
  await context.req.session.save();
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
});

export default Logout;
