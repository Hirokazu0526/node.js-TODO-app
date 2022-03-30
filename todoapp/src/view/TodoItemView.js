import { element } from "./html-util.js";

export class TodoItemView {
    /**
     * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
     * @param {TodoItemModel} todoItem
     * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
     * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
     * @returns {Element}
     */
    createElement(todoItem, {onUpdataTodo, onDeleteTodo}) {
        const todoItemElement = todoItem.completed
            ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s><button class="delete">x</button></li>`
            : element`<li><input type="checkbox" class="checkbox">${item.title}<button class="delete">x</button></li>`
        
        const inputCheckBoxElement = todoItemElement.querySelector(".checkbox");
        inputCheckBoxElement.addEventListener("change", () => {
            onUpdataTodo({
                id: item.id,
                completed: !item.completed
            });
        });

        const deleteButtonElement = todoItemElement.querySelector(".delete");
            deleteButtonElement.addEventListener("click", () => {
                onDeleteTodo({
                    id: item.id
                });
        });

        return todoItemElement;
    }
}