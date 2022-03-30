import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { element, render } from "./view/html-util.js"

export class App {
    constructor() {
        this.todoListModel = new TodoListModel();
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        this.todoListModel.onChange(() => {
            const todoItems = this.todoListModel.getTodoItems();
            const todoListView = new TodoListView();
            const todoListElement = todoListView.createElement(todoItems, {
                // Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
                onUpdataTodo: ({id, completed}) => {
                    this.todoListModel.updataTodo({id, completed});
                },
                // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
                onDeleteTodo: ({id}) => {
                    this.todoListModel.deleteTodo({id});
                }
            })
            // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
            render(todoListElement, containerElement);
            // Todoアイテム数を+1し、表示されてるテキストを更新する
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event)=> {
            event.preventDefault();
            // 新しいTodoItemをTodoListへ追加する
            this.todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
        }));
        inputElement.value = '';
        });
    };
}