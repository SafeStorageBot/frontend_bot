
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
    return getRawTelegramData().split("&").reduce((prev, current) => {
        const [key, value] = current.split("=", 2)
        prev[key] = value
        return prev
    }, {} as {[key: string]: string})
}

export function getDefaultLang(): string {
    const data = getTelegramData()
    try {
        const user = JSON.parse(decodeURIComponent(data["user"]))
        const lang = user["language_code"] 
        return lang === 'ru' ? 'ru' : 'en'
    } catch (_) {
        return 'en'
    }
}


