import colors from "../style/theme";
import {ActivityIndicator, SafeAreaView, ScrollView, Text, View} from "react-native";
import {aYEvents, getEventsPromise} from "../entities/Yevents";
import CardXL from "../entities/CardXL";
import CardS from "../entities/CardS";
import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";
import BottomNavBar from "./BottomNavBar";
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "../style/shared-styles";
import Categories from "./Categories";
import {SafeAreaProvider} from "react-native-safe-area-context";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Utilisateur} from "../entities/Utilisateur";


export default function HomeComponent({route}) {
    const [utilisateur, setUtilisateur] = useState<Utilisateur | undefined>(undefined);
    const [eventsListe, setEventsListe] = useState<aYEvents[]>([]);

    if (route === undefined || route.params === undefined || route.params.utilisateur === undefined && utilisateur === undefined) {
        let utilisateurDto = AsyncStorage.getItem("utilisateur");
        utilisateurDto.then(utilisateurDto => {
            if (utilisateurDto !== null) {
                setUtilisateur(JSON.parse(utilisateurDto));
            }
        })
    } else if (utilisateur === undefined) {
        setUtilisateur(route.params.utilisateur);
        AsyncStorage.setItem('utilisateur', JSON.stringify(utilisateur)).then(r => console.log(`l'utilisateur a été sauvé localement`));
    }


    if (eventsListe.length <= 0 && utilisateur === undefined) {
        getEventsPromise().then(events => {
            setEventsListe(events)
        });
    }

    return (<View style={styles.container}>
            <LinearGradient
                style={styles.gradient_container}
                colors={[colors.darkGradientFirstColor, colors.darkGradientSecondeColor, colors.primary]}
                start={{x: 2, y: 0}}
                end={{x: 0.1, y: 1.1}}
            >
                <View style={styles.titlesAndCategories}>
                    <View>
                        <Text style={[styles.textSmall, styles.textFont]}>Bonjour {
                            utilisateur !== undefined ? utilisateur.prenom : ''
                        }</Text>
                        <Text style={[styles.textXL, styles.textFont]}>Réserve ton {"\n"}prochain évènement</Text>
                    </View>
                    <Categories></Categories>
                </View>
                <View style={styles.cardViewMainContainer}>
                    <Text style={styles.subTitleWeight}>À la une</Text>
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
                                            lieu={aYEvent.lieu}
                                            description={aYEvent.description}
                                            date={aYEvent.date}
                                            image={aYEvent.image}></CardXL>
                                )
                            }) : <SafeAreaProvider>
                                <SafeAreaView style={[styles.container]}>
                                    <ActivityIndicator size="large" color={colors.white}/>
                                </SafeAreaView>
                            </SafeAreaProvider>}
                    </ScrollView>
                </View>
                <View style={styles.cardViewMainContainer}>
                    <Text style={styles.subTitleSlim}>Dans{"\n"}ce mois</Text>
                    <ScrollView style={styles.smallCardScrollView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollSmallContentContainer}
                    >
                        {
                            eventsListe.length > 0 ? eventsListe.map((aYEvent, index) => {
                                let actualMonth = new Date().getMonth();
                                let aYeventDateMoment = moment(aYEvent.date, "YYYY-MM-DD");
                                if (aYeventDateMoment.month() === actualMonth) {
                                    return (
                                        <CardS key={index} type={aYEvent.type} label={aYEvent.label}
                                               date={aYEvent.date} lieu={aYEvent.lieu}
                                               image={aYEvent.image} placesRestantes={aYEvent.placesRestantes}
                                               placesTotales={aYEvent.placesTotales}
                                               id={aYEvent.id} description={aYEvent.description}>
                                        </CardS>
                                    )
                                }
                            }) : <SafeAreaProvider>
                                <SafeAreaView style={[styles.container]}>
                                    <ActivityIndicator size="small" color={colors.white}/>
                                </SafeAreaView>
                            </SafeAreaProvider>
                        }
                    </ScrollView>
                </View>

                <StatusBar style="auto"/>
                <BottomNavBar screenIndex={0} utilisateur={utilisateur}></BottomNavBar>
            </LinearGradient>
        </View>
    )
}