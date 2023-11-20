interface IHeaderProps {
  headerType?: THeaderTypes;
  title?: string;
}

interface IHeaderStackProps {
  title: string;
}

type THeaderTypes = "TAB" | "STACK";
