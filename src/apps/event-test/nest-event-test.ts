import { CustomEventWithoutDetail, html, on, View } from "rune-ts";

class ButtonClickEvent extends CustomEventWithoutDetail {}

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

  // @on(ButtonClickEvent)
  // // @ts-expect-error
  // private handleButtonClick(event: ButtonClickEvent) {
  //   console.log("ButtonWrapper");
  // }

  protected onRender(): void {
    console.log("ButtonWrapperView onRender");

    this.addEventListener(ButtonClickEvent, () => {
      console.log("ButtonWrapper");
    });
  }
}

class PageView extends View {
  private buttonView = new ButtonView({});

  private buttonWrapperView = new ButtonWrapperView({});

  protected template() {
    return html`<div>
      <div class="section-1">${this.buttonWrapperView}</div>

      <!-- <div class="section-2">${this.buttonView}</div> -->
    </div>`;
  }

  // protected onRender() {
  //   // this.delegate(ButtonClickEvent, ButtonView, (event, target) => {
  //   //   console.log("event: ", event);
  //   //   console.log("target: ", target);
  //   // });

  //   this.delegate(ButtonClickEvent, ButtonWrapperView, (event, target) => {
  //     console.log("event: ", event);
  //     console.log("target: ", target);
  //   });
  // }

  protected onRender() {
    console.log("PageView onRender");

    // this.addEventListener(ButtonClickEvent, () => {
    //   console.log("Page");
    // });

    this.buttonWrapperView.addEventListener(ButtonClickEvent, () => {
      console.log("PageView");
    });
  }
}

document.getElementById("nested-event-test")!.append(new PageView({}).render());
