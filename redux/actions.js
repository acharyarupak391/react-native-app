import { ADD_GOAL, DELETE_GOAL, MARK_GOAL, TOGGLE_SHOW_COMPLETED } from "./constants";

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

export function toggleShowCompleted() {
  return {
    type: TOGGLE_SHOW_COMPLETED,
  };
}
