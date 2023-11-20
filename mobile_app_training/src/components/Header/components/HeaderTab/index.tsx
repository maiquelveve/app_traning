import { Box } from "native-base";

import { Logo } from "@src/components/Logo";
import { SettingAuth } from "@src/components/Header/components/SettingAuth";

export const HeaderTab = () => {
  const isAuth = true;
  return (
    <>
      {!isAuth && <Box /> }
      <Box display="flex" alignItems="center" justifyContent="center" ml={isAuth ? 3 : 0}>
        <Logo />
      </Box>
      {!isAuth ? <Box /> : <SettingAuth />}
    </>
  );
};
