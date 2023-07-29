/* eslint-disable indent */
import { Box } from "@mui/material";

import main from "../../assets/main.png";
import main2 from "../../assets/main2.png";
import containerblack from "../../assets/containerblack.png";
import containerwhite from "../../assets/containerwhite.png";

import removebgmain from "../../assets/removebg-main.png";
import removebgmain2 from "../../assets/removebg-main2.png";
import removebgcontainerblack from "../../assets/removebg-containerblack.png";
import removebgcontainerwhite from "../../assets/removebg-containerwhite.png";


export const Logo: React.FC<ILogo> = ({ width = 100, height = 50, type = "main" }) => {

  const logoImg = setLogoImg(type);

  return (
    <Box width="100%">
      <img src={logoImg} alt="logo" width={width} height={height} />
    </Box>
  );
};

function setLogoImg(type: LogoTypeEnum) {
  switch (type) {
    case "main2":
      return main2;
      
    case "containerblack":
      return containerblack; 

    case "containerwhite":
      return containerwhite;

    case "removebgmain":
      return removebgmain;

    case "removebgmain2":
      return removebgmain2;

    case "removebgcontainerblack":
      return removebgcontainerblack;

    case "removebgcontainerwhite":
      return removebgcontainerwhite;

    default:
      return main;
  }
}

// export default Logo;
