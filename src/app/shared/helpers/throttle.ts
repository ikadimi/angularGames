export function throttle(fn: Function, wait: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: any[] | null = null;

    return function(...args: any[]) {
        if (timeoutId === null) {
            timeoutId = setTimeout(() => {
                timeoutId = null;
                if (lastArgs !== null) {
                    fn(...lastArgs);
                }
            }, wait);
            lastArgs = args;
            fn(...args);
        } else {
            lastArgs = args;
        }
    };
}