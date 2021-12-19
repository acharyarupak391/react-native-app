import { ADD_GOAL, CLEAR_ALL_GOALS, DELETE_GOAL, MARK_GOAL, TOGGLE_SHOW_COMPLETED } from "./constants";

export function addGoal(goalText) {
  return {
    type: ADD_GOAL,
    payload: goalText,
  };
}

export function deleteGoal(goalId) {
  return {
    type: DELETE_GOAL,
    payload: goalId,
  };
}

export function markGoalAsDone(goalId) {
  return {
    type: MARK_GOAL,
    payload: goalId,
  };
}

export function clearAllGoals() {
  return {
    type: CLEAR_ALL_GOALS,
  };
}

export function toggleShowCompleted() {
  return {
    type: TOGGLE_SHOW_COMPLETED,
  };
}
