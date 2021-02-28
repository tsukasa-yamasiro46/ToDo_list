let todoApp = {
    addTask: document.querySelector('.add'),
    list: document.querySelector('.todos'),
    search: document.querySelector('.search input'),
    init: function(){
        //初期化処理
        //ローカルストレージに格納されている値を取得し、リストを生成する
        for(var key in localStorage){
            var html = localStorage.getItem(key);
            if(html){
                todoApp.list.innerHTML += localStorage.getItem(key);
            }
        }
    },
    createTodoList: function (task) {
        // HTML テンプレートを生成
        const html = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${task}</span>
                <i class="far fa-trash-alt delete"></i>
            </li>
            `;
        todoApp.list.innerHTML += html;

        todoApp.saveTaskToLocalStorage(task,html);
    },

    //サーチ機能の実装
    filterTasks: function(term){
        Array.from(todoApp.list.children)
        //フィルタ条件
            .filter((todo) => !todo.textContent.toLowerCase().includes(term))
            .forEach((todo) => todo.classList.add('filtered'));

        Array.from(todoApp.list.children)
            .filter((todo) => todo.textContent.toLowerCase().includes(term))
            .forEach((todo) => todo.classList.remove('filtered'));
    },

    saveTaskToLocalStorage: function(task, html){
        //nullは、localstorageに保存しない
        if(html){
            //localstorageは0から始まる
            localStorage.setItem(task,html);
            return;
        }
        return;
    },
    deleteTaskFromLocalStorage: function(task){
        localStorage.removeItem(task);
        return;
    },
}
 
todoApp.init();

todoApp.addTask.addEventListener('submit', e => {
    // デフォルトのイベントを無効
    e.preventDefault();
 
    // Taskに入力した値を空白を除外して格納
    const task = todoApp.addTask.add.value.trim();
    if(task.length) {
        // Todo List の HTML を作成
        todoApp.createTodoList(task);
        // Taskに入力した文字をクリア
        todoApp.addTask.reset();
    }
});

//削除機能
todoApp.list.addEventListener('click' , e=> {
    console.log(e.target.classList);
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        
        const task = e.target.parentElement.textContent.trim();
        todoApp.deleteTaskFromLocalStorage(task);
    }
});

//サーチ機能
todoApp.search.addEventListener('keyup',() => {
    console.log('text')
    const term = todoApp.search.value.trim().toLowerCase();
    todoApp.filterTasks(term);
});