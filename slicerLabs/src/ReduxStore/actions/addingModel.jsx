// Define the action type
const ADDING_MORE_MODELS = 'ADDING_MORE_MODELS';

// Action creator function
export const addingMoreModels = (isAdding) => {
  return {
    type: ADDING_MORE_MODELS,
    payload: isAdding,
  };
};
