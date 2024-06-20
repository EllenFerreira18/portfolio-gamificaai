import { TiledResource } from "@excaliburjs/plugin-tiled";
import { ImageFiltering, ImageSource, Loader, Sound } from "excalibur";

import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logoVertical from "./images/logo-vertical.png";
import homem from "./images/homem.jpg";

import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic.tsx?url"
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url"
import tsxBibliotecaPath from "./maps/tileset_biblioteca.tsx?url"

import tmxMapaPath from "./maps/showroom_map.tmx?url"

import playerSpritePath from "./sprites/personagem.png"
import npcASpriteSheet from "./sprites/npcA.png"
import npcBSpriteSheet from "./sprites/npcB.png"
import npcCSpriteSheet from "./sprites/npcC.png"

import classico from "./sounds/zelda.mp3"

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  PlayerSpriteSheet: new ImageSource(playerSpritePath, { filtering: ImageFiltering.Pixel }),
  LogoVertical: new ImageSource(logoVertical),
  Homem: new ImageSource(homem),
  ClassicBGM: new Sound(classico),

  NpcASpriteSheet: new ImageSource(npcASpriteSheet, { filtering: ImageFiltering.Pixel }),
  NpcBSpriteSheet: new ImageSource(npcBSpriteSheet, { filtering: ImageFiltering.Pixel }),
  NpcCSpriteSheet: new ImageSource(npcCSpriteSheet, { filtering: ImageFiltering.Pixel }),
  
  Mapa: new TiledResource(tmxMapaPath, {
    pathMap: [
      { path: "showroom_map.tmx", output: tmxMapaPath },
      { path: "Room_Builder_32x32.png", output: pngTilesetPath },
      { path: "tileset_paredes.tsx", output: tsxParedesPath },
      { path: "tileset_generic.tsx", output: tsxGenericPath },
      { path: "tileset_estoque.tsx", output: tsxEstoquePath },
      { path: "tileset_biblioteca.tsx", output: tsxBibliotecaPath }
    ]
  })
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
