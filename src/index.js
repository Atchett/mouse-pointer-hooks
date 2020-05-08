import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
//====================================================================
const MyStaticComponent = () => <div>Event cleanup: completed</div>;
//====================================================================
const MyMouseComponent = ({ myHrStyleProps }) => {
  const [myMouseObject, myBooleanFunction] = useState({
    myClientX: "Waiting...",
    myClientY: "Waiting...",
  });
  const mouseMoveFunction = (event) => {
    myBooleanFunction({
      myClientX: event.clientX,
      myClientY: event.clientY,
    });
  };
  //--------------------------------------------------------------------
  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveFunction);
    return () => {
      document.removeEventListener("mousemove", mouseMoveFunction);
    };
  }, []);
  //--------------------------------------------------------------------
  return (
    <div>
      <div>Move your mouse around</div>
      <hr style={myHrStyleProps} />
      <div>ClientX: {myMouseObject.myClientX}</div>
      <div>ClientY: {myMouseObject.myClientY}</div>
    </div>
  );
};
//====================================================================
const MyApp = () => {
  const [myBoolean, myBooleanFunction] = useState(true);
  const myChangWebpageFunction = () => {
    myBooleanFunction(!myBoolean);
  };
  //--------------------------------------------------------------------
  const myContainerStyle = {
    maxWidth: "300px",
    height: "110px",
    margin: "10px auto",
    padding: "6px 0",
    backgroundColor: "#ddd",
    textAlign: "center",
    border: "1px solid #000",
    fontSize: "16px",
    fontFamily: "Helvetica",
  };
  const myHrStyle = { margin: "5px 0" };
  //--------------------------------------------------------------------
  return (
    <div style={myContainerStyle}>
      <button type="button" onClick={myChangWebpageFunction}>
        {myBoolean ? "Force event cleanup" : "Return to mouse events"}
      </button>
      <hr style={myHrStyle} />
      <div>
        {myBoolean ? (
          <MyMouseComponent myHrStyleProps={myHrStyle} />
        ) : (
          <MyStaticComponent />
        )}
      </div>
    </div>
  );
};
ReactDOM.render(<MyApp />, document.getElementById("root"));
