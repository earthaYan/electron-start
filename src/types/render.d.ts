export interface IElectronAPI {
  setTitle: (title: string) => void;
  openFile: () => string;
}
declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
export {};
