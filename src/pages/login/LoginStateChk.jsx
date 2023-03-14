import { useNavigate } from "react-router-dom";

function LoginStateChk() {
  /**
   * 🔸현재 브라우저에서 하나의 탭이라도 로그아웃을 했다면
   *    다른 탭의 이후 행동은 모두 로그인 화면으로 이동시키기 위함
   * 🔸loginState 값을 cookie로 관리하면 다중 탭인 경우 갱신 된
   *    cookie 값을 읽어오지 못하는 문제가 발생하였음
   *    따라서 localStorage로 관리하고 있음.
   * 🔍 남과장 의견 : 로그인 세션 유지 15시간이 좋을듯 23.02.21
   */
  const navigate = useNavigate();
  if (localStorage.getItem("loginState") === "false") {
    navigate("/login");
  }
}

export default LoginStateChk;
