// Simple Working Games for RuralEdu Kids

// Game Modal Functions
function showGame(title, content) {
    document.getElementById('gameTitle').textContent = title;
    document.getElementById('gameContent').innerHTML = content;
    document.getElementById('gameModal').style.display = 'flex';
}

function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
}

// Math Game - Enhanced with Fractions, Times Tables, Division, and Algebra
function startMathGame() {
    let score = 0;
    let currentQuestion = 1;
    const totalQuestions = 15; // Increased to accommodate more question types including calculus
    
    function generateQuestion() {
        let selectedType;
        // Question 15 is always a special challenge
        if (currentQuestion === 15) {
            selectedType = 'wordProblem';
        } else {
            const questionTypes = ['addition', 'subtraction', 'multiplication', 'division', 'fraction', 'timesTable', 'placeValue', 'money', 'time', 'geometry'];
            selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        }
        
        let question, answer, options;
        
        switch(selectedType) {
            case 'addition':
                const addType = Math.random();
                if (addType < 0.7) {
                    // Regular addition with larger numbers
                    const num1 = Math.floor(Math.random() * 100) + 50;
                    const num2 = Math.floor(Math.random() * 100) + 50;
                    answer = num1 + num2;
                    question = `${num1} + ${num2} = ?`;
                } else {
                    // Three number addition
                    const num1 = Math.floor(Math.random() * 50) + 25;
                    const num2 = Math.floor(Math.random() * 50) + 25;
                    const num3 = Math.floor(Math.random() * 50) + 25;
                    answer = num1 + num2 + num3;
                    question = `${num1} + ${num2} + ${num3} = ?`;
                }
                options = generateOptions(answer, 3);
                break;
                
            case 'subtraction':
                const subType = Math.random();
                if (subType < 0.7) {
                    // Regular subtraction with larger numbers
                    const num3 = Math.floor(Math.random() * 100) + 100;
                    const num4 = Math.floor(Math.random() * (num3 - 50)) + 25;
                    answer = num3 - num4;
                    question = `${num3} - ${num4} = ?`;
                } else {
                    // Subtraction with borrowing
                    const num3 = Math.floor(Math.random() * 50) + 100;
                    const num4 = Math.floor(Math.random() * 50) + 60;
                    answer = num3 - num4;
                    question = `${num3} - ${num4} = ?`;
                }
                options = generateOptions(answer, 3);
                break;
                
            case 'multiplication':
                const num5 = Math.floor(Math.random() * 12) + 2;
                const num6 = Math.floor(Math.random() * 12) + 2;
                answer = num5 * num6;
                question = `${num5} × ${num6} = ?`;
                options = generateOptions(answer, 3);
                break;
                
            case 'division':
                const dividend = Math.floor(Math.random() * 12) + 2;
                const divisor = Math.floor(Math.random() * 12) + 2;
                const product = dividend * divisor;
                answer = dividend;
                question = `${product} ÷ ${divisor} = ?`;
                options = generateOptions(answer, 3);
                break;
                
            case 'fraction':
                const numerator = Math.floor(Math.random() * 8) + 1;
                const denominator = Math.floor(Math.random() * 8) + 2;
                if (numerator < denominator) {
                    answer = `${numerator}/${denominator}`;
                    question = `What fraction represents ${numerator} out of ${denominator}?`;
                    options = generateFractionOptions(numerator, denominator);
                } else {
                    // Mixed number
                    const whole = Math.floor(numerator / denominator);
                    const remainder = numerator % denominator;
                    if (remainder === 0) {
                        answer = whole.toString();
                        question = `${numerator} ÷ ${denominator} = ?`;
                        options = generateOptions(whole, 3);
                    } else {
                        answer = `${whole} ${remainder}/${denominator}`;
                        question = `${numerator} ÷ ${denominator} = ? (as mixed number)`;
                        options = generateMixedNumberOptions(whole, remainder, denominator);
                    }
                }
                break;
                
            case 'timesTable':
                const base = Math.floor(Math.random() * 12) + 2;
                const multiplier = Math.floor(Math.random() * 12) + 1;
                answer = base * multiplier;
                question = `${base} × ${multiplier} = ?`;
                options = generateOptions(answer, 3);
                break;
                
            case 'placeValue':
                const patternType = Math.random();
                if (patternType < 0.33) {
                    // Number sequence pattern
                    const start = Math.floor(Math.random() * 20) + 10;
                    const pattern = Math.floor(Math.random() * 5) + 2;
                    const sequence = [start, start + pattern, start + pattern * 2, start + pattern * 3];
                    const missingIndex = Math.floor(Math.random() * 4);
                    answer = sequence[missingIndex];
                    sequence[missingIndex] = '?';
                    question = `What number comes next in this pattern: ${sequence.join(', ')}?`;
                } else if (patternType < 0.66) {
                    // Place value with operations
                    const num1 = Math.floor(Math.random() * 90) + 10;
                    const num2 = Math.floor(Math.random() * 90) + 10;
                    const operation = Math.random() > 0.5 ? '+' : '-';
                    if (operation === '+') {
                        answer = num1 + num2;
                        question = `What is ${num1} + ${num2}?`;
                    } else {
                        answer = num1 - num2;
                        question = `What is ${num1} - ${num2}?`;
                    }
                } else {
                    // Missing number in equation
                    const num1 = Math.floor(Math.random() * 20) + 5;
                    const num2 = Math.floor(Math.random() * 20) + 5;
                    const operation = Math.random() > 0.5 ? '+' : '×';
                    if (operation === '+') {
                        answer = num1 + num2;
                        question = `${num1} + ? = ${answer}`;
                    } else {
                        answer = num2;
                        question = `${num1} × ? = ${num1 * num2}`;
                    }
                }
                options = generateOptions(answer, 3);
                break;
                
            case 'money':
                const moneyType = Math.random();
                if (moneyType < 0.33) {
                    // Multiple items with total
                    const item1 = Math.floor(Math.random() * 15) + 5;
                    const item2 = Math.floor(Math.random() * 20) + 10;
                    const item3 = Math.floor(Math.random() * 25) + 15;
                    answer = item1 + item2 + item3;
                    question = `A book costs $${item1}, a toy costs $${item2}, and a game costs $${item3}. How much do all three items cost together?`;
                } else if (moneyType < 0.66) {
                    // Change calculation
                    const cost = Math.floor(Math.random() * 20) + 5;
                    const paid = Math.floor(Math.random() * 10) + cost + 5;
                    answer = paid - cost;
                    question = `If something costs $${cost} and you pay with $${paid}, how much change will you get back?`;
                } else {
                    // Discount calculation
                    const originalPrice = Math.floor(Math.random() * 30) + 20;
                    const discountPercent = Math.floor(Math.random() * 4) * 5 + 10; // 10%, 15%, 20%, 25%
                    const discountAmount = Math.round(originalPrice * discountPercent / 100);
                    answer = originalPrice - discountAmount;
                    question = `A shirt costs $${originalPrice}. It's on sale for ${discountPercent}% off. What is the sale price?`;
                }
                options = generateOptions(answer, 3);
                break;
                
            case 'time':
                const timeType = Math.random();
                if (timeType < 0.33) {
                    // Time difference
                    const hour1 = Math.floor(Math.random() * 6) + 8; // 8 AM to 1 PM
                    const hour2 = hour1 + Math.floor(Math.random() * 4) + 2; // 2-5 hours later
                    const minute1 = Math.floor(Math.random() * 60);
                    const minute2 = Math.floor(Math.random() * 60);
                    const time1 = `${hour1}:${minute1.toString().padStart(2, '0')} AM`;
                    const time2 = `${hour2}:${minute2.toString().padStart(2, '0')} PM`;
                    const diffHours = hour2 - hour1;
                    const diffMinutes = minute2 - minute1;
                    answer = diffHours * 60 + diffMinutes;
                    if (answer < 0) answer += 60;
                    question = `How many minutes are there between ${time1} and ${time2}?`;
                } else if (timeType < 0.66) {
                    // Elapsed time
                    const startHour = Math.floor(Math.random() * 6) + 9; // 9 AM to 2 PM
                    const startMinute = Math.floor(Math.random() * 60);
                    const elapsedHours = Math.floor(Math.random() * 3) + 1;
                    const elapsedMinutes = Math.floor(Math.random() * 60);
                    const totalElapsed = elapsedHours * 60 + elapsedMinutes;
                    const endHour = startHour + elapsedHours;
                    const endMinute = startMinute + elapsedMinutes;
                    answer = totalElapsed;
                    question = `If you start at ${startHour}:${startMinute.toString().padStart(2, '0')} AM and finish at ${endHour}:${endMinute.toString().padStart(2, '0')} PM, how many minutes did it take?`;
                } else {
                    // Time word problem
                    const movieLength = Math.floor(Math.random() * 60) + 90; // 90-150 minutes
                    const startTime = Math.floor(Math.random() * 6) + 7; // 7 PM to 12 AM
                    const endHour = startTime + Math.floor(movieLength / 60);
                    const endMinute = movieLength % 60;
                    answer = `${endHour}:${endMinute.toString().padStart(2, '0')} PM`;
                    question = `A movie starts at ${startTime}:00 PM and is ${movieLength} minutes long. What time does it end?`;
                }
                options = generateTimeOptions(answer, 3);
                break;
                
            case 'geometry':
                const geometryType = Math.random();
                if (geometryType < 0.33) {
                    // Perimeter calculation
                    const length = Math.floor(Math.random() * 10) + 5;
                    const width = Math.floor(Math.random() * 10) + 5;
                    answer = 2 * (length + width);
                    question = `A rectangle has a length of ${length} units and width of ${width} units. What is its perimeter?`;
                } else if (geometryType < 0.66) {
                    // Area calculation
                    const side = Math.floor(Math.random() * 8) + 3;
                    answer = side * side;
                    question = `A square has sides of ${side} units. What is its area?`;
                } else {
                    // Shape properties with counting
                    const shapes = ['triangle', 'square', 'rectangle', 'pentagon', 'hexagon'];
                    const shape = shapes[Math.floor(Math.random() * shapes.length)];
                    const sides = { 'triangle': 3, 'square': 4, 'rectangle': 4, 'pentagon': 5, 'hexagon': 6 };
                    const vertices = sides[shape];
                    answer = vertices;
                    question = `How many vertices (corners) does a ${shape} have?`;
                }
                options = generateOptions(answer, 3);
                break;
                
            case 'wordProblem':
                const problemType = Math.random();
                if (problemType < 0.25) {
                    // Multi-step addition with subtraction
                    const apples = Math.floor(Math.random() * 15) + 10;
                    const oranges = Math.floor(Math.random() * 15) + 10;
                    const bananas = Math.floor(Math.random() * 10) + 5;
                    const eaten = Math.floor(Math.random() * 10) + 5;
                    answer = apples + oranges + bananas - eaten;
                    question = `Sarah has ${apples} apples, ${oranges} oranges, and ${bananas} bananas. If she eats ${eaten} fruits, how many does she have left?`;
                } else if (problemType < 0.5) {
                    // Division with remainder
                    const total = Math.floor(Math.random() * 20) + 20;
                    const groups = Math.floor(Math.random() * 5) + 3;
                    answer = Math.floor(total / groups);
                    question = `If ${total} students need to be divided into ${groups} equal groups, how many students will be in each group?`;
                } else if (problemType < 0.75) {
                    // Mixed operations with money
                    const allowance = Math.floor(Math.random() * 20) + 10;
                    const spent = Math.floor(Math.random() * 15) + 5;
                    const earned = Math.floor(Math.random() * 10) + 5;
                    answer = allowance - spent + earned;
                    question = `Tom gets $${allowance} allowance each week. He spends $${spent} on toys and earns $${earned} doing chores. How much money does he have now?`;
                } else {
                    // Pattern with multiplication
                    const base = Math.floor(Math.random() * 5) + 2;
                    const multiplier = Math.floor(Math.random() * 8) + 3;
                    const extra = Math.floor(Math.random() * 10) + 5;
                    answer = base * multiplier + extra;
                    question = `A pattern starts with ${base} and multiplies by ${multiplier} each time, then adds ${extra}. What is the third number in the pattern?`;
                }
                options = generateOptions(answer, 3);
                break;
        }
        
        return { question, answer, options, type: selectedType };
    }
    
    function generateOptions(correctAnswer, count) {
        const options = [correctAnswer];
        
        // Generate wrong answers that are close but not too obvious
        for (let i = 0; i < count; i++) {
            let wrongAnswer;
            do {
                if (typeof correctAnswer === 'number') {
                    wrongAnswer = correctAnswer + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5 + 1);
                } else {
                    wrongAnswer = correctAnswer;
                }
            } while (options.includes(wrongAnswer) || wrongAnswer < 0);
            options.push(wrongAnswer);
        }
        
        return options.sort(() => Math.random() - 0.5);
    }
    
    function generateFractionOptions(numerator, denominator) {
        const options = [`${numerator}/${denominator}`];
        const wrong1 = `${numerator + 1}/${denominator}`;
        const wrong2 = `${numerator}/${denominator + 1}`;
        const wrong3 = `${numerator - 1}/${denominator}`;
        
        return [options[0], wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
    }
    
    function generateMixedNumberOptions(whole, remainder, denominator) {
        const options = [`${whole} ${remainder}/${denominator}`];
        const wrong1 = `${whole + 1} ${remainder}/${denominator}`;
        const wrong2 = `${whole} ${remainder + 1}/${denominator}`;
        const wrong3 = `${whole} ${remainder}/${denominator + 1}`;
        
        return [options[0], wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
    }
    
    function generateMoneyOptions(dollars, cents) {
        const options = [`$${dollars}.${cents.toString().padStart(2, '0')}`];
        const wrong1 = `$${dollars}.${(cents + 1).toString().padStart(2, '0')}`;
        const wrong2 = `$${dollars}.${(cents - 1).toString().padStart(2, '0')}`;
        const wrong3 = `$${dollars}.${(cents + 5).toString().padStart(2, '0')}`;
        
        return [options[0], wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
    }
    
    function generateTimeOptions(hour, minute, ampm) {
        const options = [`${hour}:${minute.toString().padStart(2, '0')} ${ampm}`];
        const wrong1 = `${hour}:${(minute + 1).toString().padStart(2, '0')} ${ampm}`;
        const wrong2 = `${hour}:${(minute - 1).toString().padStart(2, '0')} ${ampm}`;
        const wrong3 = `${(hour + 1).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
        
        return [options[0], wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
    }
    
    function getDifficultyHint(questionType) {
        const hints = {
            'addition': '💡 Tip: Break down large numbers or add in groups',
            'subtraction': '💡 Tip: Use number bonds or count backwards',
            'multiplication': '💡 Tip: Think of repeated addition',
            'division': '💡 Tip: How many groups can you make?',
            'fraction': '💡 Tip: Remember the top number is how many parts you have',
            'timesTable': '💡 Tip: Practice your times tables!',
            'placeValue': '💡 Tip: Look for patterns or work backwards',
            'money': '💡 Tip: Break down the problem step by step',
            'time': '💡 Tip: Convert to minutes or work with time differences',
            'geometry': '💡 Tip: Use formulas or count carefully',
            'wordProblem': '💡 Tip: Read carefully and identify the key information'
        };
        return hints[questionType] || '';
    }
    
    function showQuestion() {
        const questionData = generateQuestion();
        const { question, answer, options, type } = questionData;
        
        let questionDisplay = question;
        let operatorClass = '';
        
        // Add visual styling based on question type
        if (type === 'fraction' || type === 'algebra') {
            operatorClass = 'complex';
        } else if (type === 'timesTable') {
            operatorClass = 'times-table';
        }
        
        const content = `
            <div class="math-question">
                <h3>Question ${currentQuestion} of ${totalQuestions}</h3>
                <div class="question-type ${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="math-problem ${operatorClass}">
                    ${questionDisplay}
                </div>
                <div class="options">
                    ${options.map(option => 
                        `<button class="option-btn" onclick="checkMathAnswer('${option}', '${answer}')">${option}</button>`
                    ).join('')}
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(currentQuestion / totalQuestions) * 100}%"></div>
                </div>
                <div class="score">Score: ${score}/${totalQuestions}</div>
                <div class="difficulty-hint">
                    ${getDifficultyHint(type)}
                </div>
            </div>
        `;
        
        showGame('Math Adventure', content);
    }
    
    // Make checkMathAnswer available globally
    window.checkMathAnswer = function(selected, correct) {
        // Convert both to strings for comparison to handle mixed types
        if (String(selected) === String(correct)) {
            score++;
            showFeedback('🎉 Correct!', 'Great job!', true);
        } else {
            showFeedback('❌ Try Again', `The answer was ${correct}`, false);
        }
    };
    
    function showFeedback(title, message, isCorrect) {
        const content = `
            <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
                <h3>${title}</h3>
                <p>${message}</p>
                <button class="next-btn" onclick="nextMathQuestion()">Next Question</button>
            </div>
        `;
        
        document.getElementById('gameContent').innerHTML = content;
    }
    
    // Make nextMathQuestion available globally
    window.nextMathQuestion = function() {
        currentQuestion++;
        if (currentQuestion <= totalQuestions) {
            showQuestion();
        } else {
            showGameComplete();
        }
    };
    
    function showGameComplete() {
        const percentage = Math.round((score / totalQuestions) * 100);
        let message = '';
        let emoji = '';
        
        if (percentage === 100) {
            message = 'Perfect! You are a Math Master!';
            emoji = '👑';
        } else if (percentage >= 80) {
            message = 'Excellent! Great job!';
            emoji = '⭐';
        } else if (percentage >= 60) {
            message = 'Good job! Keep practicing!';
            emoji = '👍';
        } else {
            message = 'Keep trying! You can do it!';
            emoji = '💪';
        }
        
        const content = `
            <div class="game-complete">
                <h3>${emoji} Math Game Complete!</h3>
                <div class="final-score">Final Score: ${score}/${totalQuestions} (${percentage}%)</div>
                <p>${message}</p>
                <button class="play-again-btn" onclick="startMathGame()">Play Again</button>
                <button class="close-btn" onclick="closeGame()">Finish</button>
            </div>
        `;
        
        document.getElementById('gameContent').innerHTML = content;
    }
    
    // Start the game
    showQuestion();
}

// Word Game - Simple and Working
function startWordGame() {
    const words = ['CAT', 'DOG', 'SUN', 'MOON', 'STAR'];
    const currentWord = words[Math.floor(Math.random() * words.length)];
    const scrambledWord = currentWord.split('').sort(() => Math.random() - 0.5).join('');
    
    const content = `
        <div class="word-game">
            <h3>Unscramble the Word</h3>
            <div class="scrambled-word">${scrambledWord}</div>
            <p>Hint: It's a ${currentWord.length}-letter word</p>
            <input type="text" id="wordInput" placeholder="Enter your answer" class="word-input">
            <button class="check-btn" onclick="checkWordAnswer()">Check Answer</button>
        </div>
    `;
    
    showGame('Word Builder', content);
    
    // Make checkWordAnswer available globally
    window.checkWordAnswer = function() {
        const input = document.getElementById('wordInput').value.toUpperCase();
        const modalBody = document.getElementById('gameContent');
        
        if (input === currentWord) {
            modalBody.innerHTML = `
                <div class="feedback correct">
                    <h3>🎉 Excellent!</h3>
                    <p>You unscrambled the word correctly!</p>
                    <button class="next-btn" onclick="startWordGame()">Next Word</button>
                    <button class="close-btn" onclick="closeGame()">Finish</button>
                </div>
            `;
        } else {
            modalBody.innerHTML = `
                <div class="feedback incorrect">
                    <h3>❌ Try Again</h3>
                    <p>The word was: ${currentWord}</p>
                    <button class="next-btn" onclick="startWordGame()">Try Another</button>
                    <button class="close-btn" onclick="closeGame()">Finish</button>
                </div>
            `;
        }
    };
}

// Animal Game - Simple and Working
function startAnimalGame() {
    const animals = [
        { name: 'Lion', habitat: 'Savanna', emoji: '🦁' },
        { name: 'Dolphin', habitat: 'Ocean', emoji: '🐬' },
        { name: 'Eagle', habitat: 'Mountains', emoji: '🦅' }
    ];
    
    const currentAnimal = animals[Math.floor(Math.random() * animals.length)];
    
    const content = `
        <div class="animal-game">
            <h3>🐾 Animal Explorer</h3>
            <div class="animal-display">
                <div class="animal-emoji">${currentAnimal.emoji}</div>
                <h4>${currentAnimal.name}</h4>
                <p><strong>Habitat:</strong> ${currentAnimal.habitat}</p>
            </div>
            <div class="animal-facts">
                <h4>Fun Facts:</h4>
                <ul>
                    <li>${currentAnimal.name}s are amazing creatures!</li>
                    <li>They live in the ${currentAnimal.habitat}</li>
                    <li>Each animal is unique and special</li>
                </ul>
            </div>
            <button class="next-btn" onclick="startAnimalGame()">Learn About Another Animal</button>
            <button class="close-btn" onclick="closeGame()">Finish</button>
        </div>
    `;
    
    showGame('Animal Explorer', content);
}

// Color Game - Simple and Working
function startColorGame() {
    const colors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple'];
    const currentColor = colors[Math.floor(Math.random() * colors.length)];
    
    const content = `
        <div class="color-game">
            <h3>🎨 Color Match</h3>
            <div class="color-display">
                <div class="color-circle" style="background-color: ${currentColor.toLowerCase()}"></div>
                <p>This color is: <strong>${currentColor}</strong></p>
            </div>
            <div class="color-facts">
                <h4>Color Facts:</h4>
                <ul>
                    <li>${currentColor} is a beautiful color</li>
                    <li>Colors make our world beautiful</li>
                    <li>We can mix colors to make new ones</li>
                </ul>
            </div>
            <button class="next-btn" onclick="startColorGame()">Learn Another Color</button>
            <button class="close-btn" onclick="closeGame()">Finish</button>
        </div>
    `;
    
    showGame('Color Match', content);
}

// Memory Game - Simple and Working
function startMemoryGame() {
    const items = ['🍎', '🚗', '⭐', '🐱', '🌺'];
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    
    const content = `
        <div class="memory-game">
            <h3>🧠 Memory Master</h3>
            <p>Look at these items for 5 seconds:</p>
            <div class="memory-items">
                ${shuffledItems.map(item => `<span class="memory-item">${item}</span>`).join('')}
            </div>
            <div id="countdown">5</div>
            <button class="start-test-btn" onclick="startMemoryTest()">Start Memory Test</button>
        </div>
    `;
    
    showGame('Memory Master', content);
    
    // Make startMemoryTest available globally
    window.startMemoryTest = function() {
        const modalBody = document.getElementById('gameContent');
        
        modalBody.innerHTML = `
            <div class="memory-test">
                <h3>🧠 Memory Test</h3>
                <p>What was the second item you saw?</p>
                <div class="memory-options">
                    <button class="option-btn" onclick="checkMemoryAnswer('🍎')">🍎 Apple</button>
                    <button class="option-btn" onclick="checkMemoryAnswer('🚗')">🚗 Car</button>
                    <button class="option-btn" onclick="checkMemoryAnswer('⭐')">⭐ Star</button>
                </div>
            </div>
        `;
        
        // Make checkMemoryAnswer available globally
        window.checkMemoryAnswer = function(answer) {
            const secondItem = shuffledItems[1];
            const isCorrect = answer === secondItem;
            
            modalBody.innerHTML = `
                <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
                    <h3>${isCorrect ? '🎉 Memory Master!' : '❌ Keep Practicing'}</h3>
                    <p>${isCorrect ? 'You remembered correctly!' : `The second item was ${secondItem}`}</p>
                    <button class="next-btn" onclick="startMemoryGame()">Try Again</button>
                    <button class="close-btn" onclick="closeGame()">Finish</button>
                </div>
            `;
        };
    };
}

// Story Game - Simple and Working
function startStoryGame() {
    const content = `
        <div class="story-game">
            <h3>📚 Story Builder</h3>
            <div class="story-builder">
                <div class="story-element">
                    <label>Choose a character:</label>
                    <select id="character">
                        <option value="brave knight">Brave Knight</option>
                        <option value="wise wizard">Wise Wizard</option>
                        <option value="friendly dragon">Friendly Dragon</option>
                    </select>
                </div>
                <div class="story-element">
                    <label>Choose a setting:</label>
                    <select id="setting">
                        <option value="magical forest">Magical Forest</option>
                        <option value="ancient castle">Ancient Castle</option>
                        <option value="floating island">Floating Island</option>
                    </select>
                </div>
                <button class="create-btn" onclick="createStory()">Create Story</button>
            </div>
        </div>
    `;
    
    showGame('Story Builder', content);
    
    // Make createStory available globally
    window.createStory = function() {
        const character = document.getElementById('character').value;
        const setting = document.getElementById('setting').value;
        const modalBody = document.getElementById('gameContent');
        
        const story = `Once upon a time, there was a ${character} who lived in a ${setting}. They went on an amazing adventure and discovered wonderful things!`;
        
        modalBody.innerHTML = `
            <div class="story-result">
                <h3>📖 Your Story</h3>
                <p>${story}</p>
                <button class="next-btn" onclick="startStoryGame()">Create Another</button>
                <button class="close-btn" onclick="closeGame()">Finish</button>
            </div>
        `;
    };
}

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Games page loaded successfully!');
    
    // Add connection status toggle functionality
    const connectionStatus = document.getElementById('connection-status');
    if (connectionStatus) {
        connectionStatus.addEventListener('click', function() {
            if (this.classList.contains('online')) {
                this.classList.remove('online');
                this.classList.add('offline');
                this.textContent = '🔴 Offline';
            } else {
                this.classList.remove('offline');
                this.classList.add('online');
                this.textContent = '🟢 Online';
            }
        });
    }
}); 