import React, { useState } from 'react';
import Layout from '../components/Layout';
import { parseBody } from 'next/dist/next-server/server/api-utils';
import { dependencies } from '../interface/depedencies';
import { authenticate } from '../domain/users/use-cases/authenticate';
import { withSession } from '../authentication/session';

const Login = ({ errorMsg }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen select-none">
        <div className="flex flex-col -mt-32 bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl shadow-2xl w-full max-w-md  border-l-4 border-blue-600">
          <div className="mt-10">
            <form method="POST" action="">
              {errorMsg && <p className="p-2 text-red-500">{errorMsg}</p>}
              <div className="relative w-full mb-3">
                <input
                  type="text"
                  name="username"
                  className="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Username"
                  style={{ transition: 'all 0.15s ease 0s' }}
                />
              </div>
              <div className="relative w-full mb-3">
                <input
                  type="password"
                  name="password"
                  className="border-0 p-4 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Password"
                  style={{ transition: 'all 0.15s ease 0s' }}
                />
              </div>
              <div className="text-center mt-6">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  value="Log In"
                  className="p-3 rounded-lg bg-blue-400 outline-none font-bold uppercase tracking-wider text-white shadow w-32 justify-center focus:bg-purple-700 hover:bg-blue-600"
                />
              </div>
              <div className="flex flex-wrap mt-6">
                <div className="w-1/2 text-left">
                  <a href="#" className="text-blue-900 text-xl">
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <a href="#" className="text-blue-900 text-xl">
                    <small>Sign In</small>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <form method="post" action="/login" className="flex flex-col">
        <span>Type your GitHub username</span>
        <input type="text" name="username" required />
        <input type="password" name="password" required />

        <button type="submit">Login</button>

        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </Layout>
  );
};

export const getServerSideProps = withSession(async (context) => {
  if (context.req.method == 'POST') {
    const { username, password } = await parseBody(context.req, '1mb');
    const user = await authenticate({ username, password }, dependencies);
    if (user) {
      context.req.session.set('user', user);
      await context.req.session.save();
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          errorMsg: 'Unregistered user',
        },
      };
    }
  }
  return {
    props: { errorMsg: '' },
  };
});

export default Login;
