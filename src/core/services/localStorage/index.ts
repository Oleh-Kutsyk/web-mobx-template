export class LocalStorageService {
  get<T extends string = string>(key: T): T | null {
    return localStorage.getItem(key) as T;
  }

  set<T extends string = string>(key: T, value: string): void {
    localStorage.setItem(key, value);
  }

  has<T extends string = string>(key: T): boolean {
    return !!localStorage.getItem(key);
  }

  remove<T extends string = string>(key: T): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export const localStorageService = new LocalStorageService();
