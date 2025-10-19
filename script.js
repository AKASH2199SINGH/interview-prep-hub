document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const skill = body.dataset.skill;
    
    if (skill && interviewData[skill]) {
        const categoryTitle = document.getElementById('category-title');
        const questionsList = document.getElementById('questions-list');

        if (categoryTitle) {
            categoryTitle.textContent = skill;
        }

        if (questionsList) {
            const questions = interviewData[skill];
            let html = '';
            questions.forEach((item, index) => {
                html += `
                    <div class="question-item">
                        <button class="question-title w-full text-left p-4 rounded-lg flex justify-between items-center transition-colors">
                            <span class="font-semibold">${index + 1}. ${item.q}</span>
                            <svg class="w-6 h-6 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="answer-content overflow-hidden max-h-0 transition-max-height duration-500 ease-in-out">
                            <div class="p-4 pt-0">
                                ${item.a}
                            </div>
                        </div>
                    </div>
                `;
            });
            questionsList.innerHTML = html;

            // Add event listeners for the accordion
            questionsList.querySelectorAll('.question-item').forEach(item => {
                const button = item.querySelector('.question-title');
                const answer = item.querySelector('.answer-content');
                const icon = button.querySelector('svg');

                button.addEventListener('click', () => {
                    const isOpen = answer.classList.contains('open');

                    // Close all other open answers
                    questionsList.querySelectorAll('.answer-content.open').forEach(openAnswer => {
                        if (openAnswer !== answer) {
                            openAnswer.style.maxHeight = '0px';
                            openAnswer.classList.remove('open');
                            openAnswer.closest('.question-item').querySelector('svg').classList.remove('rotate-180');
                            openAnswer.closest('.question-item').querySelector('.question-title').classList.remove('active');
                        }
                    });

                    if (isOpen) {
                        answer.style.maxHeight = '0px';
                        answer.classList.remove('open');
                        icon.classList.remove('rotate-180');
                        button.classList.remove('active');
                    } else {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.classList.add('open');
                        icon.classList.add('rotate-180');
                        button.classList.add('active');
                    }
                });
            });
        }
    }
});

