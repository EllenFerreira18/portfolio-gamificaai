import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    private velocidade: number = 180
    private ultimaDirecao: string = "down"

    private temObjetoProximo: boolean = false
    private ultimoColisor?: Collider

    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Red,

            collisionType: CollisionType.Active,
        })
    }

    onInitialize(engine: Engine<any>): void {
        const PlayerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 0
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

        const rightIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(0, 1) },
                { graphic: PlayerSpriteSheet.getSprite(1, 1) },
                { graphic: PlayerSpriteSheet.getSprite(2, 1) },
                { graphic: PlayerSpriteSheet.getSprite(3, 1) },
                { graphic: PlayerSpriteSheet.getSprite(4, 1) },
                { graphic: PlayerSpriteSheet.getSprite(5, 1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("right-idle", rightIdle)

        const upIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(6, 1) },
                { graphic: PlayerSpriteSheet.getSprite(7, 1) },
                { graphic: PlayerSpriteSheet.getSprite(8, 1) },
                { graphic: PlayerSpriteSheet.getSprite(9, 1) },
                { graphic: PlayerSpriteSheet.getSprite(10, 1) },
                { graphic: PlayerSpriteSheet.getSprite(11, 1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-idle", upIdle)

        const downIdle = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(18, 1) },
                { graphic: PlayerSpriteSheet.getSprite(19, 1) },
                { graphic: PlayerSpriteSheet.getSprite(20, 1) },
                { graphic: PlayerSpriteSheet.getSprite(21, 1) },
                { graphic: PlayerSpriteSheet.getSprite(22, 1) },
                { graphic: PlayerSpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("down-idle", downIdle)

        this.graphics.use("down-idle")

        const leftWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(12, 2) },
                { graphic: PlayerSpriteSheet.getSprite(13, 2) },
                { graphic: PlayerSpriteSheet.getSprite(14, 2) },
                { graphic: PlayerSpriteSheet.getSprite(15, 2) },
                { graphic: PlayerSpriteSheet.getSprite(16, 2) },
                { graphic: PlayerSpriteSheet.getSprite(17, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("left-walk", leftWalk)

        const righttWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(0, 2) },
                { graphic: PlayerSpriteSheet.getSprite(1, 2) },
                { graphic: PlayerSpriteSheet.getSprite(2, 2) },
                { graphic: PlayerSpriteSheet.getSprite(3, 2) },
                { graphic: PlayerSpriteSheet.getSprite(4, 2) },
                { graphic: PlayerSpriteSheet.getSprite(5, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("right-walk", righttWalk)

        const uptWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(6, 2) },
                { graphic: PlayerSpriteSheet.getSprite(7, 2) },
                { graphic: PlayerSpriteSheet.getSprite(8, 2) },
                { graphic: PlayerSpriteSheet.getSprite(9, 2) },
                { graphic: PlayerSpriteSheet.getSprite(10, 2) },
                { graphic: PlayerSpriteSheet.getSprite(11, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("up-walk", uptWalk)

        const downtWalk = new Animation({
            frames: [
                { graphic: PlayerSpriteSheet.getSprite(18, 2) },
                { graphic: PlayerSpriteSheet.getSprite(19, 2) },
                { graphic: PlayerSpriteSheet.getSprite(20, 2) },
                { graphic: PlayerSpriteSheet.getSprite(21, 2) },
                { graphic: PlayerSpriteSheet.getSprite(22, 2) },
                { graphic: PlayerSpriteSheet.getSprite(23, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })
        this.graphics.add("down-walk", downtWalk)

        engine.input.keyboard.on("hold", (event) => {
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    this.vel.x = -this.velocidade

                    this.graphics.use("left-walk")
                    this.ultimaDirecao = "left"

                    break;

                case Keys.Right:
                case Keys.D:
                    this.vel.x = this.velocidade

                    this.graphics.use("right-walk")
                    this.ultimaDirecao = "right"

                    break;

                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade

                    this.graphics.use("up-walk")
                    this.ultimaDirecao = "up"

                    break;

                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade

                    this.graphics.use("down-walk")
                    this.ultimaDirecao = "down"

                    break;

                default:
                    this.vel.x = 0
                    this.vel.y = 0
                    break;
            }
        })

        engine.input.keyboard.on("release", (event) => {
            if (
                event.key == Keys.A ||
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                this.vel.x = 0
            }

            if (
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                this.vel.y = 0
            }

            if (this.vel.x == 0 && this.vel.y == 0) {
                this.graphics.use(this.ultimaDirecao + "-idle")

            }


        })

        engine.input.keyboard.on("press", (event) => {
            if (event.key == Keys.F && this.temObjetoProximo) {
                if (this.ultimoColisor?.owner.name == "mesa_stand_a") {
                    console.log("Essa é a mesa A");
                    engine.goToScene("case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
        
                }
                if (this.ultimoColisor?.owner.name == "mesa_stand_b") {
                    console.log("Essa é a mesa B")
        
                }
                if (this.ultimoColisor?.owner.name == "mesa_stand_c") {
                    console.log("Essa é a mesa C")
        
                }
                
            }
        })
    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        this.temObjetoProximo = true

        this.ultimoColisor = other
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 50) {
            this.temObjetoProximo = false
        }
    }
}