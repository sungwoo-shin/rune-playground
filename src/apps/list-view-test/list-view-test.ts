import { html, ListView, Page, View } from "rune-ts";

type TChat = {
  text: string;
  authorId: string;
};

type TUser = {
  id: string;
};

class ChatItemView extends View<TChat> {
  private me!: TUser;

  setMe(me: TUser) {
    this.me = me;
    return this;
  }

  protected template(data: TChat) {
    const isMine = data.authorId === this.me.id;
    console.log("isMine: ", isMine);
    // isMine:  true
    // isMine:  false

    return html`<div class="${isMine ? "mine" : ""}">${data.text}</div>`;
  }
}

class ChatListView extends ListView<ChatItemView> {
  ItemView = ChatItemView;

  constructor(chats: TChat[], private me: TUser) {
    super(chats);
  }

  override createItemView(item: TChat) {
    return new ChatItemView(item).setMe(this.me);
  }
}

type TChatPageProps = { chats: TChat[]; me: TUser };

class ChatPage extends Page<TChatPageProps> {
  private chatListView = new ChatListView(this.data.chats, this.data.me);

  test() {
    this.chatListView.append;
  }

  protected template() {
    return html`<div>${this.chatListView}</div>`;
  }
}

const initialChats: TChat[] = [
  { text: "Hello", authorId: "1" },
  { text: "Hi", authorId: "2" },
];

const me: TUser = {
  id: "1",
};

document
  .getElementById("chat")!
  .append(new ChatPage({ chats: initialChats, me }).render());
