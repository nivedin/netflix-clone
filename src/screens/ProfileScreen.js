import React, { useEffect, useState } from 'react';
import './profileScreen.css';
import Nav from '../Nav';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectPlan } from '../features/planSlice';
import { auth } from '../firebase';
import PlanScreen from './PlanScreen';

function ProfileScreen() {
    const [userPlan, setPlan] = useState([])
    const user = useSelector(selectUser);
    const plan = useSelector(selectPlan);

    useEffect(() => {
        setPlan(plan)
    }, [plan])


    return (
        <div className="profileScreen">
            <Nav/>
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src="data:image/png;base64,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" alt="img"/>
                <div className="profileScreen__details">
                    <h2>{user.email}</h2>
                    <div className="profileScreen__plans">
                    <h3>Plans:{userPlan?.plan}</h3>
                    <PlanScreen/>
                        <button onClick={() => auth.signOut()} className="profileScreen__signOut">Sign Out</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen;
