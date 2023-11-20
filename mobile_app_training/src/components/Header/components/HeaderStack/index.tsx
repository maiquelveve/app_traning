import { Box, HStack, Heading } from "native-base";

import { GoBackArrow } from "@src/components/Header/components/GoBackArrow";
import { SettingAuth } from "@src/components/Header/components/SettingAuth";

export const HeaderStack: React.FC<IHeaderStackProps> = ({ title="" }) => {
  const isAuth = true;
  return (
    <>
      <HStack>
        <GoBackArrow />
        <Box display="flex" alignItems="flex-start" justifyContent="center" p={2}>
          <Heading color="white">{title}</Heading>
        </Box>
      </HStack>
      {isAuth && <SettingAuth /> }
    </>
  );
};
