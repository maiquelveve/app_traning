interface ITrainingPageContext {
  // handleSearchTraining: (props: ISearchTrainingFiltersProps) => void;
  handleChangePageCurrent: (props: IPageCurrentProps) => void;
  handleChangePerPageCurrent: (props: IPerPageCurrentProps) => void;
  handleSearchFilterTraining: (props: ISearchTrainingFiltersProps) => void;
  handleCreateTraining:(props: ICreateTrainingProps) => Promise<boolean | undefined>;
  handleUpdadeTraining: (props: ICreateTrainingProps & ITraningViewUpdateProps) => Promise<boolean | undefined>;
  handleGetTrainingById: (props: ITraningViewUpdateProps) => Promise<ITraining | null | undefined>;
  trainingsListData: ITrainingListData[];
  modalitiesTrainings: IModality[];
  loadingTrainings: boolean;
  loadingModalitiesTrainings: boolean;
  pageCurrent: number;
  perPageCurrent: number;
  totalPage: number;
}
