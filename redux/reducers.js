import {
  ADD_GOAL,
  CLEAR_COMPLETED_GOALS,
  DELETE_ALL_GOALS,
  DELETE_GOAL,
  MARK_GOAL,
  TOGGLE_SHOW_COMPLETED,
} from "./constants";

const initialState = {
  goalList: [],
  completedGoals: [],
  showCompleted: true,
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
      let _completedGoal = state.goalList.find(
        (el) => el.id === action.payload
      );
      let _goalList = state.goalList.filter((el) => el.id !== action.payload);
      _completedGoal.completedAt = new Date().getTime();
      return {
        ...state,
        goalList: _goalList,
        completedGoals: [...state.completedGoals, _completedGoal],
      };

    case DELETE_ALL_GOALS:
      return {
        ...state,
        goalList: [],
      };

    case CLEAR_COMPLETED_GOALS:
      return {
        ...state,
        completedGoals: [],
      };

    case TOGGLE_SHOW_COMPLETED:
      return {
        ...state,
        showCompleted: !state.showCompleted,
      };

    default:
      return state;
  }
};

export default goalReducer;
