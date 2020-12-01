import {
  UPDATE_LOCATIONS_COLLECTION,
  UPDATE_STUDY_REQUESTS_COLLECTION,
} from './actions';

export const dataReducer = (state, action) => {
  switch (action.type) {
      case UPDATE_LOCATIONS_COLLECTION:
        return {
            ...state,
            locations: action.payload.locations,
        };
        case UPDATE_STUDY_REQUESTS_COLLECTION:
            return {
                ...state,
                requests: action.payload.requests,
            }
      default:
        return state;
    }
}
    