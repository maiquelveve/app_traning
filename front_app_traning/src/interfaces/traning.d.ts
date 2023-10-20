interface ICardTrainingProps {
  title: string;
  subTitle?: string;
  img: string;
  desc: string;
  handleClick: () => void;
}

interface ITrainingSelectorProps {
  handleClickClass: () => void;
  handleClickTraining: () => void;
}

interface ITrainingCalssProps {
  handleGoBack: () => void;
}
