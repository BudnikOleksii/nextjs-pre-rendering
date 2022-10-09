const UserProfilePage = (props) => {
  return (
    <h1>{props.username}</h1>
  );
};

export const getServerSideProps = async (context) => {
  const { params, req, res } = context;
  console.log(req, res)

  return {
    props: {
      username: 'Max',
    },
  };
};

export default UserProfilePage;
