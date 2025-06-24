import '../styles/main.css'
import { languages } from '../../languages.js';
import { useState } from 'react';
import clsx from 'clsx';
export default function Main() {
    
    const [word, setWord] = useState("react");
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const alphabets = "abcdefghijklmnopqrstuvwxyz";
    const wrongCount = guessedLetters.filter(l => !word.includes(l)).length;
    const isGameWon = word.split('').filter(letter => guessedLetters.includes(letter)).length === word.length;
    
    function markGuessedLetters(letter: string) {
        if (!guessedLetters.find(l => l === letter))
            setGuessedLetters(prevLetters => [...prevLetters, letter]);
    }
    
    const languageElements = languages.map((language, index) => {
        return <span
            className={clsx({'lost' : index < wrongCount})}
            key={index}
            id='language' 
            style={
                {backgroundColor : language.backgroundColor, color : language.color}
            }
        >
            {language.name}
        </span>
    })

    const wordElements = word.toUpperCase().split('').map((letter, index) => {
        return <span
            key={index}
        >
            {guessedLetters.includes(letter.toLowerCase()) ? letter : ""}
        </span>
    })

    const keyboard = alphabets.split("").map((letter) => {
        var isButtonClicked = false;
        var isValid = false;
        if (guessedLetters.includes(letter)) {
            isButtonClicked = true;
            isValid = word.includes(letter) ? true : false;
        }
        return <button 
            className={clsx('default_button', {
                'not_clicked' : !isButtonClicked,
                'valid' : isButtonClicked && isValid,
                'not_valid' : isButtonClicked && !isValid
            })}
            key={letter}
            onClick={() => markGuessedLetters(letter)}
        >{letter.toUpperCase()}</button>
    })
    return (
        <main>
            <section
                id='status'
                className={clsx({'won' : isGameWon, 'lost' : wrongCount === languages.length - 1})}
            >
                <h2>{isGameWon ? "You win!" : "Game over!"}</h2>
                <p>{isGameWon ? "well done! 🎉" : "You lose! Better start learning Assembly😭"}</p>
            </section>

            <section id='languages'>
                {languageElements}     
            </section>

            <section id='word-field'>
                {wordElements}
            </section>

            <section id='keyboard'>
                {keyboard}
            </section>
            {
                wrongCount === languages.length - 1 || 
                isGameWon ?
                    <button>New Game</button>
                    :
                    <button className='game-over'>New Game</button>
            }
        </main>
    )

}