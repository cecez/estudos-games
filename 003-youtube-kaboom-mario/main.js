import SceneComeco from "./scenes/comeco";
import SceneJogo from "./scenes/jogo";
import ScenePerdeu from "./scenes/perdeu";
import loadSprites from "./loaders/sprites";

loadSprites();
scene("perdeu", ScenePerdeu);
scene("jogo", SceneJogo);
scene("começo", SceneComeco);
go("começo");
