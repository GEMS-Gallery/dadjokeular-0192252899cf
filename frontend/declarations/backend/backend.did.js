export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addJoke' : IDL.Func([IDL.Text], [], []),
    'getRandomJoke' : IDL.Func([], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
