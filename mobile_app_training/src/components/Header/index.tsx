import { HStack, useTheme, Divider } from "native-base";

import { HeaderStack } from "@src/components/Header/components/HeaderStack";
import { HeaderTab } from "@src/components/Header/components/HeaderTab";

export const Header: React.FC<IHeaderProps> = ({ headerType="STACK" }) => {
  const { colors } = useTheme();

  return (
    <>
      <Divider bgColor={colors.primaryApp.dark} />
      <HStack h={55} background={colors.primaryApp.main} shadow={9} display="flex" justifyContent="space-between">
        { headerType === "STACK" ? <HeaderStack title={""} /> :  <HeaderTab /> }
      </HStack>
      <Divider bgColor={colors.primaryApp.dark} />
    </>
  );
};

