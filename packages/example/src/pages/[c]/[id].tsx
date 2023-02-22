import { useParams } from "react-router-dom";

export default function name() {
  const params = useParams();
  console.log(params);

  return <h1>c</h1>;
}
