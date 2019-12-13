export const dialogActionTypes = {
  SET_DIALOG: "SET_DIALOG",
  TAKE_ACTION: "TAKE_ACTION",
  BUY_ITEM: "BUY_ITEM",
  REMOVE_TRANSACTION: "REMOVE_TRANSACTION"
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

export function buyItem(target, store, item) {
  return {
    type: dialogActionTypes.BUY_ITEM,
    payload: { target, store, item }
  }
}

export function removeTransaction(target, transaction) {
  return {
    type: dialogActionTypes.REMOVE_TRANSACTION,
    payload: { target, transaction }
  }
}
