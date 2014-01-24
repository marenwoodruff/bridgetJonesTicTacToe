var ticTacRef;
var IDs;
var moveCount = 0;
var winner = false;

angular.module("TicTac", ["firebase"])
 .controller("TicTacCtrl", function($scope, $firebase){
 	
 	ticTacRef = new Firebase("hhttps://newttt.firebaseio.com/");
 	$scope.fbRoot = $firebase(ticTacRef);

 	// Wait until everything really is loaded
 	$scope.fbRoot.$on("loaded", function() {
		IDs = $scope.fbRoot.$getIndex();
		if(IDs.length == 0)
		{
			// What???  No Board????  Let's build one.
	 		$scope.fbRoot.$add( { board:['','','','','','','','',''],
 	 			xTurn:true} );
			$scope.fbRoot.$on("change", function() {
				IDs = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(IDs[0]);
			});
		}
		else
		{
			$scope.obj = $scope.fbRoot.$child(IDs[0]);
		}

	});

 	$scope.makeMove = function(idx){
 		if($scope.obj.board[idx]=="")
 		{
			$scope.obj.board[idx] = $scope.obj.xTurn ? 'X' : 'O';
			$scope.obj.xTurn = !$scope.obj.xTurn;
			$scope.obj.$save();
			console.log($scope.obj.board[idx]);
			moveCount++;
			console.log(moveCount);
 		}

//horizontal win conditions
 		if ($scope.obj.board[0] == $scope.obj.board[1]&& $scope.obj.board[1] == $scope.obj.board[2]&& $scope.obj.board[2] != "") {
 				console.log("you won horizontally in the first row");
 				winner = true;
 		}
 		if ($scope.obj.board[3] == $scope.obj.board[4]&& $scope.obj.board[4] == $scope.obj.board[5]&& $scope.obj.board[5] != "") {
 				console.log("you won horizontally in the middle row");
 				winner = true;
 		}
 		if ($scope.obj.board[6] == $scope.obj.board[7]&& $scope.obj.board[7] == $scope.obj.board[8]&& $scope.obj.board[8] != "") {
 				console.log("you won horizontally in the first row");
 				winner = true;
 		}

 		//vertical win conditions
 		if ($scope.obj.board[0] == $scope.obj.board[3] && $scope.obj.board[3] == $scope.obj.board[6]&& $scope.obj.board[6] != "") {
 				console.log("you won vertically in the first column");
 				winner = true;
 		}
 		if ($scope.obj.board[1] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[7]&& $scope.obj.board[7] != "") {
 				console.log("you won vertically in the middle column");
 				winner = true;
 		}
 		if ($scope.obj.board[3] == $scope.obj.board[5] && $scope.obj.board[5] == $scope.obj.board[8]&& $scope.obj.board[8] != "") {
 				console.log("you won vertically in the last column");
 				winner = true;
 		}
 		//diagonal win conditions
 		if ($scope.obj.board[0] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[8]&& $scope.obj.board[8] != "") {
 				console.log("you won diagonally from the first column to the last column");
 				winner = true;
 		}
 		if ($scope.obj.board[3] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[6]&& $scope.obj.board[6] != "") {
 				console.log("you won vertically from the third column to the sixth column");
 				winner = true;
 		}
 		//cats game	
 		if (moveCount == 9 && winner == false) {
 			console.log("Cat's game");
 		}

 	};



 		$scope.reset = function(){
 			console.log("I am resetting");
 			$scope.obj.board=['','','','','','','','',''];
 			moveCount = 0;
 		};

 
 });