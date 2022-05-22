
export interface WebApp {
    initData: string
}
export interface Telegram {
    WebApp: WebApp;
}
export const telegram: Telegram = (window as any).Telegram as Telegram;

export function getRawTelegramData() {
    return telegram.WebApp.initData
}

export function getTelegramData() {
    return telegram.WebApp.initData.split("&").reduce((prev, current) => {
        const [key, value] = current.split("=", 2)
        prev[key] = value
        return prev
    }, {} as {[key: string]: string})
}


