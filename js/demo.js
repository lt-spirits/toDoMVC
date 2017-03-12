(function (agl) {
	"use strict"

	//创建模块
	var demo = agl.module("service", []);

	demo.service("MyService", ["$window", function ($window) {
		//获取数据
		var str = $window.localStorage.getItem("myTodos") || "[]";
		var todos = JSON.parse(str);
        var that = this;
		//返回任务数据
		this.get = function () {
			return todos;
		}
		//添加数据
		this.add = function (newTodo) {
			todos.unshift({
				id: todos.length,
				name: newTodo,
				completed: false
			})
			this.save();
		}
		//缓存数据
		this.save = function () {
			var str = JSON.stringify(todos);
			$window.localStorage.setItem("myTodos", str);
		}
		//删除任务
		this.remove = function (id) {
			todos.map(function (v, i) {
                console.log(v);
                if(v.id === id){
                    todos.splice(i,1);
                    that.save();
                    return;
                }
			})
		};
        //全选 反选
        this.toggleAll = function(selectAll){
            todos.forEach(function(v,i){
                    v.completed = selectAll;
            })
            this.save();
        };
        //获取未完成任务数据
        this.getActive = function(){
            var count = 0;
            todos.forEach(function(v,i){
                if(!v.completed) count++;
            })
            return count;
        }
        //删除所有已完成任务
        this.clearAll = function(){
            todos.forEach(function(v,i){
                if(v.completed){
                    todos.splice(i,1)
                }
            })
            this.save();
        }
	}])

})(angular)
