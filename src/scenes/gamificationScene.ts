import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {
    elementoHTML?: HTMLElement

    fadeOutElement(elemento: HTMLElement) {
        let opacidade = parseFloat(elemento.style.opacity)

        setInterval(() => {
            if (opacidade > 0) {
                opacidade -= 0.01

                elemento.style.opacity = opacidade.toString()
            }
        }, 10)
    }

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")

        this.elementoHTML = document.createElement("div") as HTMLElement
        this.elementoHTML.style.opacity = "1"

        let containerGame = document.querySelector(".container-game") 
        containerGame?.appendChild(this.elementoHTML)

        this.elementoHTML.innerHTML = `<h2>O que é gamificação?</h2>
        <p>Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.
        </p>`

        this.elementoHTML.classList.add("gamificacao")

        let actorImagem = new Actor({
            pos: vec(300, engine.halfDrawHeight)
        })

        let imagemImagem = Resources.Imagem.toSprite()

        imagemImagem.scale = vec(0.7, 0.7)

        actorImagem.graphics.add(imagemImagem)

        this.add(actorImagem) 

        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                this.fadeOutElement(this.elementoHTML!)
                engine.goToScene("exposicao")
            }
        })
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoHTML?.remove()
    }
}