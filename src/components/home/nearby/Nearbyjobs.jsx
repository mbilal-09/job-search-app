import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

import styles from './nearbyjobs.style';
import {COLORS} from '../../../constants';
import {NearbyJobCard} from '../..';
import useFetch from '../../../../hook/useFetch';
import {useNavigation} from '@react-navigation/native';

const Nearbyjobs = () => {
  const navigator = useNavigation();

  const {data, isLoading, error, refetch} = useFetch('search', {
    query: 'Web Developer in pakistan',
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} size="large" />
        ) : error ? (
          <Text>Something went worng</Text>
        ) : (
          data?.map(job => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() =>
                navigator.navigate(`JobDetails`, {
                  id: job?.job_id,
                })
              }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
