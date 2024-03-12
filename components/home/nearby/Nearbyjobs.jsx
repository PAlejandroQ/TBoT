
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {useRouter} from "expo-router";

import styles from './nearbyjobs.style'
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from '../../../hook/useFetch';
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import {useState} from "react";

const Nearbyjobs = () => {
    const router = useRouter();
    // const isLoading = false;
    // const error = false;

    const { data, isLoading, error } = useFetch(
        'data.particulares',null
    );
    const [ selectedJob, setSelectedJob ] = useState(null)
    const handleCardPress = (item) => {
        router.push(`/job-details/${item.titulo}`);
        setSelectedJob(item.titulo)
    }
    // console.log(data);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Temas</Text>
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
                    <View style={styles.twoColumnContainer}>
                        <View style={styles.column}>
                            {data?.slice(0, Math.ceil(data.length / 2)).map((job) => (
                                <PopularJobCard
                                    item={job}
                                    selectedJob={selectedJob}
                                    handleCardPress={handleCardPress}
                                    key={`nearby-job-${job.titulo}`}
                                />
                            ))}
                        </View>
                        <View style={styles.column}>
                            {data?.slice(Math.ceil(data.length / 2)).map((job) => (
                                <PopularJobCard
                                    item={job}
                                    selectedJob={selectedJob}
                                    handleCardPress={handleCardPress}
                                    key={`nearby-job-${job.titulo}`}
                                />
                            ))}
                        </View>
                    </View>
                    // data?.map((job) => (
                    //     // <NearbyJobCard
                    //     //     job={job}
                    //     //     key={`nearby-job-${job}`}
                    //     //     handleNavigate={() => router.push(`/job-details/${job}`)}
                    //     // />
                    //     <PopularJobCard
                    //         item={job}
                    //         selectedJob={selectedJob}
                    //         handleCardPress={handleCardPress}
                    //         key={`nearby-job-${job.titulo}`}
                    //     />
                    //     )
                    // )
                )}
            </View>
        </View>


    )
}

export default Nearbyjobs