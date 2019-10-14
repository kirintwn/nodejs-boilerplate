import path from 'path';
import chalk from 'chalk';

const ERROR_STACK_LIMIT = 3;
const SRC_ROOT = path.join(__dirname, '../../src');

// Reference:
// https://v8.dev/docs/stack-trace-api
// https://gist.github.com/transitive-bullshit/39a7edc77c422cbf8a18
const getStackInfo = (stackIndex) => {
  const error = new Error();
  const stacklist = error.stack && error.stack.split('\n').slice(3);

  if (!stacklist) return null;

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

const formatLogArgs = (message, levelLength) => {
  let res = message;
  const stackInfo = getStackInfo(1);

  if (stackInfo != null && res != null) {
    let calleeStr = `${stackInfo.relativePath}:${stackInfo.line}`;
    const spaceCount = calleeStr.length + levelLength + 2;
    calleeStr = chalk.gray(calleeStr);

    if (res instanceof Error) {
      res = `${calleeStr} ${chalk.red(
        prependSpace(
          getLines(res.stack, ERROR_STACK_LIMIT + 1),
          spaceCount - 2,
        ),
      )}`;
    } else if (typeof res === 'object') {
      res = `${calleeStr} ${prependSpace(
        JSON.stringify(res, null, 2),
        spaceCount,
      )}`;
    } else if (typeof res === 'string') {
      res = `${calleeStr} ${prependSpace(res, spaceCount)}`;
    } else {
      res = `${calleeStr} ${res}`;
    }
  }

  return res;
};

export default formatLogArgs;
