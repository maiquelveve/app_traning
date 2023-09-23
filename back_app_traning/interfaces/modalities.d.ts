interface IModalitiesQueryFilter {
  modalitySearch?: string;
  modality_type_id?: string;
}

interface IModalityCreateUpdate {
  modality: string;
  modality_type_id: number;
}

interface IParamsModalityId {
  id: number;
}
