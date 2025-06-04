import { html, View } from "rune-ts";

class AuthPage extends View {
  protected template(data: object) {
    return html`<div>
      <header>
        <span> Onboadring </span>

        <div>
          <button>상품</button>
          <button>어드민</button>
        </div>
      </header>

      <div>
        <div>
          <span> Onboarding </span>

          <input />
          <input />

          <button>로그인하기</button>
        </div>
      </div>
    </div>`;
  }
}

document.getElementById("auth")!.appendChild(new AuthPage({}).render());
