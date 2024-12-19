import React, {useState} from "react";
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import colors from "../style/theme";
import HomeSvg from "../assets/home_rounded.svg";
import Booking from "../assets/book_online.svg";
import Profile from "../assets/account_circle.svg";

interface IconProps {
    isSelected: boolean,
    label: string,
}

export default function BottomNavBar() {
    const iconMenus: IconProps[] = [
        {
            label: "Home",
            isSelected: true,
        },
        {
            label: "Booking",
            isSelected: false,
        },
        {
            label: "Profile",
            isSelected: false,
        }
    ]
    const [isSelectedIcon, setSelectedIcon] = useState(0);
    const home = (iconPropsState: IconProps) => {
        return (
            isSelectedIcon !== 0 ?
                <TouchableOpacity onPress={() => {
                    setSelectedIcon(0)
                }}>
                    <View style={styles.iconBig}>
                        <HomeSvg height={50} width={50}/>
                    </View>
                </TouchableOpacity> :
                <TouchableOpacity>
                    <View style={styles.menuIcon}>
                        <HomeSvg height={25} width={27.43}/>
                        <Text style={styles.font}>{iconPropsState.label}</Text>
                    </View>
                </TouchableOpacity>
        )
    }
    const booking = (iconMenuProps: IconProps) => {
        return (
            isSelectedIcon !== 1 ?
                <TouchableOpacity onPress={() => {
                    setSelectedIcon(1)
                }}>
                    <View style={styles.iconBig}>
                        <Booking height={50} width={50}/>
                    </View>
                </TouchableOpacity> :
                <TouchableOpacity>
                    <View style={styles.menuIcon}>
                        <Booking height={25} width={25}/>
                        <Text style={styles.font}>{iconMenuProps.label}</Text>
                    </View>
                </TouchableOpacity>
        )
    }
    const profile = (iconMenuProps: IconProps) => {
        return (
            isSelectedIcon !== 2 ?
                <TouchableOpacity onPress={() => {
                    setSelectedIcon(2)
                }}>
                    <View style={styles.iconBig}>
                        <Profile height={50} width={50}/>
                    </View>
                </TouchableOpacity> :
                <TouchableOpacity>
                    <View style={styles.menuIcon}>
                        <Profile height={25} width={25}/>
                        <Text style={styles.font}>{iconMenuProps.label}</Text>
                    </View>
                </TouchableOpacity>

        )
    }
    return (
        <View style={styles.container}>
            {home(iconMenus[0])}
            {booking(iconMenus[1])}
            {profile(iconMenus[2])}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        marginLeft: 10,
        height: 100,
        width: '90%',
        borderRadius: 48,
        flexDirection: "row",
        backgroundColor: colors.complementarySecond,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    menuIcon: {
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 48,
        width: 100,
        height: 50,
        gap: 5,
        padding: 10
    },
    iconSmall: {
        marginBottom: 10
    },
    iconBig: {
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    font: {
        color: colors.white,
        fontSize: 16,
        lineHeight: 16,
        marginTop: 5
    }
});