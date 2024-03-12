import {useState} from 'react'
import {View, Text, TouchableOpacity, FlatList, ActivityIndicator} from "react-native";
import {useRouter} from "expo-router";

import styles from './popularjobs.style'
import {COLORS, SIZES} from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from '../../../hook/useFetch';

const Popularjobs = ({ pathData}) => {
    const router = useRouter();

    const { data, isLoading, error } = useFetch(
        pathData,{
            query: 'React developer',
            num_pages: 1
        }
    );

    const [ selectedJob, setSelectedJob ] = useState(null)

    const handleCardPress = (item) => {
        router.push(`/job-details/${item}`);
        setSelectedJob(item)
    }

    // console.log(data);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Pacientes {pathData}</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Mostrar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                ) : error ? (
                    <Text> Algo salio mal</Text>
                ): (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <PopularJobCard
                                item={item}
                                selectedJob={selectedJob}
                                handleCardPress={handleCardPress}
                            />
                        )}
                        keyExtractor={(item) => item}
                        contentContainerStyle={{ columnGap: SIZES.medium}}
                        horizontal
                    />
                )}
            </View>
        </View>


    )
}

export default Popularjobs