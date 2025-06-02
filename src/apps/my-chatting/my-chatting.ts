import { $, CustomEventWithDetail, html, ListView, View } from "rune-ts";
import "./my-chatting.scss";

class ChatRemoveButtonClickEvent extends CustomEventWithDetail<string> {}

class ChatEditButtonClickEvent extends CustomEventWithDetail<string> {}

type TChat = {
  id: string;
  author: {
    id: string;
    nickname: string;
  };
  text: string;
  heart: {
    count: number;
    selected: boolean;
  };
};

type TChatItemViewProps = {
  chat: TChat;
  me: {
    id: string;
  };
};

class ChatItemView extends View<TChatItemViewProps> {
  protected template(data: TChatItemViewProps) {
    const isMine = data.me.id === data.chat.author.id;

    return html`<div class="${isMine ? "mine" : ""}">
      <span class="nickname">닉네임: ${data.chat.author.nickname}</span>
      <p class="balloon">텍스트: ${data.chat.text}</p>
      <div>
        <button class="like">좋아요: ${data.chat.heart.count}</button>
        <button class="remove">삭제</button>
        <button class="edit">수정</button>
      </div>
    </div>`;
  }

  setText(text: string) {
    this.data.chat.text = text;
    $(this.element()).find(".balloon")!.setTextContent(`텍스트: ${text}`);
  }

  private handleLikeButtonClick() {
    if (this.data.chat.heart.selected) {
      this.data.chat.heart.selected = false;
      this.data.chat.heart.count -= 1;
    } else {
      this.data.chat.heart.selected = true;
      this.data.chat.heart.count += 1;
    }
    $(this.element())
      .find("button.like")!
      .setTextContent(`좋아요: ${this.data.chat.heart.count}`);
  }

  private handleRemoveButtonClick() {
    this.dispatchEvent(ChatRemoveButtonClickEvent, {
      bubbles: true,
      detail: this.data.chat.id,
    });
  }

  private handleEditButtonClick() {
    this.dispatchEvent(ChatEditButtonClickEvent, {
      bubbles: true,
      detail: this.data.chat.id,
    });
  }

  protected onMount() {
    this.delegate("click", "button.like", this.handleLikeButtonClick);

    this.delegate("click", "button.remove", this.handleRemoveButtonClick);

    this.delegate("click", "button.edit", this.handleEditButtonClick);
  }
}

class ChatListView extends ListView<ChatItemView> {
  ItemView = ChatItemView;
}

class ChatCreateSubmitEvent extends CustomEventWithDetail<string> {}

class ChatEditSubmitEvent extends CustomEventWithDetail<{
  editedChatId: string;
  editedChatText: string;
}> {}

type ChatEditorViewProps = {
  value: string;
};

class ChatEditorView extends View<ChatEditorViewProps> {
  private editingChatId: string | null = null;

  protected template() {
    return html`<form>
      <textarea required minlength="2"></textarea>

      <button type="submit">제출</button>
    </form>`;
  }

  activateEditMode(chatIdToEdit: string, chatTextToEdit: string) {
    if (chatIdToEdit === this.editingChatId) {
      return;
    }

    this.editingChatId = chatIdToEdit;
    $(this.element())
      .find("textarea")!
      .setValue(chatTextToEdit)
      .chain((el) => el.focus());
  }

  private handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const $textarea = $(this.element()).find("textarea")!;
    const trimmedValue = $textarea.getValue().trim();

    if (trimmedValue) {
      $textarea.setValue("");

      if (this.editingChatId) {
        this.dispatchEvent(ChatEditSubmitEvent, {
          detail: {
            editedChatId: this.editingChatId,
            editedChatText: trimmedValue,
          },
          bubbles: true,
        });
        this.editingChatId = null;
      } else {
        this.dispatchEvent(ChatCreateSubmitEvent, {
          detail: trimmedValue,
          bubbles: true,
        });
      }
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();

      const formElement = this.element() as HTMLFormElement;
      formElement.requestSubmit();
    }
  }

  protected onMount() {
    this.addEventListener("submit", this.handleSubmit);

    this.addEventListener("keydown", this.handleKeydown);
  }
}

const generateRandomId = () => Math.random().toString(36).substring(2, 15);

type TUser = {
  id: string;
  nickname: string;
};

