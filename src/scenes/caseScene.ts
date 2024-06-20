import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetoInteracao: any

    private textoDaCena: string = ""


    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        this.objetoInteracao = document.createElement("div") as HTMLElement
        this.objetoInteracao.style.opacity = "1"

        let containerGame = document.querySelector(".container-game") as HTMLHtmlElement
        containerGame.appendChild(this.objetoInteracao)

        this.objetoInteracao.classList.add("sobre-gamifica")

        this.objetoInteracao.innerHTML = `<h2>Sobre o GamificaAi</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`

          this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Esc) {
                engine.goToScene("exposicao")
                
            }
          })
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        this.backgroundColor = Color.White

        this.objetoInteracao = context.data

        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {
            this.textoDaCena = "Essa é a descrição do case A"
        }
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_b") {
            this.textoDaCena = "Essa é a descrição do case B"
        }
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_c") {
            this.textoDaCena = "Essa é a descrição do case C"
        }

       


        let actorHomem = new Actor({
            pos: vec(this.engine.drawWidth - 300, this.engine.drawHeight - 300)
        })

        let imagemHomem = Resources.Homem.toSprite()

        imagemHomem.scale = vec(0.5, 0.5)

        actorHomem.graphics.add(imagemHomem)

        this.add(actorHomem)

    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.objetoInteracao!.style.opacity = "0"
    }
}