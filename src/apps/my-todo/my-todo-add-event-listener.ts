import {
  $,
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
    this.addEventListener("keypress", this.handleKeypress);
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

    $(this.element()).delegate(
      "click",
      ".remove",
      this.handleRemoveButtonClick.bind(this)
    );
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

class LeafSegmentSelectEvent<
  T extends TSegment = TSegment
> extends CustomEventWithDetail<T> {}

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
      this.dispatchEvent(LeafSegmentSelectEvent, {
        bubbles: true,
        detail: this.data,
      });
    }
  }

  protected onRender() {
    this.addEventListener("click", this.handleClick);
  }
}

// class SegmentSelectEvent<
//   T extends TSegment = TSegment
// > extends CustomEventWithDetail<T> {}

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

  private handleSegmentSelect(event: LeafSegmentSelectEvent) {
    const selectedSegment = event.detail;
    const selectedIdx = this.itemViews.findIndex(
      (itemView) => itemView.data === selectedSegment
    );
    this.selectedIdx = selectedIdx;
    this.itemViews
      .filter((itemView) => itemView.data !== selectedSegment)
      .forEach((itemView) => itemView.setSelected(false));
    // this.dispatchEvent(SegmentSelectEvent, {
    //   bubbles: true,
    //   detail: event.detail,
    // });
  }

  protected onRender() {
    this.addEventListener(LeafSegmentSelectEvent, this.handleSegmentSelect);
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
  private toggleAllCheckboxView = new CheckboxView({
    checked: this.isAllCompleted,
  });

  private todoInputView = new TodoInputView({ value: "" });

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

  private handleTodoRemoveButtonClick(
    _: TodoRemoveButtonClickEvent,
    target: TodoItemView
  ) {
    this.data.splice(this.data.indexOf(target.data), 1);
    this.todoListView.remove(target.data);
    this.syncToggleAll();
  }

  protected onRender(): void {
    this.toggleAllCheckboxView.addEventListener(
      CheckboxToggleEvent,
      this.handleCheckboxToggle.bind(this)
    );

    this.todoInputView.addEventListener(
      TodoInputSubmitEvent,
      this.handleTodoInputSubmit.bind(this)
    );

    this.todoListView.addEventListener(
      TodoCompletedToggleEvent,
      this.handleRefresh.bind(this)
    );

    this.todoListView.delegate(
      TodoRemoveButtonClickEvent,
      TodoItemView,
      this.handleTodoRemoveButtonClick.bind(this)
    );

    this.segmentedControlsListView.addEventListener(
      LeafSegmentSelectEvent,
      this.handleRefresh.bind(this)
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
