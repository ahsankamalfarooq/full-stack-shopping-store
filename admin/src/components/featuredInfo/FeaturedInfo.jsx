import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income , setIncome] = useState([{},{_id : 0, total : 0}])
  const [Perc , setPerc] = useState(0)

  useEffect(() => {

    const getIncome = async () => {
      try{
        const res = await userRequest("/orders/income")
        console.log(res.data[1].total)
        console.log(res.data[0].total)
        setIncome(res.data) 
        setPerc(((res.data[0].total)/(res.data[1].total)) * 100)
      } catch(err) {
     
      }
    }
      getIncome()
  } , [] )
    // console.log(income)
    // console.log(Perc)
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$
          {income[1]?.total}
      </span>
          <span className="featuredMoneyRate">
            %{Math.floor(Perc)}{" "}
            {Perc < 0 ? (
              <ArrowDownward  className="featuredIcon negative"/>
              ) : <ArrowUpward className="featuredIcon"/>
            }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
