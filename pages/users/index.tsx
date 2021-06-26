import Link from 'next/link'
import { User } from '../../domain/users/entities/Users'
import Layout from '../../components/Layout'
import List from '../../components/List'
import AddItem from '../../components/AddItem'
import {dependencies } from '../../interface/depedencies' 
import { countFirstNames } from '../../domain/users/use-cases/countFirstNames'
import { parseBody } from 'next/dist/next-server/server/api-utils';

type Props = {
  users: User[],
  frequencies: Array<{name:string, occurences:number}>
}

const Users = ({ users, frequencies }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1 className="text-2xl mb-4 font-bold" >Users List</h1>
    <p>
      Example fetching data from inside <code>getServerSideProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={users} />
    <p className="mt-4">
      {frequencies.length ? frequencies.map(f => `${f.occurences} ${f.name}${f.occurences>1 ? 's' : ''}`).join(', ') : "No one here..."}
    </p>
    <AddItem />
    <p className="mt-4">
      <Link href="/">
        <a className="text-gray-400">Go home ⏭</a>
      </Link>
    </p>
  </Layout>
)

export async function getServerSideProps(context) {
  if (context.req.method == "POST") {
    const {username} = await parseBody(context.req, '1mb');
    username && await dependencies.userRepository.save({name:username})
  }
  const users = await dependencies.userRepository.list()
  const frequencies = await countFirstNames(dependencies.userRepository)
  return { props: { users, frequencies } }
}

export default Users
