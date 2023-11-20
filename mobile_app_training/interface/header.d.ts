interface IHeaderProps {
  headerType?: THeaderTypes
}

interface IHeaderStackProps {
  title: string;
}

type THeaderTypes = "TAB" | "STACK";
