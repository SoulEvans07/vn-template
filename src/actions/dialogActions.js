export const dialogActionTypes = {
  SET_DIALOG: "SET_DIALOG",
  TAKE_ACTION: "TAKE_ACTION"
}

export function setDialog(dialogIds, selected) {
  return {
    type: dialogActionTypes.SET_DIALOG,
    payload: { dialogIds, selected }
  }
}

export function takeAction(action) {
  return {
    type: dialogActionTypes.TAKE_ACTION,
    payload: { action }
  }
}
