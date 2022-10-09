import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const data = await fs.readFile(filePath);
  const preparedData = JSON.parse(data);

  if (!preparedData) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  if (preparedData.products.length === 0) {
    return { notFound: true, };
  }

  return {
    props: {
      products: preparedData.products,
    },
    revalidate: 600,
  };
};

export default HomePage;
