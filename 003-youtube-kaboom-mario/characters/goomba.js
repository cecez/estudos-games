export default function goomba() {
  action("dangerous", (goomba) => {
    goomba.move(-20, 0);
  });

  // const allGoombas = get("goomba");
  // allGoombas.onHeadbutt((goomba) => {
  //   goomba.destroy();
  // });
}
