/* global $ */
(function() {
	'use strict';

	var PRICES = {
			'JaviIsTheBest': 'a price'
		},
		QUESTIONNAIRE_ANSWERS = {
			'question-0': 'darth-vader',
			'question-1': 'shot-in-the-head',
			'question-2': 'kokiri'
		},
		CURRENT_QUESTION_INDEX = 0,
		MAX_QUESTION_INDEX = $('.question').length - 1;

	/**
	 * Disable inputs and buttons for a given `parent`.
	 *
	 * @param parent
	 */
	var disableInputs = function(parent) {
		$(parent + ' input, ' + parent + ' button').prop('disabled', true);
	};

	/**
	 * Shows an alert or success message.
	 *
	 * @param message
	 * @param status
	 */
	var showMessage = function(message, status) {
		$('.alert').hide();
		if (status === 'success') {
			$('#code-success').text(message).show();
			disableInputs('.jumbotron');
			$('#questionnaire').delay(1000).fadeIn(400);
		} else {
			$('#code-error').text(message).show();
		}
		$('.alert').delay(2000).fadeOut(400);
	};

	/**
	 * If there are questions left to answer, shows the next question.
	 */
	var showNextQuestion = function() {
		if (CURRENT_QUESTION_INDEX < MAX_QUESTION_INDEX) {
			CURRENT_QUESTION_INDEX = CURRENT_QUESTION_INDEX + 1;
			$('.question-' + CURRENT_QUESTION_INDEX).fadeIn(400);
		} else {
			disableInputs('');
			$('#price').fadeIn();
		}
	};

	/**
	 * Initializes the current question counter to 0 and start the questionnaire.
	 */
	var resetQuestionnaire = function() {
		CURRENT_QUESTION_INDEX = 0;
		$('.question').hide();
		$('input[type=radio]').prop('checked', '');
		$('.question-0').fadeIn(400);
	};

	/**
	 * Listen clicks on `Redeem a code`.
	 */
	$('#redeem-code').click(function() {
		var inputId = $(this).data('input-id'),
			code = $('#' + inputId).val();

		if (PRICES[code] !== undefined) {
			showMessage('Congrats, you won ' + PRICES[code], 'success');
		} else if (code === '') {
			showMessage('You must type in a code!');
		} else {
			showMessage('Congrats, you won an incredible pair of NOTHING');
		}
	});

	/**
	 * Listen clicks on `continue` questionnaire buttons.
	 */
	$('#questionnaire .questionnaire-btn').click(function() {
		var questionId = $(this).data('question-id'),
			checkedValue = $('input[name=' + questionId + ']:checked').val();

		if (QUESTIONNAIRE_ANSWERS[questionId] === checkedValue) {
			showNextQuestion();
		} else {
			showMessage('Wrong answer, you must start all over again.');
			resetQuestionnaire();
		}
	});
})();