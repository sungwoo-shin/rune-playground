import { html, on, View } from "rune-ts";
import klass from "./ButtonText.module.scss";
// import { typo_names } from "../../../../shared/typography";
// import { typo } from "../../../../shared/typography/typo";

export interface ButtonTextData {
  label: string;
}

export type ButtonTextSwitchOption = {
  is_active?: boolean;
  container_klass?: string;
  label_klass?: string;
  active_klass?: string;
  // font_normal?: typo_names;
  // font_bold?: typo_names;

  // 기본 on click 시 activate 호출 방지
  prevent_default_click?: boolean;

  // `data-id`
  data_id?: string | number;
};

export class ButtonText<
  T extends ButtonTextData = ButtonTextData
> extends View<T> {
  constructor(data: T, protected option: ButtonTextSwitchOption = {}) {
    super(data, option);
  }

  override template() {
    const { label_klass, container_klass, font_bold, font_normal, is_active } =
      this.option;
    const active_klass = is_active
      ? `${klass.active} ${this.option.active_klass}`
      : "";
    return html`<button
      data-id=${this.option.data_id}
      type="button"
      class="${klass.container} ${container_klass} ${active_klass}"
    >
      <span class="${label_klass} ${klass.bold} ${typo(font_bold ?? "14_bold")}"
        >${this.data.label}</span
      >
      <span
        class="${label_klass} ${klass.normal} ${typo(
          font_normal ?? "14_medium"
        )}"
      >
        ${this.data.label}
      </span>
    </button>`;
  }

  @on("click")
  private onClick() {
    if (this.option.prevent_default_click) {
      return;
    }
    this.activate();
  }

  activate(): void {
    this.option.is_active = true;
    this.handleActiveClass();
  }

  deactivate(): void {
    this.option.is_active = false;
    this.handleActiveClass();
  }

  isActive() {
    return this.option.is_active;
  }

  private handleActiveClass(): void {
    const { active_klass } = this.option;
    if (this.option.is_active) {
      this.element().classList.add(klass.active);
      if (active_klass) {
        this.element().classList.add(active_klass);
      }
    } else {
      this.element().classList.remove(klass.active);
      if (active_klass) {
        this.element().classList.remove(active_klass);
      }
    }
  }
}
