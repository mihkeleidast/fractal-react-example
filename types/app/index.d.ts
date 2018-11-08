interface IApp {
    publicFolder: string;
}

declare namespace NodeJS {
  interface Global {
      app: IApp;
  }
}

declare const app: IApp;
