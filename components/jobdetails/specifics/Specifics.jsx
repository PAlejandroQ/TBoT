import React from 'react'
import {View, Text} from 'react-native'

import styles from './specifics.style'

const Specifics = ({title, points}) => {
    console.log("preguntas: "+ points)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}:</Text>

            <View style={styles.pointsContainer}>
                {points.map((item) => (
                <View key={item.pregunta}>
                    <View style={styles.pointWrapper} key={item.pregunta}>
                        <View style={styles.pointDot}/>
                        <Text style={styles.pointText}>{item.pregunta}</Text>
                    </View>

                    <View style={styles.pointWrapper} key={item.respuesta + "_res"}>
                        <Text style={styles.pointText}>{item.respuesta}</Text>
                    </View>
                </View>
                ))}
            </View>
        </View>
    )
}

export default Specifics