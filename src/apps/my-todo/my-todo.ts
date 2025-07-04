import {
  CustomEventWithDetail,
  CustomEventWithoutDetail,
  html,
  ListView,
  View,
} from "rune-ts";
import "./my-todo.scss";

class CheckboxToggleEvent extends CustomEventWithDetail<boolean> {}

type TCheckbox = {
  checked: boolean;
};

class CheckboxView extends View<TCheckbox> {
  protected template({ checked }: TCheckbox) {
    return html`<input type="checkbox" ${checked ? "checked" : ""} />`;
  }

  setChecked(checked: boolean) {
    this.data.checked = checked;
    (this.element() as HTMLInputElement).checked = checked;
  }

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const nextChecked = input.checked;
    this.setChecked(nextChecked);
    this.dispatchEvent(CheckboxToggleEvent, {
      bubbles: true,
      detail: nextChecked,
    });
  }

  protected onRender() {
    this.addEventListener("change", this.handleChange);
  }
}

class ToggleAllCheckboxView extends CheckboxView {}

class TodoInputSubmitEvent extends CustomEventWithDetail<string> {}

type TTodoInput = {
  value: string;
};

class TodoInputView extends View<TTodoInput> {
  override template() {
    return html`<input type="text" value="${this.data.value ?? ""}" />`;
  }

  private handleKeypress(event: KeyboardEvent) {
    if (event.code === "Enter") {
      const input = event.target as HTMLInputElement;
      const trimmedValue = input.value.trim();

      if (trimmedValue) {
        input.value = "";
        this.dispatchEvent(TodoInputSubmitEvent, {
          detail: trimmedValue,
          bubbles: true,
        });
      }
    }
  }

  protected onRender() {
    this.addEventListener("keypress", (event) => {
      // event.target
    });

    this.delegate("keypress", "div", (event) => {
      // event.target
      // //
      // event.currentTarget
    });
  }
}

class TodoCompletedToggleEvent extends CustomEventWithDetail<boolean> {}

class TodoRemoveButtonClickEvent extends CustomEventWithoutDetail {}

type TTodo = {
  title: string;
  completed: boolean;
};

class TodoItemView extends View<TTodo> {
  private checkboxView = new CheckboxView({ checked: this.data.completed });

  protected override template({ title }: TTodo) {
    return html`<div>
      ${this.checkboxView}
      <span>${title}</span>
      <button class="remove">X</button>
    </div>`;
  }

  setCompleted(completed: boolean) {
    this.data.completed = completed;
    this.checkboxView.setChecked(completed);
  }

  private handleCheckboxToggle() {
    const nextCompleted = !this.data.completed;
    this.setCompleted(nextCompleted);
    this.dispatchEvent(TodoCompletedToggleEvent, {
      bubbles: true,
      detail: nextCompleted,
    });
  }

  private handleRemoveButtonClick() {
    this.dispatchEvent(TodoRemoveButtonClickEvent, { bubbles: true });
  }

  protected onRender() {
    this.addEventListener(CheckboxToggleEvent, this.handleCheckboxToggle);

    this.delegate("click", ".remove", this.handleRemoveButtonClick);
  }
}

class TodoListView extends ListView<TodoItemView> {
  ItemView = TodoItemView;
}

type TSegment = {
  title: string;
  value?: string;
  selected?: boolean;
};

class SegmentItemView<T extends TSegment> extends View<T> {
  override template({ selected, title }: T) {
    return html`<button class="${selected ? "selected" : ""}">
      ${title}
    </button>`;
  }

  setSelected(selected: boolean) {
    this.data.selected = selected;
    this.element().classList.toggle("selected", selected);
  }

  private handleClick() {
    const nextSelected = !this.data.selected;
    if (nextSelected) {
      this.setSelected(nextSelected);
      this.dispatchEvent(SegmentSelectEvent, {
        bubbles: true,
        detail: this.data,
      });
    }
  }

  protected onRender() {
    this.addEventListener("click", this.handleClick);
  }
}

class SegmentSelectEvent<
  T extends TSegment = TSegment
> extends CustomEventWithDetail<T> {}

class SegmentedControlsListView<T extends TSegment> extends ListView<
  SegmentItemView<T>
> {
  ItemView = SegmentItemView;

  constructor(segments: T[], public selectedIdx: number) {
    super(segments);

    const selectedItemView = this.itemViews.at(selectedIdx);
    if (selectedItemView) {
      selectedItemView.data.selected = true;
    }
  }

  get selectedSegment() {
    return this.data[this.selectedIdx];
  }

  private handleSegmentSelect(event: SegmentSelectEvent) {
    const selectedSegment = event.detail;
    const selectedIdx = this.itemViews.findIndex(
      (itemView) => itemView.data === selectedSegment
    );
    this.selectedIdx = selectedIdx;
    this.itemViews
      .filter((itemView) => itemView.data !== selectedSegment)
      .forEach((itemView) => itemView.setSelected(false));
  }

  protected onRender() {
    this.addEventListener(SegmentSelectEvent, this.handleSegmentSelect);
  }
}

