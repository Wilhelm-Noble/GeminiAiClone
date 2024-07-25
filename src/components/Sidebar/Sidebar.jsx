import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../content/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const {onSent, prevPrompt,setRecentPrompt, newChat} = useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className="sidebar">
      <div className="top">
       <img onClick ={()=> setExtended(!extended)} className="menu" src={assets.menu_icon} alt="" />
        <div onClick={()=>newChat()}className="newChat">
          <img src={assets.plus_icon} alt="" />
          {extended && <p> New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recentTitle">Recent</p>
            {prevPrompt.map((item,index)=>{
              return (
                <div onClick={()=>loadPrompt(item)}className="recentEntry">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0,20)}</p>
              </div>

              )
            })}
           
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottomItem recentEntry">
          <img src={assets.question_icon} alt="" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottomItem recentEntry">
          <img src={assets.history_icon} alt="" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottomItem recentEntry">
          <img src={assets.setting_icon} alt="" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
