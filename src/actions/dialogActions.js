export const dialogActionTypes = {
  SET_DIALOG: "SET_DIALOG"
}

export function setDialog(dialogIds, selected) {
  return {
    type: dialogActionTypes.SET_DIALOG,
    payload: { dialogIds, selected }
  }
}
