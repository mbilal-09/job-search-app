import {useCallback, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../components';
import {COLORS, icons, SIZES} from '../constants';
import useFetch from '../../hook/useFetch';

const tabs = ['About', 'Qualifications', 'Responsibilities'];

const JobDetails = () => {
  const navigator = useNavigation();
  const router = useRoute();
  const {id} = router.params;

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  })

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics
        title="Qualifications"
        points={data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
        break;
      case "About":
        return <JobAbout 
        info={data[0].job_description ?? "No data provided"}
        />
        break;
      case "Responsibilities":
        return <Specifics
        title="Responsibilities"
        points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
        />
        break;
    
      default:
        break;
    }
  }

  const {data, isLoading, error, refetch} = useFetch('job-details', {
    job_id: id,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <View>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Text style={{color: 'black', fontSize: 34, marginStart: 20}}>
            &lt;
          </Text>
        </TouchableOpacity>
      </View>

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{padding: SIZES.medium, paddingBottom: 100}}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                Location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;