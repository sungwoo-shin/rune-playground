import { CustomEventWithoutDetail, html, View, type Html } from "rune-ts";

// class ButtonView extends View {
//   protected onRender() {
//     this.addEventListener("click", (event) => {
//       console.log("event.target: ", event.target); // span
//       console.log("event.currentTarget: ", event.currentTarget); // div
//     });

//     this.delegate("click", "button", (event) => {
//       console.log("event.target: ", event.target); // span
//       console.log("event.currentTarget: ", event.currentTarget); // button

//       console.log("event.currentTarget: ", event.originalEvent.target); // span
//       console.log("event.currentTarget: ", event.originalEvent.currentTarget); // div
//     });
//   }

//   protected template() {
//     return html`
//       <div>
//         <button>
//           <span>Click Me</span>
//         </button>
//       </div>
//     `;
//   }
// }

class ButtonClickEvent extends CustomEventWithoutDetail {}

class ButtonView extends View {
  protected onRender() {
    this.addEventListener("click", () =>
      this.dispatchEvent(ButtonClickEvent, {
        bubbles: true,
      })
    );
  }

  protected template() {
    return html`<button>Click Me</button>`;
  }
}

class ButtonWrapperView extends View {
  protected onRender() {
    this.addEventListener(ButtonClickEvent, () => console.log("clicked"));
  }

  protected template() {
    return html`<div>${new ButtonView({})}</div>`;
  }
}

document
  .getElementById("delegate-test")!
  .append(new ButtonWrapperView({}).render());
