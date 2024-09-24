export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addJoke' : IDL.Func([IDL.Text], [], []),
    'getRandomJoke' : IDL.Func([], [IDL.Text], ['query']),
    'updateSeed' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
