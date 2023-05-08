import * as React from 'react'
import PollElement from './PollElement'
import { SPFI } from '@pnp/sp';
import { getSP } from '../../pnpConfig';
import { ICamlQuery } from '@pnp/sp/lists';
import { IPollProps } from './IPollProps';
import "@pnp/sp/site-users/web";
import { AiFillPlusCircle } from "react-icons/ai";
import PollForm from './PollForm';
import './Poll.scss'
import { PermissionKind } from "@pnp/sp/security";


const OpinionPoll = (props: IPollProps) => {
  const [pollData, setPolldata] = React.useState<any>([])
  const [formmode, setFormmode] = React.useState<boolean>(true)
  const [createformmode, setCreateformmode] = React.useState<boolean>(false);
  const [canCreate, setcanCreate] = React.useState<boolean>(false)
  let arr: any[]

  const caml: ICamlQuery = {
    ViewXml: "<View><Query><FieldRef Name='ID' /><FieldRef Name='QuestionId' /><FieldRef Name='QuestionName' /><FieldRef Name='Choices' /><Where><Eq><FieldRef Name='Active'/><Value Type='Boolean'>1</Value></Eq></Where></Query></View>",
  }

  const checkPrem = async () => {
    let _sp: SPFI = getSP(props.context)
    const prems = await _sp.web.lists.getByTitle("OpinionPole").getCurrentUserEffectivePermissions()

    if (_sp.web.hasPermissions(prems, PermissionKind.AddListItems) && _sp.web.hasPermissions(prems, PermissionKind.EditListItems)) {
      console.log("can create new form");
      setcanCreate(true)
    }
    else {
      console.log("cannot create new form");
      setcanCreate(false)
    }

  }
  const getData = async () => {
    let _sp: SPFI = getSP(props.context);
    const list = await _sp.web.lists.getByTitle("OpinionPole");
    const r = await list.getItemsByCAMLQuery(caml);

    arr = await r;
    console.log(r);

    setPolldata(arr)
    if (arr.length > 0) { setFormmode(false) }

  }

  React.useEffect(() => {
    getData();
    checkPrem();
  }, [])

  return (
    <>
      <div className='rowMain3'>
        <div className='row31'>
          <h2>Opinion Poll</h2>
        </div>
        <div className='row32'>
          {canCreate &&
            <AiFillPlusCircle className={createformmode ? "formBtnOpened" : "formBtn"} onClick={() => setCreateformmode(!createformmode)} size={40} />
          }
          {createformmode && <PollForm context={props.context} />}
          {console.log(formmode)}
          {
            pollData && pollData?.map((x: any) => {
              return (
                <PollElement data={x} context={props.context} />
              )
            })
          }

          {
            console.log(pollData)

          }
        </div>
      </div>
    </>

  )
}

export default OpinionPoll