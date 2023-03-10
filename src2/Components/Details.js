import react, { useState, useContext } from 'react';//
import { useForm } from "react-hook-form";
import axios from 'axios';
import UpdateChildern from './UpdateChildern'
import { userContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import GoodBye from './GoodBye';

import Button from '@mui/material/Button'

export default function Details() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const userCtx = useContext(userContext);
    const [parentIdState, setParentIdState] = useState('');
    const [end, setEnd] = useState(false);

    const handle = (e) => {
        userCtx.setNumChildrenState(e);
        const a = [];
        for (let index = 0; index < e; index++) {
            a.push(<UpdateChildern key={index} index={index} />)
        }
        userCtx.setChildrenFormArr(a);
    }

    function onSubmit1() {
        axios.post('https://localhost:44357/User', {
            Name: userCtx.userNameState, FamilyName: userCtx.familyNameState, UserId: userCtx.TzState,
            DateOfBirth: userCtx.DateOfBirthState, Kind: userCtx.kindState, Hmo: userCtx.HMOState
        })
            .then(result => {
                console.log(result)

                setParentIdState(axios.get(`https://localhost:44357/User/${userCtx.TzState}`)
                    .then(result => {
                        console.log(result)

                        for (let index = 0; index < userCtx.numChildernState; index++) {
                            axios.post('https://localhost:44357/Child', {
                                Name: userCtx.ChildNameState[index], ChildId: userCtx.tzChildState[index],
                                DateOfBirth: userCtx.dateOfBirthChildState[index], ParentId: result.data.id
                            })
                                .then(result => {
                                    console.log(result)
                                })
                                .catch(error => {
                                    console.error(error.response.data);
                                });;
                        }
                    })
                    .catch(error => {
                        console.error(error.response.data);
                    }))
            })
            .catch(error => {
                console.error(error.response.data);
            });
        setEnd(true);
    }

    return (
        <div>
            <div id="div1">
                <h2>???????? ????????</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit1)} style={{ width: "50%" }}>

                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">???????? ???? ????????</span>
                    <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                        {...register("firstName", { required: true, maxLength: 20 })}
                        type="text" onChange={(e) => userCtx.setUserNameState(e.target.value)} defaultValue={userCtx.userNameState}></input>
                </div>
                {errors?.firstName?.type === "required" && <p>?????? ???? ???????? ?????? ????????</p>}
                {errors?.firstName?.type === "maxLength" && (
                    <p>???? ???????? ???? ???????? ?????????? ???????? ??- 20 ??????????</p>
                )}

                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">???????? ???? ??????????</span>
                    <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                        {...register("familyName", { required: true, maxLength: 20 })}
                        type="text" onChange={(e) => userCtx.setFamilyNameState(e.target.value)} defaultValue={userCtx.familyNameState} ></input>
                </div>
                {errors?.familyName?.type === "required" && <p>?????? ???? ???????? ?????? ????????</p>}
                {errors?.familyName?.type === "maxLength" && (
                    <p>???? ?????????? ???? ???????? ?????????? ???????? ??- 20 ??????????</p>
                )}

                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">???????? ????' ?????????? ????????</span>
                    <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                        {...register("tz", { required: true, maxLength: 9, minLength: 9 })}
                        type="text" onChange={(e) => userCtx.setTzState(e.target.value)} defaultValue={userCtx.TzState} ></input>
                </div>
                {errors?.tz?.type === "required" && <p>?????? ???? ???????? ?????? ????????</p>}
                {errors?.tz?.type === "minLength" && (
                    <p>????' ???? ???????? ?????????? ???? ?????????? 9 ????????</p>
                )}
                {errors?.tz?.type === "maxLength" && (
                    <p>????' ???? ???????? ?????????? ???? ?????????????? 9 ????????</p>
                )}

                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">???????? ?????????? ????????</span>
                    <input className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
                        {...register("dateOfBirth", { required: true })}
                        type="date" onChange={(e) => userCtx.setDateOfBirthState(e.target.value)} defaultValue={userCtx.DateOfBirthState}></input>
                </div>
                {errors?.dateOfBirth?.type === "required" && <p>?????? ???? ???????? ?????? ????????</p>}

                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">?????? ??????</span>
                    <select className="form-select" aria-label="Default select example"
                        {...register("kind", { required: true, maxLength: 4 })}
                        type="text" onChange={(e) => userCtx.setKindState(e.target.value)} defaultValue={userCtx.kindState}>
                        <option value=""></option>
                        <option value="girl">????</option>
                        <option value="boy">????</option>
                    </select>
                </div>
                {errors?.kind?.type === "required" && <p>?????? ???? ???????? ?????? ????????</p>}

                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">?????? ???????? ??????????</span>
                    <select className="form-select" aria-label="Default select example"
                        {...register("Hmo", { required: true })}
                        type="text" onChange={(e) => userCtx.setHMOState(e.target.value)} defaultValue={userCtx.HMOState} >
                        <option value=""></option>
                        <option value="leumit">????????????</option>
                        <option value="clalit">??????????</option>
                        <option value="meuhedet">????????????</option>
                        <option value="macabi">????????</option>
                    </select>
                </div>
                {errors?.Hmo?.type === "required" && <p>?????? ???? ???????? ?????? ????????</p>}

                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg" >???????? ????' ??????????</span>
                    <input type="number" onChange={(e) =>
                        handle(e.target.value)
                    } defaultValue={userCtx.numChildernState}
                    />
                </div>

                {userCtx.childrenFormArr}

                <input type="submit" />
            </form>
            {end && navigate('/GoodBye')}
        </div>
    )
}
