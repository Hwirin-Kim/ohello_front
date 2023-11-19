const text = {
  shadow:
    "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa",
  color: "#fff",
};

const matrix = {
  color: "#FFE699",
  shadow:
    "0 0 5px #FFE699, 0 0 10px #FFE699, 0 0 15px #FFE699, 0 0 20px #FFE699, 0 0 25px #FFE699",
};
const stone = {
  white: "#5B5EFB",
  black: "#FF7878",

  black_shadow: "0 0 5px #5b5efb, 0 0 15px #5b5efb",
  black_background:
    "radial-gradient(circle at 20px 20px,#fff,#5b5efb 60%,#0000ff)",

  white_shadow: "0 0 5px #FF7878, 0 0 15px #FF7878",
  white_background:
    "radial-gradient(circle at 20px 20px,#fff,#FF7878 60%,#ff0000)",
};

export const theme = { text, matrix, stone };
