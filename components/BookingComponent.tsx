import React, {useState} from "react";
import {ActivityIndicator, SafeAreaView, ScrollView, Text, View} from "react-native";
import BottomNavBar from "./BottomNavBar";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../style/theme";
import getCategories from "../entities/YCategory";
import getEvents, {aYEvents, getEventsPromise} from "../entities/Yevents";
import CardXL from "../entities/CardXL";
import CardS from "../entities/CardS";
import {StatusBar} from "expo-status-bar";
import {styles} from "../style/shared-styles";
import Categories from "./Categories";
import {Utilisateur} from "../entities/Utilisateur";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function BookingComponent({route}) {
    let utilisateur: Utilisateur = route.params.utilisateur;
    const [eventsListe, setEventsListe] = useState<aYEvents[]>([]);
    if (eventsListe.length <= 0) {
        getEventsPromise().then(events => {
            setEventsListe(events)
        });
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
                    <Text style={styles.subTitleWeight}>Mes prochains évènements</Text>
                    <ScrollView style={styles.xlCardScrollView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollXLContentContainer}
                    >
                        {eventsListe.length > 0 ?
                            eventsListe.map((aYEvent, index) => {
                            return (
                                <CardXL key={index} type={aYEvent.type!!}
                                        label={aYEvent.label}
                                        id={aYEvent.id}
                                        placesRestantes={aYEvent.placesRestantes}
                                        placesTotales={aYEvent.placesTotales}
                                        date={aYEvent.date}
                                        lieu={aYEvent.lieu}
                                        description={aYEvent.description}
                                        image={aYEvent.image}></CardXL>
                            )
                        }): <SafeAreaProvider>
                                <SafeAreaView style={[styles.container]}>
                                    <ActivityIndicator size="large" color={colors.white}/>
                                </SafeAreaView>
                            </SafeAreaProvider>}
                    </ScrollView>
                </View>
                <View style={styles.cardViewMainContainer}>
                    <Text style={styles.subTitleSlim}>Mes évènements passés</Text>
                    <ScrollView style={styles.smallCardScrollView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollSmallContentContainer}
                    >
                        {eventsListe.length > 0 ? eventsListe.map((aYEvent, index) => {
                            let actualMonth = new Date().getMonth();
                            if (aYEvent.date.getMonth() === actualMonth) {
                                return (
                                    <CardS key={index} type={aYEvent.type!!} label={aYEvent.label}
                                           date={aYEvent.date} placesTotales={aYEvent.placesTotales}
                                           lieu={aYEvent.lieu} placesRestantes={aYEvent.placesRestantes} id={aYEvent.id}
                                           description={aYEvent.description}
                                           image={aYEvent.image}></CardS>
                                )
                            }
                        }) :  <SafeAreaProvider>
                            <SafeAreaView style={[styles.container]}>
                                <ActivityIndicator size="small" color={colors.white}/>
                            </SafeAreaView>
                        </SafeAreaProvider>}
                    </ScrollView>
                </View>

                <StatusBar style="auto"/>
                <BottomNavBar screenIndex={1} utilisateur={utilisateur}></BottomNavBar>
            </LinearGradient>
        </View>
    )
}