import { CustomEventWithoutDetail, html, ListView, Page, View } from "rune-ts";

class RemoveButtonClickEvent extends CustomEventWithoutDetail {}

type TChat = {
  text: string;
};

class ChatItemView extends View<TChat> {
  protected onRender() {
    this.delegate("click", "button", () => {
      this.dispatchEvent(RemoveButtonClickEvent, { bubbles: true });
    });
  }

  protected template(data: TChat) {
    return html`<div>
      ${data.text}
      <button>Remove</button>
    </div>`;
  }
}

class ChatListView extends ListView<ChatItemView> {
  ItemView = ChatItemView;
}

class ChatPage extends Page<{ chats: TChat[] }> {
  private chatListView = new ChatListView(this.data.chats);

  protected onMount() {
    this.delegate(RemoveButtonClickEvent, ChatItemView, (_, targetView) => {
      console.log("this.data.chats: ", this.data.chats.length);

      this.data.chats.splice(this.data.chats.indexOf(targetView.data), 1);

      console.log("this.data.chats: ", this.data.chats.length);
    });
  }

  protected template() {
    // return html`<div>${this.chatListView}</div>`;
    return html`<div>
      ${this.data.chats.map((chat) => new ChatItemView(chat))}
    </div>`;
  }
}

const initialChats: TChat[] = [
  { text: "Hello" },
  { text: "Hi" },
  { text: "How are you?" },
];

document
  .getElementById("length-test")!
  .append(new ChatPage({ chats: initialChats }).render());
