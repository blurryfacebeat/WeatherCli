export const getArgs = (args) => {
  const res = {};
  const [executor, file, ...rest] = args;

  rest.forEach((arg, idx, array) => {
    if (arg.charAt(0) === '-') {
      if (idx === array.length - 1) {
        res[arg.substring(1)] = true;
        return;
      }

      res[arg.substring(1)] =
        array[idx + 1].charAt(0) !== '-' ? array[idx + 1] : true;
    }
  });

  return res;
};
