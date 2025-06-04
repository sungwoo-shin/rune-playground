// import { $, CustomEventWithDetail, html, ListView, View } from "rune-ts";
// import "./my-chatting.scss";
// import { delay } from "@fxts/core";
// import { mockChats } from "./mockChats";

// class ChatRemoveButtonClickEvent extends CustomEventWithDetail<string> {}

// class ChatEditButtonClickEvent extends CustomEventWithDetail<string> {}

// type TChat = {
//   id: string;
//   author: {
//     id: string;
//     nickname: string;
//   };
//   text: string;
//   heart: {
//     count: number;
//     selected: boolean;
//   };
// };

// type TChatItemViewProps = {
//   chat: TChat;
//   me: {
//     id: string;
//   };
// };

// class ChatItemView extends View<TChat> {
//   // private me;

//   // constructor(props: TChat) {
//   //   super(props);
//   //   this.me = me;
//   // }

//   protected template(data: TChatItemViewProps) {
//     const isMine = data.me.id === data.chat.author.id;

//     return html`<div class="${isMine ? "mine" : ""}">
//       <span class="nickname">닉네임: ${data.chat.author.nickname}</span>
//       <p class="balloon">텍스트: ${data.chat.text}</p>
//       <div>
//         <button class="like">좋아요: ${data.chat.heart.count}</button>
//         <button class="remove">삭제</button>
//         <button class="edit">수정</button>
//       </div>
//     </div>`;
//   }

//   setText(text: string) {
//     this.data.chat.text = text;
//     $(this.element()).find(".balloon")!.setTextContent(`텍스트: ${text}`);
//   }

//   private handleLikeButtonClick() {
//     if (this.data.chat.heart.selected) {
//       this.data.chat.heart.selected = false;
//       this.data.chat.heart.count -= 1;
//     } else {
//       this.data.chat.heart.selected = true;
//       this.data.chat.heart.count += 1;
//     }
//     $(this.element())
//       .find("button.like")!
//       .setTextContent(`좋아요: ${this.data.chat.heart.count}`);
//   }

//   private handleRemoveButtonClick() {
//     this.dispatchEvent(ChatRemoveButtonClickEvent, {
//       bubbles: true,
//       detail: this.data.chat.id,
//     });

//     // this.element().remove();
//   }

//   private handleEditButtonClick() {
//     this.dispatchEvent(ChatEditButtonClickEvent, {
//       bubbles: true,
//       detail: this.data.chat.id,
//     });
//   }

//   protected onRender() {
//     this.delegate("click", "button.like", this.handleLikeButtonClick);

//     this.delegate("click", "button.remove", this.handleRemoveButtonClick);

//     this.delegate("click", "button.edit", this.handleEditButtonClick);
//   }
// }

// class ChatListView extends ListView<ChatItemView> {
//   ItemView = ChatItemView;

//   private me: TUser;

//   constructor(chats: TChat[], me: TUser) {
//     super(
//       chats.map((chat) => ({
//         chat,
//         me,
//       }))
//     );
//     this.me = me;
//   }

//   // 다른 방법? DB 없는 데이터 추가해서 다루는 경우 뷰 코드의 심플하게 유지하기 위해 데이터를 뷰에 맞춰준다
//   // override append(_: never): never {
//   //   throw new Error("Use appendChat method instead of append.");
//   // }
//   appendChat(chat: TChat) {
//     return super.append({ chat, me: this.me });
//   }

//   // override appendAll(_: never): never {
//   //   throw new Error("Use appendAllChats method instead of appendAll.");
//   // }
//   appendAllChats(chats: TChat[]) {
//     return super.appendAll(
//       chats.map((chat) => ({
//         chat,
//         me: this.me,
//       }))
//     );
//   }

//   // 오버라이드 해서 me 추가되도록
//   override createItemView(item: TChatItemViewProps): ChatItemView {
//     return new ChatItemView({ ...item, me: this.me });
//   }
// }

// class ChatCreateSubmitEvent extends CustomEventWithDetail<string> {}

// class ChatEditSubmitEvent extends CustomEventWithDetail<{
//   editedChatId: string;
//   editedChatText: string;
// }> {}

// type ChatEditorViewProps = {
//   value: string;
// };

// class ChatEditorView extends View<ChatEditorViewProps> {
//   private editingChatId: string | null = null;

//   protected template() {
//     return html`<form>
//       <textarea required minlength="2"></textarea>

