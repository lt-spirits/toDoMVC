(function (angular) {
	'use strict';
	// Your starting point. Enjoy the ride!
  
  // 1.创建模块
  var app = angular.module('todosApp', ['service'])

  // 2.创建控制器
  app.controller('todosController', [
    '$scope',
    '$location',
    '$log',
    'MyService'
    , function($scope,$location,$log,MyService){
    console.log(MyService)
    // $location.url()可以得到url中锚点值#后的部分
    // console.log($location.url())
    // hashchange
    // $scope.$watch

    // 功能1.任务的展示(ng-repeat)
    // 假设已经得到数据，
    $scope.todos = MyService.get()

    // 功能2.添加任务
    $scope.newTodo=''  // ng-model
    $scope.add = function(){
      // 判断newTodo是否为空，为空则不添加任务
      if(!$scope.newTodo){
        return
      }

     // 标记
     MyService.add($scope.newTodo)

     // 
      // 置空
      $scope.newTodo=''
    }


    // 功能3.删除任务
    $scope.remove = function(id){
      // 根据id到数组$scope.todos中查找相应元素，并删除
      MyService.remove(id)
    }

    // 功能4：修改任务内容 
    $scope.isEditingId = -1
    $scope.edit = function(id){
      $scope.isEditingId = id
    }

    // 只是改变也文本框的编辑状态
    $scope.save = function(){
      $scope.isEditingId = -1
      MyService.save() 
    }

    // 功能5.修改任务状态
    $scope.statusChange = function(){
      this.save()
    }

    // 功能6.批量切换任务状态
    $scope.selectAll = false
    $scope.toggleAll = function(){
      // 让$scope.todos中所有数据的completed值等于$scope.selectAll
      MyService.toggleAll($scope.selectAll)
    }

    // 功能7.显示未完成任务数
    $scope.getActive = function(){
      return MyService.getActive()
    }

    // 功能8.清除所有已完成任务
    $scope.clearAll = function(){
      // 遍历$socpe.todos数组，如果当前元素的completed为true,就把它删除掉
      // for (var i = 0; i < $scope.todos.length; i++) {
      //   // true, false(1) ,false

      //   // i=0,length=5  true,  要删除  length 4
      //   // i=1,length=4  false, 不删除 length 4
      //   // i=2,length=4  true , 要删除 length 3
      //   // i=3,length=3

      //   var item = $scope.todos[i]
      //   if(item.completed){
      //     $scope.todos.splice(i,1)
      //   }
      // }

      MyService.clearAll()
    }

    // 功能9. 切换不同状态任务的显示
    $scope.isCompleted={} // filter过滤器的过滤条件

    // // 显示未完成任务
    // $scope.active = function(){
    //   $scope.isCompleted = {completed:false}
    // }

    // // 显示已完成任务
    // $scope.completed = function(){
    //   $scope.isCompleted = {completed: true}
    // }

    // // 显示所有任务
    // $scope.all = function(){
    //   $scope.isCompleted={}
    // }
    // location.hash

    //根据url中锚点值去切换不同状态任务的显示

    $scope.loca = $location
    $scope.$watch('loca.url()',function(now, old){
      switch(now){
        case '/active':
        $scope.isCompleted = {completed:false}
        break;
        case '/completed':
        $scope.isCompleted = {completed:true}
        break;
        default:
        $scope.isCompleted = {}
      }
    })

  }]) 

})(angular);
