import Link from 'next/link'
import Layout from '../components/Layout'
import { parseBody } from 'next/dist/next-server/server/api-utils';

const AboutPage = ({body}) => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1 className="text-2xl font-bold">About</h1>
    <p className="text-gray-400 mb-4" >This is the about page</p>
    <p>Received email form : {body.email || "no email"}</p>
    <p className="mt-4">
      <Link href="/">
        <a className="text-gray-400">Go home ⏭</a>
      </Link>
    </p>
  </Layout>
)

export async function getServerSideProps({req}) {
  var body = {}
  if (req.method == "POST") {
    body = await parseBody(req, '1mb');
  }
  return { props: { body } }
}

export default AboutPage
