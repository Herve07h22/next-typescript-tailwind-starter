import { User } from '../../interfaces';
import { sampleUserData } from '../../utils/sample-data';
import Layout from '../../components/Layout';
import ListDetail from '../../components/ListDetail';

type Props = {
  item?: User;
  errors?: string;
};

const UserDetail = ({ item, errors }: Props) => {
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
    <Layout title={`${item ? item.name : 'User Detail'} | Next.js + TypeScript Example`}>
      {item && <ListDetail item={item} />}
    </Layout>
  );
};

export default UserDetail;

export async function getServerSideProps(context) {
  const id = context.params?.id;
  const item = sampleUserData.find((data) => data.id === Number(id));
  return item ? { props: { item } } : { notFound: true };
}
