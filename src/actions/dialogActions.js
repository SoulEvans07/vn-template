export const dialogActionTypes = {
  SET_DIALOG: "SET_DIALOG",
  TAKE_ACTION: "TAKE_ACTION",
  BUY_ITEM: "BUY_ITEM"
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

export function buyItem(target, item) {
  return {
    type: dialogActionTypes.BUY_ITEM,
    payload: { target, item }
  }
}
