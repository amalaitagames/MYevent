import {Text, View} from "react-native";
import HomeSvg from './assets/home_rounded.svg';
import Booking from './assets/book_online.svg';
import Profile from './assets/account_circle.svg';

type IconMenuProps = {
    label: string
}
export default function MenuIcon() {
    let isSelected = false;
    const home = () => {
        return (
            isSelected ?
                <HomeSvg height={50} width={50}/> : <View>
                    <HomeSvg height={50} width={50}/>
                    <Text>Home</Text>
                </View>
        )
    }
    const booking = () => {
        return (
            <View>
                <Booking height={50} width={50}/>
            </View>
        )
    }
    const profile = () => {
        return (
            <View>
                <Profile height={50} width={50}/>
            </View>
        )
    }
    return (

        <View>
            {home()}
            {booking()}
            {profile()}
        </View>
    )
}