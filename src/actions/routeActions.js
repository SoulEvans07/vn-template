export const routeActionTypes = {
  SET_ROUTE: "SET_ROUTE",
  BACK_ROUTE: "BACK_ROUTE"
}

export function setRoute(route) {
  return {
    type: routeActionTypes.SET_ROUTE,
    payload: { route }
  }
}

export function backRoute() {
  return {
    type: routeActionTypes.BACK_ROUTE
  }
}
