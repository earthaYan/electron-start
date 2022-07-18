export interface IElectronAPI {
  setTitle: (title: string) => void;
  openFile: () => string;
  onUpdateCounter: (callback: any) => void;
  toggleThemeDarkMode: () => boolean;
  toggleThemeSystem: () => void;
}
declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
export {};
