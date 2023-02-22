import { Link } from "react-router-dom";
import "./a.css";
import "./b.less";
import { gp, RoutePath, useNavigate } from "@@/routes/helpers";

export default function name() {
  const navigate = useNavigate();

  var a = {};
  return (
    <div className={"testRed"}>
      test
      <button
        onClick={() =>
          navigate(gp("/test-layout/:c/:id", { id: "12", c: "xx" }))
        }
      >
        跳转
      </button>
      <div className={"container"}>
        <Link to={gp("/test-layout/a")}>跳转link</Link>
        <div className={"head"}>{a.b.c}</div>
        <div className={"body"}>body</div>
      </div>
    </div>
  );
}
