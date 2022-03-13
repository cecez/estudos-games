import k from "./game";
import SceneComeco from "./scenes/comeco";
import SceneJogo from "./scenes/jogo";

k.scene("jogo", SceneJogo);
k.scene("começo", SceneComeco);
k.go("começo");
