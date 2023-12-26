fetch('https://quiz-rmlg.onrender.com/questions')
    .then(resp => resp.json())
    .then(data => {

        const container = document.querySelector('.container')

        const questions = document.getElementById('question')
        const questions_numbers = document.querySelector('.questions_numbers')
        const quesiton_number = document.querySelector('.quesiton_number')

        const selectTextA = document.querySelector('#select_a p')
        const selectTextB = document.querySelector('#select_b p')
        const selectTextC = document.querySelector('#select_c p')
        const selectTextD = document.querySelector('#select_d p')

        const selectText = document.querySelectorAll('.select')
        const submit = document.getElementById('submit')

        const timer = document.querySelector('.time')

        const progresBar = document.querySelector('.progresBar')


        const startQuiz = document.getElementById('start')
        startQuiz.addEventListener('click', function () {
            document.querySelector('.firstContainer').style.display = 'none'
            container.style.display = 'flex'
            run()
        })

        let score = 0
        timer.textContent = 20
        let numQuesition = Math.floor(Math.random() * 548) //rastgele bir soru ve şıklarını getirmek için
        let numQuesitionText = 0

        function run() {
            firsQuestion()

            // ilk sorunun getirilmesi
            function firsQuestion() {
                questions_numbers.innerText = numQuesitionText + 1 + '/' + '20'
                quesiton_number.innerText = numQuesitionText + 1

                questions.innerText = data[numQuesition].question

                selectTextA.innerText = data[numQuesition].A
                selectTextB.innerText = data[numQuesition].B
                selectTextC.innerText = data[numQuesition].C
                selectTextD.innerText = data[numQuesition].D

                selectText.forEach((text) => {
                    text.addEventListener('click', () => {
                        disabledSelect()
                        text.classList.toggle('active')
                        submit.classList.add('activeSubmit')
                    })
                })
            }

            //tıklanılan ilk seçeneğin kaldırılması
            function disabledSelect() {
                selectText.forEach((text) => {
                    text.classList.remove('active')
                })
            }

            //yeni soru gelince tüm seçeneklerden doğru ve yanlış renklerinin kaldırılması
            function disabledCorrectWrong() {
                selectText.forEach((text) => {
                    text.classList.remove('correct')
                    text.classList.remove('wrong')
                })
            }

            // seçilen seçeneğin doğru ve yanlış olması durumunda yapılacaklar
            function selectCorrect() {
                selectText.forEach((text) => {
                    if (text.classList.contains('active')) {
                        if (text.children[0].textContent == data[numQuesition].answer) {
                            score++
                            document.querySelector('.correctAudio').play()
                        } else {
                            document.querySelector('.wrongAudio').play()
                        }
                    }
                })
            }

            //seçenek onaylandıktan sonra veya süre bittikten sonra doğru ve yanlış seçeneklerin gösterilmesi
            function showSelect() {
                selectText.forEach((text) => {
                    if (text.children[0].textContent == data[numQuesition].answer) {
                        text.classList.add('correct')
                    } else {
                        text.classList.add('wrong')
                    }
                })
            }

            //belirlenen soru adedi bittikten sonra gösterilecek ekran
            function finish() {
                if (quesiton_number.innerText > 20) {
                    document.querySelector('.scoreText').textContent = `${score}  / 20 `
                    container.style.display = 'none'
                    document.querySelector('.finishContainer').style.display = 'flex'
                }
            }

            //seçenek onaylandıktan sonra tüm şıkların seçilemez olması
            function disabledAllTrue() {
                selectText.forEach((text) => {
                    text.disabled = true
                    submit.disabled = true
                })
            }

            //yeni soru gelince tüm seçeneklerin aktif olması
            function disabledAllFalse() {
                selectText.forEach((text) => {
                    text.disabled = false
                    submit.disabled = false
                })
            }

            //seçeneklerin gösterilmesine belli bir süre atamak için oluşturulan function
            function showSelected() {
                showSelect()
                disabledSelect()
            }

            //yeni soruya geçmeden önce belirli bir süre ekranda gözükecekler
            function timeoutLastQuestion() {
                numQuesitionText++
                numQuesition = Math.floor(Math.random() * 548)
                submit.classList.remove('activeSubmit')
                firsQuestion()
                disabledCorrectWrong()

                timer.textContent = 20
                interval = setInterval(intTime, 1000)

                disabledAllFalse()
            }

            //butona tıklandığında seçenekten onay alınması ve sürelerin aktif edilmesi
            submit.addEventListener('click', function () {
                setTimeout(selectCorrect, 1000)
                setTimeout(showSelected, 1000)
                setTimeout(timeoutLastQuestion, 3000)
                clearInterval(interval)
                setTimeout(finish, 3000)
                disabledAllTrue()
            })

            let interval = setInterval(intTime, 1000)

            //her soru için belirlenen sürenin tamamlanması durumunda yapılacaklar
            function intTime() {
                timer.textContent--
                if (screen.width > 720) {
                    progresBar.style.width = 80 * ((timer.textContent) / 20) + '%'
                    if (timer.textContent > 5) {
                        progresBar.style.backgroundColor = "#1be010"
                        progresBar.style.width = 80 * ((timer.textContent) / 20) + '%'
                    } else {
                        progresBar.style.backgroundColor = "#C8141D"
                        progresBar.style.width = 80 * ((timer.textContent) / 20) + '%'
                    }
                } else {
                    progresBar.style.width = 68 * ((timer.textContent) / 20) + '%'
                    if (timer.textContent > 5) {
                        progresBar.style.backgroundColor = "#1be010"
                        progresBar.style.width = 68 * ((timer.textContent) / 20) + '%'
                    } else {
                        progresBar.style.backgroundColor = "#C8141D"
                        progresBar.style.width = 68 * ((timer.textContent) / 20) + '%'
                    }
                }

                if (timer.textContent < 1) {
                    clearInterval(interval)
                    setTimeout(showSelected, 1000)
                    setTimeout(timeoutLastQuestion, 3000)
                    setTimeout(finish, 3000)
                }

            }
        }

        const playAgain = document.querySelector('.play_again')
        const newQuiz = document.querySelector('.new_quiz')

        newQuiz.addEventListener('click', function () {
            location.reload()
        })


    })

