import kaboom from "kaboom";
import constantes from "./constantes";

export const k = kaboom({
  scale: 2,
  clearColor: [0, 0, 0, 1],
  background: constantes.corDeFundo,
});

export default k;
