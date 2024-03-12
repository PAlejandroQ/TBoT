import React from 'react'
import {View, Text, Image} from 'react-native'

import styles from './company.style'
import {icons} from '../../../constants'
import {checkImageURL} from "../../../utils";
import {stripBaseUrl} from "expo-router/build/fork/getStateFromPath";
import heart from "../../../assets/icons/heart.png";

const Company = ({companyLogo, jobTitle, companyName, location}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Image
                    source={{
                        uri: checkImageURL(companyLogo)
                            ? companyLogo
                            : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
                    }}
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.jobTitleBox}>
                <Text style={styles.job}>{jobTitle}</Text>
            </View>

            <View style={styles.companyInfoBox}>
                <Text style={styles.companyName}>{companyName} / </Text>
                <View style={styles.locationBox}>
                    <Image
                        source={icons.heart}
                        resizeMode="contain"
                        style={styles.locationImage}
                    />
                    <Text styles={styles.locationName}>{location}</Text>
                </View>
            </View>
        </View>
    )
}

export default Company