//       <button type="submit">제출</button>
//     </form>`;
//   }

//   activateEditMode(chatIdToEdit: string, chatTextToEdit: string) {
//     if (chatIdToEdit === this.editingChatId) {
//       return;
//     }

//     this.editingChatId = chatIdToEdit;
//     $(this.element())
//       .find("textarea")!
//       .setValue(chatTextToEdit)
//       .chain((el) => el.focus());
//   }

//   private handleSubmit(event: SubmitEvent) {
//     event.preventDefault();

//     const $textarea = $(this.element()).find("textarea")!;
//     const trimmedValue = $textarea.getValue().trim();

//     if (trimmedValue) {
//       $textarea.setValue("");

//       if (this.editingChatId) {
//         this.dispatchEvent(ChatEditSubmitEvent, {
//           detail: {
//             editedChatId: this.editingChatId,
//             editedChatText: trimmedValue,
//           },
//           bubbles: true,
//         });
//         this.editingChatId = null;
//       } else {
//         this.dispatchEvent(ChatCreateSubmitEvent, {
//           detail: trimmedValue,
//           bubbles: true,
//         });
//       }
//     }
//   }

//   private handleKeydown(event: KeyboardEvent) {
//     if (event.key === "Enter") {
//       event.preventDefault();

//       const formElement = this.element() as HTMLFormElement;
//       formElement.requestSubmit();
//     }
//   }

//   protected onRender() {
//     this.addEventListener("submit", this.handleSubmit);

//     this.addEventListener("keydown", this.handleKeydown);
//   }
// }

// const CHAT_COUNT_PER_PAGE = 5;

// const getChats = (() => {
//   let page = 0;

//   return async () => {
//     await delay(3000);
//     const start = page * CHAT_COUNT_PER_PAGE;
//     const end = start + CHAT_COUNT_PER_PAGE;
//     const result = mockChats.slice(start, end);
//     page += 1;
//     return result;
//   };
// })();

// const generateRandomId = () => Math.random().toString(36).substring(2, 15);

// type TUser = {
//   id: string;
//   nickname: string;
// };

// type ChattingPageViewProps = { me: TUser; chats: TChat[] };

// class ChattingPage extends View<ChattingPageViewProps> {
//   private chatListView = new ChatListView(this.data.chats, this.data.me);

//   private chatEditorView = new ChatEditorView({ value: "" });

//   private isLoading = false;

//   protected template() {
//     return html`<div>
//       <div class="chat-list">
//         ${this.chatListView}

//         <!-- <div id="sensor" style="height: 2px"></div> -->
//       </div>
//       <div class="chat-editor">${this.chatEditorView}</div>
//     </div>`;
//   }

//   private handleChatRemoveButtonClick(
//     event: ChatRemoveButtonClickEvent,
//     targetView: ChatItemView
//   ) {
//     const chatIdToRemove = event.detail;
//     // 필요 없음
//     // this.data.chats = this.data.chats.filter(
//     //   (chat) => chat.id !== chatIdToRemove
//     // );

//     // this.chatListView.removeBy(
//     //   (itemView) => itemView.data.chat.id === chatIdToRemove
//     // );
//     this.chatListView.remove(targetView.data); // 같은 레퍼런스 삭제
//   }

//   private handleChatEditButtonClick(
//     event: ChatEditButtonClickEvent,
//     targetView: ChatItemView
//   ) {
//     const chatIdToEdit = event.detail;
//     const chatToEdit = this.data.chats.find(
//       (chat) => chat.id === chatIdToEdit
//     )!;
//     this.chatEditorView.activateEditMode(chatIdToEdit, chatToEdit.text);
//   }

//   private handleChatCreateSubmit(event: ChatCreateSubmitEvent) {
//     const newChat: TChat = {
//       id: generateRandomId(),
//       author: this.data.me,
//       text: event.detail,
//       heart: {
//         count: 0,
//         selected: false,
//       },
//     };
//     // this.data.chats.push(newChat);
//     this.chatListView.appendChat(newChat);
//     this.chatListView.itemViews.at(-1)!.element().scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//     });
//   }

//   private handleChatEditSubmit(event: ChatEditSubmitEvent) {
//     const { editedChatId, editedChatText } = event.detail;
//     const editedItemView = this.chatListView.itemViews.find(
//       (itemView) => itemView.data.chat.id === editedChatId
//     );
//     editedItemView?.setText(editedChatText);
//     editedItemView?.element().scrollIntoView({
//       behavior: "smooth",
//       block: "nearest",
//     });
//   }

