import React, { useRef, useState, useEffect } from "react";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Link,
//   Grid,
//   Box,
//   Typography,
//   Container,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import InfoIcon from "@mui/icons-material/Info";
// import CloseIcon from "@mui/icons-material/Close";
// import DoneIcon from "@mui/icons-material/Done";
import { USER_REGEX, PASSWORD_REGEX } from "../../utils/utils";

import Input from "../../components/Input";

const usernameUidnote = (
  <>
    4 to 24 characters.
    <br /> Must begin with a letter.
    <br />
    Letters, numbers, underscores, hyphens allowed.
  </>
);

const pwdUidnote = (
  <>
    8 to 24 characters.
    <br /> Must include upper and lowercase letter, a number and a special
    character.
    <br />
    Allowed special characters: <span aria-label="exclamation mark">!</span>
    <span aria-label="at symbol">@</span>
    <span aria-label="hashtag">#</span>
    <span aria-label="dollor sign">$</span>
    <span aria-label="percentage">%</span>
  </>
);

const confirmPwdUidnote = <>Must match the first password input field.</>;

function SignUp() {
  const userRef = useRef();
  const errRef = useRef();

  const [state, setState] = useState({
    user: {
      name: "",
      pwd: "",
      matchPwd: "",
    },
    valid: {
      name: false,
      pwd: false,
      matchPwd: false,
    },
    focus: {
      name: false,
      pwd: false,
      matchPwd: false,
    },
    errMsg: "",
    success: false,
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const nameResult = USER_REGEX.test(state.user.name);
    const pwdResult = PASSWORD_REGEX.test(state.user.pwd);
    const matchPwdResult = state.user.pwd === state.user.matchPwd;

    setState((prevState) => ({
      ...prevState,
      valid: {
        ...prevState.valid,
        name: nameResult,
        pwd: pwdResult,
        matchPwd: matchPwdResult,
      },
    }));
  }, [state.user]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }, [state.user]);

  const handleUsernameChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        name: event.target.value,
      },
    }));
  };

  const handleUsernameFocus = () => {
    setState((prevState) => ({
      ...prevState,
      focus: {
        ...prevState.focus,
        name: true,
      },
    }));
  };

  const handleUsernameBlur = () => {
    setState((prevState) => ({
      ...prevState,
      focus: {
        ...prevState.focus,
        name: false,
      },
    }));
  };

  const handlePwdChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        pwd: event.target.value,
      },
    }));
  };

  const handlePwdFocus = () => {
    setState((prevState) => ({
      ...prevState,
      focus: {
        ...prevState.focus,
        pwd: true,
      },
    }));
  };

  const handlePwdBlur = () => {
    setState((prevState) => ({
      ...prevState,
      focus: {
        ...prevState.focus,
        pwd: false,
      },
    }));
  };

  const handleConfirmPwdChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        matchPwd: event.target.value,
      },
    }));
  };
  const handleConfirmPwdFocus = () => {
    setState((prevState) => ({
      ...prevState,
      focus: {
        ...prevState.focus,
        matchPwd: true,
      },
    }));
  };
  const handleConfirmPwdBlur = () => {
    setState((prevState) => ({
      ...prevState,
      focus: {
        ...prevState.focus,
        matchPwd: false,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const v1 = USER_REGEX.test(state.user.name);
    const v2 = PASSWORD_REGEX.test(state.user.pwd);
    if (!v1 || !v2) {
      setState((prevstate) => ({
        ...prevstate,
        errMsg: "Invalid entry",
      }));
      return;
    }
    console.log(state);
    setState((prevstate) => ({
      ...prevstate,
      success: true,
    }));
  };

  return (
    <>
      {state.success ? (
        <section>
          <h1>Success!</h1>
          <span className="line">
            <a href="./">Sign In</a>
          </span>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={state?.errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {state.errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              lableName="Username:"
              id="username"
              refVal={userRef}
              user={state.user.name}
              valid={state.valid.name}
              focus={state.focus.name}
              uidnote={usernameUidnote}
              hanldeChage={handleUsernameChange}
              hanldeFocus={handleUsernameFocus}
              hanldeBlur={handleUsernameBlur}
            />

            <Input
              type="password"
              lableName="Password:"
              id="password"
              user={state.user.pwd}
              valid={state.valid.pwd}
              focus={state.focus.pwd}
              uidnote={pwdUidnote}
              hanldeChage={handlePwdChange}
              hanldeFocus={handlePwdFocus}
              hanldeBlur={handlePwdBlur}
            />

            <Input
              type="password"
              lableName="Confirm Password:"
              id="matchPwd"
              user={state.user.matchPwd}
              valid={state.user.matchPwd && state.valid.matchPwd}
              focus={state.focus.matchPwd}
              uidnote={confirmPwdUidnote}
              hanldeChage={handleConfirmPwdChange}
              hanldeFocus={handleConfirmPwdFocus}
              hanldeBlur={handleConfirmPwdBlur}
            />

            <button
              disabled={
                !state.valid.name || !state.valid.pwd || !state.valid.matchPwd
                  ? true
                  : false
              }
            >
              Sign Up
            </button>
            <p>
              Already registered?
              <br />
              <span className="line">
                <a href="./">Sign In</a>
              </span>
            </p>
          </form>
        </section>
      )}
    </>
  );
}

export default SignUp;

// const setStateFunc = (
//   userName = state.user.name,
//   userPwd = state.user.pwd,
//   userMatchPwd = state.user.matchPwd,
//   validName = state.valid.name,
//   validPwd = state.valid.pwd,
//   validMatchPwd = state.valid.matchPwd,
//   focusName = state.focus.name,
//   focusPwd = state.focus.pwd,
//   focusMatchPwd = state.focus.matchPwd,
//   errMsg = state.errMsg,
//   success = state.success
// ) => {
//   setState((prevState) => ({
//     ...prevState,
//     user: {
//       ...prevState.user,
//       name: userName,
//       pwd: userPwd,
//       matchPwd: userMatchPwd,
//     },
//     valid: {
//       ...prevState.valid,
//       name: validName,
//       pwd: validPwd,
//       matchPwd: validMatchPwd,
//     },
//     focus: {
//       ...prevState.focus,
//       name: focusName,
//       pwd: focusPwd,
//       matchPwd: focusMatchPwd,
//     },
//     errMsg,
//     success,
//   }));
// };
