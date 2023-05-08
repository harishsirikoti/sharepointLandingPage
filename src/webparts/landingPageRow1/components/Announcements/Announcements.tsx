import * as React from 'react'
import "../LandingPage/Landing.scss"
const Announcements = (props: any) => {
    return (
        <div className='rowMain'>
            <div className='row2'>
                <h2>Announcements</h2>
            </div>
            <div className='row1'>
                {props.data?.map((x: any) => {
                    return (
                        <p>{x.Title}<br /><br /></p>
                    )
                })}
            </div>
        </div>
    )
}
export default Announcements;

















