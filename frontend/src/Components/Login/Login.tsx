import style from "./login.module.scss"
import img from "../../assets/Group.svg"
import google from "../../assets/Social media logo.svg"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate();
    
    function handleSwitch(){
        navigate("/");
    }

  return (
    <div className={style.container} >
        <div className={style.top}>
            <button onClick={handleSwitch} >Signup</button>
        </div>
        <div className={style.bottom}>
            <div className={style.left}>
                <div className={style.img} >
                    <img src={img} alt="illustrator" />
                </div>
            </div>
            <div className={style.right}>
                <div className={style.header}>
                    <p className={style.p1} >Login your account</p>
                    <p className={style.p2} onClick={handleSwitch} >Sign up instead</p>
                </div>
                <div className={style.form}>
                    <form>
                        <div className={style.fname}>
                            <label>First name</label>
                            <input type="text" />
                        </div>
                        <div className={style.lname}>
                            <label>Last name</label>
                            <input type="text" />
                        </div>
                        <div className={style.email}>
                            <label>Email</label>
                            <input type="email" />
                        </div>
                        <div className={style.password}>
                            <label>Password</label>
                            <input type="password" />
                        </div>
                        <div className={style.check}>
                            <input type="checkbox" />
                            <p>By creating an account, I agree to our <span>Terms of use</span> <br /> amd <span>Privacy Policy</span></p>
                        </div>
                        <div className={style.submit} >
                            <button>Login</button>
                        </div>
                    </form>
                </div>
                <div className={style.oauth} >
                    <button>
                        <img src={google} alt="" />
                        <p>Continue with google</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login