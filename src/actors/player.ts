import { Actor, Animation, CollisionType, Color, Engine, Keys, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    private velocidade: number = 180

    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red,

            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {
        const  PlayerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 8
                }
            }
        })

        const duracaoFrameAnimacao = 70

        const leftIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(12, 1) }, 
                { graphic: PlayerSpriteSheet.getSprite(13, 1) }, 
                { graphic: PlayerSpriteSheet.getSprite(14, 1) }, 
                { graphic: PlayerSpriteSheet.getSprite(15, 1) }, 
                { graphic: PlayerSpriteSheet.getSprite(16, 1) }, 
                { graphic: PlayerSpriteSheet.getSprite(17, 1) }, 
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("left-idle", leftIdle)

        this.graphics.use("left-idle")

        engine.input.keyboard.on("hold", (event) => {
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    this.vel.x = -this.velocidade
                    break;

                case Keys.Right:
                case Keys.D:
                    this.vel.x = this.velocidade
                    break;

                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade
                    break;

                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade
                    break;

                default:
                    this.vel.x = 0
                    this.vel.y = 0
                    break;
            }
        })

        engine.input.keyboard.on("release", (event) => {
            if(
                event.key == Keys.A || 
                event.key == Keys.Left || 
                event.key == Keys.D || 
                event.key == Keys.Right
            ) {
                this.vel.x = 0
            }

            if(
                event.key == Keys.W || 
                event.key == Keys.Up || 
                event.key == Keys.S || 
                event.key == Keys.Down
            ) {
                this.vel.y = 0
            }
        })
    }

}