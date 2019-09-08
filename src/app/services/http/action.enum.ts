export enum StickersActions {
  fetchStickers = 'fetchStickers',
  saveStickers = 'saveStickers',
  saveSticker = 'saveSticker',
  deleteSticker = 'deleteSticker',
}

export enum UsersActions {
  fetchUser = 'fetchUser',
  saveUser = 'saveUser'
}

export type Actions = StickersActions | UsersActions;
