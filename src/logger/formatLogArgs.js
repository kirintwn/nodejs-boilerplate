import path from 'path';
import chalk from 'chalk';

const ERROR_STACK_LIMIT = 3;
const SRC_ROOT = path.join(__dirname, '../../src');

const getStackInfo = (stackIndex) => {
  const stacklist = new Error().stack.split('\n').slice(3);
  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

  const s = stacklist[stackIndex] || stacklist[0];
  const sp = stackReg.exec(s) || stackReg2.exec(s);

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(SRC_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n'),
    };
  }
  return null;
};

const getLines = (str, count) => str.split('\n', count).join('\n');
const prependSpace = (str, count) =>
  str
    .split('\n')
    .map((line, index) => (index !== 0 ? `${' '.repeat(count)}${line}` : line))
    .join('\n');

const formatLogArgs = (args, levelLength) => {
  const modArgs = Array.prototype.slice.call(args);
  const stackInfo = getStackInfo(1);

  if (stackInfo != null && modArgs[0] != null) {
    let calleeStr = `${stackInfo.relativePath}:${stackInfo.line}`;
    const spaceCount = calleeStr.length + levelLength + 2;
    calleeStr = chalk.gray(calleeStr);

    if (modArgs[0] instanceof Error) {
      modArgs[0] = `${calleeStr} ${chalk.red(
        prependSpace(
          getLines(modArgs[0].stack, ERROR_STACK_LIMIT + 1),
          spaceCount - 2,
        ),
      )}`;
    } else if (typeof modArgs[0] === 'object') {
      modArgs[0] = `${calleeStr} ${prependSpace(
        JSON.stringify(modArgs[0], null, 2),
        spaceCount,
      )}`;
    } else if (typeof modArgs[0] === 'string') {
      modArgs[0] = `${calleeStr} ${prependSpace(modArgs[0], spaceCount)}`;
    }
  }

  return modArgs;
};

export default formatLogArgs;
