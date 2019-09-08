// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  protocol: 'http://',
  domain: 'localhost:8090/',
  actions: {
    fetchStickers: {
      service: 'scs/',
      url: 'users/',
      variables: ['uid'],
      method: 'GET',
    },
    saveStickers: {
      service: 'scs/',
      url: 'users/',
      variables: ['uid'],
      method: 'PUT',
    },
    saveSticker: {
      service: 'scs/',
      url: 'users/',
      variables: ['uid', 'id'],
      method: 'PUT',
    },
    fetchUser: {
      service: 'scs/',
      url: 'users/',
      variables: ['uid'],
      method: 'GET',
    },
    saveUser: {
      service: 'scs/',
      url: 'users/',
      method: 'PUT',
    },
    deleteSticker : {
      service: 'scs/',
      url: 'users/',
      method: 'DELETE',
    }
  },
  firebaseConfig: {
    apiKey: 'AIzaSyATYiIOaON-FLckN5mTcFLpj8GjCRXo4BY',
    authDomain: 'stickers-501c4.firebaseapp.com',
    databaseURL: 'https://stickers-501c4.firebaseio.com',
    projectId: 'stickers-501c4',
    storageBucket: 'stickers-501c4.appspot.com',
    messagingSenderId: '254929120021'
  },
  expirationTime: 600000,
  firebaseStorage: {
    protocol: 'https://',
    url: 'firebasestorage.googleapis.com/v0/b/',
  },
  avatar: {
    urlSufix: '/o/',
    fileNameDownloadPrefix64: 'thumb%4064_',
    fileNameDownloadPrefix256: 'thumb%40256_',
    fileNameUploadPrefix64: 'thumb@64_',
    fileNameUploadPrefix256: 'thumb@256_',
  },
  maxNumberOfStickers: 20,
  loggingLevel: 1,
};
