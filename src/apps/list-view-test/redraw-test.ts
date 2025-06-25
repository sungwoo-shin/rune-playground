import { html, View } from "rune-ts";

class RedrawView extends View {
  private addClickEventListener() {
    this.element()
      .querySelector(".click-me")!
      .addEventListener("click", () => {
        // redraw 후에도 호출됩니다.
        console.log("clicked");
      });
  }

  override redraw() {
    super.redraw();
    this.addClickEventListener();
    return this;
  }

  protected onRender() {
    this.addClickEventListener();

    this.delegate("click", ".redraw-me", () => {
      this.redraw();
    });
  }

  protected template() {
    return html`<div>
      <button class="click-me">Click Me</button>
      <button class="redraw-me">Redraw Me</button>
    </div>`;
  }
}

// class RedrawView extends View {
//   protected onRender() {
//     // this.delegate("click", ".click-me", () => {
//     //   // redraw 후에도 호출됩니다.
//     //   console.log("clicked");
//     // });

//     this.element()
//       .querySelector(".click-me")!
//       .addEventListener("click", () => {
//         // redraw 후에 호출 되지 않습니다.
//         console.log("clicked");
//       });

//     this.delegate("click", ".redraw-me", () => {
//       this.redraw();
//     });
//   }

//   protected template() {
//     return html`<div>
//       <button class="click-me">Click Me</button>
//       <button class="redraw-me">Redraw Me</button>
//     </div>`;
//   }
// }

// class FooSubView extends View {
//   protected onRender() {
//     this.element()
//       .querySelector(".click-me")!
//       .addEventListener("click", () => {
//         // redraw 후에도 호출됩니다.
//         console.log("clicked");
//       });
//   }

//   protected template() {
//     return html`<div>
//       <button class="click-me">Click Me</button>
//     </div>`;
//   }
// }

// class ParentView extends View {
//   private fooSubView = new FooSubView({});

//   protected onRender() {
//     this.delegate("click", ".redraw-foo-sub-view", this.fooSubView.redraw);
//   }

//   protected template() {
//     return html`<div>
//       ${this.fooSubView}
//       <button class="redraw-foo-sub-view">Redraw FooSubview</button>
//     </div>`;
//   }
// }

document.getElementById("redraw")!.append(new RedrawView({}).render());
