var stoLat = angular.module('stoLat', []);

stoLat.factory('Data', function() {
	return {
		correctCode: 'JaviIsTheBest',
		questionnaireAnswers: {
			0: 'darth-vader',
			1: 'shot-in-the-head',
			2: 'kokiri'
		}
	}
});

function StoLatCtrl($scope, $timeout, Data) {
	$scope.data = Data;
	$scope.codeCorrect = false;
	$scope.showPrice = false;
	$scope.currentQuestionIndex = 0;
	$scope.maxQuestionIndex = 2;

	var clearMessages = function() {
		$scope.message = '';
		$scope.messageClass = '';
	};

	var showMessage = function(message, status) {
		$scope.message = message;
		$scope.messageClass = 'alert alert-' + status;
		$timeout.cancel($scope.timer);
		$scope.timer = $timeout(clearMessages, 3000);
	};

	$scope.checkCode = function() {
		if ($scope.code === $scope.data.correctCode) {
			showMessage('Congratulations! You won a price.', 'success');
			$scope.codeCorrect = true;
		} else {
			$scope.code = '';
			showMessage('Congratulations! You won a pair of NOTHING.', 'danger');
		}
	};

	$scope.checkQuestion = function(answer, questionId) {
		if (answer === $scope.data.questionnaireAnswers[questionId]) {
			$scope.currentQuestionIndex = $scope.currentQuestionIndex + 1;
		} else {
			showMessage('Wrong answer, you must start all over again.', 'danger');
			$scope.currentQuestionIndex = 0;
		}
	};
}