import { ADD_GOAL, DELETE_GOAL, MARK_GOAL } from "./constants";

const initialState = {
  goalList: [],
};

const random = (min = 0, max = 100) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GOAL:
      let _goal = { text: action.payload };
      _goal.id = random(100000, 999999);
      _goal.createdAt = new Date().getTime();
      return {
        ...state,
        goalList: [...state.goalList, _goal],
      };

    case DELETE_GOAL:
      return {
        ...state,
        goalList: state.goalList.filter((el) => el.id !== action.payload),
      };

    case MARK_GOAL:
      let _goalList = state.goalList.map((el) => {
        if (el.id === action.payload) {
          el.completed = true;
          el.completedAt = new Date().getTime();
        }
        return el;
      });
      return {
        ...state,
        goalList: _goalList,
      };

    default:
      return state;
  }
};

export default goalReducer;
