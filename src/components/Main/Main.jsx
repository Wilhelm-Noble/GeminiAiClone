import React, { useContext, useEffect, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../content/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    setRecentPrompt,
    setPrevPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    newChat
  } = useContext(Context);

  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        onSent();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [onSent]);


  function HandleCards(prompt) {
    setRecentPrompt(prompt)
    onSent(prompt);
    setPrevPrompt(prev=> [...prev, prompt]);
    
  }

  return (
    <div className="main">
      <div className="nav">
        <p onClick={()=>newChat()}>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="mainContainer">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div onClick={()=>HandleCards('Suggest beautiful places to see on an upcoming road trip in the Philippines')} className="card">
                <p>Suggest beautiful places to see on an upcoming road trip in the Philippines</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div onClick={()=>HandleCards('Study Efficiently using Pomodoro Technique')} className="card">
                <p>Study Efficiently using Pomodoro Technique</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div onClick={()=>HandleCards('How to prepare for an interview')} className="card">
                <p>How to prepare for an interview</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div onClick={()=>HandleCards('Tell me about React js and React native')} className="card">
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="resultTitle">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="resultData">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData.replace("##","") }}></p>
              )}
            </div>
          </div>
        )}
        <div className="mainBottom">
          <div className="searchBox">
            <input
              ref={inputRef}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Type something ..."
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input && <img onClick={() => onSent()} src={assets.send_icon} alt="" />}
            </div>
          </div>
          <p className="bottomInfo">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. <a target="_blank" href="https://support.google.com/gemini/answer/13594961?visit_id=638571858262028213-3780439639&p=privacy_notice&rd=1#privacy_notice">Your privacy and Gemini Apps</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
