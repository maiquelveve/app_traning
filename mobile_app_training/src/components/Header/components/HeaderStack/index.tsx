import { Box, HStack, Heading } from "native-base";

import { GoBackArrow } from "@src/components/Header/components/GoBackArrow";
import { SettingAuth } from "@src/components/Header/components/SettingAuth";

import { useAuthUserContext } from "@src/context/AuthUserContext";

export const HeaderStack: React.FC<IHeaderStackProps> = ({ title="" }) => {
  const { getToken } = useAuthUserContext();
  const isAuth = !!getToken();
  return (
    <>
      <HStack>
        <GoBackArrow />
        <Box display="flex" alignItems="flex-start" justifyContent="center" p={2}>
          <Heading color="white" textTransform="uppercase">{title}</Heading>
        </Box>
      </HStack>
      {isAuth && <SettingAuth /> }
    </>
  );
};
