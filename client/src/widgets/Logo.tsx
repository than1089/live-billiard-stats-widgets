import { useLocation } from "react-router-dom";
import Frame from "./Frame";
import predatorLogo from "../assets/logos/predator.png";
import poolStatGuy from "../assets/logos/pool-stat-guy.png";

const Logo = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("name");
  const src = name === 'predator' ? predatorLogo : poolStatGuy;
  return (
    <Frame>
      <img src={src} alt="Logo" width={300}/>
    </Frame>
  )
}

export default Logo;