/* eslint-disable indent */
export const serializeData = (data: any) => {

  console.log(data);
  console.log(typeof { id: 1 });
  console.log(typeof [{ id: 1 }]);
  
  switch (typeof data) {
    case "string":
      return data.toUpperCase().trim();
    case "number":
      return Number(data);

    default:
      return data;
  }
};
