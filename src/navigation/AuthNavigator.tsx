// import { FC } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// interface PropsType{};
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SignIn from '@views/auth/SignIn';
// import SignUp from '@views/auth/SignUp';
// import LostPassword from '@views/auth/LostPassword';
// import Verification from '@views/auth/Verification';
// import { AuthStackParamList } from '@src/@types/navigation';
// import Home from '@views/Home';
// const Stack = createNativeStackNavigator<AuthStackParamList>()
// const AuthNavigator: FC<PropsType> = (props) => {
//     return (
//         <Stack.Navigator screenOptions={{headerShown:false}}>
//             <Stack.Screen name= "SignIn" component={SignIn} />
//             <Stack.Screen name= "SignUp" component={SignUp}/>
//             <Stack.Screen name= "LostPassword" component={LostPassword}/>
//             <Stack.Screen name= "Verification" component={Verification}/>
//         </Stack.Navigator>
// )}

// export default AuthNavigator;