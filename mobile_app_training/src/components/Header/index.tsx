import { Box, Heading, HStack, useTheme, Divider } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Header: React.FC<IHeaderProps> = ({ title }) => {
  const { colors } = useTheme();

  return (
    <>
      <Divider bgColor={colors.primaryApp.dark} />
      <HStack h={55} background={colors.primaryApp.main} shadow={9} >
        <Box display="flex" alignItems="flex-start" justifyContent="center" p={2}>
          <MaterialCommunityIcons name="keyboard-backspace" size={24} color={"white"} />
        </Box>
        {title &&
          <Box display="flex" alignItems="flex-start" justifyContent="center" p={2}>
            <Heading color="white">{title}</Heading>
          </Box>
        }
      </HStack>
      <Divider bgColor={colors.primaryApp.dark} />
    </>
  );
};
