import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import BottomNavBar from "./BottomNavBar";
import {styles} from "../style/shared-styles";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../style/theme";
import getCategories from "../entities/YCategory";
import getEvents from "../entities/Yevents";
import CardS from "../entities/CardS";
import {StatusBar} from "expo-status-bar";

export default function ProfileComponent() {
    return (
        <View style={monProfilStyle.container}>
            <LinearGradient
                style={monProfilStyle.gradient_container}
                colors={[colors.darkGradientSecondeColor, colors.primary]}
                start={{x: 0, y: 0}}
                end={{x: 0.2, y: 1}}
            >
                    <View style={monProfilStyle.titlesAndCategories}>
                        <Text style={[styles.textSmall, styles.textFont]}>Bonjour, new user</Text>
                        <Text style={[styles.textXL, styles.textFont]}>Mon Profil</Text>
                    </View>

                    <View style={monProfilStyle.profilContainer}>

                        <View style={monProfilStyle.infosContainer}>
                            <Text style={monProfilStyle.infoTitle}>Mes Infos</Text>
                            <View style={monProfilStyle.infosSubContainer}>
                                <Text style={monProfilStyle.infoSubtitle}>Prénom: New</Text>
                                <Text style={monProfilStyle.infoSubtitle}>Nom: User</Text>
                                <Text style={monProfilStyle.infoSubtitle}>Mail: new.user@usermail.com</Text>
                                <Text style={monProfilStyle.infoSubtitle}>Ville: User-ville</Text>
                            </View>
                        </View>

                        <View style={styles.smallFlex}>
                            <Text style={monProfilStyle.interetSubTitle}>Mes Centres d'intérêts</Text>
                            <View style={monProfilStyle.centerFlex}>
                                <View style={monProfilStyle.interetsContainer}>
                                    {
                                        getCategories().map((category, index) => {
                                            return (
                                                <View key={index} style={monProfilStyle.interet}>
                                                    <Text style={monProfilStyle.interetLabel}>{category.label}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={styles.cardViewMainContainer}>
                            <Text style={monProfilStyle.eventsTitle}>Mes prochains évènements</Text>
                            <ScrollView style={styles.smallCardScrollView}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.scrollSmallContentContainer}
                            >
                                {getEvents().map((aYEvent, index) => {
                                    let actualMonth = new Date().getMonth();
                                    if (aYEvent.date.getMonth() === actualMonth) {
                                        return (
                                            <CardS key={index} type={aYEvent.type!!} label={aYEvent.label}
                                                   date={aYEvent.date} placesTotale={aYEvent.placesTotale}
                                                   lieu={aYEvent.lieu} places={aYEvent.places} id={aYEvent.id}
                                                   description={aYEvent.description}
                                                   image={aYEvent.image}></CardS>
                                        )
                                    }
                                })}
                            </ScrollView>
                        </View>
                    </View>
                <StatusBar style="auto"/>
                <BottomNavBar screenIndex={2}></BottomNavBar>
            </LinearGradient>
        </View>
    )
}

const monProfilStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient_container: {
        height: '100%',
        width: '100%',
        padding: 10,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    profilContainer: {
        padding: 20,
        borderRadius: 24,
        borderColor: colors.white,
        borderWidth: 1,
        display: "flex",
        gap: 30,
    },
    titlesAndCategories: {
        display: "flex",
        gap: 20
    },
    infosContainer: {
      display: "flex",
        gap: 10
    },
    infoTitle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold"
    },
    infosSubContainer: {
      display: "flex",
      gap: 5
    },
    infoSubtitle: {
      color: colors.primary,
        fontSize: 15
    },
    centerFlex: {
      display: 'flex',
      alignItems: 'center',
    },
    interetSubTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.white
    },
    interetsContainer: {
        padding: 15,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        gap: 15,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 24,
    },
    interet: {
        width: 100,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        backgroundColor: colors.primary,
    },
    interetLabel: {
        color: colors.white,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    eventsTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.white
    }
});