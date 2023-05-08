import * as React from "react";
import { useState } from "react";
//import { sp } from "@pnp/sp"; 
import "@pnp/sp/lists/web";
import "@pnp/sp/folders/web";
import "@pnp/sp/files/folder";
import "@pnp/sp/items/list";
import "@pnp/sp/fields/list";
import "@pnp/sp/views/list";
import "@pnp/sp/site-users/web";
import "@pnp/sp/sputilities";
// import "./../SimplePoll.scss";
import { getSP } from '../../pnpConfig';

import { SPFI, SPFx, spfi } from "@pnp/sp";

import { IPollProps } from '../Opinion Poll/IPollProps'
import { ICamlQuery } from "@pnp/sp/lists";
const MyTrainings = (props: IPollProps) => {
  const [trainingdata, setTrainingData] = useState([]);
  const [currentuser, setCurrentUser] = useState("");
  const caml: ICamlQuery = {
    ViewXml:
      "<View><ViewFields><FieldRef Name='Title' /><FieldRef Name='Description' /></ViewFields><RowLimit>2</RowLimit></View>",
  };
  const getTrainingDetails = async () => {
    try {
      const webUrl = `${window.location.protocol}//${window.location.hostname}/sites/Dev/LearingManag`;
      console.log(webUrl);
      const spWebChild = spfi(webUrl).using(SPFx(props.context));
      const list = await spWebChild.web.lists.getByTitle("TrainingCalender");
      const trainingOutput = await list.getItemsByCAMLQuery(caml);
      console.log(list);
      console.log(trainingOutput);
      setTrainingData(trainingOutput);
    } catch (error) {
      console.log(error);
    }
  };
  const sendemail = async (Title: any) => {
    try {
      let _sp: SPFI = getSP(props.context);
      console.log(_sp);
      const userInfo = await _sp.web.currentUser();
      console.log(userInfo);
      let userobj = userInfo.Email;
      setCurrentUser(userobj);
      console.log(userobj);
      console.log(currentuser, "hi");
      const webUrl = `${window.location.protocol}//${window.location.hostname}/sites/Dev`;
      const spWebParent = spfi(webUrl).using(SPFx(props.context));
      const empInfo = spWebParent.web.lists
        .getByTitle("EmployeeDetails")
        .items.select("ReportingManager/EMail")
        .expand("ReportingManager")
        .filter("Name/EMail eq '" + userobj + "'")();
      console.log(empInfo);
      let actualmanager = " ";
      empInfo.then((responsedata: any) => {
        console.log(responsedata);
        let y = JSON.parse(JSON.stringify(responsedata));
        y.map((x: any) => {
          actualmanager = x.ReportingManager.EMail;
          console.log(x.ReportingManager.EMail);
        });
        console.log(currentuser, actualmanager);
         _sp.utility.sendEmail({
          To: [actualmanager],

          Subject: "Request for" + Title,
          Body: "Iam interested in" + Title,
          AdditionalHeaders: {
            "content-type": "text/html",
          },
        });
        window.alert("Request for Nomination Sent");
        console.log("emailsent");
      })
    }
    catch (e) {
      console.log(e);
    }

  };

  React.useEffect(() => {
    try {
      console.log("hi");
      getTrainingDetails();
      console.log("hello");
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <div className="rowMain3">
        <div className="row31">
          <h2>My Tainings</h2>
        </div>
        {console.log(trainingdata)}
        <table className="training_table">
          <th>Title</th>

          <th>Apply</th>
          {trainingdata &&
            trainingdata?.map((item, i) => {
              return (
                <tr>
                  <td>
                    <label> {item.Title}</label>
                  </td>
                  <td>

                    <button
                      id="nominate_btn${i}"
                      className="nominate1"
                      onClick={() => sendemail(item.Title)}
                    >
                      Nominate
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </>
  );
};

export default MyTrainings;