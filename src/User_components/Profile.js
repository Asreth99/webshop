
import "../css/Profile.css";
import authService from "../services/auth.service";
import axios from "axios";

const Profile = () => {
  const user = authService.getCurrentUser();


  const handleDeleteUser = () => {
    const email = user.email;
    console.log("Email: "+user.email);
    axios.post("https://webshopnodedeploy.azurewebsites.net/deleteUser",{email})
    
    .then((response) => {
      console.log(response.data);
    })

    .catch((error) => {
      console.log("Error: ")
      console.error(error);
    });
  };
  


  return (
    <><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /><div>
      <div className="profile-container">
        <p>Email címed: {user.email}</p>

        <a href="/login" className="login-btn" onClick={authService.logout}>Kijelentkezés</a>
        <a href="/login" className="login-btn" onClick={() => {
          handleDeleteUser();
          localStorage.removeItem("user");
        } }>Fiók Törlése</a>
      </div>
    </div></>
  );
};

export default Profile;
