let flipped = false;

function flip() {
    $('.card').toggleClass('flipped');
    flipped = !flipped;
    console.log("executed");
}


function execute(words, synonyms, meanings, csfr_token) {
    window.onload = function () {
        function displayResult() {
            if (flipped) {
                flip();
            }
            $('.word-style').empty();
            $('#word-name').html("Flip For Score!");
            $('#word-name-mobile').html("Flip For Score!");
            $('.back-score').css('-webkit-margin-start', '75px');
            $('.btn-success').prop('disabled', 'true');
            $('.btn-danger').prop('disabled', 'true');
            var delayInMilliseconds = 1000;
            setTimeout(function () {
                $('.back-score').css('-webkit-margin-before', '100px');
                percentage = Math.round(score / words.length * 100);
                console.log(percentage);
                $('.back-score-list').empty();
                if (percentage <= 20) {
                    $('.back-head').text("Ignominious!");
                    $('.back-desc').html(
                        "Seems you gave this test perfunctorily. You need a lot of practice." +
                        "But it is fine, it is always better to start late than never.<br>Good Luck!");
                    $('.back-score').text("Score: " + score + "/" + words.length);
                } else if (percentage > 20 && percentage <= 40) {
                    $('.back-head').text("Prosaic");
                    $('.back-desc').html(
                        "You'll need to practise vocabulary more" +
                        " religiously or you'll remain a dilettante. Hope you do a lot better" +
                        " in your next attempt.<br>Good Luck!");
                    $('.back-score').text("Score: " + score + "/" + words.length);
                } else if (percentage > 40 && percentage <= 90) {
                    $('.back-head').text("Approbatory");
                    $('.back-desc').html(
                        "Great! If you remain inexorable in your quest to improve your vocabulary," +
                        " you are bound to reach great heights. Keep trying until you get a perfect" +
                        " score .<br>Good Luck!"
                    );
                    $('.back-score').text("Score: " + score + "/" + words.length);
                } else {
                    $('.back-head').text("Stupendous!!");
                    $('.back-desc').html(
                        "That is one battle won. Revise the words you learn regularly and you'll win the" +
                        " war that will ultimately make you a vocabulary cognoscenti.<br>Good Luck!"
                    );
                    $('.back-score').text("Score: " + score + "/" + words.length);
                }
            }, delayInMilliseconds);
            $('.btn-info').text('Retake the test').prop('href', '.');
        }

        function loadNextWord(word) {
            $.ajax({
                type: 'POST',
                url: '',
                data: {
                    'csrfmiddlewaretoken': csfr_token,
                    'current_word': word,
                },
                beforeSend: function () {
                    $('#word-name').html("Loading..");
                    $('#word-name-mobile').html("Loading..");
                    $('.btn-success').prop('disabled', 'true');
                    $('.btn-danger').prop('disabled', 'true');
                    $('.btn-info').addClass('disabled');
                    if (flipped) {
                        flip();
                    }
                },
                success: function (context) {
                    let meanings = context.meanings;
                    let synonyms = context.synonyms;
                    console.log(meanings);
                    $('.btn-success').removeAttr('disabled');
                    $('.btn-danger').removeAttr('disabled');
                    $('.btn-info').removeClass('disabled');
                    $('.btn-info').prop('href', 'https://www.dictionary.com/browse/' + word + '#wordOrigin');
                    word_counter += 1;
                    $('.word-style').html("<span style='color: #8e3d00'>" + word_counter.toString() + "</span>"
                        + "/" + words.length);
                    $('#word-name').html(words[word_counter - 1]);
                    $('#word-name-mobile').html(words[word_counter - 1]);
                    $('.back-desc').html(meanings);
                    $('.back-score-list').empty();
                    var list = document.createElement('ul');
                    for (var i = 0; i < synonyms.length; i++) {
                        // Create the list item:
                        var item = document.createElement('li');

                        // Set its contents:
                        item.appendChild(document.createTextNode(synonyms[i]));

                        // Add it to the list:
                        list.appendChild(item);
                    }
                    $('.back-score-list').append(list)
                },
                error: function (jqXHR, exception) {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500]';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted';
                    } else {
                        msg = 'Uncaught Error\n' + jqXHR.responseText;
                    }
                    console.log(msg);
                    alert(msg + " processing the word " + word.toLowerCase() + ". Please try again later!")
                },
            });
        }

        let word_counter = 1;
        let score = 0;
        console.log(words);
        console.log(words.length);
        $('.word-style').html("<span style='color: #8e3d00'>" + word_counter.toString() + "</span>"
            + "/" + words.length);
        $('#word-name').html(words[0]);
        $('#word-name-mobile').html(words[0]);
        $('.back-desc').html(meanings);
        var list = document.createElement('ul');
        for (var i = 0; i < synonyms.length; i++) {
            // Create the list item:
            var item = document.createElement('li');

            // Set its contents:
            item.appendChild(document.createTextNode(synonyms[i]));

            // Add it to the list:
            list.appendChild(item);
        }
        $('.back-score-list').append(list);
        $('.btn-info').prop('href', 'https://www.dictionary.com/browse/' + words[0] + '#wordOrigin');
        $('.img-info').prop('href', 'https://www.dictionary.com/browse/' + words[0] + '#wordOrigin');
        $('.btn-success').click(function () {
            score += 1;
            if (word_counter < words.length) {
                loadNextWord(words[word_counter])
            } else {
                displayResult()
            }
        });
        $('.btn-danger').click(function () {
            $('.btn-success').prop('disabled', 'true');
            $('.btn-danger').prop('disabled', 'true');
            if (!flipped) {
                flip();
                console.log("working");
                var timer = 9;
                setTimeout(countDown,1000);
                function countDown(){
                    timer--;
                    if(timer > 0){
                        setTimeout(countDown,1000);
                    } else {
                        if (word_counter < words.length) {
                            loadNextWord(words[word_counter])
                        } else {
                            displayResult()
                        }
                    }
                    $('.word-style').html("Next word in "+timer);
                    console.log(timer);
                }
            } else {
                var timer = 9;
                setTimeout(countDown,1000);
                function countDown(){
                    timer--;
                    if(timer > 0){
                        setTimeout(countDown,1000);
                    } else {
                        if (word_counter < words.length) {
                            loadNextWord(words[word_counter])
                        } else {
                            displayResult()
                        }
                    }
                    $('.word-style').html("Next word in "+timer);
                    console.log(timer);
                }
            }
        });
    }
}