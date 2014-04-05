var stoLat = angular.module('stoLat', []);

stoLat.factory('Data', function() {
	return {
		correctCode: 'StoLatMadzia',
		questionnaireAnswers: {
			0: 'darth-vader',
			1: 'shot-in-the-head',
			2: 'kokiri',
			3: '1',
			4: 'merry-pippin'
		}
	}
});

function StoLatCtrl($scope, $timeout, Data) {
	$scope.data = Data;
	$scope.codeCorrect = false;
	$scope.showPrice = false;
	$scope.currentQuestionIndex = 0;

	/**
	 * Show a bootstrap message for 3 seconds with a provided status.
	 *
	 * @param message
	 * @param status
	 */
	var showMessage = function(message, status) {
		$scope.message = message;
		$scope.messageClass = 'alert alert-' + status;
		$timeout.cancel($scope.timer);
		$scope.timer = $timeout(clearMessages, 3000);
	};

	/**
	 * Clean the messages.
	 */
	var clearMessages = function() {
		$scope.message = '';
		$scope.messageClass = '';
	};

	/**
	 * Check provided code. If correct, show the questionnaire.
	 */
	$scope.checkCode = function() {
		if ($scope.code === $scope.data.correctCode) {
			showMessage('Congratulations! You won a price.', 'success');
			$scope.codeCorrect = true;
		} else {
			$scope.code = '';
			showMessage('Congratulations! You won a pair of NOTHING.', 'danger');
		}
	};

	/**
	 * Check if provided answer is correct. If it's correct, increments `currentQuestionIndex`.
	 *
	 * @param answer
	 * @param questionId
	 */
	$scope.checkQuestion = function(answer, questionId) {
		if (answer === $scope.data.questionnaireAnswers[questionId]) {
			$scope.currentQuestionIndex = $scope.currentQuestionIndex + 1;
		} else {
			showMessage('Wrong answer, you must start all over again.', 'danger');
			$scope.currentQuestionIndex = 0;
		}
	};
}