angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('listCtrl', ['$scope', '$stateParams', '$http', '$location', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http ,$location, $state) {
	$scope.listall = [];
	$http.get('http://192.168.1.123:3000/articles_api')
	.then(function(response) {
	    //$scope.listall = response.data;
	    angular.forEach(response.data, function(result){
        //console.log(results)
        //console.log(response)
        $scope.listall.push(result);
      })

	}); 

	$scope.goDetail = function(id){
		//$location.path("/detail/"+id);
		$state.go('menu.detail',{"id": id});
	}

}])
   
.controller('addNewCtrl', ['$scope', '$stateParams', '$http', '$state', '$ionicViewService','$ionicPopup', '$ionicActionSheet', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $state, $ionicViewService, $ionicPopup, $ionicActionSheet) {
$scope.title = ""; 
$scope.text = "";
$scope.msg = "test";
$scope.sentAddNew = function(title,text){
	//$scope.msg = title+"  "+text;

	var article = new Object();
	article.title = title;
    article.text = text;

	var data = new Object();
	data.article = article; 
	var config = {
	    dataType: 'json',
	    headers : {
	        'Content-Type': 'application/json;'

	    }
	};
	$http.post('http://192.168.1.123:3000/articles_api', data, config)
	.success(function (data, status, headers, config) {
	    $scope.PostDataResponse = data;
	    //$scope.msg = data;
	    if($scope.PostDataResponse.status == "created"){
	    	$scope.title = null; 
	    	$scope.text = null;
	    	$ionicViewService.nextViewOptions({
	    	   disableBack: true
	    	});
	    	$state.go('menu.list');
	    	var alertPopup = $ionicPopup.alert({
			title: 'Created'
			});
			
	    }
	    else{
	    	var alertPopup = $ionicPopup.alert(data);
	    }
	    

	})
	.error(function (data, status, header, config) {
	    $scope.ResponseDetails = "Data: " + data +
	        "status: " + status +
	        "headers: " + header +
	        "config: " + config;

	});
	
	

}

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('detailCtrl', ['$scope', '$stateParams', '$http','$state', '$ionicViewService','$ionicPopup', '$ionicActionSheet', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http, $state, $ionicViewService, $ionicPopup, $ionicActionSheet) {
$scope.article = "";
$scope.id = $stateParams.id;
$http.get('http://192.168.1.123:3000/articles_api/'+$stateParams.id)
	.then(function(response) {
	    //$scope.listall = response.data;
	    $scope.article = response.data;

});
$scope.delete = function(id){

	$http.delete('http://192.168.1.123:3000/articles_api/'+id)
	.then(function(response) {
	    $scope.PostDataResponse = response.data;
	    if($scope.PostDataResponse.status == "deleted"){

	    	$ionicViewService.nextViewOptions({
	    	   disableBack: true
	    	});
	    	$state.go('menu.list');
	    	var alertPopup = $ionicPopup.alert({
			title: 'deleted'
			});
	    }
	    else{
	    	var alertPopup = $ionicPopup.alert(data);
	    }
	});
};

}])
 