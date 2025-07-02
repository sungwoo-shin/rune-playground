import { html, View } from "rune-ts";

class ChildView extends View {
  protected onRender(): void {
    this.addEventListener("click", () => {
      console.log("clicked");
      this.redraw();
    });
  }

  protected template() {
    return html`<div style="background: pink; padding: 30px;">
      <button>내부 버튼</button>
    </div>`;
  }
}

class ParentView extends View {
  protected onRender(): void {
    this.delegate("click", ChildView, (event) => {
      console.log("event.target: ", event.target);
    });
  }

  protected template() {
    return html`<div>${new ChildView({})}</div>`;
  }
}

document.getElementById("nested")!.append(new ParentView({}).render());
