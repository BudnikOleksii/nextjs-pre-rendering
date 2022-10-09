import path from 'path';
import fs from 'fs/promises';

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const data = await fs.readFile(filePath);

  return JSON.parse(data);
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const { productId } = params;

  const preparedData = await getData();
  const product = preparedData.products.find(product => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths = async () => {
  const preparedData = await getData();
  const ids = preparedData.products.map(product => product.id);

  return {
    paths: ids.map(id => ({
      params: { productId: id },
    })),
    // paths: [
    //   { params: { productId: 'p1' } },
    // ],
    // fallback: false,
    fallback: true,
    // fallback: 'blocking',
  };
};

export default ProductDetailPage;
