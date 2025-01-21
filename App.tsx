import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeComponent from "./components/HomeComponent";
import BookingComponent from "./components/BookingComponent";
import ProfileComponent from "./components/ProfileComponent";
import ReservationComponent from "./components/ReservationComponent";
import ReservationFormComponent from "./components/ReservationFormComponent";
import ReservationDoneComponent from "./components/ReservationDoneComponent";

const Stack = createNativeStackNavigator();
export default function App() {

    //TODO add scss implementation https://seasparta618.medium.com/how-to-integrate-scss-sass-into-react-native-c56563aa8f6e

    return (
            <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeComponent} options={{headerShown: false}}/>
                <Stack.Screen name="Booking" component={BookingComponent} options={{headerShown: false}}/>
                <Stack.Screen name="Profile" component={ProfileComponent} options={{headerShown: false}}/>
                <Stack.Screen name="Reservation" component={ReservationComponent} options={{title:'Informations sur l\'Évènement'}}/>
                <Stack.Screen name="ReservationForm" component={ReservationFormComponent} options={{title:'C\'est l\'heure de réserver !'}}/>
                <Stack.Screen name="ReservationReussie" component={ReservationDoneComponent} options={{headerShown: false}}/>
            </Stack.Navigator>
            </NavigationContainer>
    );

}