//   private handleIntersect: IntersectionObserverCallback = async ([entry]) => {
//     if (entry.isIntersecting && !this.isLoading) {
//       const loadingElement = $.fromHtml("<div>Loading...</div>").element();

//       this.isLoading = true;
//       this.chatListView.element().after(loadingElement);
//       const chats = await getChats();
//       this.isLoading = false;
//       loadingElement.remove();

//       this.data.chats.push(...chats);
//       this.chatListView.appendAllChats(chats);
//     }
//   };

//   protected onRender() {
//     this.delegate(
//       ChatRemoveButtonClickEvent,
//       ChatListView,
//       this.handleChatRemoveButtonClick
//     );

//     this.delegate(
//       ChatEditButtonClickEvent,
//       ChatListView,
//       this.handleChatEditButtonClick
//     );

//     this.delegate(
//       ChatCreateSubmitEvent,
//       ChatEditorView,
//       this.handleChatCreateSubmit
//     );

//     this.delegate(
//       ChatEditSubmitEvent,
//       ChatEditorView,
//       this.handleChatEditSubmit
//     );

//     // const intersectionObserver = new IntersectionObserver(this.handleIntersect);
//     // const sensorElement = this.element().querySelector("#sensor")!;
//     // intersectionObserver.observe(sensorElement);
//   }
// }

// const me: TUser = {
//   id: "1",
//   nickname: "성우",
// };

// const initialChats: TChat[] = [
//   {
//     id: "1",
//     author: {
//       id: "1",
//       nickname: "성우",
//     },
//     text: "Hello Elit exercitation consectetur adipisicing occaecat labore sunt esse consectetur sint cupidatat duis sit irure adipisicing. Magna et laboris eu anim. Cillum cillum eiusmod sunt aute enim qui aute fugiat ex ipsum culpa tempor cillum Lorem. Aliquip est ex exercitation mollit mollit deserunt ea occaecat ipsum minim veniam labore. Aute mollit fugiat elit irure enim. Cillum ullamco ut ex ullamco fugiat laboris laborum occaecat. Sit consequat enim aliqua eiusmod qui et commodo enim incididunt veniam laborum. Elit exercitation consectetur adipisicing occaecat labore sunt esse consectetur sint cupidatat duis sit irure adipisicing. Magna et laboris eu anim. Cillum cillum eiusmod sunt aute enim qui aute fugiat ex ipsum culpa tempor cillum Lorem. Aliquip est ex exercitation mollit mollit deserunt ea occaecat ipsum minim veniam labore. Aute mollit fugiat elit irure enim. Cillum ullamco ut ex ullamco fugiat laboris laborum occaecat. Sit consequat enim aliqua eiusmod qui et commodo enim incididunt veniam laborum.",
//     heart: {
//       count: 0,
//       selected: false,
//     },
//   },
//   {
//     id: "2",
//     author: {
//       id: "2",
//       nickname: "보연",
//     },
//     text: "Hi Occaecat minim dolor in ipsum est voluptate pariatur sit veniam adipisicing cillum commodo magna. Magna minim nostrud aliqua ipsum fugiat culpa consectetur velit minim velit ut pariatur nostrud tempor. Exercitation officia ullamco eiusmod commodo deserunt amet dolore mollit pariatur. Voluptate dolor do mollit aliqua ipsum fugiat adipisicing id ut enim labore sint veniam commodo. Id do do esse excepteur culpa aliqua enim laborum. Adipisicing anim id in elit sit nulla cillum exercitation in est pariatur culpa. Occaecat minim dolor in ipsum est voluptate pariatur sit veniam adipisicing cillum commodo magna. Magna minim nostrud aliqua ipsum fugiat culpa consectetur velit minim velit ut pariatur nostrud tempor. Exercitation officia ullamco eiusmod commodo deserunt amet dolore mollit pariatur. Voluptate dolor do mollit aliqua ipsum fugiat adipisicing id ut enim labore sint veniam commodo. Id do do esse excepteur culpa aliqua enim laborum. Adipisicing anim id in elit sit nulla cillum exercitation in est pariatur culpa.",
//     heart: {
//       count: 0,
//       selected: false,
//     },
//   },
// ];

// document
//   .getElementById("my-chatting")!
//   .append(new ChattingPage({ me, chats: initialChats }).render());
