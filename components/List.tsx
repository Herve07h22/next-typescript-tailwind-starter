import * as React from 'react'
import ListItem from './ListItem'
import { User } from '../domain/users/entities/Users'

type Props = {
  items: User[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
