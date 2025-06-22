import { useEffect, useState } from "react"
import style from "./dashboard.module.scss"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import { RiseLoader } from "react-spinners";

function Dashboard() {

  type Email = {
    from : string,
    subject : string,
    body : string,
    summary : string,
    action : string,
  }

  const styles = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    position: 'absolute',
  };

  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [aiData, setAiData] = useState<Email[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

    useEffect(() => {
        async function init(){
            const res = await axios.get('http://localhost:4000/userinfo', {
                withCredentials : true
            });
            if(res){
                console.log(res);
                localStorage.setItem("userInfo", JSON.stringify(res.data));
            } else {
                console.log("error");
            }
        }

        async function getEmail(){
          try {
            const res = await axios.get("http://localhost:4000/emails");
            if(res){
              setEmails(res.data.emailDetails);
            } else {
              console.log("Error");
            }
          } catch (error) {
            console.log(error);
          }
        }

        getEmail();

        init();
    }, [])

    function handleDash(){
      navigate("/dashboard");
    }

    function handleLogOut(){
      localStorage.removeItem("userinfo");
      navigate("/");
    }

    async function handleClick(m : Email, index : number){
      console.log(m);
      console.log(index);

      handleOpen();
      setLoading(true);

      try {
        const res = await axios.post(`http://localhost:4000/ai/ai-helper`, {
          from : m.from,
          subject : m.subject,
          body : m.body
        });
        if(res){
          console.log(res.data);
          setAiData(res.data);
          setLoading(false);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }

    }

    async function handleYes() {
      handleClose();
      try {
          await axios.post("http://localhost:5678/webhook-test/ai-email", {
          aiData
        });
        console.log("successfully send the data");
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className={style.container} >
      <div className={style.header} >
        <div className={style.logo} onClick={handleDash} >
          <p>LOGO</p>
        </div>
        <div className={style.logout} onClick={handleLogOut} >
          <button>Logout</button>
        </div>
      </div>

      <div className={style.main} >
        <div className={style.heading} >
          <p>Here are your recent 10 emails. Click to perform some actions</p>
        </div>

        <div className={style.emails} >
          <div className={style.eHead} >
            <p>From</p>
            <p>Subject</p>
          </div>
          <ul>
            {
              emails.map((m, index) => {
                return(
                  <div className={style.email} onClick={() => handleClick(m, index)} >
                    <p className={style.eFrom} >{m.from}</p>
                    <p className={style.eFrom} >{m.subject}</p>
                  </div>
                )
              })
            }
          </ul>
        </div>
      </div>

      {/* Modal */}

      {loading ? <div className={style.loader} ><p>Wait up, it might take some time</p><br /><RiseLoader /></div> : 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={styles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to continue?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p><strong>Summary : </strong> {aiData.summary}</p>
            <p><strong>Action : </strong> {aiData.action}</p>
            <div className={style.accept} >
            <button onClick={handleYes} >Yes</button>
            </div>
          </Typography>
        </Box>
       
      </Modal>
      }

      
      
    </div>
  )
}

export default Dashboard
