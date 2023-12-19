interface IMenusGeneratorProps {
  tag: string;
  title: string;
  description: string;
  Icon: (props: any) => React.JSX.Element;
  handleNavigate: () => void;
}
