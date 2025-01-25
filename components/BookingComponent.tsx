import React, {useState} from "react";
import {ActivityIndicator, SafeAreaView, ScrollView, Text, View} from "react-native";
import BottomNavBar from "./BottomNavBar";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../style/theme";
import getCategories from "../entities/YCategory";
import getEvents, {aYEvents, getEventsPromise, getUtilisateurEventsPromise} from "../entities/Yevents";
import CardXL from "../entities/CardXL";
import CardS from "../entities/CardS";
import {StatusBar} from "expo-status-bar";
import {styles} from "../style/shared-styles";
import Categories from "./Categories";
import {Utilisateur} from "../entities/Utilisateur";
import {SafeAreaProvider} from "react-native-safe-area-context";
import moment from "moment/moment";
import {getReservationParUtilisateurId, Reservation} from "../entities/Reservation";

export default function BookingComponent({route}) {
    let utilisateur: Utilisateur = route.params.utilisateur;
    const [eventsListe, setEventsListe] = useState<aYEvents[]>([]);
    const [eventsSize, setEventsSize] = useState<number>(0);
    const [reservationsListe, setReservationsListe] = useState<Reservation[]>([]);
    if (eventsListe.length <= 0) {
        getReservationParUtilisateurId(utilisateur.id!!).then(reservations => {
            if (reservations !== null && reservations.length > 0) {
              setReservationsListe(reservations);
            }
        });
    }
    if (reservationsListe.length > 0 && eventsListe.length <= 0) {
        for (let index = 0; index < reservationsListe.length; index++) {
            getUtilisateurEventsPromise(reservationsListe[index].event_id!!).then(event => {
                if (event !== null) {
                    console.log("event ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", event)
                    eventsListe.push(event);
                    setEventsSize(eventsListe.length);
                }
            });
        }
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.gradient_container}
                colors={[colors.complementarySecond, colors.darkGradientSecondeColor]}
                start={{x: 0, y: 0}}
                end={{x: 0.2, y: 1}}
            >
                <View style={styles.titlesAndCategories}>
                    <View>
                        <Text style={[styles.textSmall, styles.textFont]}>Bonjour, new user</Text>
                        <Text style={[styles.textXL, styles.textFont]}>Mes Réservations</Text>
                    </View>
                    <Categories></Categories>
                </View>
                <View style={styles.cardViewMainContainer}>
                    <Text style={styles.subTitleWeight}>Mes prochains évènements : {eventsListe.length}</Text>
                    <ScrollView style={styles.xlCardScrollView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollXLContentContainer}
                    >
                        {eventsListe.length > 0 && eventsListe.length <= eventsSize  ?
                            eventsListe.map((aYEvent, index) => {
                                console.log("event: --------------------------------------> ", aYEvent);
                            return (
                                <CardXL key={index} type={aYEvent.type!!}
                                        label={aYEvent.label}
                                        id={aYEvent.id}
                                        placesRestantes={aYEvent.placesRestantes}
                                        placesTotales={aYEvent.placesTotales}
                                        lieu={aYEvent.lieu}
                                        description={aYEvent.description}
                                        date={aYEvent.date}
                                        image={aYEvent.image}></CardXL>
                            )
                        }): <Text>Aucun évènements de prévu</Text>}
                    </ScrollView>
                </View>
                <View style={styles.cardViewMainContainer}>
                    <Text style={styles.subTitleSlim}>Mes évènements passés</Text>
                    <ScrollView style={styles.smallCardScrollView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollSmallContentContainer}
                    >
                        {/*{eventsListe.length > 0 ? eventsListe.map((aYEvent, index) => {*/}
                        {/*    let actualMonth = new Date().getMonth();*/}
                        {/*    let aYeventDateMoment = moment(aYEvent.date, "YYYY-MM-DD");*/}
                        {/*    if (aYeventDateMoment.month() > actualMonth) {*/}
                        {/*        return (*/}
                        {/*            <CardS key={index} type={aYEvent.type!!} label={aYEvent.label}*/}
                        {/*                   date={aYEvent.date} placesTotales={aYEvent.placesTotales}*/}
                        {/*                   lieu={aYEvent.lieu} placesRestantes={aYEvent.placesRestantes} id={aYEvent.id}*/}
                        {/*                   description={aYEvent.description}*/}
                        {/*                   image={aYEvent.image}></CardS>*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*}) :  */}
                            <Text>Tu n'as aucun évènement passé.</Text>
                    {/*}*/}
                    </ScrollView>
                </View>

                <StatusBar style="auto"/>
                <BottomNavBar screenIndex={1} utilisateur={utilisateur}></BottomNavBar>
            </LinearGradient>
        </View>
    )
}