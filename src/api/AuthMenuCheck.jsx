import restAPI from "./restAPI";
import restURI from "./restURI.json";
import { useCookies } from "react-cookie";

async function AuthMenuCheck(menuID) {
  const [cookie, setCookie, removeCookie] = useCookies();
  await restAPI
    .get(
      `${restURI.authMenuCheck}?menu_cd=${menuID}&uid=${cookie.userUID}&user_factory_id=${cookie.userFactoryID}`
    )
    .then((res) => console.log(res))
    .catch((res) => console.log(res?.message))
    .finally();
}

export default AuthMenuCheck;
