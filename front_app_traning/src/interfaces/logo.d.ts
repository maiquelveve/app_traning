interface ILogo {
  width?: React.ImgHTMLAttributes;
  height?: React.ImgHTMLAttributes;
  type?: LogoTypeEnum;
}

type LogoTypeEnum = "main" | 
                    "main2" | 
                    "containerblack" | 
                    "containerwhite" | 
                    "removebgmain" | 
                    "removebgmain2" | 
                    "removebgcontainerblack" | 
                    "removebgcontainerwhite";
