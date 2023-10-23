interface ITrainingPageContext {
  handleSearchTraining: (props: ISearchTrainingFiltersProps) => void;
  trainingsListData: ITrainingListData[];
  modalitiesTrainings: IModality[];
  loadingTrainings: boolean;
  loadingModalitiesTrainings: boolean;
}
