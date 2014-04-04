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
		MAX_QUESTION_INDEX = 2;

	var showMessage = function(message, status) {
		$('.alert').hide();
		if (status === 'success') {
			$('#code-success').text(message).show();
			$('#questionnaire').delay(1000).fadeIn(400);
		} else {
			$('#code-error').text(message).show();
		}
		$('.alert').delay(1000).fadeOut(400);
	};

	var showNextQuestion = function() {
		if (CURRENT_QUESTION_INDEX < MAX_QUESTION_INDEX) {
			CURRENT_QUESTION_INDEX = CURRENT_QUESTION_INDEX + 1;
			$('.question-' + CURRENT_QUESTION_INDEX).fadeIn(400);
		} else {
			$('input, button').prop('disabled', true);
			$('#price').fadeIn();
		}
	};

	var resetQuestionnaire = function() {
		CURRENT_QUESTION_INDEX = 0;
		$('.question').hide();
		$('input[type=radio]').prop('checked', '');
		$('.question-0').fadeIn(400);
	};

	// First stage, listen for a code.
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

	// Second stage, questionnaire
	$('#questionnaire .questionnaire-btn').click(function() {
		var questionId = $(this).data('question-id'),
			checkedValue = $('input[name=' + questionId + ']:checked').val();

//		debugger;
		console.log(checkedValue);
		console.log(questionId);
		console.log(QUESTIONNAIRE_ANSWERS[questionId]);
		console.log(QUESTIONNAIRE_ANSWERS[questionId] === checkedValue);
		if (QUESTIONNAIRE_ANSWERS[questionId] === checkedValue) {
			showNextQuestion();
		} else {
			showMessage('Wrong answer, you must start all over again.');
			resetQuestionnaire();
		}
	});
})();