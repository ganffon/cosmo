import MenuList from "json/MenuList.json";
import MenuListDev from "json/MenuListDev.json";
import MenuListChk from "json/MenuListChk.json";
import Cookies from "js-cookie";
function GetBookmarkList(data) {
  const isRealMenu = JSON.parse(process.env.REACT_APP_MENU);
  // const MenuJSON = isRealMenu ? MenuList : MenuListDev;
  const CheckingID = Cookies.get("loginID");
  const MenuJSON = isRealMenu ? (CheckingID === "mfg10" ? MenuListChk : MenuList) : MenuListDev;

  let bookmark = [];
  try {
    if (data.length !== 0) {
      for (let m = 0; data.length > m; m++) {
        for (let i = 0; MenuJSON.length > i; i++) {
          if (MenuJSON[i].path === data[m].menu_key) {
            bookmark.push({ name: MenuJSON[i].name, path: data[m].menu_key });
          }
          if (MenuJSON[i].under !== null) {
            for (let j = 0; MenuJSON[i].under.length > j; j++) {
              if (MenuJSON[i].under[j].path === data[m].menu_key) {
                bookmark.push({ name: MenuJSON[i].under[j].name, path: data[m].menu_key });
              }
              if (MenuJSON[i].under[j].under !== null) {
                for (let k = 0; MenuJSON[i].under[j].under.length > k; k++) {
                  if (MenuJSON[i].under[j].under[k].path === data[m].menu_key) {
                    bookmark.push({ name: MenuJSON[i].under[j].under[k].name, path: data[m].menu_key });
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  return bookmark;
}

export default GetBookmarkList;
