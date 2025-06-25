import { html, View } from "rune-ts";

type TSize = 80 | 56 | 48 | 40 | 32 | 24;

type TStyle =
  | "Primary_A"
  | "Primary_B"
  | "Secondary-A"
  | "Secondary-B"
  | "Custom-A"
  | "Custom-B"
  | "Custom-C";

type TButtonViewProps = {
  size: TSize;
  style: TStyle;
  label: string;
};

class ButtonView extends View<TButtonViewProps> {
  template(data: TButtonViewProps) {
    return html`<button class="${data.style}">${data.label}</button>`;
  }
}

document.getElementById("app")!.appendChild(
  new ButtonView({
    size: 80,
    style: "Primary_A",
    label: "Click Me",
  }).render()
);
