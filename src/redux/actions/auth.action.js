import firebase from 'firebase/compat/app'
import auth from '../../firebase'
import 'firebase/compat/auth'
import {
   LOAD_PROFILE,
   LOGIN_FAIL,
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOG_OUT,
} from '../actionType'
export const login = () => async dispatch => {
      dispatch({
         type: LOGIN_REQUEST,
      })

      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl')
      const res =auth().signInWithPopup(provider)
      let accessToken=undefined;
      res.then(
         function(data){
            accessToken = data.credential.accessToken
            const profile = {
               name: data.additionalUserInfo.profile.name,
               photoURL: data.additionalUserInfo.profile.picture,
            }
            console.log(profile)
            sessionStorage.setItem('ytc-access-token', accessToken)
            sessionStorage.setItem('ytc-user', JSON.stringify(profile))
            dispatch({
               type: LOGIN_SUCCESS,
               payload: accessToken,
            })
            dispatch({
               type: LOAD_PROFILE,
               payload: profile,
            })
         },
         function(error){
            console.log(error)
            dispatch({
               type: LOGIN_FAIL,
               payload: error.message,
            })
         }
      )
}

export const log_out = () => async dispatch => {
   await auth.signOut()
   dispatch({
      type: LOG_OUT,
   })
}

sessionStorage.removeItem('ytc-access-token')
sessionStorage.removeItem('ytc-user')