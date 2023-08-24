import { useEffect, useState } from "react";
import classes from './UserInput.module.css'

const initialUserInput = {
    'current-savings': 10000,
    'yearly-contribution': 1200,
    'expected-return': 7,
    'duration': 10,
}

function hasEmptyValues(obj, setFormIsValid) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!obj[key]) {
                setFormIsValid(false)
                return;
            }
        }
    }
    setFormIsValid(true)
    return;
}

const UserInput = (props) => {
    const [userInput, setUserInput] = useState(initialUserInput);
    const [formIsValid, setFormIsValid] = useState(true);

    useEffect(() => {
        hasEmptyValues(userInput, setFormIsValid);
        formIsValid && props.onCalculate(userInput);
    }, [formIsValid, props, userInput])

    const submitHandler = (event) => {
        event.preventDefault();
        props.onCalculate(userInput);
    }
    const resetHandler = () => {
        setUserInput(initialUserInput)
    }

    const inputChangeHandler = (input, value) => {
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                [input]: value
            };
        });
    };
    console.log(formIsValid)

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes['input-group']}>
                <p>
                    <label htmlFor="current-savings">Current Savings (₹)</label>
                    <input
                        type="number"
                        id="current-savings"
                        onChange={(event) => inputChangeHandler('current-savings', event.target.value)}
                        value={userInput['current-savings']}
                        style={userInput['current-savings'] === "" ? { border: '1px solid red', outline: 'none' } : {}}
                    />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings (₹)</label>
                    <input
                        type="number"
                        id="yearly-contribution"
                        onChange={(event) => inputChangeHandler('yearly-contribution', event.target.value)}
                        value={userInput['yearly-contribution']}
                        style={userInput['yearly-contribution'] === "" ? { border: '1px solid red', outline: 'none' } : {}}
                    />
                </p>
            </div>
            <div className={classes['input-group']}>
                <p>
                    <label htmlFor="expected-return">
                        Expected Interest (%, per year)
                    </label>
                    <input
                        type="number"
                        id="expected-return"
                        onChange={(event) => inputChangeHandler('expected-return', event.target.value)}
                        value={userInput['expected-return']}
                        style={userInput['expected-return'] === "" ? { border: '1px solid red', outline: 'none' } : {}}
                    />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input
                        type="number"
                        id="duration"
                        onChange={(event) => inputChangeHandler('duration', event.target.value)}
                        value={userInput['duration']}
                        style={userInput['duration'] === "" ? { border: '1px solid red', outline: 'none' } : {}}
                    />
                </p>
            </div>
            <p className={classes.actions}>
                <button onClick={resetHandler} type="reset" className={classes.buttonAlt}>
                    Reset
                </button>
                {formIsValid && <button type="submit" className={classes.button}>
                    Calculate
                </button>}
            </p>
        </form>
    )
}

export default UserInput;