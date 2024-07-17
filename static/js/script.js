/*document.addEventListener('DOMContentLoaded', event => {
	const shapes = document.querySelectorAll('.shape')
	const targets = document.querySelectorAll('.target')
	const initialParent = document.getElementById('shapes-container') // Исходный контейнер для фигур

	shapes.forEach(shape => {
		shape.addEventListener('dragstart', dragStart)
		shape.addEventListener('click', returnToInitialPosition)
	})

	targets.forEach(target => {
		target.addEventListener('dragover', dragOver)
		target.addEventListener('dragenter', dragEnter)
		target.addEventListener('dragleave', dragLeave)
		target.addEventListener('drop', drop)
	})

	function dragStart(e) {
		e.dataTransfer.setData('text/plain', e.target.id)
		setTimeout(() => e.target.classList.add('hide'), 0)
	}

	function dragOver(e) {
		e.preventDefault()
	}

	function dragEnter(e) {
		e.preventDefault()
		if (!e.target.classList.contains('occupied')) {
			e.target.classList.add('hovered')
		}
	}

	function dragLeave(e) {
		e.target.classList.remove('hovered')
	}

	function drop(e) {
		e.target.classList.remove('hovered')

		const id = e.dataTransfer.getData('text/plain')
		const draggableElement = document.getElementById(id)
		const dropzone = e.target

		if (!dropzone.classList.contains('occupied')) {
			dropzone.appendChild(draggableElement)
			dropzone.classList.add('occupied')
		}

		draggableElement.classList.remove('hide')
	}

	function returnToInitialPosition(e) {
		const shape = e.target
		const currentParent = shape.parentElement

		if (currentParent !== initialParent) {
			initialParent.appendChild(shape)
			currentParent.classList.remove('occupied')
		}
	}
})

function sendResultsToServer() {
	const targets = document.querySelectorAll('.target')
	const results = Array.from(targets).map(target => {
		return {
			targetId: target.id,
			shapeId: target.children[0] ? target.children[0].id : null,
		}
	})

	fetch('/check', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ results }),
	})
		.then(response => response.json())
		.then(data => {
			alert(data.message) // Вывод сообщения от сервера
		})
		.catch(error => {
			console.error('Error:', error)
		})
}
*/
function showResult() {
    let totalQuestions = 0;
    let score = 0;
    let incorrectAnswers = [];

    // Проверяем ответы
    let question1Answer = document.querySelector('input[name="question1"]:checked');
    if (question1Answer && question1Answer.value === "a") {
        score += 1;
    } else {
        incorrectAnswers.push("Вопрос 1");
    }
    totalQuestions++;

    let question2Answer = document.querySelector('input[name="question2"]:checked');
    if (question2Answer && question2Answer.value === "b") {
        score += 1;
    } else {
        incorrectAnswers.push("Вопрос 2");
    }
    totalQuestions++;

    let question3Answer = document.querySelector('input[name="question3"]:checked');
    if (question3Answer && question3Answer.value === "c") {
        score += 1;
    } else {
        incorrectAnswers.push("Вопрос 3");
    }
    totalQuestions++;

    let question4Answer=document.querySelector('input[name="question4"]:checked');
    if (question4Answer && question4Answer.value==="d"){
        score+=1;
    } else {
        incorrectAnswers.push("Вопрос 4");
    }
    totalQuestions++;

    // Отображаем результат
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h2>Результат:</h2>";
    resultDiv.innerHTML += "<p>Вы набрали " + score + " из " + totalQuestions + " баллов.</p>";
    resultDiv.innerHTML += "<p>Максимальный балл: " + totalQuestions + ".</p>";

    // Подсвечиваем неверные ответы красным
    for (let i = 0; i < incorrectAnswers.length; i++) {
        let question = incorrectAnswers[i];
        let questionElement = document.getElementById(question);
        questionElement.classList.add("incorrect");
    }
}