class LocalStorage {
    static setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    static getItem(key: string): string | null {
        return localStorage.getItem(key);
    }
}
export default LocalStorage;
