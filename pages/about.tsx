import Link from 'next/link'
import Layout from '../components/Layout'
import { parseBody } from 'next/dist/next-server/server/api-utils';

const AboutPage = ({body}) => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>{body.email || "no email"}</p>
    <p>
      <Link href="/">
        <a>Go home</a>
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
