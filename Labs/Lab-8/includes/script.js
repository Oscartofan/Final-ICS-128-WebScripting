$(document).ready(function () {
    // Hide quiz form and results initially
    $("#quizform").hide();
    $("#results").hide();
    $("#results2").hide();

    // Show welcome screen
    $("#welcome").html(`
        <div style='background:navy;color:white;padding:20px;'>
            <h2>Welcome to the Myanmar Trivia Quiz</h2>
            <p>Please enter your name below and click on "Begin Quiz" to start</p>
            <label for='username'>Name:</label>
            <input type='text' id='username' />
            <button id='beginQuiz'>Begin Quiz</button>
        </div>
    `);

    // When Begin Quiz is clicked
    $(document).on('click', '#beginQuiz', function () {
        var name = $('#username').val().trim();
        if (name.length > 0) {
            $("#welcome").hide();
            $("#quizform").show();
            alert("Welcome " + name + "! Good luck with the quiz.");
        } else {
            alert('Please enter your name to begin.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('quizform').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        let valid = true;

        // Remove previous score messages if present
        $('#scoreTop').remove();
        $('#scoreBottom').remove();
        $('#perfectMsg').remove();

        // Calculate score
        let score = 0;
        if ($('#q1a').is(':checked')) score++;
        if ($('#q2a').is(':checked')) score++;
        if ($('#q3b').is(':checked')) score++;
        if ($('#q4a').is(':checked')) score++;

        // For question 5 (checkbox)
    let q5Correct = ['#q5a', '#q5c', '#q5d', '#q5e',]; // Brazil, Venezuela, Ecuador, Peru
    let q5Incorrect = ['#q5b', '#q5f']; // Argentina, Chile
        let q5Checked = [];
        $('input[name="q5"]:checked').each(function () {
            q5Checked.push('#' + $(this).attr('id'));
        });
        // Must have all correct checked and no incorrect checked
        if (
            q5Correct.every(id => q5Checked.includes(id)) &&
            q5Checked.length === q5Correct.length &&
            q5Incorrect.every(id => !q5Checked.includes(id))
        ) {
            score++;
        }

        // Show score above first question
        var scoreMsg = $(`<span id='scoreTop' style='color:red;font-weight:bold;display:none;'>You scored ${score} out of 5</span>`);
        $(".question-group:first").prepend(scoreMsg);
        scoreMsg.fadeIn(3000);

        // Show score below submit button
        var scoreDiv = `<br><div style='background:yellow;'><h3 style='color:red;'>You scored ${score} out of 5</h3></div>`;
        if ($("#results2").length) {
            $("#results2").css('display', 'block').html(scoreDiv);
        }

        // If perfect score, show flashing message below
        if (score === 5) {
            setTimeout(function () {
                var userName = '';
                if ($('#username').length) {
                    userName = $('#username').val().trim();
                } else {
                    var welcomeText = $('#welcome').text();
                    var match = welcomeText.match(/Welcome (\w+)/);
                    if (match) userName = match[1];
                }

                var perfectMsg = $(`<div id='perfectMsg' style='background:yellow;'><h3 style='color:red;'>RESULTS${userName ? ' for ' + userName : ''}: Perfect! You scored 5 out of 5!</h3></div>`);
                $("#results2").append(perfectMsg);

                let flashes = 0;
                function flash() {
                    if (flashes < 6) {
                        perfectMsg.fadeOut(150).fadeIn(150);
                        flashes++;
                        setTimeout(flash, 300);
                    }
                }
                flash();
            }, 3200);
        }
    });

    // Initialize the quiz
    $(function () {
        // This object stores the correct answer for each question
        const correctAnswers = {
            1: '#q1a', // Question 1
            2: '#q2a', // Question 2
            3: '#q3b', // Question 3
            4: '#q4a', // Question 4
            5: ['#q5a', '#q5c', '#q5d', '#q5e'] // Question 5
        };

        // This function shows the hint and highlights the correct answer(s)
        function showHintAndHighlight(element) {
            let hintSelector = $(element).data('hint');
            $(hintSelector).fadeIn(400);

            let parentDiv = $(element).closest('.question-group');
            let qNum = parentDiv.attr('id').replace('question', '');

            if (qNum == '5') {
                let ids = correctAnswers[5];
                for (let i = 0; i < ids.length; i++) {
                    $(ids[i]).addClass('highlight-answer');
                }
            } else {
                $(correctAnswers[qNum]).addClass('highlight-answer');
            }
        }

        // This function hides the hint and removes the highlight
        function hideHintAndUnhighlight(element) {
            var hintSelector = $(element).data('hint');
            $(hintSelector).fadeOut(400);
            $('.highlight-answer').removeClass('highlight-answer');
        }

        // When you mouse over the [HINT] link, show the hint and highlight
        $('.hint-link').on('mouseenter', function () {
            showHintAndHighlight(this);
        });

        // When you mouse out, hide the hint and remove highlight
        $('.hint-link').on('mouseleave', function () {
            hideHintAndUnhighlight(this);
        });
    });
});
