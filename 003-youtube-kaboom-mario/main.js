import SceneComeco from "./scenes/comeco";
import SceneJogo from "./scenes/jogo";
import loadSprites from "./loaders/sprites";

loadSprites();
scene("jogo", SceneJogo);
scene("começo", SceneComeco);
go("começo");
