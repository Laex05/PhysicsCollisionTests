import { Async } from "./Yuu API/Async";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { inWorldConsole } from "./Yuu API/Console";
import { Entity } from "./Yuu API/Entity";
import { overTime } from "./Yuu API/MotionOverTime";
import { registerStart } from "./Yuu API/RegisterStart";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";


registerStart(start);
function start() {
  inWorldConsole.visible(true, new Vector3(0, 1.5, -1.5));

  console.log('Hello World!');

  const cube1 = spawnPrimitive.cube(new Vector3(0, 0.35, -2), new Vector3(0.5,0.5,0.5), Quaternion.one, Color.pink, 0.45, true, 'Animated', undefined, true);
  const cube2 = spawnPrimitive.cube(new Vector3(0, 0.35, -2), new Vector3(0.5,0.5,0.5), Quaternion.one, Color.purple, 0.45, true, 'Animated', undefined, false);

  moveBackAndForth(cube1);
  moveBackAndForth(cube2);
}

async function moveBackAndForth(entity: Entity) {
  let i = 10;

  const startPos = entity.pos;
  const endPos = startPos.add(new Vector3(3, 0, 0));

  while (i > 0) {
    if (i % 2 === 0) {
      overTime.moveTo.start(entity, startPos, i * 1_000);
    }
    else {
      overTime.moveTo.start(entity, endPos, i * 1_000);
    }

    await Async.wait((i * 1_000) + 1_000);

    i--;
  }
}