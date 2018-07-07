export const isOnStopList = (stopList, subcmd) => {
  if (stopList.indexOf(subcmd) !== -1) {
    return true;
  }
  return false;
};

export const isOnDeleteList = (deleteList, subcmd) => {
  if (deleteList.indexOf(subcmd) !== -1) {
    return true;
  }
  return false;
};
