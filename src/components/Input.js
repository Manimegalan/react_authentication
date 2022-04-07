import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

function Input(props) {
  const {
    lableName,
    id,
    user,
    valid,
    focus,
    refVal,
    uidnote,
    hanldeChage,
    hanldeFocus,
    hanldeBlur,
  } = props;

  const switchFunc = function (type) {
    switch (type) {
      case "text":
      case "password":
        return (
          <>
            <label htmlFor={id}>
              {lableName}
              <span className={valid ? "valid" : "hide"}>
                <DoneIcon />
              </span>
              <span className={valid || !user ? "hide" : "invalid"}>
                <CloseIcon />
              </span>
            </label>
            <input
              id={id}
              type={type}
              ref={refVal}
              autoComplete="off"
              required
              aria-invalid={valid ? "false" : "true"}
              aria-describedby="uidnote"
              onChange={hanldeChage}
              onFocus={hanldeFocus}
              onBlur={hanldeBlur}
            />
            <p
              id="uidnote"
              className={focus && user && !valid ? "instructions" : "offscreen"}
            >
              <InfoIcon />
              {uidnote}
            </p>
          </>
        );
      default:
        return;
    }
  };

  return switchFunc(props.type);
}

export default Input;
