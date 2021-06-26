import React from 'react'
import Link from 'next/link'

import { User } from '../domain/users/entities/Users'

type Props = {
  data: User
}

const ListItem = ({ data }: Props) => (
<div className="max-w-xl w-full rounded-lg shadow-lg p-4 flex md:flex-row flex-col mt-4">
  <div className="flex-1">
      <h3 className="font-semibold text-lg tracking-wide">{data.name}</h3>
      <p className="text-gray-500 my-1">
          This is the description for user #{data.id}
      </p>
  </div>
  <div className="md:px-2 mt-3 md:mt-0 items-center flex">
  <Link href="/users/[id]" as={`/users/${data.id}`}>
      <button className="bg-blue-500 text-white font-bold px-4 py-2 text-sm uppercase rounded tracking-wider focus:outline-none hover:bg-blue-600"> Show</button>
      </Link>
  </div>
</div>
)

export default ListItem
