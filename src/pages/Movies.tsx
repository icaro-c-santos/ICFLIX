import { Link, useParams } from "react-router-dom";

export const Movies = () => {
  const { name } = useParams();
  return (
    <>
      <h1>MOVIES {name}</h1>
      <Link to="/">retornar a página inicial</Link>
    </>
  );
};
