const state = {
  index: 0,
  errorIndex: 5,
};

const up = () => {
  state.index += 1;
};

const isError = () => {
  return state.index % state.errorIndex === 0;
};

module.exports = { up, isError };
