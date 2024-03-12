// import React from 'react'
import { View, Text , TouchableOpacity, Image } from 'react-native'

import styles from './popularjobcard.style'
import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
        style={styles.container(selectedJob, item)}
        onPress={() => handleCardPress(item)}
    >
        <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
            <Image
                source={{ uri: checkImageURL(item?.url_icon)
                    ? item.url_icon
                    : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'
                }}
                resizeMode="contain"
                style={styles.logoImage}
            />
        </TouchableOpacity>

        {/*<Text style={styles.companyName} numberOfLines={1}>{item.titulo}</Text>*/}
        <View style={styles.infoContainer}>
            {/*<Text style={styles.jobName(selectedJob, item.titulo)} numberOfLines={1}>*/}
            <Text style={styles.jobName(selectedJob, item.titulo)}>
                {item.titulo}
            </Text>
            {/*<Text style={styles.location}>{item.titulo}</Text>*/}
        </View>
    </TouchableOpacity>//
  )
}

export default PopularJobCard