var ticTacRef;
var IDs;
var moveCount = 0;
var winner = false;
var darcyWinMessage = false;
var cleaverWinMessage = false;
var catsGame = false


angular.module("TicTac", ["firebase"])
 .controller("TicTacCtrl", function($scope, $firebase){
 	
 	ticTacRef = new Firebase("https://newttt.firebaseio.com/");
 	$scope.fbRoot = $firebase(ticTacRef);

 	// Wait until everything really is loaded
 	$scope.fbRoot.$on("loaded", function() {
		IDs = $scope.fbRoot.$getIndex();
		if(IDs.length == 0)
		{
			// What???  No Board????  Let's build one.
	 		$scope.fbRoot.$add( { board:['','','','','','','','',''],
 	 			xTurn:true} );
	 			// this is where you are creating all of your data
			$scope.fbRoot.$on("change", function() {
				IDs = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(IDs[0]);
				// obj is all of the properties of your firebase
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

		//horizontal win conditions for Darcy
 		if ($scope.obj.board[0] == $scope.obj.board[1]&& $scope.obj.board[1] == $scope.obj.board[2]&& $scope.obj.board[2] != "" && $scope.obj.board[2] == "X") {
 				("Bridget:: I'm so sorry. I didn't mean it. Well, I meant it, but I was so stupid that I didn't mean what I meant... After all, it's only a diary. Everyone knows diaries are just... full of crap. Darcy:: Yes, I know that. I was just buying you a new one. ");
 				winner = true;
 				darcyWinMessage = true;
 		}
 		if ($scope.obj.board[3] == $scope.obj.board[4]&& $scope.obj.board[4] == $scope.obj.board[5]&& $scope.obj.board[5] != "" && $scope.obj.board[5] == "X") {
 				("Bridget:: Wait a minute... nice boys don't kiss like that. Darcy:: Oh, yes, they fucking do. ");
 				winner = true;
 				darcyWinMessage = true;
 		}
 		if ($scope.obj.board[6] == $scope.obj.board[7]&& $scope.obj.board[7] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "X") {
 				("Darcy:: I realize that when I met you at the turkey curry buffet, I was unforgivably rude, and wearing a reindeer jumper. ");
 				winner = true;
 				darcyWinMessage = true;
 		}

 		//horizontal win conditions for Cleaver
 		if ($scope.obj.board[0] == $scope.obj.board[1]&& $scope.obj.board[1] == $scope.obj.board[2]&& $scope.obj.board[2] != "" && $scope.obj.board[2] == "O") {
 				("Cleaver:: Now these are very silly little boots, Jones. And this is a very silly little dress. And, um, these are, fuck me, absolutely enormous panties. Bridget:: Jesus. Fuck. Cleaver:: No, no. Don't apologize. I like them. Hello, Mummy. [they kiss] Cleaver:: I'm sorry, I have to have another look. They're too good to be true. Bridget:: No... Cleaver:: They're nothing to be embarrassed about. I'm wearing something similar myself. ");
 				winner = true;
 				cleaverWinMessage = true;
 		}
 		if ($scope.obj.board[3] == $scope.obj.board[4]&& $scope.obj.board[4] == $scope.obj.board[5]&& $scope.obj.board[5] != "" && $scope.obj.board[5] == "O") {
 				("Bridget:: Daniel, what you just did is actually illegal in several countries. Cleaver:: That is one of the reasons that I'm so thrilled to be living in Britain today. ");
 				winner = true;
 				cleaverWinMessage = true;
 		}
 		if ($scope.obj.board[6] == $scope.obj.board[7]&& $scope.obj.board[7] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "O") {
 				("Cleaver:: First, have some more wine, and then tell me the story about practicing French kissing with the art girls at school, because it's a very good story. Bridget:: It wasn't French kissing. Cleaver:: Don't care, make it up. That's an order, Jones. ");
 				winner = true;
 				cleaverWinMessage = true;
 		}



 		//vertical win conditions for Darcy
 		if ($scope.obj.board[0] == $scope.obj.board[3] && $scope.obj.board[3] == $scope.obj.board[6]&& $scope.obj.board[6] != "" && $scope.obj.board[6] == "X") {
 				("Bridget:: [as Una Alconberry] No, Pam. Besides, the gravy needs sieving. Darcy:: [as Pamela Jones] Surely not, just stir it Una. ");
 				winner = true;
 				darcyWinMessage = true;
 		}
 		if ($scope.obj.board[1] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[7]&& $scope.obj.board[7] != "" && $scope.obj.board[7] == "X") {
 				("Darcy:: I like you, very much. Bridget:: Ah, apart from the smoking and the drinking, the vulgar mother and... ah, the verbal diarrhea. Darcy:: No, I like you very much. Just as you are. ");
 				winner = true;
 				darcyWinMessage = true;
 		}
 		if ($scope.obj.board[3] == $scope.obj.board[5] && $scope.obj.board[5] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "X") {
 				("Bridget:: You once said you liked me just as I am and I just wanted to say likewise. I mean there are stupid things your mum buys you, tonight's another... classic. You're haughty, and you always say the wrong thing in every situation and I seriously believe that you should rethink the length of your sideburns. But, you're a nice man and I like you. If you wanted to pop by some time that might be nice... more than nice. Darcy:: Right, crikey.  ");
 				winner = true;
 				darcyWinMessage = true;
 		}

 		//vertical win conditions for Cleaver
 		if ($scope.obj.board[0] == $scope.obj.board[3] && $scope.obj.board[3] == $scope.obj.board[6]&& $scope.obj.board[6] != "" && $scope.obj.board[6] == "O") {
 				("Cleaver:: Now these are very silly little boots, Jones. And this is a very silly little dress. And, um, these are, fuck me, absolutely enormous panties. Bridget:: Jesus. Fuck. Cleaver:: No, no. Don't apologize. I like them. Hello, Mummy. [they kiss] Cleaver:: I'm sorry, I have to have another look. They're too good to be true. Bridget:: No... Cleaver:: They're nothing to be embarrassed about. I'm wearing something similar myself. ");
 				winner = true;
 				cleaverWinMessage = true;
 		}
 		if ($scope.obj.board[1] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[7]&& $scope.obj.board[7] != "" && $scope.obj.board[7] == "O") {
 				("Bridget:: Daniel, what you just did is actually illegal in several countries. Cleaver:: That is one of the reasons that I'm so thrilled to be living in Britain today. ");
 				winner = true;
 				cleaverWinMessage = true;
 		}
 		if ($scope.obj.board[3] == $scope.obj.board[5] && $scope.obj.board[5] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "O") {
 				("Cleaver:: I've been going crazy. I can't stop thinking about you, and thinking about what an idiot I've been. Christ, is that blue soup? ");
 				winner = true;
 				cleaverWinMessage = true;
 		}


 		//diagonal win conditions for Darcy
 		if ($scope.obj.board[0] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "X") {
 				("[regarding the blue soup] Bridget:: How's it look? Mark:: Uh, great. It's, um, blue. Bridget:: Blue? Mark:: No, but, blue is good. If you ask me there isn't enough blue food. Bridget:: Oh, shit! It must be the string. Mark:: Oh, it's string soup? ");
 				winner = true;
 				darcyWinMessage = true;
 		}
 		if ($scope.obj.board[2] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[6]&& $scope.obj.board[6] != "" && $scope.obj.board[6] == "X") {
 				("Darcy: I don't think you're an idiot at all. I mean, there are elements of the ridiculous about you. Your mother's pretty interesting. And you really are an appallingly bad public speaker. And, um, you tend to let whatever's in your head come out of your mouth without much consideration of the consequences... But the thing is, um, what I'm trying to say, very inarticulately, is that, um, in fact, perhaps despite appearances, I like you, very much. Just as you are. ");
 				winner = true;
 				darcyWinMessage = true;
 		}


 		//diagonal win conditions for Cleaver
 		if ($scope.obj.board[0] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[8]&& $scope.obj.board[8] != "" && $scope.obj.board[8] == "O") {
 				("Bridget:: So what do you think of the situation in Chechnya? Cleaver:: I couldn't give a fuck, Jones. ");
 				winner = true;
 				cleaverWinMessage = true;
 		}

 		if ($scope.obj.board[2] == $scope.obj.board[4] && $scope.obj.board[4] == $scope.obj.board[6]&& $scope.obj.board[6] != "" && $scope.obj.board[6] == "O") {
 				("Bridget:: Apparently, I used to run round naked in his paddling pool. Cleaver:: I bet you did, you dirty bitch.");
 				winner = true;
 				cleaverWinMessage = true;
 		}


 		//cats game	
 		if (moveCount == 9 && winner == false) {
 			("Cleaver:: [lands on restaurant table] I'm so sorry, I'm so sorry! Darcy:: [places hand in someone's salad] Oh, God! I'm sorry! [wipes dirty hand on man's suit] Darcy:: I really am sorry. I-I will pay. Cleaver:: Had enough Darcy? Darcy:: Not quite, if that's all right by you. [punches Daniel hard] Waiter:: Happy birthday to you... [everyone joins in, stopping fight] Waiter:: Happy birthday to you! Darcy:: Happy birthday dear what's-his-name... Cleaver:: Happy birthday to you... [tackles Darcy, both fly out window] Currently the game is a draw. Press 'New Game' to start again!");
 				catsGame = true;
 		}

 	};



 		$scope.reset = function(){
 			console.log("I am resetting");
 			$scope.obj.board=['','','','','','','','',''];
 			moveCount = 0;
 		};

 
 });

