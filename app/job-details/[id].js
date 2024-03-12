import {
    Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl
} from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import {
    Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";


const JobDetails = () => {

    const params = useGlobalSearchParams();
    // console.log("params: " , params.id)
    const router = useRouter();

    const { data, isLoading, error, refetch } = useFetch('data.particulares', {
        "titulo": params.id
    })
    // const tabs = ["About", "Qualifications", "Responsibilities"]
    const [refreshing, setRefreshing] = useState(false);
    const tabs = data?.tabs ?? ["NA"] // Datos no se cargan

    const [activeTab, setActiveTab] = useState(tabs[0]);
    console.log("tabs: " + activeTab)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    },[])

    const displayTabContent = () => {
        // console.log(data?.haveSubtopics)
        if (tabs.length > 2){
            return <Specifics
                title= {activeTab ?? ['N/A']}
                // points={data?.preguntas ?? ['N/A']}
                points={data?.preguntas?.filter(item => item.tag === activeTab) ?? ['N/A']}
            />

            // switch (activeTab) {
            //     case "Qualifications":
            //         return <Specifics
            //             title="Qualifications"
            //             points={data?.preguntas ?? ['N/A']}
            //         />
            //     case "About":
            //         return <JobAbout
            //             info={data?.job_description ?? "No data provided"}
            //         />
            //     case "Responsibilities":
            //         return <Specifics
            //             title="Responsibilities"
            //             points={data[0]?.job_highlights?.Responsibilities ?? ['N/A']}
            //         />
            //     default:
            //         break;
            // }
        }else{
            return <Specifics
                title= {tabs[0] ?? ['N/A']}
                points={data?.preguntas ?? ['N/A']}
            />
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }} >
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={ () => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    ),
                    headerTitle: ''
                }}
            />

            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <Text>Algo salio mal</Text>
                    ) : data.length === 0 ? (
                        <Text>Sin datos</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Company
                                companyLogo={data[0]?.employer_logo}
                                jobTitle={data?.titulo}
                                companyName={data?.descripcion}
                                location={data?.fuentes}
                            />

                            { tabs.length > 2 ? (
                                <JobTabs
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                            ) : null }


                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>

                {/*<JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />*/}
            </>
        </SafeAreaView>
    )
}
export default JobDetails