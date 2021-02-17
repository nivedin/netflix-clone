import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './planScreen.css';
import {plan} from '../features/planSlice';
function PlanScreen() {

    const [subscribed,setSubscribed] = useState("Premium");
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(plan({
            plan:"Premium"
           }))
    }, [])

    const handleClick = (planId,planName) => {
        let confirmClick = window.confirm(`Are You sure you want to subscribe ${planName} plan`)
       if(confirmClick){

        Plans.forEach(userPlan => {
            if(userPlan.planId === planId){
                userPlan.subscribed = true;
                dispatch(plan({
                    plan:userPlan.name
                }))
                   setSubscribed(userPlan.name)
            }
        })
       }

    }
   //console.log({subscribed});
    var Plans = [
        {   planId:'1',
            name:'Premium',
            detail:'4K + HDR',
            price:599,
            subscribed:true
        },
        {   planId:'2',
            name:'Standard',
            detail:'1080p',
            price:299,
            subscribed:false
        },
        {   planId:'3',
            name:'Basic',
            detail:'720',
            price:199,
            subscribed:false
        }
    ]
    return (
        <div className="planScreen">
           {Plans.map((plan) =>{
               const planSubscribed = (plan.name === subscribed ) ?  true : false
               return(
                <div className={planSubscribed ? 'planSubscribed ' : 'planScreen__plan'} key={plan.planId}>
                <div className="planScreenInfo">
                    <h5>{plan.name}</h5>
                    <h5>{plan.detail}</h5>
                </div>
                <button onClick={() => handleClick(plan.planId,plan.name)} >
                    {planSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>
               )
           })}
        </div>
    )
}
export default PlanScreen
