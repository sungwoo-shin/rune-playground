import { CustomEventWithoutDetail, html, View } from "rune-ts";

class TestCustomEvent extends CustomEventWithoutDetail {}

class ChildView extends View {
  protected onRender(): void {
    this.addEventListener("click", () => {
      console.log("clicked");
      // this.dispatchEvent(TestCustomEvent, { bubbles: true });
      setTimeout(() => this.redraw(), 0);
      // this.redraw();
    });
  }

  protected template() {
    return html`<div style="border: 1px solid black; padding: 30px;">
      <button>내부 버튼</button>
    </div>`;
  }
}

class ParentView extends View {
  protected onRender(): void {
    this.delegate("click", ChildView, (event) => {
      console.log("event.target: ", event.target);
    });

    // this.delegate(TestCustomEvent, ChildView, (event) => {
    //   console.log("event.target: ", event.target);
    // });
  }

  protected template() {
    return html`<div>${new ChildView({})}</div>`;
  }
}

document.getElementById("nested")!.append(new ParentView({}).render());
