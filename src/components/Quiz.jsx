import React, { useEffect, useState } from 'react';

export default function Quiz() {
    const [data, setData] = useState();

    const [userAns, setUserAns] = useState();
    const [showAns, setShowAns] = useState(false);
    const [count, setCount] = useState(0);
    const [stop, setStop] = useState(0);

    const getData = () => {
        fetch(`https://quizapi.io/api/v1/questions?apiKey=0OzwXD8po4wyWGM5vFlGmr9q6GYkzrwCEqYoGePS&limit=1`)
            .then((respons) => respons.json())
            .then((data) => {
                setData(data[0])
            })
    }
    useEffect(() => {
        getData();
    }, [])

    const onsubmit = () => {
        setStop(stop + 1);
        setShowAns(true);
        data.correct_answers[userAns + "_correct"] == "true" ? setCount(count + 1) : ""
    }

    const nextQuestionAns = () => {
        setUserAns('');
        setShowAns(false);
        setData('');
        getData();
    }
    return (
        <div className='quiz-div text-w hite text-2xl p-5 md:p-20 xl:p-40 '>
            {stop < 5 ?<fieldset className='chile-quiz-div border p-3'>
                <p className='mb-2 text-white text-lg sm:text-2xl md:text-2xl'> Question: {data ? data.question : ""}</p>
                <div className=''>{data ? Object.keys(data.answers).map((ans, i) => {
                    return data.answers[ans] ? <label key={i}
                        className={`${ans == userAns && showAns && data.correct_answers[ans + "_correct"] !== "true" ? "bg-red-400" : ''} 
                         ${showAns && data.correct_answers[ans + "_correct"] == "true" ? `bg-green-500` : ""} 
                         ${!showAns && ans == userAns ? " bg-slate-400" : ""}
                         block border-dashed border-2 border-sky-200 m-1 p-2 text-lg sm:text-2xl md:text-2xl`} ><input onClick={(e) => setUserAns(ans)}
                            disabled={showAns ? true : false} className='mb-1' type="radio" name='answer' />{data.answers[ans]}</label> : ""
                }) : ""}</div>
                <div className=' flex justify-between pl-1'>
                    <div className='flex justify-center items-center pl-1 text-white text-lg sm:text-2xl md:text-3xl'>
                        {showAns ? data.correct_answers[userAns + "_correct"] == "true" ? "Correct Answer" : "Wrong Answer" : ""}
                    </div>
                    <div>
                    {!showAns && userAns ?  <button type="button" onClick={() => onsubmit()}
                            className="theam-btn text-white bg-gray-800 font-medium rounded-xl text-xl px-10 py-2.5 mr-2 mt-2">Submit</button> : ''}
                       
                        {showAns ? <button onClick={() => { nextQuestionAns() }}
                            className="nxt-btn text-white bg-red-400 font-medium 
                   block ml-auto rounded-md text-lg  px-3 py-2 mr-2 mt-2">
                            Next Question</button> :""}
                    </div>
                </div>
                {!userAns ? <div className='pl-1'>
                    <button className='bg-black text-white block ml-auto px-2 py-1 rounded-md mt-1
                     hover:bg-white hover:text-black active:opacity-60' onClick={()=>getData()}>Skip Question</button></div> : ""}
            </fieldset>
             : ""}
            {stop >= 5 ?<fieldset className='chile-quiz-div border p-3'>
                <div className='border-2 border-dashed border-yellow-100 md:max-w-md md:m-auto md:p-2'>
                 <p className=' text-2xl text-center text-white'>result:</p>
                 <h1 className=' text-2xl text-center text-white ' >{count} out of 5</h1>
                 <h1 className=' text-2xl text-center text-white ' >{count < 3 ? "You need to study my friend" : "You are doing a great job" }</h1>
                </div>
               
                <button className='try-btn text-xl px-3 py-1 rounded-md' onClick={()=> {nextQuestionAns();setStop(0);setCount(0);}}>Try Again The Quiz</button>
            </fieldset>: ""}

            <div><a href="/"><button className='exit-btn'>Home Page</button></a></div>
        </div>
    )
}
