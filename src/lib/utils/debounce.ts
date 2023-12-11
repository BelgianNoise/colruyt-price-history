// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(func: Function, timeout = 600){
  let timer: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
}
