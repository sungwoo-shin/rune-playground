import { CustomEventWithoutDetail, html, ListView, Page, View } from "rune-ts";

class ChatRemoveButtonClickEvent extends CustomEventWithoutDetail {}

type TChat = {
  text: string;
};

class ChatItemView extends View<TChat> {
  protected onRender() {
    this.addEventListener("click", () => {
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
  private chatListView = new ChatListView([...this.data.chats]);

  protected onRender() {
    this.delegate(ChatRemoveButtonClickEvent, ChatItemView, (_, targetView) => {
      this.chatListView.remove(targetView.data);
      console.log("this.data.chats.length: ", this.data.chats.length); // 2
      this.data.chats.splice(this.data.chats.indexOf(targetView.data), 1);
      console.log("this.data.chats.length: ", this.data.chats.length); // 1
    });
  }

  protected template() {
    return html`<div>${this.chatListView}</div>`;
  }
}

const initialChats: TChat[] = [{ text: "Hello" }, { text: "Hi" }];

document
  .getElementById("chat")!
  .append(new ChatPage({ chats: initialChats }).render());
