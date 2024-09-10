
export function debounce(fn: Function, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: any[]) => {
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, delay);
    };
}