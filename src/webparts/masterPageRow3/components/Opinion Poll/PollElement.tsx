import { SPFI } from '@pnp/sp'
import * as React from 'react'
import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'
import { getSP } from '../../pnpConfig'
import { IItemAddResult } from '@pnp/sp/items'
import "@pnp/sp/site-users/web";


const PollElement = (props: any) => {
  let rowId = props.data.ID;
  let q = props.data.QuestionName
  let c = props.data.Choices;
  let qid = String(props.data.QuestionId);
  let choicearr = JSON.parse(c)
  console.log(choicearr)

  const [isLoading, setLoading] = React.useState(true);
  const [userVoted, setUservoted] = React.useState<boolean>(true)
  let userarrr: string[] = []
  const customTheme = {
    textColor: 'black',
    mainColor: '#00B87B',
    backgroundColor: 'rgb(255,255,255)',
    alignment: 'center'
  }

  const checkUser = async () => {

    let _sp: SPFI = getSP(props.context);
    let user = await _sp.web.currentUser();
    const list = await _sp.web.lists.getByTitle("pollItems").items.select()();
    list.map((x) => {
      console.log(x.Email);
      userarrr.push(x.Email, String(x.qid))
    })

    console.log(userarrr);

    console.log(user.Email);

    console.log(userarrr.includes(user.Email));
    let cond = (userarrr.includes(user.Email) && userarrr.includes(qid))
    setUservoted(cond)
    setLoading(false)
    return user.Email

  }

  const updateVotes = async (itm: Result, res: Result[]) => {
    let _sp: SPFI = getSP(props.context);
    const list = await _sp.web.lists.getByTitle("OpinionPole");

    let user = await _sp.web.currentUser()
    let userEmail = user.Email
    const iar: IItemAddResult = await _sp.web.lists.getByTitle("pollItems").items.add({
      Title: "PollItem",
      Item: JSON.stringify(itm),
      Email: userEmail,
      qid: qid
    });

    const i = await list.items.getById(rowId).update({
      Title: "My New Title",
      Choices: JSON.stringify(res)
    });
    console.log(i);
    console.log(iar);



  }


  function vote(item: Result, results: Result[]) {
    console.log(results);
    console.log(item);
    updateVotes(item, results)

  }
  React.useEffect(() => {
    checkUser()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (

    <LeafPoll
      type='multiple'
      question={q}
      results={choicearr}
      theme={customTheme}
      onVote={vote}
      isVoted={userVoted}
    />

  )
}

export default PollElement