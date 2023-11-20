import { Image } from "native-base";

export const Logo: React.FC = () => {
  return(
    <Image
      alt="logo"
      source={require("assets/removebg-containerblack.png")}
      style={{ width: 80, height: 35 }}
    />
  );
};
