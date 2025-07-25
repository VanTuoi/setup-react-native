/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Alert, useColorScheme } from 'react-native';

import { useCourse, useDeleteCourse } from '@/api/courses';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  Image,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { EditIcon } from '@/components/ui/icons/edit';
import { translate } from '@/lib';

export default function CourseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useColorScheme();

  const courseQuery = useCourse({
    variables: { id: id as string },
  });

  const deleteMutation = useDeleteCourse();

  const data = courseQuery.data?.data;

  const renderHeader = (title: string) => (
    <Stack.Screen
      options={{
        title,
        headerBackTitle: translate('course.back'),
        headerRight: () => (
          <Button
            onPress={() => {
              router.push(`/courses/${id}/edit`);
            }}
            variant="ghost"
            className="mr-3"
          >
            <EditIcon color={theme === 'dark' ? '#fff' : '#000'} size={16} />
          </Button>
        ),
      }}
    />
  );

  if (courseQuery.isPending) {
    return (
      <View className="flex-1 items-center justify-center p-3">
        {renderHeader(translate('course.title.list'))}
        <FocusAwareStatusBar />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (courseQuery.isError || !data) {
    return (
      <View className="flex-1 items-center justify-center p-3">
        {renderHeader(translate('course.title.list'))}
        <FocusAwareStatusBar />
        <Text className="text-center text-red-500">
          {translate('common.error_load')}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 p-2"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {renderHeader(translate('detail_course.title'))}
        <FocusAwareStatusBar />

        {data.image ? (
          <Image
            source={{ uri: data.image }}
            className="mb-4 h-48 w-full rounded-lg"
            resizeMode="cover"
          />
        ) : null}

        <View className="flex flex-col items-start gap-2">
          <Text className="text-xl font-bold">{data.name}</Text>

          <Text>
            <Text className="font-semibold">
              {translate('detail_course.id')}:
            </Text>{' '}
            {data.id}
          </Text>

          <Text>
            <Text className="font-semibold">
              {translate('detail_course.price')}:
            </Text>{' '}
            {data.price.toLocaleString()} VND
          </Text>

          <Text>
            <Text className="font-semibold">
              {translate('detail_course.status')}:
            </Text>{' '}
            <Text
              className={`font-semibold ${
                data.status === 'hidden' ? 'text-red-500' : 'text-green-600'
              }`}
            >
              {translate(`course.status.${data.status}`)}
            </Text>
          </Text>

          <Text className="font-semibold">
            {translate('detail_course.description')}:
          </Text>
          <Text>{data.description}</Text>
        </View>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 p-4 dark:border-gray-800">
        <Button
          className="dark:bg-gray-200"
          textClassName="text-red-500 font-bold dark:text-red-700"
          variant="outline"
          loading={deleteMutation.isPending}
          label={translate('detail_course.delete_course.button_label')}
          size="default"
          onPress={() => {
            Alert.alert(
              translate('detail_course.delete_course.alert.title'),
              translate('detail_course.delete_course.alert.body'),
              [
                {
                  text: translate('detail_course.delete_course.alert.cancel'),
                  style: 'cancel',
                },
                {
                  text: translate('detail_course.delete_course.alert.delete'),
                  style: 'destructive',
                  onPress: () => {
                    deleteMutation.mutate(
                      { id: data.id },
                      {
                        onSuccess: () => router.replace('/'),
                      }
                    );
                  },
                },
              ]
            );
          }}
        />
      </View>
    </View>
  );
}