type TIdentity<T> = (x: T) => T;

type TFilterState = {
  title: string;
  predicate: (todo: TTodo) => boolean;
  filter: TIdentity<TTodo[]>;
};

class FilterState implements TFilterState {
  constructor(
    public title: string,
    public predicate: (todo: TTodo) => boolean
  ) {}

  filter(todos: TTodo[]) {
    return todos.filter(this.predicate);
  }
}

class FilterStateWithShuffle extends FilterState {
  override filter(todos: TTodo[]) {
    return shuffle(todos.filter(this.predicate));
  }
}

const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class TodoPage extends View<TTodo[]> {
  private toggleAllCheckboxView = new ToggleAllCheckboxView({
    checked: this.isAllCompleted,
  });

  private todoInputView = new TodoInputView({ value: "" });

  // TodoListView 내에서 리스트를 덮어쓰는 일은 일어나지 않을거야
  // 바깥 컴포넌트에서 만든 배열이 있고 그대로 전달/ 불변이 아니라 상위 dataㄹ를 쉐어할 수 있기를 바람
  // TODO 페이지는 전체 페이지를 관리, 리스트는 필터된 일부를 관리 전체 스토어와 뷰를 그리기 위한 스토어 분리
  private todoListView = new TodoListView([...this.data]);

  private segmentedControlsListView = new SegmentedControlsListView(
    [
      new FilterState("전체", () => true),
      new FilterState("완료", (todo) => todo.completed),
      new FilterState("미완료", (todo) => !todo.completed),
      new FilterStateWithShuffle("미완료 셔플", (todo) => !todo.completed),
    ],
    0
  );

  protected override template() {
    return html`
      <div>
        <div class="header">
          ${this.toggleAllCheckboxView} ${this.todoInputView}
        </div>

        <div class="body">
          ${this.todoListView} ${this.segmentedControlsListView}
        </div>
      </div>
    `;
  }

  private get isAllCompleted() {
    return this.data.length > 0 && this.data.every((todo) => todo.completed);
  }

  private syncToggleAll() {
    this.toggleAllCheckboxView.setChecked(this.isAllCompleted);
  }

  private setSelectedTodos() {
    const selectedTodos = this.segmentedControlsListView.selectedSegment.filter(
      this.data
    );
    this.todoListView.set(selectedTodos);
  }

  private handleCheckboxToggle(event: CheckboxToggleEvent) {
    this.todoListView.itemViews.forEach((itemView) =>
      itemView.setCompleted(event.detail)
    );
    this.setSelectedTodos();
  }

  private handleTodoInputSubmit(event: TodoInputSubmitEvent) {
    const newTodo: TTodo = {
      title: event.detail,
      completed: false,
    };
    this.data.push(newTodo);
    if (this.segmentedControlsListView.selectedSegment.predicate(newTodo)) {
      this.toggleAllCheckboxView.setChecked(false);
      this.todoListView.append(newTodo);
    }
  }

  private handleRefresh() {
    this.setSelectedTodos();
    this.syncToggleAll();
  }

  private handleTodoRemoveButtonClick(todoItemView: TodoItemView) {
    this.data.splice(this.data.indexOf(todoItemView.data), 1);
    // Uncaught TypeError: 'data' property is readonly.
    // https://github.com/marpple/rune/blob/cb0000b7cf34459092a298211611b9b6e75fc39f/rune/src/VirtualView.ts#L25-L27
    // this.data = this.data.filter((todo) => todo !== todoItemView.data);
    this.todoListView.remove(todoItemView.data);
    this.syncToggleAll();
  }

  protected onRender(): void {
    this.delegate(
      CheckboxToggleEvent,
      ToggleAllCheckboxView,
      this.handleCheckboxToggle
    );

    this.delegate(
      TodoInputSubmitEvent,
      TodoInputView,
      this.handleTodoInputSubmit
    );

    this.delegate(TodoCompletedToggleEvent, TodoListView, this.handleRefresh);

    this.delegate(TodoRemoveButtonClickEvent, TodoItemView, (_, targetView) =>
      this.handleTodoRemoveButtonClick(targetView)
    );

    this.delegate(
      SegmentSelectEvent,
      SegmentedControlsListView,
      this.handleRefresh
    );
  }
}

const initialTodos: TTodo[] = [
  {
    title: "하나",
    completed: true,
  },
  {
    title: "둘",
    completed: false,
  },
  {
    title: "셋",
    completed: true,
  },
];

document.getElementById("my-todo")!.append(new TodoPage(initialTodos).render());
