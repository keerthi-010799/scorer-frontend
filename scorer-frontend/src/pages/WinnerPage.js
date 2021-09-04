import React from "react";
import { useHistory,useRouteMatch } from "react-router-dom";
import trophy from "../assets/trophy.png";
import close from "../assets/close.png";

const WinnerPage = ()=>{
     const history = useHistory();
    
     const match = useRouteMatch();
     const {
     params: { matchId },
     } = match;

     const redirectTo = (route) => {
        history.push(route);
      };
    console.log(matchId);
return(
    <div>
        <h1 class="text-secondary"><center>Congratulations</center></h1>
   <div class="float-right" style={{marginRight:"30px"}} onClick={() => redirectTo(`/`)}>
             <img  alt="" src={close} width="30px" alt="" style={{ cursor: "pointer" }}/>    
            </div>
    <img class="rounded mx-auto d-block" alt="" height="240px" src={trophy}/>
    <div class="text-center"><h3></h3></div>
    <div class="text-center"> <h5></h5></div>
    </div>
)
}

export default WinnerPage;