import styles from './Style.module.css'
import vector1 from '../../assets/vector1.svg'
import vector2 from '../../assets/vector2.svg'
import vector3 from '../../assets/vector3.svg'
import vector4 from '../../assets/vector4.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
export const Listing = ()=>{
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])
    const [skills, setSkills] = useState([])
    const [search, setSearch] = useState("")
    const handleSearch = (e)=>{
        setSearch(e.target.value)
    }
    const people="11-50";
    useEffect(()=>{
        if(search.length>0){
            const arr = jobs.filter(job=>job?.position?.includes(search))
            console.log(arr)
            setJobs([...arr])
        }
        else{
            const options = {method: 'GET'};
        fetch(`https://job-portal-three-mu.vercel.app/api/job/job-posts?skillsRequired=`, options)
        .then(response => response.json())
        .then(response => setJobs([...response.jobPosts]))
        .catch(err => console.error(err));
        }
    },[search])

    const handleSkill = (e)=>{
        if(!skills.includes(e.target.value))
        setSkills((prev)=>[...prev,e.target.value])
    }

    const handleClear = (e)=>{
        
    }

    const handleRemove = (skill)=>{
        const index = skills.indexOf(skill)
        skills.splice(index,1)
        setSkills([...skills])
    }
    useEffect(()=>{
        const options = {method: 'GET'};
        const search = skills.join("&")
        fetch(`https://job-portal-three-mu.vercel.app/api/job/job-posts?skillsRequired=${search}`, options)
        .then(response => response.json())
        .then(response => setJobs([...response.jobPosts]))
        .catch(err => console.error(err));
    },[skills])
    return(
        <>
            <div style={{backgroundColor: 'rgba(255, 238, 238, 1)' , height: '100vh'}}>
                <div className={styles.container}>
                    <div className={styles.inputcontainer}>
                        <img src={vector1}/>
                        <input value={search} onChange={handleSearch}  type="text" name='search' placeholder='Type any job title'/>
                    </div>
                    <div className={styles.containerBottom}>
                        <select onClick={handleSkill}  className={styles.inputSelect} name="remote">
                            <option value="">Skills</option>
                            {codingSkills.map((skill) => (
                                <option key={skill} value={skill}>
                                    {skill}
                                </option>
                            ))}
                        </select>
                        {skills.map((skill)=>{
                                return (
                                    <span className={styles.chip} key={skill}>{skill}<span onClick={()=>handleRemove(skill)} className={styles.cross}>X</span></span>
                                )}
                        )}
                        <button onClick={()=>navigate("/addJob")}  className={styles.viewJ}>Add Job</button>
                    </div>
                    <div className={styles.clear} onClick={handleClear}>clear</div>
                </div>
                <div className={styles.bottom}>
                    {jobs.map((data)=>{
                        return(
                        <div key={data._id}  className={styles.list}>
                            <div className={styles.listLeft}>
                                <div className={styles.logo}>
                                    <img src={data.logoURL} />
                                </div>
                                <div className={styles.infoLeft}>
                                    <p className={styles.position}>{data.position}</p>
                                    <p className={styles.extraInfo}>
                                        <span className={styles.greyText}><img src={vector2} alt="Icon" />{people}</span>
                                        <span className={styles.greyText2}><img src={vector4} alt="Icon" /> {data.salary}</span>
                                        <span className={styles.greyText3}><img src={vector3} alt="Icon" /> {data.location}</span>
                                    </p>
                                    <p className={styles.extraInfo}>
                                        <span className={styles.redText}>{data.remote}</span>
                                        <span className={styles.redText}>{data.jobtype}</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {data.skillsRequired.map((skill)=>{
                                        return (
                                            <span className={styles.skill} key={skill}>{skill}</span>
                                        )
                                    }       
                                )}
                                </div>
                                <div className={styles.btnGroup}>
                                    <button onClick={()=>navigate('/addJob', { state: { id: data._id, edit:true} })} className={styles.edit}>Edit job</button>
                                    <button onClick={()=>navigate('/detail', { state: { id: data._id} })}  className={styles.view}>View Details</button>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}



const codingSkills = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'Ruby',
    'PHP',
    'Swift',
    'Objective-C',
    'SQL',
    'HTML',
    'CSS',
    'css',
    "node",
    "react"
  ];