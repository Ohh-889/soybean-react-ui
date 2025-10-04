import pc from 'picocolors';

export const log = {
  err: (msg: string) => console.error(pc.red('err  ') + msg),
  info: (msg: string) => console.log(pc.cyan('info ') + msg),
  ok: (msg: string) => console.log(pc.green('ok   ') + msg),
  warn: (msg: string) => console.log(pc.yellow('warn ') + msg)
};
