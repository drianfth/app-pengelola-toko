import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export const Kalkulator = () => {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");

    const ops = ['/', '*', '+', '-'];

    const updateCalc = value => {

        if (ops.includes(value) && calc === '' || ops.includes(value) && ops.includes(calc.slice(-1))) {
            return;
        }
        setCalc(calc + value);

        if (!ops.includes(value)) {
            setResult(eval(calc + value).toString());
        }
    }

    const calculate = () => {
        setCalc(eval(calc).toString());
    }


    const deleteLast = () => {
        if (calc == '') {
            return;
        }

        const value = calc.slice(0, -1);

        setCalc(value);
    }

    const createDigits = () => {
        const digits = [];

        for (let i = 1; i < 10; i++) {
            digits.push(
                <button
                    key={i}
                    className='tombol'
                    onClick={() => updateCalc(i.toString())}>
                    {i}
                </button>
            )
        }
        return digits;
    }


    return (
        <div className="card column is-12 mx-auto my-6">
            <header className="card-header">
                <p className="card-header-title is-size-5">
                    Kalkulator
                </p>
            </header>
            <div className="card-content">
                <Link to={'/'} className='button is-info mb-3 is-rounded'><i class="fa fa-home is-size-4"></i></Link>
                <div className='App'>

                    <div className="calculator">
                        <div className="display">
                            {result ? <span>({result})</span> : ''}&nbsp; {calc || "0"}
                        </div>

                        <div className="operators">
                            <button className='tombol' onClick={() => updateCalc('/')}>/</button>
                            <button className='tombol' onClick={() => updateCalc('*')} >*</button>
                            <button className='tombol' onClick={() => updateCalc('-')} >-</button>
                            <button className='tombol' onClick={() => updateCalc('+')}>+</button>


                            <button className='tombol' onClick={deleteLast}>DEL</button>
                        </div>

                        <div className="digits">
                            {createDigits()}
                            <button className='tombol' onClick={() => updateCalc('0')}>0</button>
                            <button className='tombol' onClick={() => updateCalc('.')}>.</button>

                            <button className='tombol' onClick={calculate}>=</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


