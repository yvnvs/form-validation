import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import userEvent from '@testing-library/user-event';
import React , {useRef,useState,useEffect} from 'react'


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';


const Register = () => {
    const userRef = userRef();
    const errRef = userRef();

    const [user, setUser] = useState("")
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setpwd] = useState("")
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setpwdFocus] = useState(false)

    const [match, setmatch] = useState("")
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setmatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(()=>{
        useRef.current.focus();
    },[]);

    useEffect(()=>{
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user]);

    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd;
        setValidMatch(match);
    },[pwd,matchPwd]);

    useEffect(()=>{
        setErrMsg("");

    },[user,pwd,matchPwd]);

  return (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form>
            <label htmlFor='username'>
                Username:
                <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon ={faCheck}/>
                </span>    
                <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon = {faTimes}/>
                </span>
            </label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e)=> setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={()=> setUserFocus(true)}
                onBlur={()=> setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "insturctions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters. <br/>
                Must begin with a latter. <br/>
                Letters, numbers, underscores, hyphens allowed.
            </p>
        </form>
    </section>
  )
}

export default Register