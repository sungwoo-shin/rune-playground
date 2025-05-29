import { CustomEventWithoutDetail, html, on, View } from "rune-ts";

class TestButtonClickEvent extends CustomEventWithoutDetail {}

class TestButtonView extends View {
  @on("click")
  private handleClick(event: MouseEvent) {
    this.dispatchEvent(TestButtonClickEvent, {
      bubbles: true,
    });
  }

  protected template() {
    return html`<button>Test Button</button>`;
  }
}

class EventTestView extends View {
  private testButtonView = new TestButtonView({});

  // // addEventListener (1) -> OK
  // protected onMount() {
  //   this.addEventListener("test:button:click:event", (event) => {
  //     console.log("event: ", event);
  //   });
  // }

  // // addEventListener (2) -> OK
  // protected onMount() {
  //   this.addEventListener(TestButtonClickEvent, (event) => {
  //     console.log("event: ", event);
  //   });
  // }

  // // addEventListener (3) -> No overload matches this call.
  // @on("test:button:click:event")
  // // @ts-expect-error
  // private handleClick(event: TestButtonClickEvent) {
  //   console.log("event: ", event);
  // }

  // // addEventListener (4) -> OK
  // @on(TestButtonClickEvent)
  // // @ts-expect-error
  // private handleClick(event: TestButtonClickEvent) {
  //   console.log("event: ", event);
  // }

  // // delegate (1) -> OK
  // protected onMount() {
  //   this.delegate(
  //     "test:button:click:event",
  //     ".test-button-wrapper",
  //     (event, target) => {
  //       console.log("event: ", event);
  //       console.log("target: ", target);
  //     }
  //   );
  // }

  // // delegate (2) -> No overload matches this call.
  // protected onMount() {
  //   this.delegate(
  //     "test:button:click:event",
  //     TestButtonView,
  //     (event, target) => {
  //       console.log("event: ", event);
  //       console.log("target: ", target);
  //     }
  //   );
  // }

  // // delegate (3) -> No overload matches this call.
  // protected onMount() {
  //   this.delegate(
  //     TestButtonClickEvent,
  //     ".test-button-wrapper",
  //     (event, target) => {
  //       console.log("event: ", event);
  //       console.log("target: ", target);
  //     }
  //   );
  // }

  // // delegate (4) -> OK
  // protected onMount() {
  //   this.delegate(TestButtonClickEvent, TestButtonView, (event, target) => {
  //     console.log("event: ", event);
  //     console.log("target: ", target);
  //   });
  // }

  // // delegate (5) -> Unable to resolve signature of method decorator when called as an expression.
  // @on("test:button:click:event", ".test-button-wrapper")
  // // @ts-expect-error
  // private handleClick(event: TestButtonClickEvent, target: TestButtonView) {
  //   console.log("event: ", event);
  //   console.log("target: ", target);
  // }

  // // delegate (6) -> Unable to resolve signature of method decorator when called as an expression.
  // @on("test:button:click:event", TestButtonView)
  // // @ts-expect-error
  // private handleClick(event: TestButtonClickEvent, target: TestButtonView) {
  //   console.log("event: ", event);
  //   console.log("target: ", target);
  // }

  // // delegate (7) -> OK
  // @on(TestButtonClickEvent, ".test-button-wrapper")
  // // @ts-expect-error
  // private handleClick(event: TestButtonClickEvent, target: TestButtonView) {
  //   console.log("event: ", event);
  //   console.log("target: ", target);
  // }

  // delegate (8) -> Not Working
  @on(TestButtonClickEvent, TestButtonView)
  // @ts-expect-error
  private handleClick(event: TestButtonClickEvent, target: TestButtonView) {
    console.log("event: ", event);
    console.log("target: ", target);
  }

  protected template() {
    return html`<div>
      <div class="test-button-wrapper">${this.testButtonView}</div>
    </div>`;
  }
}

document.getElementById("event-test")!.append(new EventTestView({}).render());
