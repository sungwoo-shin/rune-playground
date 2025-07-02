import { CustomEventWithoutDetail, html, ListView, Page, View } from "rune-ts";

class ChatRemoveButtonClickEvent extends CustomEventWithoutDetail {}

type TChat = {
  text: string;
};

class ChatItemView extends View<TChat> {
  protected onRender() {
    this.delegate("click", "button", () => {
      this.dispatchEvent(ChatRemoveButtonClickEvent, { bubbles: true });
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

  protected onRender() {
    this.delegate(ChatRemoveButtonClickEvent, ChatItemView, (_, targetView) => {
      console.log("this.data.chats: ", this.data.chats);
      this.chatListView.remove(targetView.data);
      console.log("this.data.chats: ", this.data.chats);
    });
  }

  protected template() {
    return html`<div>${this.chatListView}</div>`;
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
