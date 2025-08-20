/**
 * @example
 * await sleep(1000);
 * console.log('done');
 */
export const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });
