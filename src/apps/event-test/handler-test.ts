import { CustomEventWithoutDetail, html, on, View } from "rune-ts";

class ButtonClickEvent extends CustomEventWithoutDetail {}

// class ButtonView extends View {
//   protected template() {
//     return html`<button>Button</button>`;
//   }

//   @on("click")
//   // @ts-expect-error
//   private handleClick(event: MouseEvent) {
//     console.log("ButtonView"); // 1
//     this.dispatchEvent(ButtonClickEvent, {
//       bubbles: true,
//     });
//   }
// }

// class ButtonWrapperView extends View {
//   private buttonView = new ButtonView({});

//   protected template() {
//     return html`<div>${this.buttonView}</div>`;
//   }

//   @on(ButtonClickEvent)
//   // @ts-expect-error
//   private handleButtonClick(event: ButtonClickEvent) {
//     console.log("ButtonWrapper"); // 2
//   }
// }

// class PageView extends View {
//   private buttonWrapperView = new ButtonWrapperView({});

//   protected template() {
//     return html`<div>${this.buttonWrapperView}</div>`;
//   }

//   @on(ButtonClickEvent)
//   // @ts-expect-error
//   private handleButtonClick(event: ButtonClickEvent) {
//     console.log("PageView"); // 3
//   }
// }

class ButtonView extends View {
  protected template() {
    return html`<button>Button</button>`;
  }

  @on("click")
  // @ts-expect-error
  private handleClick(event: MouseEvent) {
    console.log("ButtonView");
    this.dispatchEvent(ButtonClickEvent, {
      bubbles: true,
    });
  }
}

class ButtonWrapperView extends View {
  private buttonView = new ButtonView({});

  protected template() {
    return html`<div>${this.buttonView}</div>`;
  }

  protected onMount() {
    console.log("ButtonWrapperView onMount"); // 2

    this.addEventListener(ButtonClickEvent, () => {
      console.log("ButtonWrapperView"); // 4
    });
  }
}

class PageView extends View {
  private buttonWrapperView = new ButtonWrapperView({});

  protected template() {
    return html`<div>${this.buttonWrapperView}</div>`;
  }

  protected onMount() {
    console.log("PageView onMount"); // 1

    this.buttonWrapperView.addEventListener(ButtonClickEvent, () => {
      console.log("PageView"); // 3
    });
  }

  // @on(ButtonClickEvent)
  // private handleButtonClick(event: ButtonClickEvent) {
  //   console.log("PageView handleButtonClick"); // 5
  // }
}

document.getElementById("handler-test")!.append(new PageView({}).render());
