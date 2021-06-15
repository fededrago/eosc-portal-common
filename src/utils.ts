export function getBy(tag: string) {
    const sources = document.getElementsByTagName(tag);
    return Array.from(sources).map((source: HTMLElement) => ({
        source
    }));
}