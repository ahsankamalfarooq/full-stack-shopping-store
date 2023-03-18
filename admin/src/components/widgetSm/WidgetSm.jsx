import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../requestMethods";
import axios from "axios";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try{
        const res = await userRequest.get("/users/?new=true")
        // const res = await axios.get(
        //   "http://localhost:3001/api/users/?new=true")
        
        setUsers(res.data)
      } catch(err) {
        console.log("err")
      }
    }
    getUsers();
  }, [] )

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map(user => (

          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img || "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v937-aew-111_3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=8ce2cd03f94f2baddcb332cfb50f78b9"}
            alt=""
            className="widgetSmImg"
            />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
            )
          )
        }
      </ul>
    </div>
  );
}
