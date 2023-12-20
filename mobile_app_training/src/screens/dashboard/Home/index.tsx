import { Layout } from "@src/components/Layout";

import { useAuthUserContext } from "@src/context/AuthUserContext";
import { AcessMenusGenerator } from "@src/components/AcessMenusGenerator";

import { rootMenus, trainerMenus, userMenus } from "../menus";

export const Home = () => {
  const { getProfilesUserAuth } = useAuthUserContext();

  const { isRootProfiles, isTrainerProfiles } = getProfilesUserAuth();
  const menus = isRootProfiles ? rootMenus : isTrainerProfiles ? trainerMenus : userMenus;

  return (
    <Layout headerType={"TAB"} pagePosition="flex-start" >
      <AcessMenusGenerator menus={menus} />
    </Layout>
  );
};
