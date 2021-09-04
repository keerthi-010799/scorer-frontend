import React, { useState, useContext, useRef } from "react";
import close from "../assets/close.png";
import { useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
import plus from "../assets/plus2.svg";
import Auth from "../context/auth-context";
//import { getData, putData } from "../utils/storgeService";
import { addteam } from "../actions/actions";
import { connect } from "react-redux";
import { CreateTeam } from "../services/teamservice";
import Loader from "../Components/Common/Loader";
import {addImage} from "../services/addImageServices";

function AddTeam({ dispatch, team }) {
  const [teamForm, setTeamForm] = useState({
    name: "",
    image: "",
  });
  const history = useHistory();
  const [loading, setloading] = useState(false);
  const context = useContext(Auth);
  const redirectTo = (route) => {
    history.push(route);
  };

  const teamimageUpload = useRef();

  const [teamImage, setImage] = useState();
  const handleForm = (value, key) => {
    setTeamForm({ ...teamForm, [key]: value });
  };
  const addingTeamImage = () => {
    teamimageUpload.current.click();
  };
  const changeHandler = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    setloading(true);
    addImage(data)
      .then((res) => {
        console.log(res.data);
        setImage(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const createTeam = () => {
    let teams = team;
    teams.push({ ...teamForm, id: teams.length + 1, players: [] });

    dispatch(addteam(teams));
    console.log(teamForm.name);

    const data = {
      name: teamForm.name,
      image: teamImage,
      token: context.token,
    };
    setloading(true);
    CreateTeam(data)
      .then((res) => {
        console.log(res.data);
        setloading(false);
        redirectTo("/teams");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  return (
    <React.Fragment>
      <div className="add-players-wrapper full-height">
        <div className="p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between">
          <div>Add Team</div>
          <div onClick={() => redirectTo(`/teams`)}>
            <img
              src={close}
              width="30px"
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <div className="text-secondary">
          <div className="d-flex justify-content-center">
            <div style={{ position: "relative" }}>
              <img
                alt=""
                src={
                  teamImage ||
                  "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"
                }
                className="rounded-circle  mr-2"
                style={{ width: "80px" }}
              />
              <img
                alt=""
                src={plus}
                style={{
                  position: "absolute",
                  width: "25px",
                  right: "10px",
                  background: "white",
                  borderRadius: "50%",
                  bottom: "0",
                  cursor: "pointer",
                }}
                onClick={addingTeamImage}
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                ref={teamimageUpload}
                onChange={changeHandler}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div class="form-group">
            <label for="">Team Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id=""
              aria-describedby="helpId"
              placeholder="Enter team name "
              value={team.name}
              onChange={(e) => handleForm(e.target.value, e.target.name)}
            />
            {/* <small id="helpId" class="form-text text-muted">Help text</small> */}
          </div>

          <br />
          <div class="form-group">
            <button
              type="submit"
              class="btn btn-md btn-primary w-100"
              onClick={() => createTeam()}
            >
              Create Team
            </button>
          </div>
        </div>
      </div>
      {loading && <Loader status={true} />}
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    team: state.team,
  };
};

export default connect(mapStateToProps)(AddTeam);