type ChattingPageViewProps = { me: TUser; chats: TChat[] };

class ChattingPage extends View<ChattingPageViewProps> {
  private chatListView = new ChatListView(
    this.data.chats.map((chat) => ({ chat, me: this.data.me }))
  );

  private chatEditorView = new ChatEditorView({ value: "" });

  protected template() {
    return html`<div>
      <div class="chat-list">${this.chatListView}</div>
      <div class="chat-editor">${this.chatEditorView}</div>
    </div>`;
  }

  private handleChatRemoveButtonClick(event: ChatRemoveButtonClickEvent) {
    const chatIdToRemove = event.detail;
    this.data.chats = this.data.chats.filter(
      (chat) => chat.id !== chatIdToRemove
    );
    this.chatListView.removeBy(
      (itemView) => itemView.data.chat.id === chatIdToRemove
    );
  }

  private handleChatEditButtonClick(event: ChatEditButtonClickEvent) {
    const chatIdToEdit = event.detail;
    const chatToEdit = this.data.chats.find(
      (chat) => chat.id === chatIdToEdit
    )!;
    this.chatEditorView.activateEditMode(chatIdToEdit, chatToEdit.text);
  }

  private handleChatCreateSubmit(event: ChatCreateSubmitEvent) {
    const newChat: TChat = {
      id: generateRandomId(),
      author: this.data.me,
      text: event.detail,
      heart: {
        count: 0,
        selected: false,
      },
    };
    this.data.chats.push(newChat);
    this.chatListView.append({ chat: newChat, me: this.data.me });
    this.chatListView.itemViews.at(-1)!.element().scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }

  private handleChatEditSubmit(event: ChatEditSubmitEvent) {
    const { editedChatId, editedChatText } = event.detail;
    const editedItemView = this.chatListView.itemViews.find(
      (itemView) => itemView.data.chat.id === editedChatId
    );
    editedItemView?.setText(editedChatText);
    editedItemView?.element().scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  protected onMount() {
    this.delegate(
      ChatRemoveButtonClickEvent,
      ChatListView,
      this.handleChatRemoveButtonClick
    );

    this.delegate(
      ChatEditButtonClickEvent,
      ChatListView,
      this.handleChatEditButtonClick
    );

    this.delegate(
      ChatCreateSubmitEvent,
      ChatEditorView,
      this.handleChatCreateSubmit
    );

    this.delegate(
      ChatEditSubmitEvent,
      ChatEditorView,
      this.handleChatEditSubmit
    );
  }
}

const me: TUser = {
  id: "1",
  nickname: "성우",
};

const initialChats: TChat[] = [
  {
    id: "1",
    author: {
      id: "1",
      nickname: "성우",
    },
    text: "Hello Elit exercitation consectetur adipisicing occaecat labore sunt esse consectetur sint cupidatat duis sit irure adipisicing. Magna et laboris eu anim. Cillum cillum eiusmod sunt aute enim qui aute fugiat ex ipsum culpa tempor cillum Lorem. Aliquip est ex exercitation mollit mollit deserunt ea occaecat ipsum minim veniam labore. Aute mollit fugiat elit irure enim. Cillum ullamco ut ex ullamco fugiat laboris laborum occaecat. Sit consequat enim aliqua eiusmod qui et commodo enim incididunt veniam laborum.",
    heart: {
      count: 0,
      selected: false,
    },
  },
  {
    id: "2",
    author: {
      id: "2",
      nickname: "보연",
    },
    text: "Hi Occaecat minim dolor in ipsum est voluptate pariatur sit veniam adipisicing cillum commodo magna. Magna minim nostrud aliqua ipsum fugiat culpa consectetur velit minim velit ut pariatur nostrud tempor. Exercitation officia ullamco eiusmod commodo deserunt amet dolore mollit pariatur. Voluptate dolor do mollit aliqua ipsum fugiat adipisicing id ut enim labore sint veniam commodo. Id do do esse excepteur culpa aliqua enim laborum. Adipisicing anim id in elit sit nulla cillum exercitation in est pariatur culpa.",
    heart: {
      count: 0,
      selected: false,
    },
  },
];

document
  .getElementById("my-chatting")!
  .append(new ChattingPage({ me, chats: initialChats }).render());
