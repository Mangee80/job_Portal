import styles from './Styles.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import vector1 from '../../assets/Rectangle2.png'
import vector2 from '../../assets/Rectangle3.png'
import vector3 from '../../assets/Rectangle4.png'
export const Navbar = ()=>{
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("user"))
    const handleLogout = ()=>{
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("name")
        window.localStorage.removeItem("token")
        setIsLoggedIn(!!window.localStorage.getItem("user"))
    }
    return (
        <div className={styles.nav}>
            <div className={styles.shape1}><img style={{height: '100%', width: '100%' }} src={vector1} /></div>
            <div className={styles.shape2}><img style={{height: '100%', width: '100%' }}src={vector2} /></div>
            <div className={styles.shape3}><img style={{height: '100%', width: '100%' }}src={vector3} /></div>
            <p className={styles.text}>Job Finder</p>
            <div>
                {isLoggedIn?<>
                    <span onClick={handleLogout} className={styles.loggedInText}>Logout</span>
                    <span className={styles.loggedInText}>Hello Recruiter</span>
                </>:
                <>
                <button onClick={()=>navigate("/login")}   className={styles.login}>Login</button>
                <button onClick={()=>navigate("/register")}  className={styles.register}>Register</button>
                </>
                }
            </div>
        </div>
    )
}